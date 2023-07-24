/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

function ParkingIcon({ color, size }) {
  return (
    <Icon size={size} viewBox="0 0 56 56">
      <G fillRule="nonzero" stroke="none" fill="none">
        <Path d="M49.4 51.1c-5-1.8-9.4-3-13.4-3.8v-3.8c7.2-.7 12.8-6.8 12.8-14.1 0-7.8-6.4-14.2-14.2-14.2-1.2 0-2.3.1-3.4.4C29.5 8.4 23.5 3 19.3 3 14.5 3 7.1 10.2 7.1 19.2c0 8.5 5 15.4 11.2 16.1v11.1C10 47.6 6.5 51 6.2 51.3c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0 .1-.1 10.8-10.6 41 .2.1 0 .2.1.3.1.4 0 .8-.3.9-.7.4-.5.1-1.1-.4-1.2zm-14.9-34c6.7 0 12.2 5.5 12.2 12.2 0 6.3-4.7 11.4-10.8 12.1v-3.6l6.9-6.9c.4-.4.4-1 0-1.4s-1-.4-1.4 0L35.9 35V24.9c0-.6-.4-1-1-1s-1 .4-1 1V35l-3-3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l4.4 4.4v3.6c-4.6-.2-8.6-3-10.5-7.1 4.7-2.2 8.1-8.2 8.1-15.2 0-.6 0-1.1-.1-1.7 1.1-.2 2.1-.3 3.1-.3zM9.1 19.2C9.1 11.5 15.4 5 19.3 5s10.3 6.5 10.3 14.2c0 7.3-4.1 13.4-9.3 14.1v-2.5l5.1-5.1c.4-.4.4-1 0-1.4s-1-.4-1.4 0L20.3 28v-6l5.2-5.2c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-3.8 3.8v-4.6c0-.6-.4-1-1-1s-1 .4-1 1v8.3l-4.7-4.7c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l6.1 6.1v7.5c-5.2-.6-9.2-6.7-9.2-14zm11.2 26.9V35.3c.4 0 .8-.1 1.2-.2 2.2 4.9 7 8.2 12.4 8.5V47c-5.4-1.1-9.9-1.2-13.6-.9z" fill={color} />
      </G>
    </Icon>
  );
}

export default ParkingIcon;