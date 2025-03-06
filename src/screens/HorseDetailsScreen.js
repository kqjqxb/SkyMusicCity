import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from 'react-native';

const fontMontserratRegular = 'Montserrat-Regular';
import { ScrollView } from 'react-native-gesture-handler';

const formatHippodromeDate = (date) => {
  if (!date) return 'Date';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const HorseDetailsScreen = ({ setSelectedScreen, selectedHorse, setHorses, setIsHorseDetailsVisible, horses }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteHorse = async (id) => {
    const updatedHorses = horses.filter(item => item.id !== id);
    setHorses(updatedHorses);
    setModalVisible(false);
    setIsHorseDetailsVisible(false);
    await AsyncStorage.setItem('horses', JSON.stringify(updatedHorses));
  };

  return (
    <View style={{
      flex: 1,
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: '#181A29',
    }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{
        width: dimensions.width,
        alignSelf: 'center',
        paddingTop: -dimensions.height * 0.1,
        marginTop: -dimensions.height * 0.05,
      }}>
        <View style={{
          width: dimensions.width,
          paddingBottom: dimensions.height * 0.16,
          alignSelf: 'center',
        }}>
          <Image
            source={{ uri: selectedHorse?.image }}
            style={{
              width: dimensions.width,
              height: dimensions.height * 0.4,
              alignSelf: 'center',
              borderRadius: dimensions.width * 0.03,
              zIndex: 1,
            }}
            resizeMode='stretch'
          />

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
              {selectedHorse.name}
            </Text>

            <Text
              style={{
                fontFamily: fontMontserratRegular,
                color: '#848484',
                fontSize: dimensions.width * 0.037,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 300,
                marginTop: dimensions.height * 0.019,
              }}>
              Breed
            </Text>

            <Text
              style={{
                fontFamily: fontMontserratRegular,
                color: 'white',
                fontSize: dimensions.width * 0.043,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 300,
                marginTop: dimensions.height * 0.01,
              }}>
              {selectedHorse.breed}
            </Text>

            <Text
              style={{
                fontFamily: fontMontserratRegular,
                color: '#848484',
                fontSize: dimensions.width * 0.037,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 300,
                marginTop: dimensions.height * 0.019,
              }}>
              Age
            </Text>

            <Text
              style={{
                fontFamily: fontMontserratRegular,
                color: 'white',
                fontSize: dimensions.width * 0.043,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 300,
                marginTop: dimensions.height * 0.01,
              }}>
              {selectedHorse.age}
            </Text>

            <Text
              style={{
                fontFamily: fontMontserratRegular,
                color: '#848484',
                fontSize: dimensions.width * 0.037,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 300,
                marginTop: dimensions.height * 0.019,
              }}>
              Height (cm)
            </Text>

            <Text
              style={{
                fontFamily: fontMontserratRegular,
                color: 'white',
                fontSize: dimensions.width * 0.043,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 300,
                marginTop: dimensions.height * 0.01,
              }}>
              {selectedHorse.height}
            </Text>

            <Text
              style={{
                fontFamily: fontMontserratRegular,
                color: '#848484',
                fontSize: dimensions.width * 0.037,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 300,
                marginTop: dimensions.height * 0.019,
              }}>
              Weight (kg)
            </Text>

            <Text
              style={{
                fontFamily: fontMontserratRegular,
                color: 'white',
                fontSize: dimensions.width * 0.043,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 300,
                marginTop: dimensions.height * 0.01,
              }}>
              {selectedHorse.weight}
            </Text>

            <Text
              style={{
                fontFamily: fontMontserratRegular,
                color: '#848484',
                fontSize: dimensions.width * 0.05,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 300,
                marginTop: dimensions.height * 0.019,
                marginBottom: dimensions.height * 0.01,
              }}>
              Diet
            </Text>
            {selectedHorse.diet.map((dietObj, index) => (
              <View key={dietObj.id} style={{
                width: dimensions.width * 0.9,
                borderRadius: dimensions.width * 0.023,
                backgroundColor: '#23263C',
                padding: dimensions.width * 0.04,
                marginBottom: dimensions.height * 0.007,
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <Text style={{
                  fontFamily: fontMontserratRegular,
                  color: 'white',
                  fontWeight: 400,
                  fontSize: dimensions.width * 0.04,
                  textAlign: 'center',
                  maxWidth: dimensions.width * 0.7,
                }}
                >
                  {dietObj.dietTitle}
                </Text>
              </View>
            ))}

            <Text
              style={{
                fontFamily: fontMontserratRegular,
                color: '#848484',
                fontSize: dimensions.width * 0.05,
                textAlign: 'left',
                alignSelf: 'flex-start',
                fontWeight: 300,
                marginTop: dimensions.height * 0.019,
                marginBottom: dimensions.height * 0.01,
              }}>
              Workout journal
            </Text>

            <View style={{
              width: dimensions.width * 0.9,
              borderRadius: dimensions.width * 0.023,
              backgroundColor: '#23263C',
              padding: dimensions.width * 0.04,
              marginBottom: dimensions.height * 0.007,
              alignSelf: 'center',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
              <Text style={{
                fontFamily: fontMontserratRegular,
                color: 'white',
                fontWeight: 400,
                fontSize: dimensions.width * 0.055,
                textAlign: 'left',
                alignSelf: 'flex-start',
              }}
              >
                {selectedHorse.typeOfTraining}
              </Text>

              <Text style={{
                fontFamily: fontMontserratRegular,
                color: 'white',
                opacity: 0.5,
                fontWeight: 400,
                fontSize: dimensions.width * 0.034,
                textAlign: 'left',
                alignSelf: 'flex-start',
                marginTop: dimensions.height * 0.014,
              }}
              >
                {formatHippodromeDate(new Date(selectedHorse.date))}
              </Text>
            </View>

            {selectedHorse.isReminderEnabled && (
              <>
                <Text
                  style={{
                    fontFamily: fontMontserratRegular,
                    color: '#848484',
                    fontSize: dimensions.width * 0.05,
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                    fontWeight: 300,
                    marginTop: dimensions.height * 0.019,
                    marginBottom: dimensions.height * 0.01,
                  }}>
                  Care reminder
                </Text>

                <View style={{
                  width: dimensions.width * 0.9,
                  borderRadius: dimensions.width * 0.023,
                  backgroundColor: '#23263C',
                  padding: dimensions.width * 0.04,
                  marginBottom: dimensions.height * 0.007,
                  alignSelf: 'center',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                  <Text style={{
                    fontFamily: fontMontserratRegular,
                    color: 'white',
                    fontWeight: 400,
                    fontSize: dimensions.width * 0.055,
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                  }}
                  >
                    Reminder
                  </Text>

                  <Text style={{
                    fontFamily: fontMontserratRegular,
                    color: 'white',
                    opacity: 0.5,
                    fontWeight: 400,
                    fontSize: dimensions.width * 0.034,
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                    marginTop: dimensions.height * 0.014,
                  }}
                  >
                    {formatHippodromeDate(new Date(selectedHorse.date))}
                  </Text>
                </View>
              </>
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              backgroundColor: '#FF382B',
              width: dimensions.width * 0.9,
              borderRadius: dimensions.width * 0.055,
              paddingVertical: dimensions.height * 0.019,
              marginTop: dimensions.height * 0.016,
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/icons/trashHippoIcon.png')}
              style={{
                width: dimensions.width * 0.07,
                height: dimensions.width * 0.07,
                alignSelf: 'center',
                marginRight: dimensions.width * 0.019,
              }}
              resizeMode='contain'
            />
            <Text
              style={{
                fontFamily: fontMontserratRegular,
                color: 'white',
                fontSize: dimensions.width * 0.05,
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: 300,
              }}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
        }}>
          <View style={{
            paddingHorizontal: 0,
            backgroundColor: 'white',
            borderRadius: dimensions.width * 0.05,
            paddingTop: dimensions.width * 0.07,
            alignItems: 'center',
            width: dimensions.width * 0.8,
          }}>
            <Text style={{
              fontSize: dimensions.width * 0.044,
              marginBottom: dimensions.height * 0.005,
              textAlign: 'center',
              fontFamily: fontMontserratRegular,
              paddingHorizontal: dimensions.width * 0.073,
              fontWeight: 600,
              alignSelf: 'center',
            }}>
              Removal
            </Text>
            <Text style={{
              paddingHorizontal: dimensions.width * 0.073,
              textAlign: 'center',
              fontFamily: fontMontserratRegular,
              fontSize: dimensions.width * 0.034,
              marginBottom: dimensions.height * 0.019,
            }}>
              Are you sure you want to delete this?
            </Text>
            <View style={{
              width: dimensions.width * 0.8,
              borderTopColor: '#3C3C435C',
              borderTopWidth: dimensions.width * 0.0019,
            }}>
              <TouchableOpacity
                style={{
                  paddingVertical: dimensions.height * 0.016,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '100%',
                }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={{
                  color: '#0A84FF',
                  fontSize: dimensions.width * 0.044,
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontWeight: 500,
                  fontFamily: fontMontserratRegular,
                }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingVertical: dimensions.height * 0.016,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  borderTopColor: '#3C3C435C',
                  borderTopWidth: dimensions.width * 0.0019,
                }}
                onPress={() => {
                  handleDeleteHorse(selectedHorse.id)
                }}
              >
                <Text style={{
                  color: 'black',
                  textAlign: 'center',
                  fontFamily: fontMontserratRegular,
                  fontSize: dimensions.width * 0.043,
                  alignSelf: 'center',
                  fontWeight: 500,
                  color: '#FF382B',
                }}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HorseDetailsScreen;
