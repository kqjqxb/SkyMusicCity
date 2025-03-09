import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import Sound from 'react-native-sound';
import { useAudio } from '../context/AudioContext';

const fontMontserratRegular = 'Montserrat-Regular';
const fontDMSansRegular = 'DMSans18pt-Regular';
const fontDMSansBlack = 'DMSans18pt-Black';

const pianoWhiteButtonsSounds = [
  {
    id: 7,
    sound: require('../assets/sounds/piano12.wav'),
  },
  {
    id: 6,
    sound: require('../assets/sounds/piano10.wav'),
  },
  {
    id: 5,
    sound: require('../assets/sounds/piano9.wav'),
  },
  {
    id: 4,
    sound: require('../assets/sounds/piano7.wav'),
  },
  {
    id: 3,
    sound: require('../assets/sounds/piano6.wav'),
  },
  {
    id: 2,
    sound: require('../assets/sounds/piano3.wav'),
  },
  {
    id: 1,
    sound: require('../assets/sounds/piano1.wav'),
  },
  
  
  
  
  
  
]

const pianoBlackButtonsSounds = [
  {
    id: 1,
    sound: require('../assets/sounds/pianoBlack1.wav'),
  },
  {
    id: 2,
    sound: require('../assets/sounds/pianoBlack2.wav'),
  },
  {
    id: 3,
    sound: require('../assets/sounds/pianoBlack3.wav'),
  },
  {
    id: 4,
    sound: require('../assets/sounds/pianoBlack4.wav'),
  },
  {
    id: 5,
    sound: require('../assets/sounds/pianoBlack5.wav'),
  },
]

const PianoScreen = ({ setSelectedScreen, isPianoStarted, setIsPianoStarted }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  Sound.setCategory('Playback');

  const playSound = (soundFile) => {
    const sound = new Sound(soundFile, (error) => {
      if (error) {
        console.log('Помилка при завантаженні файлу:', error);
        return;
      }
      sound.setVolume(1);
      sound.play((success) => {
        if (!success) {
          console.log('Помилка при відтворенні звуку');
        }
        sound.release();
      });
    });
  };

  return (
    <View style={{
      display: 'flex',
      alignSelf: 'center',
      width: '100%',
      alignItems: 'center',
      flex: 1
    }}>
      {!isPianoStarted ? (
        <>
          <SafeAreaView style={{
            backgroundColor: '#0D0D0D',
            width: dimensions.width,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            borderBottomColor: 'rgba(255, 255, 255, 0.39)',
            borderBottomWidth: dimensions.width * 0.003,
            paddingHorizontal: dimensions.width * 0.05,
            zIndex: 5
          }}>
            <Text
              style={{
                fontFamily: fontDMSansRegular,
                color: 'white',
                fontSize: dimensions.width * 0.046,
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: 700,
                paddingBottom: dimensions.height * 0.016,
              }}>
              Sky Music City Game
            </Text>
          </SafeAreaView>
          <ImageBackground
            source={require('../assets/images/prePianoBg.png')}
            style={{
              width: dimensions.width,
              height: dimensions.height,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            resizeMode='contain'
          >
            <View style={{
              backgroundColor: 'white',
              width: dimensions.width * 0.8,
              borderRadius: dimensions.width * 0.05,
              padding: dimensions.width * 0.05,
              paddingVertical: dimensions.height * 0.0777,
              justifyContent: 'center',
              alignItems: 'center',
              bottom: dimensions.height * 0.1,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
            }}>

              <Image
                source={require('../assets/images/skyMusicCityImage.png')}
                style={{
                  width: dimensions.width * 0.7,
                  height: dimensions.width * 0.5,
                  alignSelf: 'center',
                }}
                resizeMode='contain'
              />

              <TouchableOpacity onPress={() => {
                setIsPianoStarted(true);
              }}
                style={{
                  alignSelf: 'center',
                }}
              >
                <Image
                  source={require('../assets/images/startPianoButton.png')}
                  style={{
                    width: dimensions.width * 0.3,
                    height: dimensions.width * 0.3,
                    borderRadius: dimensions.width * 0.05,
                    alignSelf: 'center',
                  }}
                  resizeMode='contain'
                />

              </TouchableOpacity>

            </View>

          </ImageBackground>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => {
            setIsPianoStarted(false);
          }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: dimensions.height * 0.07,
              alignSelf: 'flex-end',
              right: dimensions.width * 0.05,
              zIndex: 50
            }}
          >
            <Image
              source={require('../assets/icons/quitIcon.png')}
              style={{
                width: dimensions.width * 0.14,
                height: dimensions.width * 0.14,
              }}
              resizeMode='contain'
            />
          </TouchableOpacity>

          <View style={{ position: 'relative', height: dimensions.height }}>
            {pianoWhiteButtonsSounds.map((item, index) => (
              <TouchableOpacity
              onPress={() => {
                playSound(item.sound);
              }}
                key={index}
                style={{
                  width: dimensions.width * 0.97,
                  alignSelf: 'flex-end',
                  height: dimensions.height * 0.138,
                  backgroundColor: 'white',
                  color: 'white',
                  borderWidth: dimensions.width * 0.001,
                  borderColor: 'C0C0C0',
                  alignItems: 'center',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRadius: dimensions.width * 0.05,
                  borderLeftWidth: 0,
                  shadowColor: '#DEDEDE',
                  shadowOffset: {
                    width: -dimensions.width * 0.025,
                    height: 0,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 1,
                  elevation: 3,
                  zIndex: 1, // Lower zIndex for white keys
                }}
              />
            ))}
            <View style={{ position: 'absolute', width: '100%', top: dimensions.height * 0.226 }}>
              {pianoBlackButtonsSounds.map((item, index) => (
                <TouchableOpacity
                onPress={() => {
                  playSound(item.sound);
                }}
                  key={index}
                  style={{
                    width: dimensions.width * 0.4,
                    alignSelf: 'flex-end',
                    height: dimensions.height * 0.1,
                    backgroundColor: '#282828',
                    borderWidth: dimensions.width * 0.001,
                    borderColor: '#C0C0C0',
                    alignItems: 'center',
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderRadius: dimensions.width * 0.05,
                    borderLeftWidth: 0,
                    shadowColor: '#222222',
                    shadowOffset: {
                      width: -dimensions.width * 0.025,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 1,
                    elevation: 3,
                    zIndex: 2, // Higher zIndex for black keys
                    marginBottom: dimensions.height * 0.034,
                  }}
                />
              ))}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default PianoScreen;
