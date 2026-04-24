import { ImageBackground, StyleSheet, View } from 'react-native';
import Bear from './bear/Bear';
import Bird from './bird/Bird';
import Carrot from './menu/Carrot';
import Home from './menu/Home';
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
      // style={{ flex: 1 }}
      style={styles.background}
      resizeMode="stretch"
    >
      {/* Полупрозрачный слой поверх картинки */}
      <View style={styles.overlay}>
        <View
          style={{
            // width: 500,
            //height: 1000,
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Bird />
          <Carrot />
          <Home />
          <Ushastic />
          <Bear />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Lesson1;
