import { Audio } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';

import {
  Animated,
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
  const [waitingForRepeat, setWaitingForRepeat] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [isBearPlaying, setIsBearPlaying] = useState(false);
  const [waitingForBearRepeat, setWaitingForBearRepeat] = useState(false);
  const bearPulseAnim = useRef(new Animated.Value(1)).current;
  const [isBearSinging, setIsBearSinging] = useState(false);

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
          require('../../assets/sounds/lesson1/2ru.mp3'),
        );
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
            resolve();
          }
        });
      } catch (error) {
        console.error('Ошибка воспроизведения приветствия птички:', error);
        resolve();
      }
    });
  };

  const greeting = async () => {
    setShowStartButton(false);
    setIsWaving(true);

    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/lesson1/1ru.mp3'),
      );
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          await sound.unloadAsync();
          await greetingBird();
          await playBirdSound();
          setWaitingForRepeat(true);
          setIsWaving(true);
        }
      });
    } catch (error) {
      setShowStartButton(false);
      console.error('Ошибка воспроизведения:', error);
      setIsWaving(false);
    }
  };

  const playBirdSound = () => {
    return new Promise(async (resolve) => {
      setIsBirdPlaying(true);
      if (!preloadedBirdSound) {
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/sounds/lesson1/bird.mp3'),
        );
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
            setIsBirdPlaying(false);
            resolve();
          }
        });
        return;
      }
      await preloadedBirdSound.setPositionAsync(0);
      await preloadedBirdSound.playAsync();
      preloadedBirdSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsBirdPlaying(false);
          resolve();
        }
      });
    });
  };

  const playBirdSoundRepeat = () => {
    return new Promise(async (resolve) => {
      setIsBirdPlaying(true);
      if (!preloadedBirdSound) {
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/sounds/lesson1/bird.mp3'),
        );
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
            setIsBirdPlaying(false);
            resolve();
          }
        });
        return;
      }
      await preloadedBirdSound.setPositionAsync(0);
      await preloadedBirdSound.playAsync();
      preloadedBirdSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsBirdPlaying(false);
          resolve();
        }
      });
    });
  };

  const greetingBear = () => {
    return new Promise(async (resolve) => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/sounds/lesson1/3ru.mp3'),
        );
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate(async (status) => {
          if (status.isLoaded && status.didJustFinish) {
            await sound.unloadAsync();
            await playBearSinging();
            setWaitingForBearRepeat(true); // после пения медведя – подсветка
            resolve();
          }
        });
      } catch (error) {
        console.error('Ошибка воспроизведения приветствия медведя:', error);
        resolve();
      }
    });
  };

  const playBearSound = async () => {
    if (isBearPlaying) return;
    setIsBearPlaying(true);
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/lesson1/bear.mp3'),
      );
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
          setIsBearPlaying(false);
        }
      });
    } catch (error) {
      console.error('Ошибка воспроизведения звука медведя:', error);
      setIsBearPlaying(false);
    }
  };

  const playBearSinging = () => {
    return new Promise(async (resolve) => {
      // Принудительно сбрасываем и перезапускаем анимацию
      setIsBearSinging(false);
      // Даём React отрендерить сброс
      await new Promise((r) => setTimeout(r, 0));
      setIsBearSinging(true);
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/sounds/lesson1/bear.mp3'),
        );
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
            setIsBearSinging(false);
            resolve();
          }
        });
      } catch (error) {
        console.error('Ошибка воспроизведения пения медведя:', error);
        setIsBearSinging(false);
        resolve();
      }
    });
  };
  // Анимация пульсации для птички
  useEffect(() => {
    if (waitingForRepeat) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.5,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
      pulseAnim.stopAnimation();
    }
  }, [waitingForRepeat]);

  // Анимация пульсации для медведя
  useEffect(() => {
    if (waitingForBearRepeat) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bearPulseAnim, {
            toValue: 0.5,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(bearPulseAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      bearPulseAnim.setValue(1);
      bearPulseAnim.stopAnimation();
    }
  }, [waitingForBearRepeat]);

  useEffect(() => {
    const preloadBirdSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/sounds/lesson1/bird.mp3'),
        );
        setPreloadedBirdSound(sound);
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
        {/* Абсолютно позиционированные морковки */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ rotate: '90deg' }],
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
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ width: '100%', flex: 1 }}>
            {/* Первая строка – птичка */}
            <View
              style={{ width: '100%', height: '33.33%', flexDirection: 'row' }}
            >
              <View style={{ position: 'relative', width: 200, height: 500 }}>
                <TouchableOpacity
                  onPress={async () => {
                    if (waitingForRepeat) {
                      setWaitingForRepeat(false);
                      await playBirdSoundRepeat();
                      await greetingBear();
                      setIsWaving(false);
                    } else {
                      await playBirdSound();
                    }
                  }}
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

                {waitingForRepeat && (
                  <Animated.View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      transform: [
                        { translateX: 90 },
                        { translateY: 0 },
                        { rotate: '90deg' },
                      ],
                      width: 140,
                      height: 240,
                      backgroundColor: 'rgba(255, 255, 0, 0.3)',
                      borderRadius: 20,
                      opacity: pulseAnim,
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </View>
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
                  opacity: showStartButton ? 1 : 0,
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
                    width: 100,
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
                    borderRadius: 30,
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
            </View>

            {/* Третья строка – медведь */}
            <View
              style={{ width: '100%', height: '33.333%', flexDirection: 'row' }}
            >
              <View style={{ position: 'relative', width: 270, height: 300 }}>
                <TouchableOpacity
                  onPress={async () => {
                    if (waitingForBearRepeat) {
                      setWaitingForBearRepeat(false);
                    }
                    await playBearSinging(); // вызываем пение с анимацией всегда
                  }}
                  activeOpacity={0.9}
                  style={{
                    width: 270,
                    height: 300,
                    transform: [{ rotate: '90deg' }],
                  }}
                >
                  <Bear isSinging={isBearSinging} />
                </TouchableOpacity>

                {waitingForBearRepeat && (
                  <Animated.View
                    style={{
                      position: 'absolute',
                      top: 50,
                      left: 0,
                      width: 200,
                      height: 140,
                      transform: [{ rotate: '90deg' }],
                      backgroundColor: 'rgba(255, 255, 0, 0.3)',
                      borderRadius: 20,
                      opacity: bearPulseAnim,
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </View>

              <View
                style={{
                  width: '25%',
                  height: '100%',
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
