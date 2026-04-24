import * as React from 'react';
import { G, Path, Rect } from 'react-native-svg';

function Body(props) {
  return (
    <G
      // width={270}
      // height={240}
      // viewBox="0 0 270 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={1.5}
        y={1.5}
        width={267}
        height={237}
        rx={88.5}
        fill="#967E15"
        stroke="#000"
        strokeWidth={3}
      />
      <Path
        d="M129.639 88.75c3.271-5.667 11.451-5.667 14.722 0l12.991 22.5c3.271 5.667-.818 12.75-7.362 12.75h-25.98c-6.441 0-10.505-6.864-7.51-12.483l.148-.267 12.991-22.5z"
        fill="#272424"
        stroke="#000"
        strokeWidth={3}
      />
    </G>
  );
}

export default Body;
