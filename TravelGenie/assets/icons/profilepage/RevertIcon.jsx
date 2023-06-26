/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

function RevertIcon({ color, size, ...props }) {
  return (
    <Icon size={size} fill='none' viewBox="0 0 24 24" {...props}>
      <G fillRule="nonzero" stroke="none" fill="none">
        <Path
          d="m4 8-.354.354L3.293 8l.353-.354L4 8Zm5 11.5a.5.5 0 0 1 0-1v1Zm-.354-6.146-5-5 .708-.708 5 5-.708.708Zm-5-5.708 5-5 .708.708-5 5-.708-.708ZM4 7.5h10.5v1H4v-1Zm10.5 12H9v-1h5.5v1Zm6-6a6 6 0 0 1-6 6v-1a5 5 0 0 0 5-5h1Zm-6-6a6 6 0 0 1 6 6h-1a5 5 0 0 0-5-5v-1Z"
          fill="#593131"
        />
      </G>
    </Icon>
  );
}

export default RevertIcon;
