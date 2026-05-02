import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { G, Svg } from 'react-native-svg';
import EyeBlack from '../ushastic/EyeBlack';
import EyePoint from '../ushastic/EyePoint';
import EyeWhite from '../ushastic/EyeWhite';
import Body from './Body';
import Den from './Den';
import Ear from './Ear';
import Mouth from './Mouth';

const AnimatedG = Animated.createAnimatedComponent(G);

const Bear = ({ style, isSinging = false }) => {
  const earScale = useRef(new Animated.Value(1)).current;
  const singingRef = useRef(isSinging);
  const animationRef = useRef(null);

  // Обновляем ref при изменении пропа
  useEffect(() => {
    singingRef.current = isSinging;
  }, [isSinging]);

  const wiggle = () => {
    // Проверяем актуальное состояние через ref
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
    ]).start(() => {
      wiggle(); // следующий цикл только если isSinging всё ещё true
    });
  };

  useEffect(() => {
    if (isSinging) {
      earScale.setValue(1);
      wiggle();
    } else {
      // Останавливаем текущую анимацию
      if (animationRef.current) {
        animationRef.current.stop();
      }
      // Возвращаем масштаб в исходное положение
      earScale.setValue(1);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        earScale.setValue(1);
      }
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
          {/* Глаза */}
          <G transform="translate(160, 30) scale(0.7)">
            <EyeWhite />
            <G transform="translate(18, 20)">
              <EyeBlack />
              <G transform="translate(10, 0)">
                <EyePoint />
              </G>
            </G>
          </G>
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
    </Svg>
  );
};

export default Bear;
