import { createContext, useContext, useState, useEffect } from "react";
import * as Location from 'expo-location';
import axios from 'axios';

const HomeLocationContext = createContext({});

export function useHomeLocationContext() {
  return useContext(HomeLocationContext);
}

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      console.log('first time request for location');
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      try {
        // reverse geocoding to set address
        const response = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse`,
            {
              params: {
                lat: location.coords.latitude,
                lon: location.coords.longitude,
                type: "city",
                lang: 'en',
                format: "json",
                apiKey: process.env.GEOAPIFY_API_KEY,
              },
            },
        );
        // console.log(response.data?.results[0]);
        setAddress(response.data?.results[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // subscribe to location change
  useEffect(() => {
    const id = setInterval(async () => {
      if (flag) {
        const location = await Location.getLastKnownPositionAsync({});
        setLocation(location);
      }
    }, 60000);

    return () => {
      console.log('remove subscription');
      flag = false;
      clearInterval(id);
    };
  }, []);


  return (
    <HomeLocationContext.Provider value={{ location, address }}>
      {children}
    </HomeLocationContext.Provider>
  );
}
