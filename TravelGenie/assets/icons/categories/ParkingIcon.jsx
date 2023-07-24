/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

function ParkingIcon({ color, size }) {
  return (
    <Icon size={size} viewBox="0 0 24 24">
      <G fillRule="nonzero" stroke="none" fill="none">
        <Path
          fillRule="evenodd"
          d="M19 2a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h14Zm0 2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1ZM9 6h3a4 4 0 0 1 .2 7.995L12 14h-2v3a1 1 0 0 1-2 0V7a1 1 0 0 1 1-1h3-3Zm3 2h-2v4h2l.15-.005A2 2 0 0 0 12 8Z"
          fill={color}
        />
      </G>
    </Icon>
  );
}

export default ParkingIcon;
