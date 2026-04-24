import * as React from 'react';
import { G, Path } from 'react-native-svg';

function Mouth(props) {
  return (
    <G
      // width={41}
      // height={17}
      // viewBox="0 0 41 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M1.233 1.5c21.5 31 36.5 0 39 0" stroke="#000" strokeWidth={3} />
    </G>
  );
}

export default Mouth;
