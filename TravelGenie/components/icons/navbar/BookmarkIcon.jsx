import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

// eslint-disable-next-line max-len
const path = "M4 4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V21C20 21.3746 19.7907 21.7178 19.4576 21.8892C19.1245 22.0606 18.7236 22.0315 18.4188 21.8137L12 17.2289L5.58124 21.8137C5.27642 22.0315 4.87549 22.0606 4.54242 21.8892C4.20935 21.7178 4 21.3746 4 21V4ZM18 4L6 4V19.0568L11.4188 15.1863C11.7665 14.9379 12.2335 14.9379 12.5812 15.1863L18 19.0568V4Z";

function BookmarkIcon({ color, size }) {
  return (
    <Icon size={size} viewBox="0 0 24 24">
      <G fillRule="nonzero" stroke="none" fill="none">
        <Path d={path} fill={color} />
      </G>
    </Icon>
  );
}

export default BookmarkIcon;
