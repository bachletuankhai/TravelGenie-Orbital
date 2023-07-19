import { ActivityIndicator, FlatList } from 'react-native';
import Title from '../TitleHeader';
import {
  Box,
  Button,
  Center,
  IconButton,
  VStack,
  AddIcon,
  WarningOutlineIcon,
  Text,
} from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import ItineraryItemCard from './ItineraryItemCard';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useAuthContext } from '../../contexts/auth';
import { listItineraries } from '../../lib/itinerary';

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

// TODO: set api call to get data and organize data
// into corresponding category

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

function ErrorPage(props) {
  return (
    <VStack {...props}>
      <WarningOutlineIcon size='5xl' color='#8A8D9F' />
      <Text
        fontWeight='700'
        fontSize='xl'
        textAlign='center'
      >
        Oh no!
      </Text>
      <Text
        fontWeight='400'
        fontSize='md'
        color='#8A8D9F'
        textAlign='center'
      >
        We are sorry, but some errors occured.
      </Text>
    </VStack>
  );
}

function LoadingPage(props) {
  return (
    <Box>
      <ActivityIndicator />
    </Box>
  );
}

const loadingStates = {
  done: 0,
  loading: 1,
  error: -1,
};
const ItineraryPage = () => {
  const [currentSelection, setCurrentSelection] = useState(0);
  const [loadingState, setLoadingState] = useState(loadingStates.done);
  const router = useRouter();

  const render = useCallback(({ item }) => {
    return (
      <ItineraryItemCard
        item={item}
        mb='3'
        onPress={() => router.push(`/itinerary/view/${item.id}`)}
      />
    );
  }, [router]);

  const { user } = useAuthContext();

  const [realData, setRealData] = useState([]);
  console.log(`loadingState: ${loadingState}`);
  useEffect(() => {
    setLoadingState(loadingStates.loading);
    listItineraries(user?.id)
        .then((res) => res.data)
        .then((res) => {
          setRealData(res.results);
          return res.results;
        })
        .then((res) => {
          console.log(res);
          setLoadingState(loadingStates.done);
        })
        .catch((err) => {
          console.warn(err);
          setLoadingState(loadingStates.error);
        });
  }, [user]);

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
        {loadingState == loadingStates.done && <FlatList
          contentContainerStyle={{
            paddingBottom: paddingBottom,
            paddingTop: HEADER_HEIGHT + 15,
            paddingHorizontal: 20,
          }}
          data={realData}
          renderItem={render}
        />}
        {loadingState == loadingStates.error && <ErrorPage />}
        {loadingState == loadingStates.loading && <LoadingPage />}
      </Box>
    </Center>
  );
};

export default ItineraryPage;
