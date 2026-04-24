import * as React from 'react';
import { G, Path } from 'react-native-svg';

function Mouth(props) {
  return (
    <G
      // width={82}
      // height={37}
      // viewBox="0 0 82 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.396.547c24.5 62.5 79 24.5 79 0"
        stroke="#000"
        strokeWidth={3}
      />
    </G>
  );
}

export default Mouth;
