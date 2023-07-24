/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

function AccomodationIcon({ color, size }) {
  return (
    <Icon size={size} viewBox="0 0 24 24">
      <G fillRule="nonzero" stroke="none" fill="none">
        <Path
          d="M22 19v-3m-10 0V8h6a4 4 0 0 1 4 4v4m-10 0H2m10 0h10M2 6v10m0 3v-3m7-5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Icon>
  );
}

export default AccomodationIcon;
