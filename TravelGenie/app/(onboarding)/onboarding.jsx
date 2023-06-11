import { Booking, Wagon, Traveller } from '../../assets/images/onboarding';
import {
  Image,
  FlatList,
  Center,
  Box,
  VStack,
  Text,
  Circle,
  HStack,
  Button,
} from 'native-base';
import {
  useState,
  useCallback,
  useRef,
  useContext,
} from 'react';
import { useWindowDimensions } from 'react-native';
import { FirstLaunchContext } from '../../contexts/firstLaunch';

const data = [
  {
    id: 0,
    title: "Choose a City",
    image: Wagon,
    content: "Travel the world view attraction " +
             "and experience the city like a local",
  },
  {
    id: 1,
    title: "What's nearby",
    image: Traveller,
    content: "Finding out about the local attractions. Explore hidden places!",
  },
  {
    id: 2,
    title: "Travel planning",
    image: Booking,
    content: "Explore destinations, save attraction " +
             "and thing to do, set up when and time",
  },
];

function Onboarding({ image, title, content, width }) {
  return (
    <Box w={width} maxW="420">
      <VStack
        mt='10%'
        px="30px"
        space={6}
      >
        <Image
          source={image}
          resizeMode='contain'
          width={223}
          height={280}
          alt="Wagon"
          alignSelf='center'
        />
        <Text
          fontSize='3xl'
          color='black'
          alignSelf='center'
          fontWeight='700'
        >
          {title}
        </Text>
        <Text
          fontSize='md'
          color='mainText.400'
          alignSelf='center'
          textAlign='center'
        >
          {content}
        </Text>
      </VStack>
    </Box>
  );
}

function Dot({ isSelected }) {
  return (
    <Circle
      size='8.41px'
      bgColor={isSelected ? "primary.400" : "greyButton.100"}
    >
    </Circle>
  );
}

export default function List() {
  const { width, height } = useWindowDimensions();
  const flatListRef = useRef(null);
  const [currentSelectionIndex, setCurrentSelectionIndex] = useState(0);
  const { onDoneOnboarding } = useContext(FirstLaunchContext);

  const renderItem = useCallback(
      ({ item }) => (
        <Onboarding
          key={item.id}
          image={item.image}
          title={item.title}
          content={item.content}
          width={width}
        />
      ),
      [width],
  );

  const handleNextPress = useCallback(async () => {
    if (currentSelectionIndex === data.length - 1) {
      // TODO: end of list, to page in design
      await onDoneOnboarding();
    } else if (flatListRef.current) {
      // Go to the next item
      flatListRef.current.scrollToIndex({
        index: currentSelectionIndex + 1,
      });
    }
  }, [currentSelectionIndex, onDoneOnboarding]);

  const onScroll = useCallback(({ viewableItems }) => {
    if (viewableItems.length === 1) {
      setCurrentSelectionIndex(viewableItems[0].index);
    }
  }, []);

  const onSkip = useCallback(async () => {
    // TODO: skip to login page
    await onDoneOnboarding();
  }, [onDoneOnboarding]);

  return (
    <Center w="100%" bgColor='white'>
      <Box
        safeArea w="100%" maxW='420' h={height}
        justifyContent='space-between'
        flexGrow={1}
        flexDirection='column'
      >
        <FlatList
          h='60%'
          ref={flatListRef}
          horizontal={true}
          pagingEnabled
          data={data}
          renderItem={renderItem}
          viewabilityConfig={{
            minimumViewTime: 1,
            itemVisiblePercentThreshold: 60,
          }}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onScroll}
        />
        <HStack flex='1' space={3} justifyContent='center'>
          {data.map((item) => (
            <Dot isSelected={item.id === currentSelectionIndex} key={item.id}/>
          ))}
        </HStack>
        <VStack
          flex='1'
          justifyContent='flex-end'
          space={0.5}
          px='30px'
        >
          <Button
            variant='solid'
            mt="10"
            size='lg'
            h='63px'
            borderRadius='2xl'
            bgColor='primary.400'
            _text={{
              color: 'white',
              fontSize: 'sm',
              fontWeight: '700',
            }}
            _pressed={{
              bgColor: 'primary.600',
            }}
            onPress={handleNextPress}
          >
            NEXT
          </Button>
          <Button
            variant='link'
            size='lg'
            h='63'
            borderRadius='2xl'
            bgColor='white'
            _text={{
              color: 'primary.400',
              fontSize: 'md',
              fontWeight: '400',
            }}
            onPress={onSkip}
          >
            Skip
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
