import { StyleSheet, View } from 'react-native';
import Mapbox, { MarkerView } from '@rnmapbox/maps';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHomeLocationContext } from '../../contexts/homeLocation';
import {
  Camera,
  MapView,
} from '@rnmapbox/maps';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  AddIcon,
  Box,
  Button,
  Circle,
  HStack,
  IconButton,
  Pressable,
  SearchIcon,
  Text,
  VStack,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { DefaultMarker } from '../../assets/icons/map';
import { useFocusEffect, useRouter } from 'expo-router';
import { useStore } from '../../contexts/homeStore';
import { Ionicons } from '@expo/vector-icons';

Mapbox.setAccessToken(process.env.MAPBOX_API_TOKEN);

function SearchBar({
  onMyLocationPress, currentSearchAddress, onClearMarkers, showBackButton,
}) {
  const router = useRouter();

  return (
    <Box
      safeAreaTop
      position='absolute'
      top='10px'
      left='0'
      h='10%'
      zIndex={100}
      w='100%'
    >
      <HStack h='48px' space='4' px='20px'>
        {showBackButton && <IconButton
          icon={<Ionicons name="chevron-back" size={20} color="black" />}
          size='md'
          borderRadius='full'
          borderWidth={1}
          borderColor='#D7D9DA'
          bg='white'
          _pressed={{
            bg: 'gray.200',
          }}
          onPress={onClearMarkers}
        />}
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
            {currentSearchAddress || "Search"}
          </Text>
        </Button>
        <IconButton
          flex='1'
          maxW='50px'
          icon={<MaterialIcons name="my-location" size={24} color="#585858" />}
          borderRadius={12}
          bg='white'
          _pressed={{
            bg: 'gray.200',
          }}
          onPress={onMyLocationPress}
        />
      </HStack>
    </Box>
  );
}

function CurrentLocationMarker({ coordinate }) {
  return (
    <MarkerView
      coordinate={coordinate}
    >
      <Circle
        bg='rgba(0, 206, 209, 0.15)'
        size='30px'
      >
        <Box
          bg='cyan.400'
          w='18px'
          h='18px'
          borderRadius='full'
          borderWidth={3}
          borderColor='white'
        />
      </Circle>
    </MarkerView>
  );
}

function LocationMarker({ coordinate, isSelected=false, onPress }) {
  return (
    <MarkerView
      coordinate={coordinate}
      allowOverlap={true}
    >
      <IconButton
        icon={<DefaultMarker
          size={isSelected ? '4xl' : '2xl'}
          color="#a50000"
        />}
        onPress={onPress}
        size='xs'
        _pressed={{
          bg: "transparent",
        }}
      />
    </MarkerView>
  );
}

function LocationCard({ item, onAddPress }) {
  return (
    <Box
      w='85%'
      h='100px'
      borderRadius={16}
      position='absolute'
      bottom='8'
      bg='white'
      left='8'
      zIndex={100}
      px='15px'
      py='10px'
    >
      <HStack space='2' flex='1' mr='5'>
        <Box
          width='70px'
          bg='gray.200'
        >
        </Box>
        <VStack space={1} flex='1'>
          <Text
            width='100%'
            color='#593131'
            fontSize='md'
            fontWeight={400}
          >
            {item.address_line1}
          </Text>
          <Text isTruncated
            width='100%'
            color='#747688'
            fontSize='xs'
          >
            {item.address_line2}
          </Text>
        </VStack>
      </HStack>
      <IconButton
        onPress={() => onAddPress(item)}
        position='absolute'
        bottom='2'
        right='2'
        borderRadius='full'
        _pressed={{
          bg: 'gray.200',
        }}
        icon={<AddIcon size='sm' color='black' />}
        size='sm'
        zIndex={300}
      />
    </Box>
  );
}

const MapPage = ({
  centerCoordinate,
}) => {
  const tabBarHeight = useBottomTabBarHeight();

  // camera config
  const camera = useRef(null);

  const { location } = useHomeLocationContext();
  const currentCoords = useMemo(() => ([
    location.coords.longitude, location.coords.latitude,
  ]), [location]);

  const toCurrentLocation = useCallback(() => {
    camera.current?.setCamera({
      zoomLevel: 17,
      centerCoordinate: currentCoords,
      animationDuration: 500,
      animationMode: 'easeTo',
    });
  }, [currentCoords]);

  const store = useStore();
  const [localMarkers, setLocalMarkers] = useState([]);
  const markers = localMarkers;
  const setMarkers = useCallback((markers) => {
    store.setItem('MapMarkers', markers);
    setLocalMarkers(markers);
  }, [store]);
  useFocusEffect(
      useCallback(() => {
        const markers = store.getItem('MapMarkers') || [];
        setMarkers(markers);
      }, [store, setMarkers]),
  );
  const [currentSelection, setCurrentSelection] = useState(0);
  const selectedMarkersCoords = useMemo(() => markers[currentSelection] ?
    [markers[currentSelection]?.lon, markers[currentSelection]?.lat] :
    null, [currentSelection, markers]);

  const centerCoords = centerCoordinate ||
    selectedMarkersCoords || currentCoords;
  const router = useRouter();
  const onAddPress = useCallback((item) => {
    store.setItem('NewPlanPlace', item);
    router.push("/newitem");
  }, [store, router]);
  const focusCurrentSelection = useCallback(() => {
    if (selectedMarkersCoords) {
      camera.current?.setCamera({
        zoomLevel: 17,
        centerCoordinate: selectedMarkersCoords,
        animationDuration: 500,
        animationMode: 'easeTo',
      });
    }
  }, [selectedMarkersCoords]);

  const onMarkerPress = useCallback((index) => {
    setCurrentSelection(index);
    camera.current?.setCamera({
      zoomLevel: 20,
      centerCoordinate: [
        markers[index]?.lon,
        markers[index]?.lat,
      ],
      animationDuration: 500,
      animationMode: 'easeTo',
    });
  }, [camera, markers]);

  const onClearMarkers = useCallback(() => {
    setMarkers([]);
  }, [setMarkers]);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: tabBarHeight,
    }}>
      <SearchBar
        onMyLocationPress={toCurrentLocation}
        currentSearchAddress={markers[currentSelection]?.formatted}
        onClearMarkers={onClearMarkers}
        showBackButton={markers[currentSelection] ? true : false}
      />
      <View style={styles.mapContainer}>
        <MapView
          style={{
            height: "100%",
            width: '100%',
          }}
          compassFadeWhenNorth={false}
          compassEnabled={true}
          compassPosition={{ top: 100, left: 20 }}
          scaleBarPosition={{ bottom: 8, right: 0 }}
        >
          <Camera
            ref={camera}
            centerCoordinate={centerCoords}
            zoomLevel={selectedMarkersCoords ? 17 : 12}
            animationDuration={300}
            animationMode='easeTo'
          />
          <CurrentLocationMarker coordinate={currentCoords} />
          {markers.map((marker, index) => {
            return (<LocationMarker
              isSelected={currentSelection == index}
              key={index}
              coordinate={[marker.lon, marker.lat]}
              onPress={() => onMarkerPress(index)}
            />);
          })}
        </MapView>
        {markers[currentSelection] &&
        <Pressable onPress={focusCurrentSelection}>
          <LocationCard item={markers[currentSelection]}
            onAddPress={onAddPress}
          />
        </Pressable>}
      </View>
    </View>
  );
};

export default MapPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
});
