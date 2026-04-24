import React from 'react';
import { G, Svg } from 'react-native-svg';
import Fowl from './Fowl';
import Tree from './Tree';
import Wing from './Wing';

const Bird = ({ scale = 1, style }) => {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 2500 2000"
      preserveAspectRatio="xMidYMid meet"
      style={style} // ← теперь внешние трансформации будут работать
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
  );
};

export default Bird;
