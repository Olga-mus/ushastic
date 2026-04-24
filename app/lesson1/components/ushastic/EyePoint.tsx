import * as React from 'react';
import { Circle, G } from 'react-native-svg';

function EyePoint(props) {
  return (
    <G
      // width={30}
      // height={30}
      // viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={15} cy={15} r={15} fill="#fff" />
    </G>
  );
}

export default EyePoint;
