import { NativeBaseProvider, extendTheme } from 'native-base';
import {
  SplashScreen,
  Slot,
  Stack,
} from 'expo-router';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import { AuthProvider } from '../contexts/auth';
import { FirstLaunchProvider } from '../contexts/firstLaunch';

// Amplify config
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
Amplify.configure(awsExports);

import 'core-js/full/symbol/async-iterator';

const fontConfig = {
  Poppins: {
    100: {
      normal: 'Thin',
      italic: 'Thin Italic',
    },
    200: {
      normal: 'ExtraLight',
      italic: 'ExtraLight Italic',
    },
    300: {
      normal: 'Light',
      italic: 'Light Italic',
    },
    400: {
      normal: 'Regular',
      italic: 'Regular Italic',
    },
    500: {
      normal: 'Medium',
      italic: 'Medium Italic',
    },
    600: {
      normal: 'SemiBold',
      italic: 'SemiBold Italic',
    },
    700: {
      normal: 'Bold',
      italic: 'Bold Italic',
    },
    800: {
      normal: 'ExtraBold',
      italic: 'ExtraBold Italic',
    },
    900: {
      normal: 'Black',
      italic: 'Black Italic',
    },
  },
};

// Make sure values below matches any of the keys in `fontConfig`
const fonts = {
  heading: 'Poppins',
  body: 'Poppins',
  mono: 'Poppins',
};

const colors = {
  // Add new color
  primary: {
    "50": "#9facff",
    "100": "#7789ff",
    "200": "#5067ff",
    "300": "#2844ff",
    "400": "#0023ff",
    "500": "#0724e1",
    "600": "#0c25c3",
    "700": "#1125a8",
    "800": "#13248e",
    "900": "#152175",
  },
  greyText: {
    "50": "#a2b1c4",
    "100": "#8f9daf",
    "200": "#7e8a98",
    "300": "#71777d",
    "400": "#5f6368",
    "500": "#595857",
    "600": "#514c47",
    "700": "#484138",
    "800": "#3e352a",
    "900": "#332a1e",
  },
  greyBorder: {
    "50": "#14c13712c",
    "100": "#12a12111c",
    "200": "#10c10a109",
    "300": "#f1f2f2",
    "400": "#d7d9da",
    "500": "#ccc9c8",
    "600": "#c3b9b4",
    "700": "#bca89d",
    "800": "#b79585",
    "900": "#b5836a",
  },
  mainText: {
    "50": "#e0e4f5",
    "100": "#b4bddf",
    "200": "#8e99c2",
    "300": "#6f799f",
    "400": "#515979",
    "500": "#4a4d5b",
    "600": "#3f3f3f",
    "700": "#2f2e27",
    "800": "#1c1a13",
    "900": "#050503",
  },
  greyButton: {
    "50": "#fcfdfe",
    "100": "#d2d2d2",
    "200": "#ced0dc",
    "300": "#bbbdc7",
    "400": "#a5a7b5",
    "500": "#9e9fa5",
    "600": "#989794",
    "700": "#939181",
    "800": "#908c6d",
    "900": "#89845c",
  },
};

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    'Thin': Poppins_100Thin,
    'Thin Italic': Poppins_100Thin_Italic,
    'ExtraLight': Poppins_200ExtraLight,
    'ExtraLight Italic': Poppins_200ExtraLight_Italic,
    'Light': Poppins_300Light,
    'Light Italic': Poppins_300Light_Italic,
    'Regular': Poppins_400Regular,
    'Regular Italic': Poppins_400Regular_Italic,
    'Medium': Poppins_500Medium,
    'Medium Italic': Poppins_500Medium_Italic,
    'SemiBold': Poppins_600SemiBold,
    'SemiBold Italic': Poppins_600SemiBold_Italic,
    'Bold': Poppins_700Bold,
    'Bold Italic': Poppins_700Bold_Italic,
    'ExtraBold': Poppins_800ExtraBold,
    'ExtraBold Italic': Poppins_800ExtraBold_Italic,
    'Black': Poppins_900Black,
    'Black Italic': Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  const theme = extendTheme({
    colors,
    fontConfig,
    // Make sure values below matches any of the keys in `fontConfig`
    fonts,
  });

  return (
    <FirstLaunchProvider>
      <AuthProvider>
        <NativeBaseProvider theme={theme}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </NativeBaseProvider>
      </AuthProvider>
    </FirstLaunchProvider>
  );
}
