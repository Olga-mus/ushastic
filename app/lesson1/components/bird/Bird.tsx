import React from 'react';
import { View } from 'react-native';
import { G, Svg } from 'react-native-svg';
import Fowl from './Fowl';
import Tree from './Tree';
import Wing from './Wing';
const Bird = ({ scale, style }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: 'red',
        width: 500,
        height: 400,
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        transform: [{ rotate: '90deg' }],
      }}
    >
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
              <Wing scale={1.8} />
            </G>
          </G>
        </G>
      </Svg>
    </View>
  );
};

export default Bird;
