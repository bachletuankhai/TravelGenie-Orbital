import { Stack } from "expo-router";

export default function DiscoverLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      freezeOnBlur: true,
    }}>
      <Stack.Screen
        name="index"
      />
      <Stack.Screen
        name="view/[id]"
      />
    </Stack>
  );
}
