import { Icon } from "native-base";
import { Ionicons } from '@expo/vector-icons';

export default function CafeIcon({ size, color }) {
  return (
    <Icon
      as={<Ionicons name="ios-cafe-outline" />}
      color={color}
      size={size}
    />
  );
}
