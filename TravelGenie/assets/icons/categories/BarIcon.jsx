/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

function BarIcon({ color, size }) {
  return (
    <Icon size={size} viewBox="0 0 32 32">
      <G fillRule="nonzero" stroke="none" fill="none">
        <Path d="M25 11H15a1 1 0 0 0-1 1v4a6.005 6.005 0 0 0 5 5.91V28h-3v2h8v-2h-3v-6.09A6.005 6.005 0 0 0 26 16v-4a1 1 0 0 0-1-1Zm-1 5a4 4 0 0 1-8 0v-3h8Z" fill={color} />
        <Path d="M15 1h-5a1 1 0 0 0-1 1v7.37A6.09 6.09 0 0 0 6 15v14a1 1 0 0 0 1 1h5v-2H8V15c0-3.188 2.231-4.02 2.316-4.051L11 10.72V3h3v5h2V2a1 1 0 0 0-1-1Z" fill={color} />
      </G>
    </Icon>
  );
}

export default BarIcon;
