/* eslint-disable max-len */
import { TextInput } from 'react-native';
import {
  Text,
  Center,
  Box,
  HStack,
  IconButton,
  VStack,
  Pressable,
  FlatList,
} from 'native-base';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DefaultMarker } from '../../assets/icons/map';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import { useMarkerContext } from '../../contexts/mapMarkers';

const SearchBar = forwardRef(function SearchBar({ value, onChangeText, onBackPress }, ref) {
  return (
    <Box w='100%'
      borderRadius={42}
      borderWidth={1}
      borderColor='#D7D9DA'
      pr='3'
      bg='white'
      mb='3'
    >
      <HStack w='100%'>
        <IconButton
          icon={<Ionicons name="chevron-back" size={20} color="black" />}
          size='md'
          borderRadius='full'
          _pressed={{
            bg: 'gray.200',
          }}
          onPress={onBackPress}
        />
        <TextInput
          placeholder='Search'
          returnKeyType='search'
          selectionColor={'rgba(0, 0, 0, 0.5)'}
          onChangeText={onChangeText}
          style={{
            // backgroundColor: '#4F81C0',
            height: 48,
            flex: 1,
            fontFamily: 'Regular',
            color: '#242527',
            fontSize: 14,
          }}
          value={value} ref={ref}
        />
      </HStack>
    </Box>
  );
});

function ResultItemCard({ item, onPress }) {
  return (
    <Pressable onPress={onPress}>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            w='100%' py='3' justifyContent='center' maxH='70px'
            pr='2' bg={isPressed ? 'gray.100' : 'white'}
          >
            <HStack w='100%'>
              <Box flex='1' maxW='70px' justifyContent='center' alignItems='center'>
                <DefaultMarker size='md' color='#000000' />
              </Box>
              <VStack w='100%' flex='8'>
                <Text
                  fontSize='md'
                >
                  {item.address_line1}
                </Text>
                <Text isTruncated
                  fontSize='xs'
                  color='#747688'
                >
                  {item.address_line2}
                </Text>
              </VStack>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
}

function Separator() {
  return (
    <HStack w='100%' h='1px'>
      <Box
        maxW='70px'
        flex='1'
        h='100%'
      />
      <Box
        flex='8'
        bg='#E9E9E9'
        h='100%'
      />

    </HStack>
  );
}

const HEADER_HEIGHT = 60;
const SearchPage = () => {
  const inputRef = useRef(null);
  const [results, setResults] = useState([]);

  const [query, setQuery] = useState('');
  const onQueryChange = useCallback((text) => {
    setQuery(text);
    if (text.length > 0) {
      axios.get(
          'https://api.geoapify.com/v1/geocode/autocomplete',
          {
            params: {
              text: text,
              lang: 'en',
              format: 'json',
              apiKey: process.env.GEOAPIFY_API_KEY,
            },
          },
      ).then((res) => {
        setResults(res.data.results);
      }).catch((err) => console.warn(err));
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    return () => {
      clearTimeout(id);
    };
  }, []);

  const router = useRouter();
  const { setMarkers } = useMarkerContext();

  const submitSearch = useCallback((item) => {
    setMarkers([item]);
    router.push('/map');
  }, [router, setMarkers]);

  const render = useCallback(({ item }) => {
    return (
      <ResultItemCard
        item={item}
        onPress={() => submitSearch(item)}
      />
    );
  }, [submitSearch]);

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <Center w='100%' bg='white'>
      <Box w='100%' safeArea bg='white'>
        <Box
          w='100%' px='15px' bg='white'
          h='90px' zIndex={10} safeAreaTop
          position='absolute'
          top='0' left='0'
        >
          <SearchBar
            value={query}
            ref={inputRef}
            onChangeText={onQueryChange}
            onBackPress={() => router.back()}
          />
        </Box>
        <FlatList
          _contentContainerStyle={{
            paddingTop: HEADER_HEIGHT,
            paddingBottom: tabBarHeight + 5,
          }}
          data={results}
          renderItem={render}
          keyboardShouldPersistTaps='handled'
          ItemSeparatorComponent={<Separator />}
        />
      </Box>
    </Center>
  );
};

export default SearchPage;
