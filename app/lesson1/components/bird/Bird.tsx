import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { G, Svg } from 'react-native-svg';
import Fowl from './Fowl';
import Tree from './Tree';
import Wing from './Wing';

const AnimatedG = Animated.createAnimatedComponent(G);

const Bird = ({ scale = 1, isSinging = false }) => {
  const wingRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isActive = true;
    const animate = () => {
      if (!isActive) return;
      Animated.sequence([
        Animated.timing(wingRotate, {
          toValue: 15,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(wingRotate, {
          toValue: -15,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (isSinging && isActive) animate();
      });
    };
    if (isSinging) {
      wingRotate.setValue(0);
      animate();
    } else {
      Animated.timing(wingRotate, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
    return () => {
      isActive = false;
      wingRotate.stopAnimation();
    };
  }, [isSinging]);

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 2500 2000"
      preserveAspectRatio="xMidYMid meet"
    >
      <G transform={[{ scale }]}>
        <Tree />
        <G transform="translate(800,500)">
          <Fowl scale={1.8} />
          <G transform="translate(100, 100)">
            <AnimatedG
              transform={[
                {
                  rotate: wingRotate.interpolate({
                    inputRange: [-30, 30],
                    outputRange: ['-30deg', '30deg'],
                  }),
                },
              ]}
            >
              <Wing scale={1.8} />
            </AnimatedG>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default Bird;
