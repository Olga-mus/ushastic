import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
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
const AnimatedG = Animated.createAnimatedComponent(G);

const Ushastic = ({ scale = 1, isWaving = false }) => {
  const handRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isWaving) {
      let cycles = 0;
      const maxCycles = 4; // ~4 секунды (один цикл ~0.5 сек), подберите нужное число
      const wave = () => {
        if (cycles >= maxCycles) {
          handRotate.setValue(0);
          return;
        }
        cycles++;
        Animated.sequence([
          Animated.timing(handRotate, {
            toValue: 25,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(handRotate, {
            toValue: -25,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(handRotate, {
            toValue: 15,
            duration: 80,
            useNativeDriver: true,
          }),
          Animated.timing(handRotate, {
            toValue: -15,
            duration: 80,
            useNativeDriver: true,
          }),
          Animated.timing(handRotate, {
            toValue: 0,
            duration: 120,
            useNativeDriver: true,
          }),
        ]).start(wave);
      };
      wave();
    } else {
      handRotate.setValue(0);
    }
  }, [isWaving]);

  return (
    <View
      style={{
        // backgroundColor: 'lightgray',
        // borderWidth: 1,
        // borderColor: 'red',
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
            <AnimatedG
              transform={[
                { translateX: 560 },
                { translateY: 150 },
                {
                  rotate: handRotate.interpolate({
                    inputRange: [-30, 30],
                    outputRange: ['-30deg', '30deg'],
                  }),
                },
              ]}
            >
              <HandRight />
            </AnimatedG>
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
