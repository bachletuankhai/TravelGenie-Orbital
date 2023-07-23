import {
  Box,
  Center,
  KeyboardAvoidingView,
  ScrollView,
  VStack,
  Text,
  AddIcon,
  Button,
  Pressable,
  IconButton,
  HStack,
  Icon,
  Modal,
  FlatList,
  Radio,
  Select,
} from "native-base";
import { Alert, Platform, View } from "react-native";
import Title from "../TitleHeader";
import InputWithLabel from "../InputWithLabel";
import BlueButton from "../BlueButton";
import { useCallback, useState, useMemo } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useStore } from "../../contexts/homeStore";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { createPlanItem, getItinerary } from "../../lib/itinerary";

function TimePicker({
  startTime, endTime, setStartTime, setEndTime, isInvalid=false,
}) {
  const handleTimeChange = useCallback((event, time, mode) => {
    if (event.type == "set") {
      const currentTime = time;
      const saveValue = mode == 'start' ? setStartTime : setEndTime;
      saveValue(currentTime);
    }
  }, [setStartTime, setEndTime]);
  const onTimePress = useCallback((mode) => {
    if (Platform.OS == 'android') {
      DateTimePickerAndroid.open({
        value: (mode == 'start' ? startTime : endTime) || new Date(),
        onChange: (event, time) => {
          handleTimeChange(event, time, mode);
        },
        mode: "time",
        display: "spinner",
      });
    }
  }, [startTime, endTime, handleTimeChange]);
  return (
    <VStack w='100%' space='1'>
      <Text
        left='2'
        color='greyText.400'
        fontSize='md'
        fontWeight='700'
      >
        Time
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
          onPress={() => onTimePress('start')}
        >
          {startTime?.toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit', hour12: false,
          }) || "Start time"}
        </Button>
        <Button
          size='md'
          w='50%'
          _text={{
            color: 'greyText.400',
            fontSize: 'sm',
            fontWeight: '400',
          }}
          onPress={() => onTimePress('end')}
          isDisabled={startTime ? false : true}
        >
          {endTime?.toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit', hour12: false,
          }) || "End time"}
        </Button>
      </Button.Group>
      {isInvalid && <Text
        fontWeight='500'
        color='error.500'
        fontSize='xs'
        left='2'
      >
        End time must be later than start time.
      </Text>}
    </VStack>
  );
}

function DatePicker({ value, setValue, startDate, endDate }) {
  const handleDateChangeAndroid = useCallback((event, selectedDate) => {
    if (event.type == "set") {
      const currentDate = selectedDate;
      const saveValue = setValue;
      saveValue(currentDate);
    }
  }, [setValue]);

  const onPress = useCallback(() => {
    if (Platform.OS == 'android') {
      DateTimePickerAndroid.open({
        value: value || new Date(),
        onChange: (event, selectedDate) =>
          handleDateChangeAndroid(event, selectedDate),
        mode: "date",
        minimumDate: new Date(startDate),
        maximumDate: new Date(endDate),
      });
    }
  }, [value, startDate, endDate, handleDateChangeAndroid]);

  return (
    <VStack w='100%' space='1'>
      <Text
        left='2'
        color='greyText.400'
        fontSize='md'
        fontWeight='700'
      >
        Date
      </Text>
      <Button
        variant='outline'
        h='50px'
        borderRadius='48'
        borderColor='greyBorder.400'
        w='100%'
        size='md'
        _text={{
          color: 'greyText.400',
          fontSize: 'sm',
          fontWeight: '400',
        }}
        onPress={onPress}
      >
        {value?.toLocaleDateString('en-GB', {
          day: '2-digit', month: '2-digit', year: 'numeric',
        }) || "Select Date"}
      </Button>
    </VStack>
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

function PlaceCard({ item, onChangePress, ...props }) {
  return (
    <Box
      w='100%'
      h='132px'
      borderRadius={16}
      bg='white'
      px='15px'
      pr='30px'
      py='5px'
      shadow={7}
    >
      <HStack space='2' flex='1'>
        <Box
          width='90px'
          bg='gray.200'
          my='1'
        >
        </Box>
        <VStack space={1} mt='1.5'
          flex='1'
        >
          <View style={{
            width: '100%',
          }}>
            <Text
              width='100%'
              color='#593131'
              fontSize='md'
              fontWeight={400}
            >
              {item.address_line1}
            </Text>
          </View>
          <View style={{
            width: '100%',
          }}>
            <Text isTruncated
              width='100%'
              color='#747688'
              fontSize='xs'
            >
              {item.address_line2}
            </Text>
          </View>
          <HStack space={1}
            position='absolute'
            bottom='3'
            left='0'
            alignItems='center'
          >
            <Ionicons name="md-location-sharp" size={14} color="#A5A7B5" />
            <Text
              fontSize='xs'
              color='#A5A7B5'
            >
              {item.city || item.country}
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <IconButton
        onPress={onChangePress}
        position='absolute'
        bottom='2'
        borderRadius='full'
        _pressed={{
          bg: 'gray.200',
        }}
        right='0.5'
        icon={<Ionicons name="refresh" size={22} color="black" />}
        size='sm'
      />
    </Box>
  );
}

function AddButton({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => {
        return (
          <Box
            w='100%'
            h='132px'
            borderRadius={16}
            justifyContent='center'
            alignItems='center'
            bg={ isPressed ? 'primary.700' : 'primary.400'}
          >
            <VStack space={2} alignItems='center'>
              <AddIcon size='xl' color='white' />
              <Text
                color='white'
                fontSize='lg'
                fontWeight='400'
              >
                Add destination
              </Text>
            </VStack>
          </Box>
        );
      }}
    </Pressable>
  );
}

function itineraryToString(value) {
  if (!value) {
    return undefined;
  }
  const startDate = new Date(value.start_date).toLocaleDateString();
  const endDate = new Date(value.end_date).toLocaleDateString();

  return `${value.name} (${value.location}, ${startDate} - ${endDate})`;
}
function ChoosePlan({ value, setValue, data }) {
  return (
    <VStack w='100%' space='1'>
      <Text
        left='2'
        color='greyText.400'
        fontSize='md'
        fontWeight='700'
      >
        Itinerary
      </Text>
      <Select
        color='greyText.400'
        fontSize='sm'
        fontWeight='400'
        h='50px'
        borderRadius='48'
        borderColor='greyBorder.400'
        w='100%'
        placeholder="Select Itinerary"
        selectedValue={value}
        onValueChange={setValue}
      >
        {data.map((item) => {
          return (
            <Select.Item
              key={item.id}
              label={itineraryToString(item)}
              value={item.id}
            />
          );
        })}
      </Select>
    </VStack>
  );
}

const HEADER_HEIGHT = 50;
export default function NewPlanItem() {
  const store = useStore();
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const currentSelectedPlace = store.getItem('NewPlanPlace');

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [currentDateSelection, setCurrentDateSelection] = useState(null);

  const [planId, setPlanId] = useState(1);

  const [itineraryList, setItineraryList] = useState([]);
  const planDetail = useMemo(
      () => itineraryList.filter((item) => item.id == planId)[0],
      [itineraryList, planId],
  );

  useFocusEffect(
      useCallback(() => {
        const itemId = store.getItem('CurrentItineraryId');
        setPlanId(itemId);
        const list = store.getItem('ItineraryList');
        setItineraryList(list);
        const currentDateSelection = store.getItem('CurrentDateSelection');
        setCurrentDateSelection(new Date(currentDateSelection));
      }, [store]),
  );

  const startDate = planDetail?.start_date;
  const endDate = planDetail?.end_date;

  const defaultDate = "1-1-2020";

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitPress = useCallback(() => {
    // console.log("id: " + planId);
    // console.log("name: " + name);
    // console.log("subtitle: " + subtitle);
    // console.log("date: " + toDateString(currentDateSelection));
    // console.log("startTime: " + startTime.toLocaleTimeString([], {
    //   'hour': '2-digit', 'minute': '2-digit', 'hour12': false,
    // }));
    // console.log("endTime: " + endTime.toLocaleTimeString([], {
    //   'hour': '2-digit', 'minute': '2-digit', 'hour12': false,
    // }));
    // console.log("placeId: " + currentSelectedPlace.place_id);
    setIsLoading(true);
    createPlanItem(
        planId,
        name,
        subtitle,
        toDateString(currentDateSelection),
        startTime.toLocaleTimeString([], {
          'hour': '2-digit', 'minute': '2-digit', 'hour12': false,
        }),
        endTime.toLocaleTimeString([], {
          'hour': '2-digit', 'minute': '2-digit', 'hour12': false,
        }),
        currentSelectedPlace.place_id,
    ).then((res) => {
      if (res.data?.error) {
        throw new Error(error.message || error);
      } else {
        getItinerary(planId)
            .then((res) => res.data)
            .then((res) => {
              console.log(res.results.details);
              console.log(res.results.items);
              // save to global store
              store.setItem(`Itinerary-${planId}-Items`, res.results.items);
              router.back();
            })
            .catch((err) => {
              console.warn(err);
              throw err;
            });
      }
    }).catch((err) => {
      console.warn(err);
      Alert.alert(
          'Failed to add new destination',
          "An error has occured.",
          [{
            onPress: () => {},
            text: 'OK',
          }],
      );
    }).finally(() => {
      setIsLoading(false);
    });
  }, [
    router,
    store,
    planId,
    name,
    subtitle,
    currentDateSelection,
    startTime,
    endTime,
    currentSelectedPlace,
  ]);

  const isValidTime = startTime == null || endTime == null ||
    startTime.getTime() < endTime.getTime();

  const setSelectItineraryValue = useCallback((value) => {
    setPlanId(value);
    if (value != planId) {
      setCurrentDateSelection(null);
    }
  }, [planId, setPlanId, setCurrentDateSelection]);


  const submitDisabled = !isValidTime || !planId || !name || !subtitle ||
   !currentDateSelection || !startTime || !endTime || !currentSelectedPlace;

  const onAddDestinationPress = useCallback(() => {
    // TODO: save the current form
    router.push("/map/search");
  }, [router]);

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
            title="Add Destination"
          />
          <ScrollView w='100%' h='100%'
            contentContainerStyle={{
              paddingHorizontal: 30,
              paddingTop: HEADER_HEIGHT + 20,
              paddingBottom: 10,
            }}
          >
            <VStack space='3' w='100%'>
              {currentSelectedPlace ?
                <PlaceCard item={currentSelectedPlace}
                  onChangePress={onAddDestinationPress} /> :
                <AddButton onPress={onAddDestinationPress} />}
              <InputWithLabel
                value={name}
                onChangeText={setName}
                label="Name"
                placeholder="Trip name"
                type='text'
              />
              <InputWithLabel
                value={subtitle}
                onChangeText={setSubtitle}
                label="Description"
                placeholder="purpose, activity, etc."
                type='text'
              />
              <ChoosePlan
                value={planId}
                setValue={setSelectItineraryValue}
                data={itineraryList}
              />
              <DatePicker
                value={currentDateSelection}
                setValue={setCurrentDateSelection}
                startDate={startDate || defaultDate}
                endDate={endDate || defaultDate}
              />
              <TimePicker
                isInvalid={!isValidTime}
                startTime={startTime}
                endTime={endTime}
                setEndTime={setEndTime}
                setStartTime={setStartTime}
              />
              <BlueButton
                isLoading={isLoading}
                loadingText="Done"
                onPress={onSubmitPress}
                isDisabled={submitDisabled}
                mt='35px'
                title='Done'
              />
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </Center>
  );
}
