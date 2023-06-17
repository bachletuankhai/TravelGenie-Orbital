/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

function UnsavedIcon({ color, size, ...props }) {
  return (
    <Icon size={size} viewBox="0 0 24 24" {...props}>
      <G>
        <Path
          d="m12 17-7 4V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17Z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </G>
    </Icon>
  );
}

function SavedIcon({ color, size, ...props }) {
  return (
    <Icon size={size} viewBox="0 0 24 24" {...props}>
      <G>
        <Path
          d="M18 2H6a2 2 0 0 0-2 2v17a1 1 0 0 0 .5.86 1 1 0 0 0 1 0l6.5-3.71 6.5 3.72a1 1 0 0 0 .5.13.9.9 0 0 0 .5-.14A1 1 0 0 0 20 21V4a2 2 0 0 0-2-2Z"
          fill={color}
        />
      </G>
    </Icon>
  );
}

function BookmarkIcon({ isSaved, ...props }) {
  return isSaved ? <SavedIcon {...props} /> : <UnsavedIcon {...props} />;
}

export default BookmarkIcon;
