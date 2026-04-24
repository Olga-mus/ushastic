import * as React from 'react';
import { G, Path } from 'react-native-svg';

function Wing(props) {
  return (
    <G
      //   width={73}
      //   height={65}
      //   viewBox="0 0 73 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M35.686 61.582C24.048 67.35 8.046 57.578 1.5 51.972V35.154c3.394-5.073 12.22-17.46 20.366-26.429 5.237-5.126 14.304-6.94 18.184-7.208L70.599 11.93c-6.79 14.148-23.276 43.887-34.913 49.653z"
        fill="#7E4343"
        stroke="#000"
        strokeWidth={3}
      />
    </G>
  );
}

export default Wing;
