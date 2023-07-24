import { Icon } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

const EntertainmentIcon = ({ size, color }) => {
  return (
    <Icon
      as={<MaterialIcons name="attractions" />}
      size={size}
      color={color}
    />
  );
};

export default EntertainmentIcon;
