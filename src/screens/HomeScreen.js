import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import localsData from '../components/localsData';
import SettingsScreen from './SettingsScreen';
import { ScrollView } from 'react-native-gesture-handler';
import LocDetailsScreen from './LocDetailsScreen';
import RacetracksScreen from './RacetracksScreen';
import AddRacetrackScreen from './AddRacetrackScreen';
import HorsesScreen from './HorsesScreen';
import AddHorseScreen from './AddHorseScreen';
import QuizzHippodromeScreen from './QuizzHippodromeScreen';

const fontMontserratRegular = 'Montserrat-Regular';
const fontDMSansRegular = 'DMSans18pt-Regular';
const fontDMSansBlack = 'DMSans18pt-Black';

const bottomBtns = [
  {
    id: 1,
    screen: 'Home',
    title: 'Local',
    btnIcon: require('../assets/icons/buttons/homeIcon.png'),
  },
  {
    id: 2,
    screen: 'Racetracks',
    title: 'My racetracks',
    btnIcon: require('../assets/icons/buttons/racetrackIcon.png'),
  },
  {
    id: 3,
    screen: 'Horses',
    title: 'My horses',
    btnIcon: require('../assets/icons/buttons/horseIcon.png'),
  },
  {
    id: 4,
    screen: 'Quiz',
    title: 'Quiz',
    btnIcon: require('../assets/icons/buttons/quizIcon.png'),
  },
]

const HomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedScreen, setSelectedScreen] = useState('Home');
  const [selectedHippodromeLoc, setSelectedHippodromeLoc] = useState(null);
  const [racetracks, setRacetracks] = useState([]);
  const [horses, setHorses] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const [selectedAverageMode, setSelectedAverageMode] = useState('By days');

  useEffect(() => {
    const loadRacetracks = async () => {
      try {
        const storedRacetracks = await AsyncStorage.getItem('racetracks');
        if (storedRacetracks) {
          setRacetracks(JSON.parse(storedRacetracks));
        }
      } catch (error) {
        console.error('Error loading racetracks:', error);
      }
    };

    loadRacetracks();
  }, [selectedScreen, racetracks]);


  useEffect(() => {
    const loadHorses = async () => {
      try {
        const storedHorses = await AsyncStorage.getItem('horses');
        if (storedHorses) {
          setHorses(JSON.parse(storedHorses));
        }
      } catch (error) {
        console.error('Error loading horses:', error);
      }
    };

    loadHorses();
  }, [selectedScreen, racetracks]);

  return (
    <View style={{
      flex: 1,
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: '#0D0D0D',
    }}>
      {selectedScreen === 'Home' ? (
        <View style={{
          flex: 1,
          paddingHorizontal: dimensions.width * 0.05,
          width: dimensions.width,
        }}>
          <SafeAreaView style={{
            backgroundColor: '#0D0D0D',
            width: dimensions.width,
            paddingVertical: dimensions.height * 0.03,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            borderBottomColor: 'rgba(255, 255, 255, 0.39)',
            borderBottomWidth: dimensions.width * 0.003,
            paddingHorizontal: dimensions.width * 0.05,
            zIndex: 5
          }}>
            <Text></Text>
            <Text
              style={{
                fontFamily: fontDMSansRegular,
                color: 'white',
                fontSize: dimensions.width * 0.046,
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: 700,
                marginLeft: dimensions.width * 0.043,
                paddingBottom: dimensions.height * 0.01,
              }}>
              My Music City
            </Text>

            <TouchableOpacity onPress={() => {
              setSelectedScreen('Settings');
            }}>
              <Image
                source={require('../assets/icons/goldSettingsIcon.png')}
                style={{
                  width: dimensions.height * 0.03,
                  height: dimensions.height * 0.03,
                  right: dimensions.width * 0.05,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </SafeAreaView>

          <ScrollView showsVerticalScrollIndicator={false} style={{
            width: dimensions.width,
            alignSelf: 'center',
          }}>
            <View style={{
              width: dimensions.width,
              paddingBottom: dimensions.height * 0.16,
              alignSelf: 'center',
            }}>

              <View style={{
                marginTop: dimensions.height * 0.03,
                width: dimensions.width * 0.9,
                backgroundColor: '#202020',
                borderRadius: dimensions.width * 0.034,
                alignSelf: 'center',
                padding: dimensions.width * 0.01,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: dimensions.height * 0.016,
                paddingHorizontal: dimensions.width * 0.05,
              }}>
                <View style={{
                  width: dimensions.width * 0.4,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: dimensions.height * 0.01,
                }}>
                  <Text
                    style={{
                      fontFamily: fontDMSansRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.034,
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      fontWeight: 300,
                      flex: 1
                    }}>
                    Total listening time
                  </Text>

                  <Text
                    style={{
                      fontFamily: fontDMSansBlack,
                      color: 'white',
                      fontSize: dimensions.width * 0.0777,
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      marginTop: dimensions.height * 0.03,
                    }}>
                    10033
                  </Text>
                </View>

                <View style={{
                  width: dimensions.width * 0.4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Image
                    source={require('../assets/images/totalListeningImage.png')}
                    style={{
                      width: dimensions.width * 0.3,
                      height: dimensions.width * 0.3,
                      alignSelf: 'flex-end',
                    }}
                    resizeMode='contain'
                  />
                </View>
              </View>

              <View style={{
                alignSelf: 'center',
                width: dimensions.width * 0.9,
                marginTop: dimensions.height * 0.025,
              }}>
                <Text
                  style={{
                    fontFamily: fontDMSansRegular,
                    color: 'white',
                    fontSize: dimensions.width * 0.034,
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                    fontWeight: 300,

                  }}>
                  Average listening time
                </Text>

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginTop: dimensions.height * 0.01,
                }}>
                  {['By days', 'By weeks', 'By months'].map((button, index) => (
                    <TouchableOpacity
                      onPress={() => setSelectedAverageMode(button)}
                      key={index} style={{
                        backgroundColor: selectedAverageMode === button ? '#202020' : 'transparent',
                        borderRadius: dimensions.width * 0.019,
                        paddingHorizontal: dimensions.width * 0.02,
                        paddingVertical: dimensions.height * 0.014,
                        marginRight: dimensions.width * 0.02,
                        borderColor: 'white',
                        borderWidth: selectedAverageMode !== button ? dimensions.width * 0.0019 : 0,
                        width: dimensions.width * 0.25,
                      }}>
                      <Text
                        style={{
                          fontFamily: fontDMSansRegular,
                          color: 'white',
                          fontSize: dimensions.width * 0.035,
                          textAlign: 'center',
                          fontWeight: 300,
                          opacity: selectedAverageMode === button ? 1 : 0.3,
                        }}>
                        {button}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={{
                  marginTop: dimensions.height * 0.016,
                  width: dimensions.width * 0.9,
                  backgroundColor: '#202020',
                  borderRadius: dimensions.width * 0.034,
                  alignSelf: 'center',
                  padding: dimensions.width * 0.01,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: dimensions.height * 0.016,
                  paddingHorizontal: dimensions.width * 0.05,
                }}>
                  <View style={{
                    width: dimensions.width * 0.4,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: dimensions.height * 0.01,
                  }}>
                    <Text
                      style={{
                        fontFamily: fontDMSansRegular,
                        color: 'white',
                        fontSize: dimensions.width * 0.034,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        fontWeight: 300,
                        flex: 1
                      }}>
                      {selectedAverageMode === 'By days' ? 'Today' : selectedAverageMode === 'By weeks' ? 'Week' : 'Month'} listened
                    </Text>

                    <Text
                      style={{
                        fontFamily: fontDMSansBlack,
                        color: 'white',
                        fontSize: dimensions.width * 0.0777,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        marginTop: dimensions.height * 0.03,
                      }}>
                      10033
                    </Text>
                  </View>

                  <View style={{
                    width: dimensions.width * 0.4,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Image
                      source={require('../assets/images/headphonesImage.png')}
                      style={{
                        width: dimensions.width * 0.3,
                        height: dimensions.width * 0.3,
                        alignSelf: 'flex-end',
                      }}
                      resizeMode='contain'
                    />
                  </View>
                </View>



              </View>

              <SafeAreaView style={{
                flex: 1,
                width: dimensions.width,
              }}>
                {localsData.map((location, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedScreen('LocDetails');
                      setSelectedHippodromeLoc(location);
                    }}
                    key={index} style={{
                      width: dimensions.width * 0.9,
                      alignSelf: 'center',
                      backgroundColor: '#23263C',
                      borderRadius: dimensions.width * 0.05,
                      padding: dimensions.width * 0.04,
                      marginTop: dimensions.height * 0.023,
                    }}>
                    <Image
                      source={location.image}
                      style={{
                        width: dimensions.width * 0.8,
                        height: dimensions.height * 0.2,
                        alignSelf: 'center',
                        borderRadius: dimensions.width * 0.04,
                      }}
                      resizeMode='stretch'
                    />

                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignSelf: 'center',
                      width: dimensions.width * 0.79,
                      marginTop: dimensions.height * 0.023,
                    }}>
                      <Text
                        style={{
                          fontFamily: fontMontserratRegular,
                          color: 'white',
                          fontSize: dimensions.width * 0.04,
                          textAlign: 'left',
                          fontWeight: 600,
                          maxWidth: dimensions.width * 0.61,
                        }}>
                        {location.title}
                      </Text>

                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                        <Text
                          style={{
                            fontFamily: fontMontserratRegular,
                            color: 'white',
                            fontSize: dimensions.width * 0.04,
                            textAlign: 'center',
                            fontWeight: 500,
                            marginLeft: dimensions.width * 0.043,
                          }}>
                          5.0
                        </Text>

                        <Image
                          source={require('../assets/icons/starIcon.png')}
                          style={{
                            width: dimensions.height * 0.021,
                            height: dimensions.height * 0.021,
                            marginLeft: dimensions.width * 0.016,
                          }}
                          resizeMode='contain'
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </SafeAreaView>
            </View>
          </ScrollView>
        </View>
      ) : selectedScreen === 'LocDetails' ? (
        <LocDetailsScreen setSelectedScreen={setSelectedScreen} selectedHippodromeLoc={selectedHippodromeLoc} setSelectedHippodromeLoc={setSelectedHippodromeLoc} />
      ) : selectedScreen === 'Settings' ? (
        <SettingsScreen setSelectedScreen={setSelectedScreen} selectedScreen={selectedScreen} />
      ) : selectedScreen === 'Racetracks' ? (
        <RacetracksScreen setSelectedScreen={setSelectedScreen} racetracks={racetracks} setRacetracks={setRacetracks} />
      ) : selectedScreen === 'Horses' ? (
        <HorsesScreen setSelectedScreen={setSelectedScreen} horses={horses} setHorses={setHorses} />
      ) : selectedScreen === 'AddRacetrack' ? (
        <AddRacetrackScreen setSelectedScreen={setSelectedScreen} racetracks={racetracks} setRacetracks={setRacetracks} />
      ) : selectedScreen === 'AddHorse' ? (
        <AddHorseScreen setSelectedScreen={setSelectedScreen} horses={horses} setHorses={setHorses} />
      ) : selectedScreen === 'Quiz' ? (
        <QuizzHippodromeScreen setSelectedScreen={setSelectedScreen} isQuizStarted={isQuizStarted} setIsQuizStarted={setIsQuizStarted} />
      ) : null}

      {selectedScreen !== 'BubblesGame' &&
        selectedScreen !== 'LocDetails' &&
        selectedScreen !== 'Settings' &&
        !(selectedScreen === 'Quiz' && isQuizStarted) && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              backgroundColor: '#0D0D0D',
              width: dimensions.width,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignSelf: 'center',
              paddingTop: dimensions.height * 0.004,
              paddingBottom: dimensions.height * 0.019,
              paddingHorizontal: dimensions.width * 0.07,
              zIndex: 5000,
              borderTopColor: 'rgba(255, 255, 255, 0.39)',
              borderTopWidth: dimensions.width * 0.003,
            }}
          >
            {bottomBtns.map((button, index) => (
              <TouchableOpacity
                key={button.id}
                onPress={() => setSelectedScreen(button.screen)}
                style={{
                  padding: dimensions.height * 0.01,
                  alignItems: 'center',
                  opacity: selectedScreen === button.screen ? 1 : 0.5,
                }}
              >
                <Image
                  source={button.btnIcon}
                  style={{
                    width: dimensions.height * 0.028,
                    height: dimensions.height * 0.028,
                    textAlign: 'center'
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontFamily: fontMontserratRegular,
                    color: 'white',
                    fontSize: dimensions.width * 0.03,
                    textAlign: 'center',
                    fontWeight: 300,
                    marginTop: dimensions.height * 0.01,
                  }}>
                  {button.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
    </View>
  );
};

export default HomeScreen;
