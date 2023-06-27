import {
  HStack,
  Box,
  Text,
  Center,
  Button,
  ScrollView,
  VStack,
  IconButton,
  FlatList,
} from 'native-base';
import {
  LocationIcon,
  NotificationIcon,
} from "../../assets/icons/homepage";
import { categories } from "../../lib/categories";
import SearchBar from '../SearchBar';
import { MapIcon } from '../../assets/icons/navbar';
import { Link, useRouter } from 'expo-router';
import { useHomeLocationContext } from '../../contexts/homeLocation';
import { useState } from 'react';

function Category({ item }) {
  const opacity = item.isShown ? 1 : 0.6;

  return (
    <VStack space='7px' justifyContent='center' alignItems='center'>
      <IconButton
        size='16'
        borderRadius='full'
        icon={<item.icon size={item?.size || 'xl'} color='#ffffff' />}
        bg={item.color}
        opacity={opacity}
        mx='3'
        _pressed={{
          bg: item.color,
          opacity: 0.9,
        }}
      />
      <Text fontSize='sm' fontWeight='400' textAlign='center'>{item.name}</Text>
    </VStack>
  );
}

function Categories() {
  return (
    <FlatList
      horizontal={true}
      data={categories}
      renderItem={Category}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 60,
      }}
      showsHorizontalScrollIndicator={false}
      pl='4'
      mt='2'
    />
  );
}

function StartButton() {
  const router = useRouter();

  return (
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
      leftIcon={<MapIcon size='xl' color='#ffffff' />}
      onPress={() => {
        router.push('/newtrip');
      }}
    >
      START YOUR ITINERARY
    </Button>
  );
}

function TitleBar({ cityName="" }) {
  return (
    <HStack
      h='48px'
      maxHeight='60px'
      w="100%"
      px="30px"
      flexGrow='1'
      alignItems='center'
    >
      <HStack
        flex='10'
        h='36px'
      >
        <Box py='1'>
          <LocationIcon size='xl'/>
        </Box>
        <Text
          h='100%'
          fontWeight='700'
          fontSize='2xl'
          mt='1'
          ml='3'
          isTruncated
        >
          {cityName}
        </Text>
      </HStack>
      <HStack
        flex='1'
        justifyContent='flex-end'
        h='36px'
      >
        <IconButton
          icon={<NotificationIcon size='lg' hasUnread />}
          borderRadius='full'
          size='sm'
          variant='outline'
          borderColor='#e8edf6'
          bg='#f7f7f7'
          _pressed={{
            bg: '#ccdcdc',
          }}
        />
      </HStack>
    </HStack>
  );
}

function ToolBox({ cityName }) {
  return (
    <Box
      flex='1'
      w="100%"
      h='380px'
      bg='#FAF9F7'
      borderBottomLeftRadius='40'
      borderBottomRightRadius='40'
    >
      <VStack
        space='15px'
      >
        <TitleBar cityName="Singapore" />

        <Box
          px='30px'
        >
          <SearchBar enableVoice={false}/>
        </Box>

        <Categories />

        <Box px='30px' maxH='80px' justifyContent='center'>
          <StartButton />
        </Box>
      </VStack>
    </Box>
  );
}

export default function HomePage() {
  const { location } = useHomeLocationContext();
  const [city, setCity] = useState("");

  if (location) {
    // TODO: reverse geocoding to get address
  }

  return (
    <Center w='100%' bg='#FAF9F7'>
      <Box
        w="100%"
        bg='#FAF9F7'
        safeAreaTop safeAreaLeft safeAreaRight
      >
        <ScrollView w="100%" h="100%"
          bg='white'
          _contentContainerStyle={{
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <ToolBox
            cityName={city}
          />
          <Box>
            <Link href={'/(home)/discover/'}>
              <Text>Discover</Text>
            </Link>
          </Box>
        </ScrollView>
      </Box>
    </Center>
  );
}
