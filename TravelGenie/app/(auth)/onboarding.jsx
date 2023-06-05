import {
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
} from 'react';
import { useWindowDimensions } from 'react-native';

const data = [
  {
    id: 0,
    title: "Choose a City",
    content: "Travel the world view attraction " +
             "and experience the city like a local",
  },
  {
    id: 1,
    title: "What's nearby",
    content: "Finding out about the local attractions. Explore hidden places!",
  },
  {
    id: 2,
    title: "Travel planning",
    content: "Explore destinations, save attraction " +
             "and thing to do, set up when and time",
  },
];

function Onboarding({ title, content, width }) {
  return (
    <Box w={width} maxW="420">
      <VStack
        mt='90%'
        px="30px"
        space={6}
      >
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

  const renderItem = useCallback(
      ({ item }) => (
        <Onboarding title={item.title} content={item.content} width={width}/>
      ),
      [width],
  );

  const handleNextPress = useCallback(() => {
    if (currentSelectionIndex === data.length - 1) {
      // end of list, to page in design
    } else if (flatListRef.current) {
      // Go to the next item
      flatListRef.current.scrollToIndex({
        index: currentSelectionIndex + 1,
      });
      setCurrentSelectionIndex((index) => index + 1);
    }
  }, [currentSelectionIndex]);

  const onScroll = useCallback(({ viewableItems }) => {
    if (viewableItems.length === 1) {
      setCurrentSelectionIndex(viewableItems[0].index);
    }
  }, []);

  const onSkip = useCallback(() => {
    // TODO: skip to login page
  }, []);

  return (
    <Center w="100%">
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
            itemVisiblePercentThreshold: 100,
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
            h='63'
            borderRadius='2xl'
            bgColor='primary.400'
            _text={{
              color: 'white',
              fontSize: 'sm',
              fontWeight: '700',
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