/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

function PasswordIcon({ color, size, ...props }) {
  return (
    <Icon size={size} fill='none' viewBox="0 0 16 16" {...props}>
      <G fillRule="nonzero" stroke="none" fill="none">
        <Path
          fill={color}
          d="M16 5c0-.6-.4-1-1-1H1c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V5zm-1 6H1V5h14v6z"
        />
        <Path
          fill={color}
          d="M6 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
        />
      </G>
    </Icon>
  );
}

export default PasswordIcon;
