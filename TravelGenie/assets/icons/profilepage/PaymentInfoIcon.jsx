/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

function PersonalInfoIcon({ color, size, ...props }) {
  return (
    <Icon size={size} fill='none' viewBox="0 0 30 30" {...props}>
      <G fillRule="nonzero" stroke="none" fill="none">
        <Path
          d="M26.786 4.821H3.214c-1.183 0-2.143.96-2.143 2.143v16.072c0 1.183.96 2.142 2.143 2.142h23.572a2.143 2.143 0 0 0 2.143-2.142V6.964c0-1.183-.96-2.143-2.143-2.143Zm-25.715 7.5H28.93m-8.573 7.5h3.214"
          stroke="#000001"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Icon>
  );
}

export default PersonalInfoIcon;
