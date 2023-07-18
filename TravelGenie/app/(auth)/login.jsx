import {
  Center,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Text,
  Box,
  ScrollView,
  Pressable,
  Icon,
  KeyboardAvoidingView,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import {
  AuthContext,
  checkEmail,
  loginAlert,
} from '../../contexts/auth';
import { Link, useRouter } from 'expo-router';

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

function Email({ value, onChangeText }) {
  return (
    <FormControl>
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
        }}
        placeholder='user@example.com'
      />
    </FormControl>
  );
}

function Password({ value, onChangeText }) {
  const [show, setShow] = useState(false);

  return (
    <FormControl>
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
        }}
        placeholder='Required'
        InputRightElement={
          <EyeIcon isShown={show} onPress={() => setShow(!show)}/>
        }
      />
      <Box mt='1' w='100%' alignItems='flex-end'
        _pressed={{
          bg: 'grey.200',
        }}
      >
        <Link href={'/forgetpassword'}>
          <Text
            underline
            color='greyText.400'
            fontSize='md'
            fontWeight='700'
            mt='2'
            mr='2'
          >
            Forget Password?
          </Text>
        </Link>
      </Box>
    </FormControl>
  );
}

function EyeIcon({ isShown, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Icon
        as={
          <Feather name={isShown ? "eye" : "eye-off"} />
        }
        size={6}
        mr="3"
        color="muted.400"
      />
    </Pressable>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const isDisabled = !isValidEmail || !isValidPassword;

  const router = useRouter();

  const handleEmailChange = (mail) => {
    setIsValidEmail(checkEmail(mail));
    setEmail(mail);
  };

  const handlePasswordChange = (pass) => {
    setIsValidPassword(pass.length > 0);
    setPassword(pass);
  };

  const toSignup = () => {
    router.push("/register");
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      if (!checkEmail(email)) {
        loginAlert("Incorrect email and/or password.");
      } else {
        const { error } = await login(email, password);
        if (error) {
          loginAlert("Incorrect email and/or password.");
        }
      }
    } catch (error) {
      console.log(error);
      loginAlert("Incorrect email and/or password.");
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: add link to forget password page

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
            <Header title="Sign in"/>

            <VStack space={3} mt="5" px="30px">
              <Email value={email} onChangeText={handleEmailChange} />
              <Password value={password} onChangeText={handlePasswordChange} />
              <Button
                isDisabled={isDisabled}
                isLoading={isLoading}
                isLoadingText='Logging in'
                onPress={handleLogin}
                variant='solid'
                mt="12"
                size='lg'
                h='63'
                borderRadius='2xl'
                bg='primary.400'
                _text={{
                  color: 'white',
                  fontSize: 'sm',
                  fontWeight: '400',
                }}
                _pressed={{
                  bgColor: 'primary.600',
                }}
              >
                Log in
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
              <Text
                fontSize='md'
                fontWeight='400'
                color='greyText.400'
                alignSelf='center'
              >
                Don&apos;t have an account?
              </Text>
              <Button
                onPress={toSignup}
                variant='outline'
                size='lg'
                h='63'
                borderRadius='2xl'
                _text={{
                  color: 'primary.400',
                  fontSize: 'sm',
                  fontWeight: '700',
                }}
              >
                Sign up
              </Button>
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </Center>
  );
};
