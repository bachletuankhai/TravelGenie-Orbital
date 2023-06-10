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
import { AuthContext } from '../../contexts/auth';
import { useRouter } from 'expo-router';

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
      <Text
        underline
        color='greyText.400'
        fontSize='md'
        fontWeight='700'
        alignSelf='flex-end'
        mt='2'
        mr='2'
      >
        Forget Password?
      </Text>
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
  const router = useRouter();


  const handleEmailChange = (mail) => {
    // TODO: check email validity
    setEmail(mail);
  };

  const handlePasswordChange = (pass) => {
    // TODO: check password validity
    setPassword(pass);
  };

  const toSignup = () => {
    router.push("/register");
  };

  const handleLogin = () => {
    // TODO: add login handler
    setIsLoading(true);
    const { data, error } = login(email, password);
    setIsLoading(false);
  };

  // TODO: add link to forget password page

  return (
    <Center w="100%">
      <Box safeArea w="100%" maxW='420'>
        <KeyboardAvoidingView behavior='padding'>
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
                isLoading={isLoading}
                isLoadingText='Logging in'
                onPress={handleLogin}
                variant='solid'
                mt="12"
                size='lg'
                h='63'
                borderRadius='2xl'
                bgColor='primary.400'
                _text={{
                  color: 'white',
                  fontSize: 'sm',
                  fontWeight: '400',
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
