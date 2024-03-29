import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter, useSegments } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  handleLogin,
  handleRegister,
  retrieveCurrentUser,
} from '../lib/connectBackend';
import { Alert } from 'react-native';
import { FirstLaunchContext } from './firstLaunch';

export const AuthContext = createContext({});

export function useAuthContext() {
  return useContext(AuthContext);
}

function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();
  const { doneOnboarding } = useContext(FirstLaunchContext);

  useEffect(() => {
    // console.log("useProtectedRoute useEffect called");
    const inAuthGroup = segments[0] === "(auth)";
    const inOnboardingGroup = segments[0] === "(onboarding)";
    if (!doneOnboarding) {
      if (!inOnboardingGroup) {
        router.replace('/onboarding');
      }
    } else if (inOnboardingGroup) {
      // if in onboarding group and finished onboarding, redirect to login page
      router.replace('/login');
    } else if (!user && !inAuthGroup) {
      router.replace('/login');
    } else if (user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, segments, router, doneOnboarding]);
}

export function checkEmail(email) {
  // eslint-disable-next-line max-len
  const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

  return regexExp.test(email);
}

export function checkPassword(password) {
  // Password must have minimum length of 8
  return password.length >= 8;
}

export function loginAlert(msg) {
  Alert.alert('', msg, [
    { text: 'OK', onPress: () => console.log("Login alert closed") },
  ]);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = useCallback(async () => {
    try {
      setIsLoading(true);
      const lastUser = JSON.parse(await AsyncStorage.getItem('user'));
      if (lastUser) {
        const currentUser = await retrieveCurrentUser(lastUser.id);
        setUser(currentUser);
      }
    } catch (error) {
      console.log(`isLoggedIn error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const { user, error } = await handleLogin(email, password);
      console.log(`Error: ${error}`);
      if (!error) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } else {
        console.log(`Login error: ${error}`);
      }
      return { user, error };
    } catch (error) {
      console.log(`Login error: ${error}`);
      return { error };
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const register = async (email, password) => {
    try {
      const { user, error } = await handleRegister(email, password);
      if (!error) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } else {
        console.log(`Register error: ${error}`);
      }
      return { user, error };
    } catch (error) {
      return { error };
    }
  };

  const updateUser = useCallback(async (data) => {
    const updatedUser = {
      ...user,
      ...data,
    };
    setUser(updatedUser);
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  }, [user]);

  useEffect(() => {
    isLoggedIn();
  }, []);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

