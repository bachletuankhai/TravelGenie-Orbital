import { createContext, useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleLogin, handleRegister } from '../lib/connectBackend';

export const AuthContext = createContext({});

function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    if (!user && !inAuthGroup) {
      router.replace("/login");
    } else if (user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, segments, router]);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const isLoggedIn = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      setUser(user);
    } catch (error) {
      console.log(`isLoggedIn error: ${error}`);
    }
  };

  const login = async (email, password) => {
    try {
      const { user, error } = await handleLogin(email, password);
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

  useEffect(() => {
    isLoggedIn();
  }, []);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

