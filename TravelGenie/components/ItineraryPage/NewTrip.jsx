import {
  Box,
  Center,
  KeyboardAvoidingView,
  ScrollView,
  VStack,
  Text,
  AddIcon,
  Button,
  Modal,
  Pressable,
} from "native-base";
import { Alert, Image, Platform } from "react-native";
import Title from "../TitleHeader";
import InputWithLabel from "../InputWithLabel";
import BlueButton from "../BlueButton";
import { useCallback, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';
import { useAuthContext } from "../../contexts/auth";
import { createItinerary, listItineraries } from "../../lib/itinerary";
import { useRouter } from "expo-router";

function CoverImage({ isPressed, src }) {
  return (
    <Image
      source={{ uri: src }}
      height={160}
      resizeMode="cover"
      style={{
        borderRadius: 10,
        flex: 1,
        backgroundColor: '#000000',
        opacity: isPressed ? 0.2 : 1,
      }}
    />
  );
}

function CoverImageButton({ photoUrl, onPress, ...props }) {
  const noUrl = useCallback(({ isPressed }) => {
    return (
      <Box
        h='160px'
        flex='1'
        borderRadius='10'
        flexShrink={1}
        borderWidth={0}
        bg={ isPressed ? 'primary.700' : 'primary.400'}
        justifyContent='center'
        alignItems='center'
      >
        <VStack space='2' alignItems='center'>
          <AddIcon size='xl' color='white' />
          <Text
            color='white'
            fontSize='lg'
            fontWeight='400'
          >
            Add cover photo
          </Text>
        </VStack>
      </Box>
    );
  }, []);

  const withUrl = useCallback(({ isPressed }) => {
    return (
      <CoverImage isPressed={isPressed} src={photoUrl} />
    );
  }, [photoUrl]);

  return (
    <Pressable onPress={onPress} {...props}>
      {photoUrl ? withUrl : noUrl}
    </Pressable>
  );
}

function DatePicker({ fromDate, toDate, setFromDate, setToDate }) {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('from');
  const [value, setValue] = useState(new Date());

  const toggleDatePicker = useCallback(() => {
    setShow(!show);
  }, [show]);

  const handleDateChange = useCallback((event, selectedDate) => {
    if (event.type == "set") {
      const currentDate = selectedDate;
      setValue(currentDate);
    } else {
      toggleDatePicker();
    }
  }, [
    setValue,
    toggleDatePicker,
  ]);

  const handleDateChangeAndroid = useCallback((event, selectedDate, mode) => {
    if (event.type == "set") {
      const currentDate = selectedDate;
      const saveValue = mode == 'from' ? setFromDate : setToDate;
      saveValue(currentDate);
    } else if (event.type == "dismissed") {
      const currentDate = selectedDate;
      const saveValue = mode == 'from' ? setFromDate : setToDate;
      saveValue(currentDate);
      toggleDatePicker();
    } else {
      toggleDatePicker();
    }
  }, [setFromDate, setToDate, toggleDatePicker]);

  const onDatePress = useCallback((currentMode) => {
    if (mode != currentMode) setMode(currentMode);
    setShow(true); // show the date picker
    if (Platform.OS == 'android') {
      DateTimePickerAndroid.open({
        value: (currentMode == 'from' ? fromDate : toDate) || new Date(),
        onChange: (event, selectedDate) =>
          handleDateChangeAndroid(event, selectedDate, currentMode),
        mode: "date",
        minimumDate: (currentMode == 'from' ? undefined :
          fromDate || new Date()),
      });
    }
  }, [mode, fromDate, toDate, handleDateChangeAndroid]);

  return (
    <>
      {Platform.OS == "ios" && <DatePickModalIOS
        show={show}
        value={value}
        onChange={handleDateChange}
        title={mode == 'from' ? "Choose starting date" :
          "Choose ending date"}
        onClose={() => setShow(false)}
        onSave={mode == 'from' ? setFromDate : setToDate}
      />}
      <VStack w='100%' space='1'>
        <Text
          left='2'
          color='greyText.400'
          fontSize='md'
          fontWeight='700'
        >
          Date
        </Text>
        <Button.Group
          isAttached
          variant='outline'
          h='50px'
          borderRadius='48'
          borderColor='greyBorder.400'
        >
          <Button
            size='md'
            w='50%'
            _text={{
              color: 'greyText.400',
              fontSize: 'sm',
              fontWeight: '400',
            }}
            onPress={() => onDatePress('from')}
          >
            {fromDate?.toLocaleDateString() || "From date"}
          </Button>
          <Button
            size='md'
            w='50%'
            _text={{
              color: 'greyText.400',
              fontSize: 'sm',
              fontWeight: '400',
            }}
            onPress={() => onDatePress('to')}
            isDisabled={fromDate ? false : true}
          >
            {toDate?.toLocaleDateString() || "To date"}
          </Button>
        </Button.Group>
      </VStack>
    </>
  );
}

function DatePickModalIOS({
  show, onClose, title, value, onChange, onSave,
}) {
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
    >
      <Modal.Content>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <DateTimePicker
            value={value || new Date()}
            mode='date'
            onChange={onChange}
            display="spinner"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              Cancel
            </Button>
            <Button onPress={() => {
              onClose();
              onSave(value);
            }}>
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

function toDateString(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) month = '0' + month;
  let day = date.getDate();
  if (day < 10) day = '0' + day;
  return `${year}-${month}-${day}`;
}

const HEADER_HEIGHT = 50;
export default function NewTrip() {
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [photoUrl, setPhotoUrl] = useState(null);
  const [imageData, setImageData] = useState(null);
  const imagePickingAsync = useCallback(async () => {
    const results = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!results.canceled) {
      setImageData(results.assets[0].base64);
      setPhotoUrl(results.assets[0].uri);
    }
  }, []);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const submitDisabled = !fromDate || !toDate || !photoUrl || !name ||
   !destination;
  const { user } = useAuthContext();
  const submit = useCallback(() => {
    setIsLoading(true);
    let imageLink = null;
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
      return imageLink;
    }).then((link) => {
      createItinerary(
          user?.id,
          name,
          toDateString(fromDate),
          toDateString(toDate),
          destination,
          link,
      )
          .then((res) => router.back())
          .catch((err) => {
            console.log("CreateItinerary error " + err.message);
            Alert.alert('Failed to create new trip',
                'An error has occured. Please try again.',
                [{
                  text: 'OK',
                  onPress: () => {},
                }],
            );
          });
    }).then((res) => {
      listItineraries(user?.id)
          .then((res) => {
            console.log(res);
            store.setItem('ItineraryList', res);
          })
          .catch((err) => {
            console.warn(err);
          });
    }).catch((err) => {
      console.log("image loading error: " + err.message);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [user, name, fromDate, toDate, destination, router, imageData]);
  return (
    <Center w='100%' bg='white'>
      <Box w='100%' safeArea>
        <KeyboardAvoidingView behavior="height">
          <Title
            _style={{
              position: "absolute",
              top: 0,
              left: 0,
              bg: 'white',
              zIndex: 10,
            }}
            title="Add trip"
          />
          <ScrollView w='100%' h='100%'
            contentContainerStyle={{
              paddingHorizontal: 30,
              paddingTop: HEADER_HEIGHT + 20,
              paddingBottom: 10,
            }}
            keyboardShouldPersistTaps='handled'
          >
            <VStack space='3' w='100%'>
              <CoverImageButton
                onPress={imagePickingAsync}
                photoUrl={photoUrl}
                mb='5'
                mt='3'
              />
              <InputWithLabel
                value={name}
                onChangeText={setName}
                label="Trip name"
                placeholder="Trip name"
                type='text'
              />
              <InputWithLabel
                value={destination}
                onChangeText={setDestination}
                label="Destination"
                placeholder="Enter city/country"
                type='text'
              />
              <DatePicker
                fromDate={fromDate}
                toDate={toDate}
                setFromDate={setFromDate}
                setToDate={setToDate}
              />
              <BlueButton
                isLoading={isLoading}
                loadingText={'Create New Trip'}
                mt='35px'
                title='Create New Trip'
                isDisabled={submitDisabled}
                onPress={submit}
              />
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </Center>
  );
}
