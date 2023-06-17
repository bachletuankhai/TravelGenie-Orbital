import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon } from 'native-base';

export default function MicrophoneIcon() {
  return (
    <Icon
      as={<MaterialCommunityIcons name="microphone" />}
      size={5}
      color="primary.400" />
  );
}
