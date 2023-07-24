import {
  Box,
  Center,
  FlatList,
  HStack,
  Pressable,
  Text,
  VStack,
  ArrowBackIcon,
  IconButton,
  Button,
  AddIcon,
  Menu,
  Icon,
} from "native-base";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Alert,
  Platform,
  RefreshControl,
  View, useWindowDimensions,
} from 'react-native';
import { useFocusEffect, useRouter } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { LocationIcon } from "../../assets/icons/itinerary";
import {
  deleteItinerary, deletePlanItem, getItinerary, listItineraries,
} from "../../lib/itinerary";
import { useStore } from "../../contexts/homeStore";
import { Feather } from '@expo/vector-icons';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useAuthContext } from "../../contexts/auth";
import axios from "axios";

function toDateString(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) month = `0${month}`;
  let day = date.getDate();
  if (day < 10) day = `0${day}`;
  return `${year}-${month}-${day}`;
}

function CalendarItemCard({
  isSelected=false, isOutOfRange, dayOfWeek, date, onPress,
}) {
  const render = useCallback(({ isHovered, isFocused, isPressed }) => {
    return (
      <Box
        justifyContent='center'
        alignItems='center'
        borderRadius={10}
        background={isPressed ?
          isSelected ? 'primary.700' : 'gray.200' :
          isSelected ? 'primary.400' : 'transparent' }
        px='0'
      >
        <VStack space={1} alignItems='center' justifyContent='center' py='1'>
          <Text
            color={isSelected ? 'white' : '#BCC1CD'}
            fontWeight='400'
            fontSize='xs'
          >
            {dayOfWeek}
          </Text>
          <Text
            color={isSelected ? 'white' : isOutOfRange ? '#ACAFC5' : 'black'}
            fontWeight='700'
            fontSize='md'
          >
            {date}
          </Text>
        </VStack>
      </Box>
    );
  }, [isSelected, isOutOfRange, date, dayOfWeek]);
  return (
    <Pressable onPress={onPress} flex='1' mx='2' isDisabled={isOutOfRange}>
      {render}
    </Pressable>
  );
}

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// date is passed as string
function WeekCalendar({
  data, onDatePress, width,
}) {
  return (
    <Box w={width} alignItems='center'>
      <HStack w='100%' justifyContent='space-around' px='15px'>
        {data.map((dayData) => {
          return <CalendarItemCard
            key={dayData.key}
            dayOfWeek={dayData.dayOfWeek}
            date={dayData.date}
            isSelected={dayData.isSelected}
            isOutOfRange={dayData.isOutOfRange}
            onPress={() => onDatePress(dayData.dateString)}
          />;
        })}
      </HStack>
    </Box>
  );
}

const menuItems = [
  {
    id: 0,
    title: "Select date",
    icon: <Feather name="calendar" />,
    color: "black",
  },
  {
    id: 1,
    title: "Edit",
    icon: <Feather name="edit" />,
    color: "black",
  },
  {
    id: 2,
    title: "Delete",
    icon: <Feather name="trash-2" />,
    color: "red.500",
  },
];

function Title({
  title, onBackPress, _title, _style, showBackButton=true,
  onSelectDatePress, onEditPress, onDeletePress,
}) {
  const router = useRouter();

  const defaultBack = useCallback(() => {
    router.back();
  }, [router]);

  const pressHandlers = useMemo(() => {
    return [
      onSelectDatePress,
      onEditPress,
      onDeletePress,
    ];
  }, [onSelectDatePress, onEditPress, onDeletePress]);

  const MenuTrigger = useCallback((triggerProps) => {
    return (
      <IconButton
        icon={<Entypo name="dots-three-vertical" size={22} color='black' />}
        size='md'
        borderRadius='full'
        _pressed={{
          bg: 'gray.200',
        }}
        {...triggerProps}
      />
    );
  }, []);
  return (
    <HStack
      w='100%' h='50px'
      justifyContent='center'
      alignItems='center'
      {..._style}
    >
      {showBackButton && <IconButton
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
        onPress={onBackPress || defaultBack}
      />}
      <Box
        position='absolute'
        borderRadius='full'
        right='4'
        top='0.5'
      >
        <Menu
          placement="bottom left"
          trigger={MenuTrigger}
        >
          {menuItems.map((item) => {
            return (
              <Menu.Item
                key={item.id}
                alignItems='flex-start'
                justifyContent='flex-start'
                py='0.5'
                px='0'
                onPress={pressHandlers[item.id]}
              >
                <HStack space={2}
                  alignContent='center' alignItems='center' h='100%'
                  my='2'
                >
                  <Icon as={item.icon} size='sm' color={item.color} />
                  <Text
                    fontSize='md'
                    fontWeight='400'
                    color={item.color}
                  >
                    {item.title}
                  </Text>
                </HStack>
              </Menu.Item>
            );
          })}
        </Menu>
      </Box>
      <View pointerEvents='none'>
        <Text
          color='black'
          fontWeight='700'
          fontSize='2xl'
          w='100%'
          textAlign='center'
          {..._title}
        >
          {title}
        </Text>
      </View>
    </HStack>
  );
}

// calculate first day of week
function getFirstDayOfWeek(currentDate) {
  const currentDayOfWeek = currentDate.getDay();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const firstDayOfWeek = new Date(year, month, day);
  firstDayOfWeek.setDate(day - currentDayOfWeek);
  return firstDayOfWeek;
}

const HEADER_HEIGHT = 260;
function Header({
  currentDateSelection, startDate, endDate, onDatePress, title,
  onSelectDatePress, onEditPress, onDeletePress,
}) {
  // generate week range consisting start date and end date
  console.log(`current date: ${currentDateSelection}`);

  const weeks = useMemo(() => {
    const weeks = [];
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
    const startFirstDayOfWeek = getFirstDayOfWeek(new Date(startDate));
    let id = 0;
    while (startFirstDayOfWeek.getTime() <= endTime) {
      const firstDayOfWeekStr = toDateString(startFirstDayOfWeek);
      const day = startFirstDayOfWeek.getDate();
      weeks.push({
        id,
        firstDayOfWeek: firstDayOfWeekStr,
      });
      startFirstDayOfWeek.setDate(day + 7);
      id += 1;
    }
    console.log(weeks);
    const week = [0, 1, 2, 3, 4, 5, 6];
    const allDays = weeks.map((w) => week.map((date, index) => {
      const firstDay = new Date(w.firstDayOfWeek);
      firstDay.setDate(firstDay.getDate() + date);

      const time = firstDay.getTime();
      return {
        key: index,
        dayOfWeek: weekdays[index],
        date: firstDay.getDate(),
        isOutOfRange: time < startTime || time > endTime,
        dateString: toDateString(firstDay),
      };
    }));
    return allDays;
  }, [startDate, endDate]);

  const weeksWithSelection = useMemo(() => {
    return weeks.map((week) => week.map((dayData) => {
      return {
        ...dayData,
        isSelected: currentDateSelection == dayData.dateString,
      };
    }));
  }, [weeks, currentDateSelection]);

  const { width } = useWindowDimensions();


  // console.log(currentDateSelection);

  const weekCalendarRender = useCallback(({ item }) => {
    return (
      <WeekCalendar
        data={item}
        onDatePress={onDatePress}
        width={width}
      />
    );
  }, [onDatePress, width]);

  const calendarFlatListRef = useRef(null);
  const weekSelectRender = useCallback(({ item, index }) => {
    return (
      <Button variant='ghost'
        w='100px'
        h='50px'
        _text={{
          fontWeight: 700,
          color: "#515979",
          fontSize: 'md',
        }}
        _pressed={{
          bg: 'gray.200',
        }}
      >
        {`Week ${index + 1}`}
      </Button>
    );
  }, []);

  return (
    <Box
      w='100%' h={HEADER_HEIGHT} position='absolute'
      top='0'
      left='0'
      zIndex={10}
      bg='#CDD8F6'
      safeAreaTop
      paddingBottom='0'
    >
      <VStack space={6}>
        <Title
          title={title}
          onSelectDatePress={onSelectDatePress}
          onEditPress={onEditPress}
          onDeletePress={onDeletePress}
        />
        <Box alignItems='center' w='100%' zIndex={100}>
          <FlatList
            ref={calendarFlatListRef}
            horizontal={true}
            data={weeksWithSelection}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={weekCalendarRender}
            initialNumToRender={2}
          />
        </Box>
        {weeksWithSelection.length > 1 &&
        <VStack borderTopWidth={1}
          borderTopColor='#9BBAFB'
          h='50px'
        >
          {/* <FlatList
            data={weeksWithSelection}
            render={weekSelectRender}
            horizontal
          />
          TODO: fix this flatlist
          */}
        </VStack>}
      </VStack>
      <Box
        position='absolute'
        bottom='0'
        left='0'
        w='100%'
        h='40px'
        bg='white'
        justifyContent='center'
        px='28px'
      >
        <HStack>
          <Box
            flex='1.5' h='100%' maxW='80px'
            pr='4'
          >
            <Text
              textAlign='right'
              fontSize='sm'
              color='#BCC1CD'
            >
              Time
            </Text>
          </Box>
          <Box flex='9' ml='4' pl='1'>
            <Text
              fontSize='sm'
              color='#BCC1CD'
            >
              Location
            </Text>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}

// TODO: add day number view (day 1, day 2, etc)

function LocationItemCard({ item, onViewInMapPress, onDeleteItem }) {
  // TODO: add edit function
  const startTimeArr = item.start_time.split(":");
  const startTime = `${startTimeArr[0]}:${startTimeArr[1]}`;
  const endTimeArr = item.end_time.split(":");
  const endTime = `${endTimeArr[0]}:${endTimeArr[1]}`;
  const MenuTrigger = useCallback((triggerProps) => {
    return (
      <IconButton
        icon={<Entypo name="dots-three-vertical" size={20} color="black" />}
        size='sm'
        borderRadius='full'
        _pressed={{
          bg: 'gray.200',
        }}
        {...triggerProps}
      />
    );
  }, []);
  const onDeletePress = useCallback(() => {
    console.log("delete");
    onDeleteItem(item.id);
  }, [onDeleteItem, item]);
  return (
    <HStack h='120px' w='100%'>
      <Box
        flex='1.5'
        maxW='80px'
        h='100%'
        pr='4'
        borderRightColor="#FAF9F9"
        borderRightWidth={2}
        pt='1'
      >
        <VStack>
          <Text
            textAlign='right'
            fontWeight='500'
            fontSize='md'
            color='#212525'
          >
            {startTime}
          </Text>
          <Text
            textAlign='right'
            fontWeight='400'
            fontSize='sm'
            color='#BCC1CD'
          >
            {endTime}
          </Text>
        </VStack>
      </Box>
      <Box
        flex='9'
      >
        <VStack
          ml='4'
          bg='#CDD8F6'
          h='85%'
          px='15px'
          py='10px'
          borderRadius={16}
          space='0.5'
        >
          <Text
            fontWeight='600'
            fontSize='md'
            color='#212525'
          >
            {item.name}
          </Text>
          <Text
            fontWeight='400'
            color='#212525'
            fontSize='xs'
          >
            {item.subtitle}
          </Text>
        </VStack>
        <Button
          position='absolute'
          bottom='22px'
          borderRadius='full'
          left='4'
          mt='2'
          size='sm'
          variant='ghost'
          justifyContent='flex-start'
          _text={{
            textAlign: 'left',
            color: '#212525',
          }}
          leftIcon={<LocationIcon size='md' color='#515979' />}
          onPress={() => onViewInMapPress(item.place_id)}
        >
          View in map
        </Button>
        <Box
          position='absolute'
          borderRadius='full'
          top='1.5'
          right='1'
        >
          <Menu
            placement="bottom left"
            trigger={MenuTrigger}
          >
            <Menu.Item
              alignItems='flex-start'
              justifyContent='flex-start'
              py='0.5'
              px='0'
              onPress={onDeletePress}
            >
              <HStack space={2}
                alignContent='center' alignItems='center' h='100%'
                my='2'
              >
                <Icon
                  as={<Feather name='trash-2' />}
                  size='sm' color='error.500'
                />
                <Text
                  fontSize='md'
                  fontWeight='400'
                  color='error.500'
                >
                  Delete
                </Text>
              </HStack>
            </Menu.Item>
          </Menu>
        </Box>
        {/* <IconButton
          position='absolute'
          top='1.5'
          right='1'
          icon={<Entypo name="dots-three-vertical" size={20} color="black" />}
          size='sm'
          borderRadius='full'
          _pressed={{
            bg: 'gray.200',
          }}
        /> */}
      </Box>
    </HStack>
  );
}

function AddButton({ onPress, ...props }) {
  return (
    <Box
      h='56px'
      w='56px'
      borderRadius='full'
      alignItems='center'
      justifyContent='center'
      {...props}
    >
      <IconButton
        icon={<AddIcon size='md' color="white" />}
        size='lg'
        w='100%'
        h='100%'
        borderRadius='full'
        bgColor='primary.400'
        onPress={onPress}
        _pressed={{
          bg: 'primary.700',
        }}
      />
    </Box>
  );
}

const loadingStates = {
  done: 0,
  loading: 1,
  refreshing: 2,
  error: -1,
};
export default function ItineraryView() {
  const tabBarHeight = useBottomTabBarHeight();

  const [itemId, setItemId] = useState(null);

  const [planDetail, setPlanDetail] = useState(null);
  const [loadingState, setLoadingState] = useState(loadingStates.loading);
  const [realData, setRealData] = useState([]);
  const store = useStore();
  const [currentDateSelection, setCurrentDateSelection] =
    useState(null);

  const { user } = useAuthContext();

  useFocusEffect(
      useCallback(() => {
        setLoadingState(loadingStates.loading);
        const itemId = store.getItem('CurrentItineraryId');
        setItemId(itemId);
        const cachedPlanDetail = store.getItem('ItineraryList')
            .filter((item) => item.id == itemId)[0];
        setPlanDetail(cachedPlanDetail);
        const planItems = store.getItem(`Itinerary-${itemId}-Items`);
        const cachedCurrentDateSelection =
          store.getItem('CurrentDateSelection');
        if (!planItems) {
          getItinerary(itemId)
              .then((res) => res.data)
              .then((res) => {
                console.log(res.results.details);
                console.log(res.results.items);
                // save to global store
                store.setItem(`Itinerary-${itemId}-Items`, res.results.items);
                // set display data
                setPlanDetail(cachedPlanDetail);
                setRealData(res.results.items);
                setCurrentDateSelection(cachedPlanDetail.start_date);
                setLoadingState(loadingStates.done);
              })
              .catch((err) => {
                console.warn(err);
                setLoadingState(loadingStates.error);
              });
        } else {
          setPlanDetail(cachedPlanDetail);
          setCurrentDateSelection(cachedCurrentDateSelection);
          setRealData(planItems);
          setLoadingState(loadingStates.done);
        }
      }, [store]),
  );

  const onDatePress = useCallback((dayString) => {
    setCurrentDateSelection(dayString);
  }, [setCurrentDateSelection]);

  const router = useRouter();

  const onAddPress = useCallback(() => {
    // set the current selected date
    store.setItem('CurrentDateSelection', currentDateSelection);
    // set the current pending place to undefined
    store.deleteItem('NewPlanPlace');
    router.push("/newitem");
  }, [store, router, currentDateSelection]);

  const displayData = realData.filter((item) =>
    item.date == currentDateSelection);

  const refreshData = useCallback(() => {
    setLoadingState(loadingStates.refreshing);
    getItinerary(itemId)
        .then((res) => res.data)
        .then((res) => {
          console.log(res.results.details);
          console.log(res.results.items);
          // save to global store
          store.setItem(`Itinerary-${itemId}-Items`, res.results.items);
          // set display data
          setRealData(res.results.items);
          setLoadingState(loadingStates.done);
        })
        .catch((err) => {
          console.warn(err);
          setLoadingState(loadingStates.error);
        });
  }, [itemId, store]);

  const openCalendar = useCallback(() => {
    if (Platform.OS == 'android') {
      DateTimePickerAndroid.open({
        value: new Date(currentDateSelection),
        onChange: (event, selectedDate) => {
          if (event.type == "set") {
            const currentDate = selectedDate;
            setCurrentDateSelection(toDateString(currentDate));
          };
        },
        mode: "date",
        minimumDate: new Date(planDetail.start_date),
        maximumDate: new Date(planDetail.end_date),
      });
    }
  }, [currentDateSelection, planDetail]);

  const onEditPress = useCallback(() => {
    router.push('/edititinerary');
  }, [router]);

  const onDeletePress = useCallback(() => {
    Alert.alert(
        `Delete "${planDetail.name}"?`,
        "Do you want to delete this itinerary? You cannot undo this.",
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              setLoadingState(loadingStates.loading);
              deleteItinerary(planDetail.id)
                  .then((res) => {
                    listItineraries(user?.id)
                        .then((res) => {
                          console.log(res);
                          store.setItem('ItineraryList', res);
                          router.back();
                        })
                        .catch((err) => {
                          console.warn(err);
                        });
                  })
                  .catch((err) => {
                    console.warn(err);
                  }).finally((res) => {
                    setLoadingState(loadingStates.done);
                  });
            },
          },
        ],
        {
          cancelable: true,
        },
    );
  }, [planDetail, user, store, router]);

  const onViewInMapPress = useCallback((itemId) => {
    if (!itemId) {
      console.warn("item id not defined");
      return;
    }
    axios.get(
        "https://api.geoapify.com/v2/place-details",
        {
          params: {
            lang: 'en',
            apiKey: process.env.GEOAPIFY_API_KEY,
            id: itemId,
            features: "details",
          },
        },
    )
        .then((res) => res.data.features.map(((feature) => feature.properties)))
        .then((res) => {
          store.setItem('MapMarkers', res);
          console.log(res);
        })
        .then((res) => {
          router.push("/map");
        })
        .catch((err) => {
          console.warn(err);
        });
  }, [store, router]);

  const onDeleteItem = useCallback((deleteItemId) => {
    // call api to delete item
    deletePlanItem(deleteItemId)
        .catch((err) => {
          console.warn(err);
        });
    // update the global store and ui, only sync when refresh
    const updatedData = realData.filter((item) => item.id != deleteItemId);
    setRealData(updatedData);
    store.setItem(`Itinerary-${itemId}-Items`, updatedData);
  }, [realData, store, itemId]);

  const LocationCardRender = useCallback(({ item }) => {
    return (
      <LocationItemCard
        item={item}
        onViewInMapPress={() => onViewInMapPress(item.place_id)}
        onDeleteItem={onDeleteItem}
      />
    );
  }, [onViewInMapPress, onDeleteItem]);

  return (
    <Center w="100%" flex='1' bg='white'>
      {loadingState != loadingStates.loading &&
        loadingState != loadingStates.error &&
      <Box w="100%" flex='1'>
        <Header
          title={planDetail?.name || "Itinerary"}
          currentDateSelection={currentDateSelection}
          startDate={planDetail?.start_date}
          endDate={planDetail?.end_date}
          onDatePress={onDatePress}
          onSelectDatePress={openCalendar}
          onEditPress={onEditPress}
          onDeletePress={onDeletePress}
        />
        <FlatList
          data={displayData}
          renderItem={LocationCardRender}
          contentContainerStyle={{
            flexGrow: 0,
            paddingTop: HEADER_HEIGHT,
            paddingBottom: tabBarHeight + 10,
            paddingHorizontal: 28,
            height: '100%',
          }}
          refreshControl={<RefreshControl
            progressViewOffset={HEADER_HEIGHT - 20}
            refreshing={loadingState == loadingStates.refreshing}
            onRefresh={refreshData}
          />}
        />
        <AddButton
          onPress={onAddPress}
          position='absolute'
          bottom={tabBarHeight + 11}
          right='27'
          zIndex={13}
        />
      </Box>}
    </Center>
  );
}
