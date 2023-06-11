/* eslint-disable max-len */
import { Icon } from "native-base";
import { Path, G } from "react-native-svg";

function BarIcon({ color, size }) {
  return (
    <Icon size={size} viewBox="0 0 22 24">
      <G fillRule="nonzero" stroke="none" fill="none">
        <Path d="M18 4.49996C18.828 4.49996 19.5898 4.70322 20.2853 5.10971C20.9808 5.51622 21.5315 6.08272 21.9375 6.80922C22.3435 7.53572 22.535 8.29747 22.512 9.09447C22.489 9.89147 22.2625 10.6455 21.8325 11.3565C21.4025 12.0675 20.8323 12.6105 20.1218 12.9855C19.4113 13.3605 18.6418 13.5325 17.8133 13.5015C17.4383 14.8455 16.7235 15.9275 15.669 16.7475C14.6145 17.5675 13.3918 17.9855 12.0008 18.0015H7.50075C5.79775 17.9545 4.38375 17.3685 3.25875 16.2435C2.13375 15.1185 1.54775 13.7045 1.50075 12.0015V3.75146C1.50075 3.53246 1.571 3.35271 1.7115 3.21221C1.852 3.07171 2.03175 3.00146 2.25075 3.00146H17.2508C17.4698 3.00146 17.6495 3.07171 17.79 3.21221C17.9305 3.35271 18.0008 3.53246 18.0008 3.75146V4.50146L18 4.49996ZM18 5.99996V12C18.844 11.9845 19.551 11.6915 20.121 11.121C20.691 10.5505 20.984 9.84346 21 8.99996C20.9845 8.15596 20.6915 7.44897 20.121 6.87896C19.5505 6.30896 18.8435 6.01596 18 5.99996ZM2.25 19.5H17.25C17.469 19.5 17.6488 19.5702 17.7893 19.7107C17.9298 19.8512 18 20.031 18 20.25C18 20.469 17.9298 20.6487 17.7893 20.7892C17.6488 20.9297 17.469 21 17.25 21H2.25C2.031 21 1.85125 20.9297 1.71075 20.7892C1.57025 20.6487 1.5 20.469 1.5 20.25C1.5 20.031 1.57025 19.8512 1.71075 19.7107C1.85125 19.5702 2.031 19.5 2.25 19.5ZM3 4.49996V12C3.0315 13.2815 3.469 14.344 4.3125 15.1875C5.156 16.031 6.2185 16.4685 7.5 16.5H12C13.2815 16.4685 14.344 16.031 15.1875 15.1875C16.031 14.344 16.4685 13.2815 16.5 12V4.49996H3Z" fill={color} />
      </G>
    </Icon>
  );
}

export default BarIcon;
