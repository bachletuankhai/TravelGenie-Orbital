import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useEffect, useCallback } from "react";

export const FirstLaunchContext = createContext({});

// show onboarding screens on first launch only
export function FirstLaunchProvider({ children }) {
  const [firstLaunch, setFirstLaunch] = useState(true);
  const [doneOnboarding, setDoneOnboarding] = useState(true);

  const getHistory = useCallback(async () => {
    // uncomment this line to reset appLaunched key
    // AsyncStorage.removeItem('appLaunched');
    const appLaunched = await AsyncStorage.getItem('appLaunched');
    // if app launched, skip onboarding
    if (appLaunched != null) {
      setFirstLaunch(false);
      setDoneOnboarding(true);
    } else {
      setDoneOnboarding(false);
    }
    // console.log(`doneOnboarding: ${doneOnboarding}`);
  }, []);

  const onDoneOnboarding = useCallback(async () => {
    setDoneOnboarding(true);
    await AsyncStorage.setItem('appLaunched', 'true');
  }, []);

  useEffect(() => {
    // console.log("getHistory useEffect called");
    getHistory();
  }, [getHistory]);

  return (
    <FirstLaunchContext.Provider
      value={{ firstLaunch, doneOnboarding, onDoneOnboarding }}
    >
      {children}
    </FirstLaunchContext.Provider>
  );
}
