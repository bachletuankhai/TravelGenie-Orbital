/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

function DefaultMarker({ color, size }) {
  return (
    <Icon size={size} viewBox="0 0 15 15">
      <G fillRule="nonzero" fill="none">
        <Path
          d="M7.5 0C5.068 0 2.23 1.486 2.23 5.27c0 2.568 4.054 8.244 5.27 9.73 1.081-1.486 5.27-7.027 5.27-9.73C12.77 1.487 9.932 0 7.5 0z"
          fill={color}
        />
      </G>
    </Icon>
  );
}

export default DefaultMarker;
