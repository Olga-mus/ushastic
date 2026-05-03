import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { G, Svg } from 'react-native-svg';
import BlinkEye from '../ushastic/BlinkEye'; // импортируем BlinkEye
import Body from './Body';
import Den from './Den';
import Ear from './Ear';
import Mouth from './Mouth';

const AnimatedG = Animated.createAnimatedComponent(G);

const Bear = ({ style, isSinging = false }) => {
  const earScale = useRef(new Animated.Value(1)).current;
  const singingRef = useRef(isSinging);
  const animationRef = useRef(null);
  const [isBlinking, setIsBlinking] = useState(false);

  // подмигивание
  useEffect(() => {
    let blinkInterval;
    if (isSinging) {
      blinkInterval = setInterval(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }, 1000);
    } else {
      setIsBlinking(false);
    }
    return () => clearInterval(blinkInterval);
  }, [isSinging]);

  // Обновляем ref при изменении пропа
  useEffect(() => {
    singingRef.current = isSinging;
  }, [isSinging]);

  const wiggle = () => {
    if (!singingRef.current) return;
    animationRef.current = Animated.sequence([
      Animated.timing(earScale, {
        toValue: 1.1,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(earScale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(earScale, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(earScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => wiggle());
  };

  useEffect(() => {
    if (isSinging) {
      earScale.setValue(1);
      wiggle();
    } else {
      if (animationRef.current) animationRef.current.stop();
      earScale.setValue(1);
    }
    return () => {
      if (animationRef.current) animationRef.current.stop();
      earScale.setValue(1);
    };
  }, [isSinging]);

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 1537 965"
      preserveAspectRatio="xMidYMid meet"
      style={style}
    >
      <G transform="translate(-170,250)">
        <Den />

        {/* Левое ухо */}
        <G transform="translate(440, 450) rotate(-5)">
          <AnimatedG transform={[{ scaleY: earScale }]}>
            <Ear />
          </AnimatedG>
        </G>

        {/* Правое ухо */}
        <G transform="translate(790, 460) rotate(110)">
          <AnimatedG transform={[{ scaleY: earScale }]}>
            <Ear />
          </AnimatedG>
        </G>

        <G transform="translate(480, 450)">
          <Body />
          <G transform="translate(96, 130)">
            <Mouth />
          </G>

          {/* Левый глаз – мигающий */}
          <G transform="translate(160, 30) scale(0.7)">
            <BlinkEye
              blink={isBlinking}
              //зрачок
              //точка
              pupilX={30}
              pupilY={10}
              //черный глаз
              pointX={26}
              pointY={8}
              //линия подмигивания
              lineX1={60}
              lineX2={40}
              lineY={40}
            />
          </G>
          {/* Правый глаз – мигающий */}
          <G transform="translate(40, 30) scale(0.7)">
            <BlinkEye
              blink={isBlinking}
              pupilX={30}
              pupilY={10}
              pointX={26}
              pointY={8}
              lineX1={60}
              lineX2={40}
              lineY={40}
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default Bear;
