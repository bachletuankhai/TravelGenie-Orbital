import { Stack } from "expo-router";
import { MarkerProvider } from "../../../contexts/mapMarkers";

export default function MapLayout() {
  return (
    <MarkerProvider>
      <Stack screenOptions={{
        headerShown: false,
      }} />
    </MarkerProvider>
  );
}
