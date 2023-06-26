import { Box, Center } from "native-base";
import { FlatList } from "react-native";
import Title from "../TitleHeader";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import ShadeButton from "./ShadeButton";
import { PasswordIcon, TrashcanIcon } from "../../assets/icons/profilepage";

const sections = [
  {
    id: 0,
    type: "Button",
    title: "Change Password",
    iconLeft: PasswordIcon,
    href: '/profile/changePassword',
  },
  {
    id: 1,
    type: "Delete Account",
  },
];

function DeleteAccount() {
  const router = useRouter();

  return (
    <ShadeButton
      onPress={() => router.push('/profile/deleteAccount')}
      title="Delete Account"
      _text={{
        fontWeight: 700,
        color: '#f21d1d',
        fontSize: 'md',
      }}
      mt='50'
      leftIcon={<TrashcanIcon size='xl' px='4' color="#f21d1d" />}
    />
  );
}

export default function SettingPage() {
  const router = useRouter();

  const render = useCallback(({ item }) => {
    if (item.type == "Button") {
      return (
        <ShadeButton
          leftIcon={<item.iconLeft size='lg' px='4' color="#000000"/>}
          title={item.title}
          mt='5'
          onPress={() => router.push(item.href)}
        />
      );
    } else if (item.type == "Delete Account") {
      return <DeleteAccount />;
    } else return null;
  }, [router]);

  return (
    <Center w='100%' flex='1' bg='white'>
      <Box w='100%' safeArea flex='1'>
        <Title
          title="Setting"
          onBackPress={() => router.back()}
        />
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 30,
            flexGrow: 1,
            flex: 1,
          }}
          data={sections}
          renderItem={render}
        />
      </Box>
    </Center>
  );
}
