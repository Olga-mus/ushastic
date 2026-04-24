import * as React from 'react';
import { Circle, G } from 'react-native-svg';

function EyeWhite(props) {
  return (
    <G
      // width={100}
      // height={100}
      // viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle
        cx={50}
        cy={50}
        r={48.5}
        fill="#fff"
        stroke="#161515"
        strokeWidth={3}
      />
    </G>
  );
}

export default EyeWhite;
