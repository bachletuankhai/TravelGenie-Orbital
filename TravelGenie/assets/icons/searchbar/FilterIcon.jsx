/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

function FilterIcon({ color, size }) {
  return (
    <Icon size={size} viewBox="0 0 24 24">
      <G fillRule="nonzero" stroke="none" fill="none">
        <Path d="M9 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2h1.17ZM15 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h7.17ZM9 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h1.17Z" fill={color} />
      </G>
    </Icon>
  );
}

export default FilterIcon;
