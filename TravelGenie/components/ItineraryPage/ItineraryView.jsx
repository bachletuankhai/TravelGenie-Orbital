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
} from "native-base";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View, useWindowDimensions,
} from 'react-native';
import { useRouter } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { LocationIcon } from "../../assets/icons/itinerary";
import axios from "axios";

// TODO: add api call to update info

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
    <Pressable onPress={onPress} flex='1' mx='2'>
      {render}
    </Pressable>
  );
}

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// date is passed as string
function WeekCalendar({
  firstDayOfWeek, startDate, endDate, currentSelection, onDatePress,
}) {
  const { width, height } = useWindowDimensions();
  console.log(`current: ${currentSelection}`);
  const days = useMemo(() => {
    const week = [0, 1, 2, 3, 4, 5, 6];
    const days = week.map((date) => {
      const firstDay = new Date(firstDayOfWeek);
      firstDay.setDate(firstDay.getDate() + date);
      return firstDay;
    });
    return days;
  }, [firstDayOfWeek]);

  const start = useMemo(() => {
    return new Date(startDate).getTime();
  }, [startDate]);

  const end = useMemo(() => {
    return new Date(endDate).getTime();
  }, [endDate]);

  const currentDateSelection = useMemo(() => new Date(currentSelection),
      [currentSelection]);

  const currentDateSelectionTime = useMemo(() =>
    currentDateSelection.getTime(),
  [currentDateSelection]);


  // console.log(`start: ${start} ` + startDate);
  // console.log(`end: ${end} ` + endDate);

  return (
    <Box w={width} alignItems='center'>
      <HStack w='100%' justifyContent='space-around' px='15px'>
        {days.map((day, index) => {
          const time = day.getTime();
          {/* console.log(`current: ${time} ` + day); */}
          return <CalendarItemCard
            key={index}
            dayOfWeek={weekdays[index]}
            date={day.getDate()}
            isSelected={time == currentDateSelectionTime}
            isOutOfRange={time < start || time > end}
            onPress={onDatePress}
          />;
        })}
      </HStack>
    </Box>
  );
}

function Title({
  title, onBackPress, _title, _style, showBackButton=true,
  onRightIconPress,
}) {
  const router = useRouter();

  // TODO: add functionality to the menu bar
  const defaultBack = useCallback(() => {
    router.back();
  }, [router]);
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
      <IconButton
        icon={<Entypo name="dots-three-vertical" size={24} color='black' />}
        size='md'
        position='absolute'
        right='4'
        top='1'
        onPress={onRightIconPress}
        _pressed={{
          bg: 'gray.200',
        }}
      />
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

// TODO: add function to switch to specified day and extend the plan
const HEADER_HEIGHT = 230;
function Header({ currentDateSelection, startDate, endDate }) {
  // generate week range consisting start date and end date
  console.log(`current date: ${currentDateSelection}`);
  const weeks = useMemo(() => {
    const weeks = [];
    const endTime = new Date(endDate).getTime();
    const startFirstDayOfWeek = getFirstDayOfWeek(new Date(startDate));
    let id = 0;
    while (startFirstDayOfWeek.getTime() <= endTime) {
      const year = startFirstDayOfWeek.getFullYear();
      const month = startFirstDayOfWeek.getMonth() + 1;
      const day = startFirstDayOfWeek.getDate();
      const firstDayOfWeekStr = `${year}-${month}-${day}`;
      weeks.push({
        id,
        firstDayOfWeek: firstDayOfWeekStr,
      });
      startFirstDayOfWeek.setDate(day + 7);
      id += 1;
    }
    return weeks;
  }, [startDate, endDate]);

  console.log(weeks);
  console.log(currentDateSelection);

  const weekCalendarRender = useCallback(({ item }) => {
    return (
      <WeekCalendar
        firstDayOfWeek={item.firstDayOfWeek}
        startDate={startDate}
        endDate={endDate}
        currentSelection={currentDateSelection}
        onDatePress={() => {}}
      />
    );
  }, [currentDateSelection, startDate, endDate]);

  const calendarFlatListRef = useRef(null);

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
          title="Itinerary"
        />
        <Box alignItems='center' w='100%' zIndex={100}>
          <FlatList
            ref={calendarFlatListRef}
            horizontal={true}
            data={weeks}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={weekCalendarRender}
            viewabilityConfig={{
              minimumViewTime: 1,
              itemVisiblePercentThreshold: 60,
            }}
          />
        </Box>
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

function LocationItemCard({ item }) {
  // TODO: add edit function
  // TODO: add link to map view
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
            {item.start_time}
          </Text>
          <Text
            textAlign='right'
            fontWeight='400'
            fontSize='sm'
            color='#BCC1CD'
          >
            {item.end_time}
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
        >
          View in map
        </Button>
        <IconButton
          position='absolute'
          top='1.5'
          right='1'
          icon={<Entypo name="dots-three-vertical" size={20} color="black" />}
          size='sm'
          borderRadius='full'
          _pressed={{
            bg: 'gray.200',
          }}
        />
      </Box>
    </HStack>
  );
}

const data = [
  {
    id: 0,
    name: "Hotel",
    subtitle: "Breakfast",
    startTime: "8:35",
    endTime: "9:00",
    date: "2023-01-23",
  },
  {
    id: 1,
    name: "Science & Art Museum",
    subtitle: "Museum",
    startTime: "9:15",
    endTime: "11:10",
    date: "2023-01-23",
  },
  {
    id: 2,
    name: "NUS",
    subtitle: "Visiting",
    startTime: "11:10",
    endTime: "12:30",
    date: "2023-01-23",
  },
  {
    id: 3,
    name: "Universal Studio",
    subtitle: "Theme Park",
    startTime: "13:00",
    endTime: "17:00",
    date: "2023-01-23",
  },
  {
    id: 4,
    name: "KFC",
    subtitle: "Lunch",
    startTime: "11:00",
    endTime: "12:00",
    date: "2023-01-24",
  },
  {
    id: 5,
    name: "Movie Theater name",
    subtitle: "Cinema",
    startTime: "13:00",
    endTime: "15:00",
    date: "2023-01-24",
  },
  {
    id: 7,
    name: "Clementi Mall",
    subtitle: "Shopping",
    startTime: "15:00",
    endTime: "17:00",
    date: "2023-01-24",
  },
  {
    id: 6,
    name: "Hadilao",
    subtitle: "Dinner",
    startTime: "18:00",
    endTime: "20:00",
    date: "2023-01-24",
  },
  {
    id: 8,
    name: "Hotel",
    subtitle: "Checkout",
    startTime: "7:00",
    endTime: "7:15",
    date: "2023-01-25",
  },
  {
    id: 9,
    name: "Hotel",
    subtitle: "Checkin",
    startTime: "7:00",
    endTime: "7:15",
    date: "2023-01-23",
  },
];

export default function ItineraryView({ itemId }) {
  const tabBarHeight = useBottomTabBarHeight();

  const [planDetail, setPlanDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [realData, setRealData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // TODO: use backend url in env
    const api = "http://192.168.0.6:3000" + '/itineraries/' + itemId;
    console.log(api);
    axios.get(api)
        .then((res) => res.data)
        .then((res) => {
          console.log(res.results.details);
          console.log(res.results.items);
          setPlanDetail(res.results.details);
          setRealData(res.results.items);
        })
        .catch((err) => console.warn(err))
        .then((x) => setIsLoading(false));
  }, [itemId]);

  return (
    <Center w="100%" flex='1' bg='white'>
      {!isLoading && <Box w="100%" flex='1'>
        <Header
          currentDateSelection={planDetail.start_date}
          startDate={planDetail.start_date}
          endDate={planDetail.end_date}
        />
        <FlatList
          data={realData}
          renderItem={LocationItemCard}
          contentContainerStyle={{
            flexGrow: 0,
            paddingTop: HEADER_HEIGHT,
            paddingBottom: tabBarHeight + 10,
            paddingHorizontal: 28,
          }}
        />
      </Box>}
    </Center>
  );
}
