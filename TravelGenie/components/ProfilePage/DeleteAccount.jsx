import {
  FormControl,
  Input,
  IconButton,
  Icon,
  Box,
  KeyboardAvoidingView,
  Center,
  ScrollView,
  VStack,
} from 'native-base';
import { useCallback, useState } from 'react';
import TitleHeader from '../TitleHeader';
import {
  useAuthContext,
} from '../../contexts/auth';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BlueButton from '../BlueButton';
import { deleteAccount, handleLogin } from '../../lib/connectBackend';
import { Alert } from 'react-native';

function Password({
  value, onChangeText, isShown, setShow, showHelper=false, title, helperText='',
}) {
  const show = isShown;

  return (
    <FormControl isInvalid={showHelper}>
      <FormControl.Label
        left='2'
        _text={{
          color: 'greyText.400',
          fontSize: 'md',
          fontWeight: '700',
        }}
      >
        {title}
      </FormControl.Label>
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChangeText={onChangeText}
        borderWidth='1'
        borderRadius='full'
        borderColor='greyBorder.400'
        fontSize='sm'
        fontWeight='400'
        h='12'
        color='greyText.400'
        _focus={{
          borderColor: 'greyText.300',
          bgColor: 'white',
          _invalid: {
            borderColor: 'greyText.300',
            bgColor: 'white',
          },
        }}
        _invalid={{
          borderColor: 'greyText.300',
          bgColor: 'white',
        }}
        placeholder='Required'
        InputRightElement={
          <EyeIcon isShown={show} onPress={setShow}/>
        }
      />
      <FormControl.ErrorMessage left='2'>
        {helperText}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

function EyeIcon({ isShown, onPress }) {
  return (
    <IconButton
      variant='unstyled'
      alignItems='center'
      borderRadius='full'
      onPress={onPress}
      icon={
        <Icon
          as={
            <Feather name={isShown ? "eye" : "eye-off"} />
          }
          size={6}
          mr="2"
          color="muted.400"
        />
      }
    />
  );
}

export default function DeleteAccount() {
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordShow, setOldPasswordShow] = useState(false);

  const router = useRouter();

  const { user, logout } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = useCallback(async () => {
    console.log("submit");
    try {
      setIsLoading(true);
      const { error } = await handleLogin(user.email, oldPassword);
      if (error) {
        Alert.alert('', 'Incorrect password.', [
          { text: 'OK', onPress: () => {} },
        ]);
        return;
      } else {
        Alert.alert('',
            'Are you sure you want to delete your account? ' +
            'This action is IRREVERSIBLE.',
            [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Delete My Account',
                onPress: () => {
                  deleteAccount(user.id).then(() => logout());
                },
                style: 'destructive',
              },
            ]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('', error.message ||
       'An error occured. Please check your password and try again.', [
        { text: 'OK', onPress: () => {} },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [oldPassword, user, logout]);
  const submitDisabled = oldPassword.length == 0;

  return (
    <Center w="100%" bgColor='white'>
      <Box safeArea w="100%" maxW='420'>
        <KeyboardAvoidingView behavior='padding'>
          <ScrollView w="100%" h="100%"
            _contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}
          >
            <TitleHeader title='Delete Account'
              onBackPress={() => router.back()}/>
            <VStack flex='1' space={3} mt="40px" px="30px">
              <Password
                value={oldPassword}
                title={"Enter Old Password"}
                onChangeText={setOldPassword}
                isShown={oldPasswordShow}
                setShow={() => setOldPasswordShow(!oldPasswordShow)}
              />
              <BlueButton
                isDisabled={submitDisabled}
                isLoading={isLoading}
                title="Confirm"
                loadingText="Confirm"
                mt='10'
                onPress={handleSubmit}
              />
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </Center>
  );
}
