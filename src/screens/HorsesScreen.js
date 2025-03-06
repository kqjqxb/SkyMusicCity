import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/solid';
import horseGuidesButtons from '../components/horseGuidesButtons';
import HorseDetailsScreen from './HorseDetailsScreen';

const fontMontserratRegular = 'Montserrat-Regular';

const HorsesScreen = ({ setSelectedScreen, horses, setHorses }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isHorseDetailsVisible, setIsHorseDetailsVisible] = useState(false);
  const [selectedHorse, setSelectedHorse] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);
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
        {isHorseDetailsVisible ? (
          <TouchableOpacity onPress={() => {
            setIsHorseDetailsVisible(false);
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
            marginLeft: !isHorseDetailsVisible ? dimensions.width * 0.043 : -dimensions.width * 0.111,
          }}>
          My horses
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

      {!isHorseDetailsVisible ? (
        <ScrollView>
          <View style={{
            width: dimensions.width,
            alignSelf: 'center',
            paddingBottom: dimensions.height * 0.19,
          }}>
            <View style={{
              width: dimensions.width * 0.9,
              alignSelf: 'center',
            }}>
              <Text
                style={{
                  fontFamily: fontMontserratRegular,
                  color: 'white',
                  opacity: 0.55,
                  fontSize: dimensions.width * 0.046,
                  textAlign: 'left',
                  alignSelf: 'flex-start',
                  fontWeight: 300,
                  marginTop: dimensions.height * 0.014,
                  marginBottom: dimensions.height * 0.007,
                }}>
                Guide for Horse Owners and Enthusiasts
              </Text>

              {horseGuidesButtons.map((button) => (
                <TouchableOpacity
                  key={button.id}
                  onPress={() => {
                    setSelectedGuide(button);
                    setModalVisible(true);
                  }}
                  style={{
                    width: dimensions.width * 0.9,
                    marginTop: dimensions.height * 0.008,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#23263C',
                    borderRadius: dimensions.width * 0.03,
                    paddingHorizontal: dimensions.width * 0.05,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fontMontserratRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.043,
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                      fontWeight: 300,
                      paddingVertical: dimensions.height * 0.021,
                      maxWidth: dimensions.width * 0.7,
                    }}>
                    {button.title}
                  </Text>
                  <ChevronRightIcon size={dimensions.height * 0.03} color='white' />
                </TouchableOpacity>
              ))}

              <Text
                style={{
                  fontFamily: fontMontserratRegular,
                  color: 'white',
                  opacity: 0.55,
                  fontSize: dimensions.width * 0.046,
                  textAlign: 'left',
                  alignSelf: 'flex-start',
                  fontWeight: 300,
                  marginTop: dimensions.height * 0.019,
                }}>
                My horses
              </Text>
              {horses.length === 0 ? (
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
                  <Text
                    style={{
                      fontFamily: fontMontserratRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.05,
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
                    Click the button to add your horse
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      setSelectedScreen('AddHorse')
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
                      Add horse
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedScreen('AddHorse');
                      // addHorse();
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
                      Add horse
                    </Text>
                  </TouchableOpacity>
                  <ScrollView>
                    <View style={{
                      alignSelf: 'center',
                      paddingBottom: dimensions.height * 0.19,
                    }}>
                      {horses.map((thisHorse) => (
                        <TouchableOpacity
                          key={thisHorse.id}
                          onPress={() => {
                            setSelectedHorse(thisHorse);
                            setIsHorseDetailsVisible(true);
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
                          {thisHorse.image ? (
                            <Image
                              source={{ uri: thisHorse.image }}
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
                            {thisHorse.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      ) : (
        <HorseDetailsScreen selectedHorse={selectedHorse} setSelectedHorse={setSelectedHorse} setHorses={setHorses} setIsHorseDetailsVisible={setIsHorseDetailsVisible} horses={horses} />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{
          flex: 1,
          backgroundColor: '#181A29',
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
            <TouchableOpacity onPress={() => {
              // setModalVisible(false);
              backAction();
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
          </View>

          <View style={{
            width: dimensions.width * 0.9,
            alignSelf: 'center',
          }}>
            <Text
              style={{
                fontFamily: fontMontserratRegular,
                color: 'white',
                fontSize: dimensions.width * 0.07,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 500,
                marginTop: dimensions.height * 0.016,
              }}>
              {selectedGuide?.title}
            </Text>

            <Text
              style={{
                fontFamily: fontMontserratRegular,
                color: 'white',
                opacity: 0.7,
                fontSize: dimensions.width * 0.034,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 500,
                marginTop: dimensions.height * 0.016,
              }}>
              {selectedGuide?.text}
            </Text>

            {selectedGuide?.points.map((point) => (
              <View key={point.id} style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: dimensions.width * 0.9,
              }}>
                <Text
                  style={{
                    fontFamily: fontMontserratRegular,
                    color: 'white',
                    opacity: 0.8,
                    fontSize: dimensions.width * 0.04,
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                    fontWeight: 500,
                    marginTop: dimensions.height * 0.012,
                    marginLeft: dimensions.width * 0.034,
                  }}>
                  •
                </Text>
                <Text
                  style={{
                    fontFamily: fontMontserratRegular,
                    color: 'white',
                    opacity: 0.7,
                    fontSize: dimensions.width * 0.034,
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                    fontWeight: 500,
                    marginTop: dimensions.height * 0.012,
                    marginLeft: dimensions.width * 0.01,
                    maxWidth: dimensions.width * 0.84
                  }}>
                  {point?.point}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HorsesScreen;
