import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';

import {
  ImageBackground,
  StyleSheet,
  Text,
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
  const [showStartButton, setShowStartButton] = useState(true);
  const [isWaving, setIsWaving] = useState(false);
  const [isBirdPlaying, setIsBirdPlaying] = useState(false);
  const [preloadedBirdSound, setPreloadedBirdSound] = useState(null);

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

  const greetingBird = () => {
    return new Promise(async (resolve) => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/sounds/lesson1/2.mp3'), // свой звук для птички
        );
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
            resolve(); // разрешаем Promise после окончания
          }
        });
      } catch (error) {
        console.error('Ошибка воспроизведения приветствия птички:', error);
        resolve(); // разрешаем даже при ошибке, чтобы цепочка продолжилась
      }
    });
  };

  const greeting = async () => {
    setShowStartButton(false);
    setIsWaving(true);

    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/lesson1/1.mp3'),
      );
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          await sound.unloadAsync();
          // Ждём окончания приветствия птички
          await greetingBird();
          // Затем пение птички (bird.mp3):
          await playBirdSound();
          // После всего выключаем махание
          setIsWaving(false);
        }
      });
    } catch (error) {
      setShowStartButton(false);
      console.error('Ошибка воспроизведения:', error);
      setIsWaving(false);
    }
  };

  const playBirdSound = async () => {
    if (!preloadedBirdSound) return;
    setIsBirdPlaying(true);
    try {
      await preloadedBirdSound.setPositionAsync(0);
      await preloadedBirdSound.playAsync();
      preloadedBirdSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsBirdPlaying(false);
        }
      });
    } catch (error) {
      console.error(error);
      setIsBirdPlaying(false);
    }
  };

  useEffect(() => {
    const preloadBirdSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/sounds/lesson1/bird.mp3'),
        );
        setPreloadedBirdSound(sound);
        // Можно также сразу установить аудиорежим
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: false,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.error('Ошибка предзагрузки bird.mp3', error);
      }
    };
    preloadBirdSound();

    // Очистка при размонтировании
    return () => {
      if (preloadedBirdSound) {
        preloadedBirdSound.unloadAsync();
      }
    };
  }, []);

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
            // backgroundColor: 'yellow',
            // borderWidth: 1,
            // borderColor: 'white',
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
                onPress={playBirdSound}
                // onPress={() => console.log('жми на птичку')}
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
                <Bird scale={2} isSinging={isBirdPlaying} />
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
              <TouchableOpacity
                onPress={greeting}
                style={{
                  width: '20%',
                  height: 'auto',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: [{ translateX: 20 }, { translateY: -20 }],
                  backgroundColor: '#2196F3',
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: '#ffffff',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 5,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  opacity: showStartButton ? 1 : 0, // скрываем визуально
                }}
                activeOpacity={0.7}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: 'white',
                    transform: [{ rotate: '90deg' }],
                    // чтобы текст не обрезался, можно задать минимальную ширину
                    width: 100, // ширина после поворота = исходная высота текста
                    textAlign: 'center',
                  }}
                >
                  Начать
                </Text>
              </TouchableOpacity>

              <Ushastic scale={1} isWaving={isWaving} />

              <View
                style={{
                  width: '25%',
                  height: '33.333%',
                  // backgroundColor: 'yellow',
                  // borderWidth: 1,
                  // borderColor: 'white',
                  transform: [{ rotate: '90deg' }],
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => console.log('Repeat pressed')}
                  activeOpacity={0.7}
                  style={{
                    transform: [{ translateX: 50 }, { translateY: 10 }],
                    width: 60,
                    height: 60,
                    backgroundColor: 'rgba(255, 255, 255, 0.35)',
                    borderRadius: 30, // половина ширины для круга (опционально)
                    borderWidth: 1.5,
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 3,
                  }}
                >
                  <Repeat
                    width={60}
                    height={60}
                    style={{
                      transform: [{ translateX: 14 }, { translateY: 12 }],
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => console.log('Save pressed')}
                  activeOpacity={0.6}
                  style={{
                    transform: [
                      { scale: 1.5 },
                      { translateX: 70 },
                      { translateY: 8 },
                    ],
                    width: 40,
                    height: 40,
                    // добавляем визуальное оформление
                    backgroundColor: 'rgba(255, 255, 255, 0.35)',
                    borderRadius: 40,
                    borderWidth: 1.5,
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 3,
                  }}
                >
                  <Save width={24} height={24} />
                </TouchableOpacity>
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
                  // backgroundColor: 'green',
                  // borderWidth: 1,
                  // borderColor: 'white',
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
                  <TouchableOpacity
                    onPress={() => console.log('Home pressed')}
                    activeOpacity={0.7}
                    style={{
                      transform: [{ translateX: 70 }, { translateY: 0 }],
                      padding: 12,
                      backgroundColor: 'rgba(255, 255, 255, 0.35)',
                      borderRadius: 40,
                      borderWidth: 1.5,
                      borderColor: 'rgba(255, 255, 255, 0.8)',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                      elevation: 3,
                    }}
                  >
                    <Home width={40} height={40} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => console.log('ArrowRight pressed')}
                    activeOpacity={0.6}
                    style={{
                      transform: [{ translateX: 100 }, { translateY: 0 }],
                      padding: 12,
                      backgroundColor: 'rgba(255, 255, 255, 0.35)',
                      borderRadius: 40,
                      borderWidth: 1.5,
                      borderColor: 'rgba(255, 255, 255, 0.8)',
                      // необязательная тень
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                      elevation: 3,
                    }}
                  >
                    <ArrowRight width={40} height={40} />
                  </TouchableOpacity>
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
