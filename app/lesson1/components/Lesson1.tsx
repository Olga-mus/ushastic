import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Bear from './bear/Bear';
import Bird from './bird/Bird';
import ArrowRight from './menu/ArrowRight';
import Carrot from './menu/Carrot';
import Home from './menu/Home';
import Repeat from './menu/Repeat';
import Save from './menu/Save';
import Ushastic from './ushastic/Ushastic';
const Lesson1 = () => {
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  });

  return (
    <ImageBackground
      source={require('../../assets/images/forest.jpg')}
      style={styles.background}
      resizeMode="stretch"
    >
      <View style={styles.overlay}>
        {/* Абсолютно позиционированные морковки в левом верхнем углу */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ rotate: '90deg' }],
            backgroundColor: 'yellow',
            borderWidth: 1,
            borderColor: 'white',
            width: '24%',
            height: '25%',
            position: 'absolute',
            top: 20,
            left: 270,
          }}
        >
          <Carrot />
          <Carrot />
          <Carrot />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          {/* Контейнер сетки – занимает всю ширину */}
          <View style={{ width: '100%', flex: 1 }}>
            {/* Первая строка */}
            <View
              style={{ width: '100%', height: '33.33%', flexDirection: 'row' }}
            >
              <TouchableOpacity
                onPress={() => console.log('Bird')}
                activeOpacity={0.9}
                style={{
                  transform: [
                    { translateX: 140 },
                    { translateY: -150 },
                    { rotate: '90deg' },
                  ],
                  width: 200,
                  height: 500,
                }}
              >
                <Bird scale={2} />
              </TouchableOpacity>
            </View>

            {/* Вторая строка */}
            <View
              style={{
                width: '100%',
                height: '33.333%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  width: '25%',
                  height: '100%',
                  backgroundColor: 'blue',
                  borderWidth: 1,
                  borderColor: 'white',
                }}
              />

              <Ushastic scale={1} />

              <View
                style={{
                  width: '25%',
                  height: '33.333%',
                  backgroundColor: 'yellow',
                  borderWidth: 1,
                  borderColor: 'white',
                  transform: [{ rotate: '90deg' }],
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Repeat
                  style={{
                    transform: [{ translateX: 50 }, { translateY: 16 }],
                  }}
                />
                <View style={{ transform: [{ scale: 1.5 }] }}>
                  <Save
                    style={{
                      transform: [{ translateX: 70 }, { translateY: 0 }],
                    }}
                  />
                </View>
              </View>

              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: [{ rotate: '90deg' }],
                  backgroundColor: 'yellow',
                  borderWidth: 1,
                  borderColor: 'white',
                  width: '24%',
                  height: '25%',
                }}
              >
                <Carrot />
                <Carrot />
                <Carrot />
              </View> */}
            </View>

            {/* Третья строка */}
            <View
              style={{ width: '100%', height: '33.333%', flexDirection: 'row' }}
            >
              <TouchableOpacity
                onPress={() => console.log('Bear')}
                activeOpacity={0.9}
                style={{
                  width: 270,
                  height: 300,
                  transform: [{ rotate: '90deg' }],
                }}
              >
                <Bear />
              </TouchableOpacity>

              <View
                style={{
                  width: '25%',
                  height: '100%',
                  backgroundColor: 'green',
                  borderWidth: 1,
                  borderColor: 'white',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{ rotate: '90deg' }],
                  }}
                >
                  <Home
                    style={{
                      transform: [{ translateX: 120 }, { translateY: 0 }],
                    }}
                  />
                  <ArrowRight
                    style={{
                      transform: [{ translateX: 150 }, { translateY: 0 }],
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Lesson1;
