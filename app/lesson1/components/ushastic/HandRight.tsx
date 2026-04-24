import * as React from 'react';
import { G, Path } from 'react-native-svg';

function HandRight(props) {
  return (
    <G
      // width={110}
      // height={92}
      // viewBox="0 0 110 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M35.118 14.03C48.97 5.398 63.727 1.27 76.344 1.51c12.634.24 22.917 4.835 28.256 13.402 5.339 8.566 4.936 19.821-.413 31.27C98.846 57.615 88.64 69.046 74.789 77.68 60.94 86.313 46.181 90.44 33.563 90.2 20.93 89.96 10.647 85.365 5.308 76.8c-5.34-8.567-4.936-19.822.412-31.27 5.342-11.434 15.547-22.865 29.398-31.499z"
        fill="#E7E7E7"
        stroke="#000"
        strokeWidth={3}
      />
    </G>
  );
}

export default HandRight;
