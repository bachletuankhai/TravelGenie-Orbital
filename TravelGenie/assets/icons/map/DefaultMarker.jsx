/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

function DefaultMarker({ color, size }) {
  return (
    <Icon size={size} viewBox="0 0 100 100" shadow='1'>
      <G fillRule="nonzero" fill="none">
        <Path
          d="M50 10.417c-15.581 0-28.201 12.627-28.201 28.201a28.074 28.074 0 0 0 5.602 16.873L45.49 86.823c.105.202.21.403.339.588l.04.069.011-.006a5.063 5.063 0 0 0 4.135 2.111c1.556 0 2.912-.708 3.845-1.799l.047.027.179-.31c.264-.356.498-.736.667-1.155L72.475 55.65a28.074 28.074 0 0 0 5.726-17.032c0-15.574-12.62-28.201-28.201-28.201zm-.279 42.498c-7.677 0-13.895-6.221-13.895-13.895 0-7.673 6.218-13.895 13.895-13.895s13.895 6.222 13.895 13.895c0 7.673-6.218 13.895-13.895 13.895z"
          fill="#FF0000"
          strokeWidth={1}
          stroke="#a50000"
        />
      </G>
    </Icon>
  );
}

export default DefaultMarker;
