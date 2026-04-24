import React from 'react';
import { View } from 'react-native';
import { G, Svg } from 'react-native-svg';
import EyeBlack from '../ushastic/EyeBlack';
import EyePoint from '../ushastic/EyePoint';
import EyeWhite from '../ushastic/EyeWhite';
import Body from './Body';
import Den from './Den';
import Ear from './Ear';
import Mouth from './Mouth';
const Bear = () => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: 'red',
        width: 270,
        height: 300,
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        transform: [{ rotate: '90deg' }],
      }}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 1537 965"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Берлога (фон) – размещаем позади медведя */}
        {/* <G transform={[{ scale }]} > */}
        <G transform="translate(-170,250)">
          <Den />
          {/* Уши (левое и правое) */}
          <G transform="translate(440, 450) rotate(-5)">
            <Ear />
          </G>
          <G transform="translate(790, 460) rotate(110)">
            <Ear />
          </G>
          <G transform="translate(480, 450)">
            {/* Тело медведя*/}
            <Body /> {/* Рот */}
            <G transform="translate(96, 130)">
              <Mouth />
            </G>
            {/* Глаза */}
            {/* Левый глаз*/}
            <G transform="translate(160, 30) scale(0.7)">
              <EyeWhite />
              <G transform="translate(18, 20)">
                <EyeBlack />
                <G transform="translate(10, 0)">
                  <EyePoint />
                </G>
              </G>
            </G>
            {/* Правый глаз*/}
            <G transform="translate(40, 30) scale(0.7)">
              <EyeWhite />
              <G transform="translate(18, 20)">
                <EyeBlack />
                <G transform="translate(10, 0)">
                  <EyePoint />
                </G>
              </G>
            </G>
          </G>
        </G>

        {/* Глаза – переиспользуем компонент от Ушастика, уменьшаем масштаб
        <G transform="translate(300, 220) scale(0.7)">
          <Eye blink={false} pupilX={0} pupilY={0} />
        </G>
        <G transform="translate(420, 220) scale(0.7)">
          <Eye blink={false} pupilX={0} pupilY={0} />
        </G> */}
      </Svg>
    </View>
  );
};

export default Bear;
