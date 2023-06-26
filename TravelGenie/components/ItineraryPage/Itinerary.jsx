import { FlatList } from 'react-native';
import Title from '../TitleHeader';
import {
  Box,
  Button,
  Center,
  IconButton,
  VStack,
  AddIcon,
} from 'native-base';
import { useCallback, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import ItineraryItemCard from './ItineraryItemCard';
import { useRouter } from 'expo-router';

const sections = [
  {
    id: 0,
    title: "Active",
  },
  {
    id: 1,
    title: "Past",
  },
  {
    id: 2,
    title: "Cancelled",
  },
];

const HEADER_HEIGHT = 100;

function Header({ currentSelection, onItemPress }) {
  const render = useCallback(({ item }) => {
    const selected = item.id == currentSelection;
    return (
      <Button
        variant='outline'
        borderRadius='full'
        bg='white'
        h='40px'
        mr='2'
        _pressed={{
          bg: 'gray.100',
        }}
        borderColor={selected ? 'black' : '#D7D9DA'}
        _text={{
          fontWeight: 400,
          fontSize: 'md',
          color: selected ? 'black' : '#8A8D9F',
          alignSelf: 'center',
          lineHeight: 'sm',
        }}
        onPress={onItemPress}
      >
        {item.title}
      </Button>
    );
  }, [currentSelection, onItemPress]);

  return (
    <VStack h='110px'
      space={2}
      zIndex={10}
      bg='white'
      position='absolute'
      top='0'
      left='0'
      w='100%'
    >
      <Title
        title='My Itinerary'
        h='50px'
        showBackButton={false}
      />
      <FlatList
        horizontal={true}
        data={sections}
        renderItem={render}
        contentContainerStyle={{
          paddingLeft: 20,
        }}
      />
    </VStack>
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

const data = [
  {
    id: 0,
    name: "Singpore",
    startDate: "May 10, 2023",
    endDate: "June 1, 2023",
    coverPhoto: "https://www.hostelworld.com/blog/wp-content/uploads/2017/08/girlgoneabroad.jpg",
  },
  {
    id: 1,
    name: "Singpore",
    startDate: "May 10, 2023",
    endDate: "June 1, 2023",
    coverPhoto: "https://www.hostelworld.com/blog/wp-content/uploads/2017/08/lovelyforliving.jpg",
  },
  {
    id: 2,
    name: "Singpore",
    startDate: "May 10, 2023",
    endDate: "June 1, 2023",
    coverPhoto: "https://www.hostelworld.com/blog/wp-content/uploads/2017/08/jetsetchristina-2.jpg",
  },
  {
    id: 3,
    name: "Singpore",
    startDate: "May 10, 2023",
    endDate: "June 1, 2023",
    coverPhoto: "https://www.hostelworld.com/blog/wp-content/uploads/2017/09/heartmybackpack-2.jpg",
  },
];

const ItineraryPage = () => {
  const [currentSelection, setCurrentSelection] = useState(0);
  const router = useRouter();

  const render = useCallback(({ item }) => {
    return (
      <ItineraryItemCard
        item={item}
        mb='3'
        onPress={() => console.log(`Item ${item.id} pressed`)}
      />
    );
  }, []);

  const paddingBottom = useBottomTabBarHeight();

  return (
    <Center safeAreaTop w='100%' flex='1' bg='white'>
      <Box w='100%' safeAreaLeft safeAreaRight flex='1'>
        <Header
          currentSelection={currentSelection}
        />
        <AddButton
          onPress={() => router.push('/newtrip')}
          position='absolute'
          bottom={paddingBottom + 11}
          right='27'
          zIndex={13}
        />
        <FlatList
          contentContainerStyle={{
            paddingBottom: paddingBottom,
            paddingTop: HEADER_HEIGHT + 15,
            paddingHorizontal: 20,
          }}
          data={data}
          renderItem={render}
        />
      </Box>
    </Center>
  );
};

export default ItineraryPage;
