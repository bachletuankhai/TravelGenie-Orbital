import { createContext, useContext, useState } from "react";
import * as Location from 'expo-location';

const HomeLocationContext = createContext({});

export function useHomeLocationContext() {
  return useContext(HomeLocationContext);
}

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  return (
    <HomeLocationContext.Provider value={{ location }}>
      {children}
    </HomeLocationContext.Provider>
  );
}
