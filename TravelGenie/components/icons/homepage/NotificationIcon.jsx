/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G, Circle } from "react-native-svg";

function NotificationIcon({ size, hasUnread=false }) {
  return (
    <Icon size={size} viewBox="0 0 19 21">
      <G fillRule="nonzero" stroke="none" strokeWidth={1} fill="none">
        <Path
          d="M14 7.667a5 5 0 0 0-10 0c0 5.833-2.5 7.5-2.5 7.5h15S14 13.5 14 7.667M10.442 18.5a1.667 1.667 0 0 1-2.884 0"
          stroke="#747474"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {hasUnread && <Circle cx="14.5" cy="4.5" r="3.5" fill="#F6815B" stroke="#F6815B" strokeWidth="2"/>}
      </G>
    </Icon>
  );
}

export default NotificationIcon;
