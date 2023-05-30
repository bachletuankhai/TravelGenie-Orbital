/* eslint-disable object-curly-spacing */
import { NativeBaseProvider, Text, Box } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        <Text>Open up index.js to start working on your app!</Text>
      </Box>
    </NativeBaseProvider>
  );
}