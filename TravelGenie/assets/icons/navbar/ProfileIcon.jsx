/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

function ProfileIcon({ color, size }) {
  return (
    <Icon size={size} viewBox="0 0 24 24">
      <G fillRule="nonzero" fill="none">
        <Path
          d="M10.2857 11.7144C12.2582 11.7144 13.8572 10.1154 13.8572 8.14296C13.8572 6.17052 12.2582 4.57153 10.2857 4.57153C8.31328 4.57153 6.71429 6.17052 6.71429 8.14296C6.71429 10.1154 8.31328 11.7144 10.2857 11.7144Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d="M4.1857 17.2858C4.82319 16.2393 5.71914 15.3745 6.78742 14.7744C7.85571 14.1743 9.0604 13.8591 10.2857 13.8591C11.511 13.8591 12.7157 14.1743 13.784 14.7744C14.8523 15.3745 15.7482 16.2393 16.3857 17.2858"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d="M10.2857 19.5714C15.4141 19.5714 19.5714 15.4141 19.5714 10.2857C19.5714 5.15736 15.4141 1 10.2857 1C5.15736 1 1 5.15736 1 10.2857C1 15.4141 5.15736 19.5714 10.2857 19.5714Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </G>
    </Icon>
  );
}

export default ProfileIcon;
