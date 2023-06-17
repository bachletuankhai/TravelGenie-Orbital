import {
  Button,
  Box,
  VStack,
  HStack,
  Center,
  useBreakpointValue,
  IconButton,
  ArrowBackIcon,
  Text,
} from 'native-base';
import { View, Animated } from 'react-native';
import DiscoverItemCard from './DiscoverItemCard';
import Searchbar from '../SearchBar';
import { FilterIcon } from '../icons/searchbar';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useRef } from 'react';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const data = [
  {
    id: 0,
    title: "Top 10 restaurant",
    image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    category: "Food",
    saved: false,
  },
  {
    id: 1,
    title: "Top 10 restaurant",
    image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    category: "Food",
    saved: false,
  },
  {
    id: 2,
    title: "Top 10 restaurant",
    image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    category: "Bike",
    saved: false,
  },
  {
    id: 3,
    title: "Top 10 restaurant",
    image: "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&h=350",
    category: "Food",
    saved: false,
  },
  {
    id: 4,
    title: "Top 10 restaurant long name long name",
    image: "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    category: "Food",
    saved: false,
  },
  {
    id: 5,
    title: "Top 10 restaurant long name long name",
    image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    category: "Food",
    saved: false,
  },
  {
    id: 6,
    title: "Top 10 restaurant long name long name",
    image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    category: "Food",
    saved: false,
  },
  {
    id: 7,
    title: "Top 10 restaurant long name long name",
    image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    category: "Food",
    saved: false,
  },
  {
    id: 8,
    title: "Top 10 restaurant long name long name",
    image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    category: "Food",
    saved: false,
  },
  {
    id: 9,
    title: "Top 10 restaurant",
    image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    category: "Food",
    saved: false,
  },
  {
    id: 10,
    title: "Top 10 restaurant",
    image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    category: "Food",
    saved: false,
  },
  {
    id: 11,
    title: "Top 10 restaurant",
    image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    category: "Food",
    saved: false,
  },
  {
    id: 12,
    title: "Top 10 restaurant",
    image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    category: "Food",
    saved: false,
  },
  {
    id: 13,
    title: "Top 10 restaurant",
    image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    category: "Food",
    saved: false,
  },
];

function getDataRows(columnFormat) {
  const numOfCol = columnFormat.length;
  const rows = [];

  data.map((item, index) => {
    const row = Math.floor(index / numOfCol);
    if (rows[row] === undefined) {
      rows[row] = [];
    }
    rows[row].push(item);
  });
  return rows;
}

function DiscoverItemRow({ item }) {
  return (
    <HStack space='16px' mt='16px'>
      {item.map((card) => (
        <DiscoverItemCard
          key={card.id}
          item={card}
        />))}
    </HStack>
  );
}

function ContentSelectButton({ title, selected, ...props }) {
  return (
    <Button
      flex='1'
      variant='ghost'
      {...props}
      _text={{
        fontWeight: 700,
        color: selected ? 'mainText.400' : '#B8B8B8',
        fontSize: 'lg',
      }}
    >
      {title}
    </Button>
  );
}

function ContentSelect({ currentSelection = "All", onChangeSelection }) {
  const contents = [
    "All",
    "Popular",
  ];

  return (
    <HStack justifyContent='space-around' px='30px' mt='2'>
      {contents.map((title, index) => (
        <ContentSelectButton
          key={index}
          title={title}
          selected={title == currentSelection}
          onPress={onChangeSelection}
        />
      ))}
    </HStack>
  );
}

function SearchDiscover() {
  return (
    <HStack direction='row-reverse' justifyContent='space-around' px='28px' mt='4'>
      <IconButton
        variant='unstyled'
        icon={<FilterIcon color='#000000' size='xl' />}
        size='xs'
        borderRadius='full'
        ml='2'
      />
      <Searchbar flex='1'/>
    </HStack>
  );
}

function Title({ onBackPress }) {
  return (
    <HStack
      w='100%' h='50px'
      justifyContent='center'
      alignItems='center'
    >
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
          fontSize='2xl'
          w='100%'
          textAlign='center'
        >
          Discover
        </Text>
      </View>
    </HStack>
  );
}

const HEADER_HEIGHT = 160;

function AnimatedHeader({ animatedValue }) {
  const minScroll = 100;
  const { top } = useSafeAreaInsets();
  const clampedAnimatedValue = animatedValue.interpolate({
    inputRange: [minScroll, 1 + minScroll],
    outputRange: [0, 1],
    extrapolateLeft: 'clamp',
  });
  const translateY = Animated
      .diffClamp(clampedAnimatedValue, 0, HEADER_HEIGHT)
      .interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT],
      });

  const opacity = translateY.interpolate({
    inputRange: [-HEADER_HEIGHT * 0.5, 0],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={{
      opacity: opacity,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      backgroundColor: 'white',
      transform: [
        {
          translateY: translateY,
        },
      ],
    }}>
      <VStack w="100%" safeAreaLeft safeAreaRight>
        <Title />
        <SearchDiscover />
        <ContentSelect />
      </VStack>
    </Animated.View>
  );
}

const DiscoverPage = () => {
  const column = useBreakpointValue({
    base: [1, 1],
    sm: [1, 1],
    md: [1, 1, 1],
    lg: [1, 1, 1],
    xl: [1, 1, 1],
  });

  const paddingBottom = useBottomTabBarHeight();

  const listScrollY = useRef(new Animated.Value(0));

  const rows = getDataRows(column);

  return (
    <SafeAreaProvider>
      <Center w='100%' safeAreaTop bg='white'>
        <Box safeAreaLeft safeAreaRight w='100%' pb='5'>
          <AnimatedHeader animatedValue={listScrollY.current} />
          <Animated.FlatList
            contentContainerStyle={{
              flexGrow: 0,
              paddingBottom: paddingBottom,
              paddingTop: HEADER_HEIGHT,
              paddingHorizontal: 30,
            }}
            renderItem={DiscoverItemRow}
            data={rows}
            extraData={column}
            keyExtractor={(item, index) => index}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: listScrollY.current }}}],
                { useNativeDriver: true },
            )}
          />
        </Box>
      </Center>
    </SafeAreaProvider>
  );
};

export default DiscoverPage;
