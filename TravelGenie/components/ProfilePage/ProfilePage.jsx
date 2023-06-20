import {
  HStack,
  Box,
  VStack,
  Text,
  Center,
  Image,
} from 'native-base';
import { FlatList } from 'react-native';
import { DefaultProfile } from '../../assets/images/profile';
import ShadeButton from './ShadeButton';
import { useCallback } from 'react';
import {
  SettingIcon,
  PersonalInfoIcon,
  PaymentInfoIcon,
  SignoutIcon,
} from '../../assets/icons/profilepage';
import { useAuthContext } from '../../contexts/auth';
import { useRouter } from 'expo-router';

function NameCard() {
  const { user } = useAuthContext();
  return (
    <HStack mt='5' px='5' mb='5'>
      <Box>
        <Image size='lg' source={DefaultProfile} alt='Profile Picture' />
      </Box>
      <VStack justifyContent='center' ml='3'>
        <Text
          fontWeight='700'
          color='#5F6368'
          fontSize='md'
        >
          {user.name || "Your Name"}
        </Text>
        <Text
          fontWeight='400'
          color='#5F6368'
          fontSize='md'
        >
          {user.email}
        </Text>
      </VStack>
    </HStack>
  );
}

function SignoutButton() {
  const { logout } = useAuthContext();
  return (
    <ShadeButton
      title="Sign out"
      _text={{
        fontWeight: 700,
        color: '#f21d1d',
        fontSize: 'md',
      }}
      mt='50'
      leftIcon={<SignoutIcon size='xl' color="#f21d1d" px='4' />}
      onPress={() => logout()}
    />
  );
}

// TODO: add link to setting and payment info pages
const sections = [
  {
    id: 0,
    type: "NameCard",
  },
  {
    id: 1,
    type: "Button",
    title: "Personal Information",
    iconLeft: PersonalInfoIcon,
    href: '/profile/personalInfo',
  },
  {
    id: 2,
    type: "Button",
    title: "Payment Information",
    iconLeft: PaymentInfoIcon,
    href: null,
  },
  {
    id: 3,
    type: "Button",
    title: "Setting",
    iconLeft: SettingIcon,
    href: '/profile/setting',
  },
  {
    id: 4,
    type: "Sign out",
  },
];

const Profile = () => {
  const router = useRouter();

  const render = useCallback(({ item }) => {
    if (item.type == "NameCard") {
      return <NameCard />;
    } else if (item.type == "Button") {
      return (
        <ShadeButton
          leftIcon={<item.iconLeft size='lg' px='4'/>}
          title={item.title}
          mt='5'
          onPress={() => router.push(item.href)}
        />
      );
    } else if (item.type == "Sign out") {
      return <SignoutButton />;
    } else return null;
  }, [router]);

  return (
    <Center w='100%' flex='1' bg='white'>
      <Box w='100%' safeArea flex='1'>
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
};

export default Profile;
