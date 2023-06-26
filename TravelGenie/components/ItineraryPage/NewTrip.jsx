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
import { Image, Platform } from "react-native";
import Title from "../TitleHeader";
import InputWithLabel from "../InputWithLabel";
import BlueButton from "../BlueButton";
import { useCallback, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';

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
  }, [props]);

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
          >
            <VStack space='3' w='100%'>
              <CoverImageButton
                onPress={imagePickingAsync}
                photoUrl={photoUrl}
                mb='5'
                mt='3'
              />
              <InputWithLabel
                label="Trip name"
                placeholder="Trip name"
                type='text'
              />
              <InputWithLabel
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
                mt='35px'
                title='Create New Trip'
              />
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </Center>
  );
}
