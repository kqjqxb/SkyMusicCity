import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, } from 'react';
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

const RacetrackDetailsScreen = ({ setSelectedScreen, selectedRacetrack, setRacetracks, setIsRacetrackDetailsVisible, racetracks }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteRacetrack = async (id) => {
    const updatedRacetracks = racetracks.filter(item => item.id !== id);
    setRacetracks(updatedRacetracks);
    setModalVisible(false);
    setIsRacetrackDetailsVisible(false);
    await AsyncStorage.setItem('racetracks', JSON.stringify(updatedRacetracks));
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
        marginTop: -dimensions.height * 0.1,
      }}>
        <View style={{
          width: dimensions.width,
          paddingBottom: dimensions.height * 0.16,
          alignSelf: 'center',
        }}>
          <Image
            source={{ uri: selectedRacetrack?.image }}
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
              {selectedRacetrack.name}
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
              Description
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
              {selectedRacetrack.description}
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
              Local
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
              {selectedRacetrack.local}
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
              Type of coating
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
              {selectedRacetrack.typeOfCoating}
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
              Size
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
              {selectedRacetrack.size}
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
              Services
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
              {selectedRacetrack.services}
            </Text>
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
                  handleDeleteRacetrack(selectedRacetrack.id)
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

export default RacetrackDetailsScreen;
