import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
  ScrollView,
} from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import RacetrackDetailsScreen from './RacetrackDetailsScreen';

const fontMontserratRegular = 'Montserrat-Regular';

const RacetracksScreen = ({ setSelectedScreen, racetracks, setRacetracks }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isRacetrackDetailsVisible, setIsRacetrackDetailsVisible] = useState(false);
  const [selectedRacetrack, setSelectedRacetrack] = useState(null);

  return (
    <View style={{
      display: 'flex',
      alignSelf: 'center',
      width: '100%',
      alignItems: 'center',
      flex: 1
    }}>
      <View style={{
        backgroundColor: '#23263C',
        width: dimensions.width,
        height: dimensions.height * 0.12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: dimensions.width * 0.07,
        paddingHorizontal: dimensions.width * 0.05,
        paddingTop: dimensions.height * 0.05,
        zIndex: 5
      }}>
        {isRacetrackDetailsVisible ? (
          <TouchableOpacity onPress={() => {
            setIsRacetrackDetailsVisible(false);
          }} style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: dimensions.height * 0.019,
            alignSelf: 'flex-start',
          }}>
            <ChevronLeftIcon size={dimensions.height * 0.03} color='#0A84FF' />
            <Text
              style={{
                fontFamily: fontMontserratRegular,
                color: '#0A84FF',
                fontSize: dimensions.width * 0.04,
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: 400,
                marginLeft: dimensions.width * 0.01,
              }}>
              Back
            </Text>
          </TouchableOpacity>
        ) : (
          <Text></Text>
        )}
        <Text
          style={{
            fontFamily: fontMontserratRegular,
            color: 'white',
            fontSize: dimensions.width * 0.046,
            textAlign: 'center',
            alignSelf: 'center',
            paddingHorizontal: dimensions.width * 0.05,
            fontWeight: 600,
            marginLeft: !isRacetrackDetailsVisible ? dimensions.width * 0.043 : -dimensions.width * 0.111,
          }}>
          My racetracks
        </Text>

        <TouchableOpacity onPress={() => {
          setSelectedScreen('Settings');
        }}>
          <Image
            source={require('../assets/icons/settingsIcon.png')}
            style={{
              width: dimensions.height * 0.03,
              height: dimensions.height * 0.03,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {!isRacetrackDetailsVisible ? (
        <>
          {racetracks.length === 0 ? (
            <View style={{
              width: dimensions.width * 0.9,
              marginTop: dimensions.height * 0.016,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#23263C',
              borderRadius: dimensions.width * 0.05,
              padding: dimensions.width * 0.05,
            }}>
              <Image
                source={require('../assets/images/racetrackHorseImage.png')}
                style={{
                  width: dimensions.width * 0.7,
                  height: dimensions.height * 0.25,
                  marginBottom: dimensions.height * 0.01,
                }}
                resizeMode='contain'
              />

              <Text
                style={{
                  fontFamily: fontMontserratRegular,
                  color: 'white',
                  fontSize: dimensions.width * 0.055,
                  textAlign: 'center',
                  alignSelf: 'center',
                  paddingHorizontal: dimensions.width * 0.05,
                  fontWeight: 300,
                }}>
                You don't have anything here yet
              </Text>

              <Text
                style={{
                  fontFamily: fontMontserratRegular,
                  color: 'white',
                  opacity: 0.77,
                  fontSize: dimensions.width * 0.034,
                  textAlign: 'center',
                  alignSelf: 'center',
                  paddingHorizontal: dimensions.width * 0.05,
                  marginTop: dimensions.height * 0.016,
                  fontWeight: 300,
                }}>
                Click the button to add your racetrack
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setSelectedScreen('AddRacetrack');
                  // addRacetrackScreen();
                }}
                style={{
                  backgroundColor: 'white',
                  width: dimensions.width * 0.8,
                  borderRadius: dimensions.width * 0.055,
                  padding: dimensions.width * 0.05,
                  marginTop: dimensions.height * 0.03,
                }}>
                <Text
                  style={{
                    fontFamily: fontMontserratRegular,
                    color: '#181A29',
                    fontSize: dimensions.width * 0.05,
                    textAlign: 'center',
                    alignSelf: 'center',
                    paddingHorizontal: dimensions.width * 0.05,
                    fontWeight: 300,
                  }}>
                  Add racetrack
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  setSelectedScreen('AddRacetrack')
                }}
                style={{
                  backgroundColor: 'white',
                  width: dimensions.width * 0.9,
                  borderRadius: dimensions.width * 0.055,
                  padding: dimensions.width * 0.05,
                  marginTop: dimensions.height * 0.016,
                }}>
                <Text
                  style={{
                    fontFamily: fontMontserratRegular,
                    color: '#181A29',
                    fontSize: dimensions.width * 0.05,
                    textAlign: 'center',
                    alignSelf: 'center',
                    paddingHorizontal: dimensions.width * 0.05,
                    fontWeight: 300,
                  }}>
                  Add racetrack
                </Text>
              </TouchableOpacity>

              <ScrollView>
                <View style={{
                  alignSelf: 'center',
                  paddingBottom: dimensions.height * 0.19,
                }}>
                  {racetracks.map((racetrack) => (
                    <TouchableOpacity
                      key={racetrack.id}
                      onPress={() => {
                        setSelectedRacetrack(racetrack);
                        setIsRacetrackDetailsVisible(true);
                      }}
                      style={{
                        width: dimensions.width * 0.9,
                        marginTop: dimensions.height * 0.016,
                        alignSelf: 'center',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        backgroundColor: '#23263C',
                        borderRadius: dimensions.width * 0.05,
                        padding: dimensions.width * 0.05,
                      }}>
                      {racetrack.image ? (
                        <Image
                          source={{ uri: racetrack.image }}
                          style={{
                            width: dimensions.width * 0.4,
                            height: dimensions.width * 0.28,
                            borderRadius: dimensions.width * 0.019,
                          }}
                          resizeMode="stretch"
                        />
                      ) : (
                        <View style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'flex-start',
                          width: dimensions.width * 0.4,
                          height: dimensions.width * 0.28,
                          backgroundColor: 'white',
                          borderRadius: dimensions.width * 0.5,
                          marginBottom: dimensions.height * 0.01,
                        }}>
                          <Image
                            source={require('../assets/images/photoImage.png')}
                            style={{
                              width: dimensions.width * 0.05,
                              height: dimensions.width * 0.05,
                              textAlign: 'center',
                              opacity: 0.7,
                            }}
                            resizeMode="contain"
                          />
                        </View>
                      )}

                      <Text
                        style={{
                          fontFamily: fontMontserratRegular,
                          color: 'white',
                          fontSize: dimensions.width * 0.05,
                          textAlign: 'left',
                          alignSelf: 'flex-start',
                          fontWeight: 300,
                          marginTop: dimensions.height * 0.019,
                        }}>
                        {racetrack.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </>
          )}
        </>
      ) : (
        <RacetrackDetailsScreen selectedRacetrack={selectedRacetrack} setSelectedRacetrack={setSelectedRacetrack} setRacetracks={setRacetracks} setIsRacetrackDetailsVisible={setIsRacetrackDetailsVisible} racetracks={racetracks}/>
      )}
    </View>
  );
};

export default RacetracksScreen;
