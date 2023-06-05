import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

// eslint-disable-next-line max-len
const path = "M8.68377 3.05132C8.88904 2.98289 9.11096 2.98289 9.31623 3.05132L15 4.94591L19.3675 3.49006C20.6626 3.05837 22 4.02231 22 5.38743V17.2792C22 18.1401 21.4491 18.9044 20.6325 19.1766L15.3162 20.9487C15.111 21.0171 14.889 21.0171 14.6838 20.9487L9 19.0541L4.63246 20.5099C3.33739 20.9416 2 19.9777 2 18.6126V6.72076C2 5.8599 2.55086 5.09562 3.36754 4.82339L8.68377 3.05132ZM10 17.2792L14 18.6126V6.72076L10 5.38743V17.2792ZM8 5.38743L4 6.72076V18.6126L8 17.2792V5.38743ZM16 6.72076V18.6126L20 17.2792V5.38743L16 6.72076Z";

function MapIcon({ color, size }) {
  return (
    <Icon size={size} viewBox="0 0 24 24">
      <G fillRule="nonzero" stroke="none" strokeWidth={20} fill="none">
        <Path d={path} fill={color} />
      </G>
    </Icon>
  );
}

export default MapIcon;
