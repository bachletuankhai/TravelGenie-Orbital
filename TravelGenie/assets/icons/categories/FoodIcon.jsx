/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

function FoodIcon({ color, size }) {
  return (
    <Icon size={size} viewBox="0 0 52 52">
      <G fillRule="nonzero" stroke="none" fill="none">
        <Path
          d="M26 7.667a24 24 0 0 0-24 24h48a24 24 0 0 0-24-24ZM2 40.333h48M26 2v5.667"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={4}
        />
      </G>
    </Icon>
  );
}

export default FoodIcon;
