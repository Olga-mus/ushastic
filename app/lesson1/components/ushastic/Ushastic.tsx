import React from 'react';
import { View } from 'react-native';
import { G, Svg } from 'react-native-svg';
import Body from './Body';
import EarExternal from './EarExternal';
import EarInside from './EarInside';
import EyeBlack from './EyeBlack';
import EyePoint from './EyePoint';
import EyeWhite from './EyeWhite';
import HandLeft from './HandLeft';
import HandRight from './HandRight';
import Mouth from './Mouth';

const Ushastic = ({ scale = 1 }) => {
  return (
    <View
      style={{
        backgroundColor: 'lightgray',
        borderWidth: 1,
        borderColor: 'red',
        width: 120,
        height: 200,
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        transform: [{ rotate: '90deg' }],
      }}
    >
      <Svg
        // width={100}
        // height={150}
        width="100%"
        height="100%"
        viewBox="0 0 737 700"
        preserveAspectRatio="xMidYMid meet"
      >
        <G transform={[{ scale }]}>
          {/* Здесь все пути вашего ушастика */}

          {/*  Левое ухо */}
          <G transform="translate(580, -120) rotate(46)">
            <EarExternal />
            <G transform="translate(56, 80)">
              <EarInside />
            </G>
          </G>
          {/* Правое ухо */}
          <G transform="translate(50, -90)">
            <EarExternal />
            <G transform="translate(56, 80)">
              <EarInside />
            </G>
          </G>
          <G transform="translate(0, 300)">
            <G transform="translate(50, 150)">
              <HandLeft />
            </G>
            <G transform="translate(560, 150)">
              <HandRight />
            </G>
            <Body />
          </G>
          {/* Глаза */}
          {/* Левый глаз*/}
          <G transform="translate(400, 360)">
            <EyeWhite />
            <G transform="translate(18, 20)">
              <EyeBlack />
              <G transform="translate(10, 0)">
                <EyePoint />
              </G>
            </G>
          </G>
          {/* Правый глаз*/}
          <G transform="translate(220, 360)">
            <EyeWhite />
            <G transform="translate(18, 20)">
              <EyeBlack />
              <G transform="translate(10, 0)">
                <EyePoint />
              </G>
            </G>
          </G>
          {/* Рот */}
          <G transform="translate(340, 590)">
            <Mouth />
          </G>
        </G>
      </Svg>
    </View>
  );
};

export default Ushastic;
