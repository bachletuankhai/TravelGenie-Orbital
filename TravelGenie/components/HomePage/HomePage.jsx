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
  SearchIcon,
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
import { useCallback, useState } from 'react';
import axios from 'axios';
import { useStore } from '../../contexts/homeStore';

function Category({ item, onPress }) {
  const opacity = item.isShown ? 1 : 0.6;

  return (
    <VStack space='7px' justifyContent='center' alignItems='center' mx='1'>
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
        onPress={onPress}
      />
      <Text
        fontSize='sm' fontWeight='400' textAlign='center'
        color='#515979'
      >
        {item.name}
      </Text>
    </VStack>
  );
}

function Categories({ onCategoryPress }) {
  const CategoryRender = useCallback(({ item }) => {
    return (
      <Category
        item={item}
        onPress={() => onCategoryPress(item)}
      />
    );
  }, [onCategoryPress]);
  return (
    <FlatList
      horizontal={true}
      data={categories}
      renderItem={CategoryRender}
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
        alignItems='center'
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
          icon={<NotificationIcon size='lg' />}
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

function ToolBox({ cityName, onCategoryPress }) {
  const router = useRouter();
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
        <TitleBar cityName={cityName} />

        <Box
          px='30px'
          h='50px'
        >
          <Button
            flex='1'
            variant='outline'
            borderRadius={42}
            bg='white'
            borderWidth={1}
            borderColor='#D7D9DA'
            justifyContent='flex-start'
            leftIcon={<SearchIcon size='md' color='black' />}
            _text={{
              color: '#5F6368',
              fontWeight: 400,
              fontSize: 'sm',
              isTruncated: true,
            }}
            _pressed={{
              bg: 'gray.100',
            }}
            onPress={() => {
              router.push('/map/search');
            }}
          >
            <Text
              pr='9'
              color='#5F6368'
              fontWeight='400'
              fontSize='sm'
              isTruncated
            >
              {"Search"}
            </Text>
          </Button>
        </Box>

        <Categories onCategoryPress={onCategoryPress} />

        <Box px='30px' maxH='80px' justifyContent='center'>
          <StartButton />
        </Box>
      </VStack>
    </Box>
  );
}

export default function HomePage() {
  const { location, address } = useHomeLocationContext();
  const store = useStore();
  const router = useRouter();

  const onCategoryPress = useCallback((item) => {
    console.log(item.name);
    const categoryParams = item.searchParams.join(',');
    const { longitude, latitude } = location.coords;
    const radius = 5000;
    console.log(categoryParams);
    axios.get(
        "https://api.geoapify.com/v2/places",
        {
          params: {
            categories: categoryParams,
            filter: `circle:${longitude},${latitude},${radius}`,
            bias: `proximity:${longitude},${latitude}`,
            lang: 'en',
            limit: '20',
            apiKey: process.env.GEOAPIFY_API_KEY,
          },
        },
    ).then((res) => {
      return res.data;
    }).then((res) => {
      const results = res.features.map((feature) => feature.properties);
      console.log(results);
      store.setItem('MapMarkers', results);
      router.push('/map');
    }).catch((err) => {
      console.warn(err);
    });
  }, [location, store, router]);

  const cityName = address?.city || address?.country || "";

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
          keyboardShouldPersistTaps='handled'
        >
          <ToolBox
            cityName={cityName}
            onCategoryPress={onCategoryPress}
          />
          {/* <Box>
            <Link href={'/(home)/discover/'}>
              <Text>Discover</Text>
            </Link>
          </Box> */}
        </ScrollView>
      </Box>
    </Center>
  );
}
