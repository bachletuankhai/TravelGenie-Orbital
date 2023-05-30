import { NativeBaseProvider, extendTheme } from "native-base";
import { Slot } from 'expo-router';
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

const fontConfig = {
  Poppins: {
    100: {
      normal: "Thin",
      italic: "Thin Italic",
    },
    200: {
      normal: "ExtraLight",
      italic: "ExtraLight Italic",
    },
    300: {
      normal: "Light",
      italic: "Light Italic",
    },
    400: {
      normal: "Regular",
      italic: "Regular Italic",
    },
    500: {
      normal: "Medium",
      italic: "Medium Italic",
    },
    600: {
      normal: "SemiBold",
      italic: "SemiBold Italic",
    },
    700: {
      normal: "Bold",
      italic: "Bold Italic",
    },
    800: {
      normal: "ExtraBold",
      italic: "ExtraBold Italic",
    },
    900: {
      normal: "Black",
      italic: "Black Italic",
    }
  },
};

// Make sure values below matches any of the keys in `fontConfig`
const fonts = {
  heading: "Poppins",
  body: "Poppins",
  mono: "Poppins",
};

export default function AppLayout() {
  let [fontsLoaded] = useFonts({
    "Thin": Poppins_100Thin,
    "Thin Italic": Poppins_100Thin_Italic,
    "ExtraLight": Poppins_200ExtraLight,
    "ExtraLight Italic": Poppins_200ExtraLight_Italic,
    "Light": Poppins_300Light,
    "Light Italic": Poppins_300Light_Italic,
    "Regular": Poppins_400Regular,
    "Regular Italic": Poppins_400Regular_Italic,
    "Medium": Poppins_500Medium,
    "Medium Italic": Poppins_500Medium_Italic,
    "SemiBold": Poppins_600SemiBold,
    "SemiBold Italic": Poppins_600SemiBold_Italic,
    "Bold": Poppins_700Bold,
    "Bold Italic": Poppins_700Bold_Italic,
    "ExtraBold": Poppins_800ExtraBold,
    "ExtraBold Italic": Poppins_800ExtraBold_Italic,
    "Black": Poppins_900Black,
    "Black Italic": Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  const theme = extendTheme({
    fontConfig,
  
    // Make sure values below matches any of the keys in `fontConfig`
    fonts,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Slot />
    </NativeBaseProvider>
  )
}