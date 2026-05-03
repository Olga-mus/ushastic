import React, { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { G, Svg } from 'react-native-svg';

import BlinkEye from './BlinkEye';
import Body from './Body';
import EarExternal from './EarExternal';
import EarInside from './EarInside';
import HandLeft from './HandLeft';
import HandRight from './HandRight';
import Mouth from './Mouth';

const AnimatedG = Animated.createAnimatedComponent(G);

const Ushastic = ({
  scale = 1,
  isWaving = false,
  leftPupilX = 10, // ← добавлено
  leftPupilY = 20, // ← добавлено
  rightPupilX = 10, // ← добавлено
  rightPupilY = 20, // ← добавлено
}) => {
  const handRotate = useRef(new Animated.Value(0)).current;
  const [isBlinking, setIsBlinking] = useState(false);

  const blink = () => {
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 150);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      blink();
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isWaving) {
      let cycles = 0;
      const maxCycles = 4;
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
    <View style={{ width: 120, height: 200, transform: [{ rotate: '90deg' }] }}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 737 700"
        preserveAspectRatio="xMidYMid meet"
      >
        <G transform={[{ scale }]}>
          <G transform="translate(580, -120) rotate(46)">
            <EarExternal />
            <G transform="translate(56, 80)">
              <EarInside />
            </G>
          </G>
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
          {/* Левый глаз */}
          <G transform="translate(400, 360)">
            <BlinkEye
              blink={isBlinking}
              pupilX={leftPupilX}
              pupilY={leftPupilY}
              pointX={10}
              pointY={0}
              lineY={50}
              lineX1={60}
              lineX2={30}
            />
          </G>
          {/* Правый глаз */}
          <G transform="translate(220, 360)">
            <BlinkEye
              blink={isBlinking}
              pupilX={rightPupilX}
              pupilY={rightPupilY}
              pointX={10}
              pointY={0}
              lineY={50}
              lineX1={60}
              lineX2={30}
            />
          </G>
          <G transform="translate(340, 590)">
            <Mouth />
          </G>
        </G>
      </Svg>
    </View>
  );
};

export default Ushastic;
