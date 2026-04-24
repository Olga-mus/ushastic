import * as React from 'react';
import { G, Path } from 'react-native-svg';

function Ear(props) {
  return (
    <G
      // width={82}
      // height={89}
      // viewBox="0 0 82 89"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.554 32.519L15.831 15.36C23.918 1.857 41.42-2.533 54.925 5.554l24.45 14.644L39.81 86.256 15.36 71.613C1.857 63.525-2.533 46.023 5.554 32.519z"
        fill="#272424"
        stroke="#000"
        strokeWidth={3}
      />
    </G>
  );
}

export default Ear;
