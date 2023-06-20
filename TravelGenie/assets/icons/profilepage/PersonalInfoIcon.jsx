/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G, Defs, ClipPath, Rect } from "react-native-svg";

function PersonalInfoIcon({ color, size, ...props }) {
  return (
    <Icon size={size} fill='none' viewBox="0 0 30 30" {...props}>
      <G clipPath="url(#clip0_697_1915)" fill='none'>
        <Path
          d="M10.7143 10.7141C13.3771 10.7141 15.5357 8.55552 15.5357 5.89272C15.5357 3.22992 13.3771 1.07129 10.7143 1.07129C8.05145 1.07129 5.89282 3.22992 5.89282 5.89272C5.89282 8.55552 8.05145 10.7141 10.7143 10.7141Z"
          stroke="#000001"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.49998 26.7855H1.07141V23.5712C1.08847 21.9379 1.51922 20.3355 2.32342 18.9138C3.12763 17.4922 4.27905 16.2975 5.67014 15.4414C7.06123 14.5854 8.6466 14.0959 10.2782 14.0186C11.9097 13.9414 13.5342 14.2789 15 14.9997"
          stroke="#000001"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M28.9286 18.2143L18.8357 28.3072L14.2714 28.9286L14.9143 24.3643L24.9857 14.2715L28.9286 18.2143Z"
          stroke="#000001"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_697_1915">
          <Rect width={30} height={30} fill="white" />
        </ClipPath>
      </Defs>
    </Icon>
  );
}

export default PersonalInfoIcon;
