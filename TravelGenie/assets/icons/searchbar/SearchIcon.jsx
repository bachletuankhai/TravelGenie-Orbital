import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

// eslint-disable-next-line max-len
const path = "M6.328 12.703c.875.875 1.938 1.313 3.188 1.313 1.25 0 2.312-.438 3.187-1.313s1.313-1.937 1.313-3.187c0-1.25-.438-2.313-1.313-3.188s-1.937-1.312-3.187-1.312c-1.25 0-2.313.437-3.188 1.312S5.016 8.266 5.016 9.516c0 1.25.437 2.312 1.312 3.187Zm9.188 1.313 4.968 4.968-1.5 1.5-4.968-4.968v-.797l-.282-.281c-1.187 1.03-2.593 1.546-4.218 1.546-1.813 0-3.36-.625-4.641-1.875C3.625 12.86 3 11.33 3 9.516c0-1.813.625-3.344 1.875-4.594C6.156 3.64 7.703 3 9.515 3c1.813 0 3.344.64 4.594 1.922 1.25 1.25 1.875 2.781 1.875 4.594 0 1.625-.515 3.03-1.546 4.218l.28.282h.798Z";

function SearchIcon({ color, size }) {
  return (
    <Icon size={size} viewBox="0 0 24 24" ml='4'>
      <G fillRule="nonzero" stroke="none" fill="none">
        <Path d={path} fill={color} />
      </G>
    </Icon>
  );
}

export default SearchIcon;
