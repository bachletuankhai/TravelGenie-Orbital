/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

function ProfileIcon({ color, size }) {
  return (
    <Icon size={size} viewBox="0 0 16 16">
      <G fillRule="nonzero" fill="none">
        <Path
          d="M12 2.986a5.657 5.657 0 0 0-8 8l3.513 3.52a.667.667 0 0 0 .947 0L12 10.953a5.633 5.633 0 0 0 0-7.967ZM11.047 10 8 13.06 4.953 10a4.307 4.307 0 1 1 6.094 0ZM6 4.94a2.88 2.88 0 0 0 1.464 4.853 2.873 2.873 0 0 0 3.443-2.787 2.826 2.826 0 0 0-.84-2.033A2.867 2.867 0 0 0 6 4.94Zm3.127 3.12a1.553 1.553 0 1 1 .446-1.087c-.01.412-.182.802-.48 1.087h.034Z"
          fill={color}
        />
      </G>
    </Icon>
  );
}

export default ProfileIcon;
