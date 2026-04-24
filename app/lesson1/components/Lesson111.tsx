import React from 'react';
import { View } from 'react-native';

const Lesson1 = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Первая строка */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 4, backgroundColor: 'red', margin: 0 }} />
        {/* <View style={{ flex: 1, backgroundColor: 'green', margin: 0 }} /> */}
      </View>
      {/* Вторая строка */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, backgroundColor: 'blue', margin: 0 }} />
        <View style={{ flex: 2, backgroundColor: 'yellow', margin: 0 }} />
        <View style={{ flex: 1, backgroundColor: 'blue', margin: 0 }} />
      </View>
      {/* Третья строка */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 2, backgroundColor: 'green', margin: 0 }} />
        <View style={{ flex: 1, backgroundColor: 'blue', margin: 0 }} />
        <View style={{ flex: 1, backgroundColor: 'green', margin: 0 }} />
      </View>
    </View>
  );
};

export default Lesson1;
