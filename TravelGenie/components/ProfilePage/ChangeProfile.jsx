import { useState, useCallback } from 'react';
import {
  Center,
  Box,
  KeyboardAvoidingView,
  ScrollView,
  VStack,
  Text,
  IconButton,
  ArrowBackIcon,
  Image,
} from 'native-base';
import InputWithLabel from '../InputWithLabel';
import { useAuthContext } from '../../contexts/auth';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { CameraIcon, RevertIcon } from '../../assets/icons/profilepage';
import { Feather, Ionicons } from '@expo/vector-icons';
import { DefaultProfile } from '../../assets/images/profile';
import * as ImagePicker from 'expo-image-picker';
import BlueButton from '../BlueButton';

function EditButton({ mode, ...props }) {
  if (mode == "edit") {
    return (
      <IconButton
        size='md'
        icon={<Feather name='edit-2' size={22} color="#593131" />}
        {...props}
      />
    );
  } else if (mode == "revert") {
    return (
      <IconButton
        size='md'
        icon={<RevertIcon size='lg' />}
        {...props}
      />
    );
  } else {
    return null;
  }
}

function Title({ onBackPress, onEditPress, onRevertPress }) {
  const [buttonMode, setButtonMode] = useState("edit");

  const handlePress = useCallback(
      () => {
        if (buttonMode == "edit") {
          setButtonMode("revert");
          onEditPress();
        } else if (buttonMode == "revert") {
          setButtonMode("edit");
          onRevertPress();
        }
      },
      [buttonMode, onEditPress, onRevertPress],
  );


  return (
    <Box
      w='100%' h='50px'
      justifyContent='center'
      alignItems='center'
      position='absolute'
      top='0'
      zIndex={100}
      bg='white'
    >
      <EditButton
        onPress={handlePress}
        mode={buttonMode}
        position='absolute'
        right='4'
        top='1'
        variant="ghost"
        borderRadius='full'
        _pressed={{
          bg: 'coolGray.200',
        }}
      />
      <IconButton
        size='md'
        position='absolute'
        left='4'
        top='1'
        variant="ghost"
        borderRadius='full'
        _pressed={{
          bg: 'coolGray.200',
        }}
        icon={<ArrowBackIcon color='#593131' />}
        onPress={onBackPress}
      />
      <View pointerEvents='none'>
        <Text
          color='black'
          fontWeight='700'
          fontSize='xl'
          w='100%'
          textAlign='center'
        >
          Personal Information
        </Text>
      </View>
    </Box>
  );
}

const HEADER_HEIGHT = 70;

function CameraButton({ style, onPress }) {
  return (
    <Box
      borderRadius='full'
      w='34px'
      h='34px'
      padding='2px'
      bg='white'
      {...style}
    >
      <IconButton
        onPress={onPress}
        variant='outline'
        size='sm'
        borderColor="#242760"
        borderRadius="full"
        w='30px'
        h='30px'
        icon={<CameraIcon size='md' color='#242760' />}
        _pressed={{
          bg: 'coolGray.300',
        }}
      />
    </Box>
  );
}

function Avatar({ src, onCameraPress }) {
  return (
    <Box
      h="175px"
      w="175px"
      borderRadius='full'
      borderWidth={1}
      borderColor='#242760'
      justifyContent='center'
      alignItems='center'
      padding='2px'
    >
      <Image
        source={src ? { uri: src } : DefaultProfile}
        alt='Profile Picture'
        h='171px'
        w='171px'
        borderRadius='full'
        resizeMode='stretch'
      />
      <CameraButton
        onPress={onCameraPress}
        style={{
          position: 'absolute',
          bottom: 2,
          right: 2,
          zIndex: 10,
        }}
      />
    </Box>
  );
}

const ChangeProfilePage = () => {
  // handle form content
  const { user } = useAuthContext();
  const orginalName = user.name || '';
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(orginalName);

  const router = useRouter();

  const handleEmailChange = useCallback((mail) => {
    setEmail(mail);
  }, []);

  const handleNameChange = useCallback((text) => {
    setName(text);
  }, []);

  // handle title button press
  const [editable, setEditable] = useState(false);

  const handleRevertPress = useCallback(() => {
    // Reset all changes
    setEmail(user.email);
    setName(user.name || '');

    // Change all fields to read only
    setEditable(false);
    setImageUrl(null);
  }, [user]);

  const handleEditPress = useCallback(() => {
    setEditable(true);
  }, []);

  // image picker
  const [imageUrl, setImageUrl] = useState(null);
  const [imageData, setImageData] = useState(null);
  const imagePickingAsync = useCallback(async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
      base64: true,
    });

    if (!results.canceled) {
      setImageData(results.assets[0].base64);
      setImageUrl(results.assets[0].uri);
    }
  }, []);

  // submit update
  const isChanged = email != user.email ||
    (name != orginalName) ||
    (imageUrl != user.avatar);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = useCallback(async () => {
    console.log('submit');
    // submit avatar
    // to imgur
    let imageLink = null;
    if (imageData != null) {
      const data = new FormData();
      data.append('image', imageData);
      data.append('name', "user-avatar-" + user.id);
      fetch(process.env.IMAGE_UPLOAD_URL, {
        method: 'post',
        headers: {
          Authorization: "Client-ID " + process.env.IMGUR_CLIENT_ID,
        },
        body: data,
      }).then((res) => res.json()).then((res) => {
        imageLink = res.data.link;
        console.log(imageLink);
      });
    }
    // TODO: to user database
  }, [imageData, user.id]);


  return (
    <Center w="100%" bgColor='white'>
      <Box safeArea w="100%" maxW='420'>
        <KeyboardAvoidingView behavior='padding'>
          <Title
            onBackPress={() => router.back()}
            onEditPress={handleEditPress}
            onRevertPress={handleRevertPress}
          />
          <ScrollView w="100%" h="100%"
            _contentContainerStyle={{
              flexGrow: 1,
              paddingTop: HEADER_HEIGHT,
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}
          >
            <VStack px='30px' space='3.5' alignItems='center'>
              <Avatar src={imageUrl} onCameraPress={imagePickingAsync} />
              <InputWithLabel
                isReadOnly={!editable}
                label="Name"
                onChangeText={handleNameChange}
                value={name}
                placeholder="Name"
                type='text'
                _disabled={{
                  onChangeText: null,
                }}
              />
              <InputWithLabel
                isReadOnly={!editable}
                label="Email"
                onChangeText={handleEmailChange}
                value={email}
                placeholder="Email"
                type='text'
              />
              <BlueButton
                isDisabled={!isChanged}
                isLoading={isLoading}
                onPress={handleSubmit}
                title='Update'
                loadingText='Update'
                w='100%'
                mt='12'
              />
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </Center>
  );
};

export default ChangeProfilePage;
