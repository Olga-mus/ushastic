import * as React from 'react';
import { G, Path } from 'react-native-svg';

function HandLeft(props) {
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
        d="M74.79 14.03C60.937 5.398 46.18 1.27 33.562 1.51 20.93 1.75 10.647 6.345 5.308 14.912c-5.34 8.566-4.936 19.821.412 31.27 5.342 11.433 15.547 22.864 29.398 31.498C48.97 86.313 63.727 90.44 76.344 90.2c12.634-.24 22.917-4.835 28.256-13.401 5.339-8.567 4.936-19.822-.413-31.27C98.846 34.094 88.64 22.663 74.789 14.03z"
        fill="#f4a06b"
        stroke="#000"
        strokeWidth={3}
      />
    </G>
  );
}

export default HandLeft;
