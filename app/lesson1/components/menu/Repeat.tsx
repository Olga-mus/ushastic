import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function Repeat(props) {
  return (
    <Svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G data-name="Layer 2">
        <Path d="M19.45 4.11a1 1 0 00-1 .09L10.67 10H3a1 1 0 00-1 1v10a1 1 0 001 1h7.67l7.73 5.8A1 1 0 0020 27V5a1 1 0 00-.55-.89zM23 12a1 1 0 00-1 1v6a1 1 0 002 0v-6a1 1 0 00-1-1zM26 10a1 1 0 00-1 1v10a1 1 0 002 0V11a1 1 0 00-1-1zM29 8a1 1 0 00-1 1v14a1 1 0 002 0V9a1 1 0 00-1-1z" />
      </G>
    </Svg>
  );
}

export default Repeat;
