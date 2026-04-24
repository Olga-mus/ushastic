import * as React from 'react';
import { Circle, G } from 'react-native-svg';

function EyeBlack(props) {
  return (
    <G
      // width={60}
      // height={60}
      // viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={30} cy={30} r={30} fill="#161515" />
    </G>
  );
}

export default EyeBlack;
