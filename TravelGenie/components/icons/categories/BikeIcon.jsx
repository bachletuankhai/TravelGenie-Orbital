/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

function BikeIcon({ color, size }) {
  return (
    <Icon size={size} viewBox="0 0 30 30">
      <G fillRule="nonzero" stroke="none" fill="none">
        <Path fillRule="evenodd" clipRule="evenodd" d="M16.75 6.668a.703.703 0 0 1 .947.28l3.133 5.678h1.251a.703.703 0 0 1 0 1.406h-1.666a.703.703 0 0 1-.616-.363l-1.265-2.293-2.648.95a.703.703 0 0 1-.475-1.324l2.435-.874L16.8 8.236l-6.376 3.418a.547.547 0 0 0 .16.993.701.701 0 0 1 .07.021l4.583 1.666a.703.703 0 0 1 .463.661v5a.703.703 0 1 1-1.407 0v-4.507L10.206 14c-1.654-.446-1.973-2.67-.493-3.56a.688.688 0 0 1 .03-.017l7.006-3.756ZM7.704 17.156a3.672 3.672 0 1 0 0 7.344 3.672 3.672 0 0 0 0-7.344Zm-5.078 3.672a5.078 5.078 0 1 1 10.156 0 5.078 5.078 0 0 1-10.156 0Zm19.663-3.672a3.672 3.672 0 1 0 0 7.344 3.672 3.672 0 0 0 0-7.344Zm-5.078 3.672a5.078 5.078 0 1 1 10.156 0 5.078 5.078 0 0 1-10.156 0Z" fill={color}/>
        <Path d="M22.29 5.618a1.67 1.67 0 1 1-3.34 0 1.67 1.67 0 0 1 3.34 0Z" fill={color}/>
      </G>
    </Icon>
  );
}

export default BikeIcon;
