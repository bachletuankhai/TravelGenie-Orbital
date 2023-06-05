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
  Pressable,
  Icon,
  KeyboardAvoidingView,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

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

function Password({ value, onChangeText, isShown, setShow }) {
  const show = isShown;

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
          <EyeIcon isShown={show} onPress={setShow}/>
        }
      />
    </FormControl>
  );
}

function ConfirmPassword({ value, onChangeText, isShown, setShow }) {
  const show = isShown;

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
        }}
        placeholder='Required'
        InputRightElement={
          <EyeIcon isShown={show} onPress={setShow}/>
        }
      />
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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (mail) => {
    // TODO: check email validity
    setEmail(mail);
  };

  const handlePasswordChange = (pass) => {
    // TODO: check password validity
    setPassword(pass);
  };

  const handleCfPasswordChange = (pass) => {
    // TODO: check password validity
    setConfirmPassword(pass);
  };

  // TODO: add signup handler

  // TODO: add link to login page

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
            <Header title="Sign up"/>

            <VStack space={3} mt="5" px="30px">
              <Email value={email} onChangeText={handleEmailChange} />
              <Password
                value={password}
                onChangeText={handlePasswordChange}
                isShown={showPassword}
                setShow={() => setShowPassword(!showPassword)}
              />
              <ConfirmPassword
                value={confirmPassword}
                onChangeText={handleCfPasswordChange}
                isShown={showPassword}
                setShow={() => setShowPassword(!showPassword)}
              />
              <Button
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
                <Text
                  fontSize='md'
                  fontWeight='700'
                  color='greyText.400'
                  underline
                >
                  Log in
                </Text>
              </HStack>
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </Center>
  );
};
