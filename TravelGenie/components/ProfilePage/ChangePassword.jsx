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
  checkPassword,
} from '../../contexts/auth';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BlueButton from '../BlueButton';

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

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordShow, setOldPasswordShow] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [showNewPasswordHelper, setShowNewPasswordHelper] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [cfPassword, setCfPassword] = useState('');
  const [cfPasswordShow, setCfPasswordShow] = useState(false);
  const [showCfPasswordHelper, setShowCfPasswordHelper] = useState(false);
  const [isValidCfPassword, setIsValidCfPassword] = useState(false);

  const handleNewPasswordChange = useCallback((pass) => {
    setNewPassword(pass);
    const isValid = checkPassword(pass);
    setIsValidPassword(isValid);
    setShowNewPasswordHelper(!isValid); // if not valid, show helper text
    const isCfValid = pass == cfPassword;
    setIsValidCfPassword(isCfValid);
    setShowCfPasswordHelper(!isCfValid);
  }, [cfPassword]);

  const handleCfPasswordChange = useCallback((pass) => {
    setCfPassword(pass);
    const isValid = pass == newPassword;
    setIsValidCfPassword(isValid);
    setShowCfPasswordHelper(!isValid);
  }, [newPassword]);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = useCallback(() => {
    console.log("submit");
    // TODO: setup api call to update password
  }, []);
  const submitDisabled = !isValidCfPassword || !isValidPassword;

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
            <TitleHeader title='Change Password'
              onBackPress={() => router.back()}/>
            <VStack flex='1' space={3} mt="40px" px="30px">
              <Password
                value={oldPassword}
                title={"Enter Old Password"}
                onChangeText={setOldPassword}
                isShown={oldPasswordShow}
                setShow={() => setOldPasswordShow(!oldPasswordShow)}
              />
              <Password
                value={newPassword}
                title={"Enter New Password"}
                onChangeText={handleNewPasswordChange}
                isShown={newPasswordShow}
                setShow={() => setNewPasswordShow(!newPasswordShow)}
                showHelper={showNewPasswordHelper}
                helperText='Password must have minimum length of 8.'
              />
              <Password
                value={cfPassword}
                title={"Confirm New Password"}
                onChangeText={handleCfPasswordChange}
                isShown={cfPasswordShow}
                setShow={() => setCfPasswordShow(!cfPasswordShow)}
                showHelper={showCfPasswordHelper}
                helperText='Passwords do not match.'
              />
              <BlueButton
                isDisabled={submitDisabled}
                isLoading={isLoading}
                title="Update"
                loadingText="Update"
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
