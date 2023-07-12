import {
  Center,
  Heading,
  VStack,
  HStack,
  FormControl,
  Input,
  Button,
  Text,
  Box,
  ScrollView,
  Icon,
  KeyboardAvoidingView,
  IconButton,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { Link } from 'expo-router';
import {
  AuthContext,
  checkEmail,
  checkPassword,
  loginAlert,
} from '../../contexts/auth';

function Header({ title }) {
  return (
    <Box alignItems='center' mt='2'>
      <Heading fontSize="md" fontWeight="700" color="greyText.400" _dark={{
        color: "warmGray.50",
      }}>
        {title}
      </Heading>
    </Box>
  );
}

function Email({ value, onChangeText, showHelper }) {
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
        Email
      </FormControl.Label>
      <Input
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
        placeholder='user@example.com'
      />
      <FormControl.ErrorMessage left='2'>
        Invalid email address.
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

function Password({ value, onChangeText, isShown, setShow, showHelper }) {
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
        Password
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
        Password must have minimum length of 8.
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

function ConfirmPassword({ value, onChangeText,
  isShown, setShow, showHelper }) {
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
        Confirm Password
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
        The passwords you entered do not match.
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

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showHelperEmail, setShowHelperEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [showHelperPassword, setShowHelperPassword] = useState(false);
  const [isValidCfPassword, setIsValidCfPassword] = useState(false);
  const [showHelperCfPassword, setShowHelperCfPassword] = useState(false);
  const submitDisabled = !isValidEmail ||
    !isValidPassword || !isValidCfPassword;

  const { register } = useContext(AuthContext);


  const handleEmailChange = (mail) => {
    const isValid = checkEmail(mail);
    setIsValidEmail(isValid);
    setShowHelperEmail(!isValid); // if email is not valid, show helper
    setEmail(mail);
  };

  const handlePasswordChange = (pass) => {
    const isValid = checkPassword(pass);
    setIsValidPassword(isValid);
    setShowHelperPassword(!isValid); // if password not valid, show helper
    const isValidCf = pass === confirmPassword;
    setIsValidCfPassword(isValidCf);
    setShowHelperCfPassword(!isValidCf);
    setPassword(pass);
  };

  const handleCfPasswordChange = (pass) => {
    const isValid = pass === password;
    setIsValidCfPassword(isValid);
    setShowHelperCfPassword(!isValid); // if cf password not valid, show helper
    setConfirmPassword(pass);
  };

  const signUpHandler = async () => {
    try {
      setIsLoading(true);
      if (!checkEmail(email) || !checkPassword(password)) {
        setIsLoading(false);
        loginAlert("Invalid email and/or password.");
      } else {
        const { error } = await register(email, password);
        setIsLoading(false);
        if (error) {
          loginAlert(error);
        }
      }
    } catch (error) {
      console.log(error);
      loginAlert("An error occured. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center w="100%" bgColor='white'>
      <Box safeArea w="100%" maxW='420'>
        <KeyboardAvoidingView behavior='height'>
          <ScrollView w="100%" h="100%"
            _contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}
          >
            <Header title="Sign up"/>

            <VStack space={3} mt="5" px="30px">
              <Email
                value={email}
                onChangeText={handleEmailChange}
                showHelper={showHelperEmail}
              />
              <Password
                value={password}
                onChangeText={handlePasswordChange}
                isShown={showPassword}
                setShow={() => setShowPassword(!showPassword)}
                showHelper={showHelperPassword}
              />
              <ConfirmPassword
                value={confirmPassword}
                onChangeText={handleCfPasswordChange}
                isShown={showPassword}
                setShow={() => setShowPassword(!showPassword)}
                showHelper={showHelperCfPassword}
              />
              <Button
                isLoading={isLoading}
                isDisabled={submitDisabled}
                isLoadingText='Sign up'
                onPress={signUpHandler}
                variant='solid'
                mt="100px"
                size='lg'
                h='63'
                borderRadius='2xl'
                bgColor='primary.400'
                _text={{
                  color: 'white',
                  fontSize: 'sm',
                  fontWeight: '400',
                }}
                _pressed={{
                  bgColor: 'primary.600',
                }}
              >
                Sign up
              </Button>
            </VStack>

            <VStack
              space={2}
              flex='1'
              justifyContent='flex-end'
              mt='200px'
              mb='8'
              px='30px'
            >
              <HStack alignSelf='center'>
                <Text
                  fontSize='md'
                  fontWeight='400'
                  color='greyText.400'
                >
                  Already have an account?{" "}
                </Text>
                <Link href={"/login"}>
                  <Text
                    fontSize='md'
                    fontWeight='700'
                    color='greyText.400'
                    underline
                  >
                    Log in
                  </Text>
                </Link>
              </HStack>
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </Center>
  );
};
