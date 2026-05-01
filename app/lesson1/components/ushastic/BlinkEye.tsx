import React from 'react';
import { G, Path } from 'react-native-svg';
import EyeBlack from './EyeBlack';
import EyePoint from './EyePoint';
import EyeWhite from './EyeWhite';

const BlinkEye = ({
  blink = false,
  pupilX = 18,
  pupilY = 20,
  pointX = 10,
  pointY = 0,
  lineY = 20,
  lineX1 = -15,
  lineX2 = 45,
}) => {
  return (
    <G>
      <EyeWhite />
      {!blink ? (
        <G transform={`translate(${pupilX}, ${pupilY})`}>
          <EyeBlack />
          <G transform={`translate(${pointX}, ${pointY})`}>
            <EyePoint />
          </G>
        </G>
      ) : (
        <Path
          d={`M${lineX1},${lineY} L${lineX2},${lineY}`}
          stroke="black"
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}
    </G>
  );
};

export default BlinkEye;
