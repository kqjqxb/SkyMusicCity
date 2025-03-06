import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChevronLeftIcon, PlusIcon } from 'react-native-heroicons/solid';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';

const fontMontserratRegular = 'Montserrat-Regular';

const AddRacetrackScreen = ({ setSelectedScreen, racetracks, setRacetracks }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [local, setLocal] = useState('');
  const [description, setDescription] = useState('');
  const [typeOfCoating, setTypeOfCoating] = useState('');
  const [size, setSize] = useState('');
  const [services, setServices] = useState('');

  const handleDeleteImage = (index) => {
    Alert.alert(
      "Delete racetrack Image",
      "Are you sure you want to delete racetrack image?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            const newImages = [...images];
            newImages.splice(index, 1);
            setImages(newImages);
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleSave = async () => {
    const racetracks = JSON.parse(await AsyncStorage.getItem('racetracks')) || [];
    const newId = racetracks.length > 0 ? Math.max(...racetracks.map(e => e.id)) + 1 : 1;
    const newRacetrack = {
      id: newId,
      name: name ? name : 'Untitled',
      local: local ? local : 'No local',
      description: description ? description : 'No description',
      typeOfCoating: typeOfCoating,
      size: size,
      image: images[0],
      services: services,
    };
    try {
      racetracks.unshift(newRacetrack);
      await AsyncStorage.setItem('racetracks', JSON.stringify(racetracks));
      setSelectedScreen('Racetracks');
    } catch (error) {
      console.error('Error saving entertainment:', error);
    }
  };

  const handleImagePicker = () => {
    if (images.length >= 3) {
      Alert.alert('You can only add up to 3 images.');
      return;
    }
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImages([...images, response.assets[0].uri]);
      }
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
      <View style={{
        backgroundColor: '#23263C',
        width: dimensions.width,
        height: dimensions.height * 0.12,
        alignItems: 'center',
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: dimensions.width * 0.07,
        paddingHorizontal: dimensions.width * 0.05,
        paddingTop: dimensions.height * 0.05,
        zIndex: 5
      }}>
        <TouchableOpacity onPress={() => {
          setSelectedScreen('Racetracks');
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

        <Text
          style={{
            fontFamily: fontMontserratRegular,
            color: 'white',
            fontSize: dimensions.width * 0.046,
            textAlign: 'center',
            alignSelf: 'center',
            paddingHorizontal: dimensions.width * 0.05,
            fontWeight: 600,
            right: dimensions.width * 0.028,
          }}>
          Add racetrack
        </Text>

        <TouchableOpacity onPress={() => {
          handleSave();
          console.log('save');
        }} style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: dimensions.height * 0.023,
          alignSelf: 'flex-start',
        }}
          disabled={name === '' || local === '' || description === '' ||
            typeOfCoating === '' || size === '' || services === ''}
        >
          <Text
            style={{
              fontFamily: fontMontserratRegular,
              color: name === '' || local === '' || description === '' ||
                typeOfCoating === '' || size === '' || services === '' ? '#848484' : '#0A84FF',
              fontSize: dimensions.width * 0.04,
              textAlign: 'center',
              alignSelf: 'center',
              fontWeight: 400,
              marginLeft: dimensions.width * 0.01,
            }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{
        width: dimensions.width,
        alignSelf: 'center',
      }}>
        <View style={{
          alignSelf: 'center',
          paddingBottom: dimensions.height * 0.16,
        }}>
          <Image
            source={require('../assets/images/settingsHorseImage.png')}
            style={{
              width: dimensions.width * 0.7,
              height: dimensions.height * 0.25,
              marginBottom: dimensions.height * 0.03,
              alignSelf: 'center',
            }}
            resizeMode='contain'
          />

          <View style={{
            width: dimensions.width * 0.9,
            alignSelf: 'center',
            marginTop: -dimensions.height * 0.02,
            marginBottom: dimensions.height * 0.02,
          }}>
            {images.length === 0 ? (
              <TouchableOpacity
                onPress={handleImagePicker}
                style={{
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  padding: dimensions.width * 0.1,
                  backgroundColor: '#23263C',
                  borderRadius: dimensions.width * 0.064,
                  marginBottom: dimensions.height * 0.01,
                }}>
                <View>
                  <Image
                    source={require('../assets/images/photoImage.png')}
                    style={{
                      width: dimensions.height * 0.055,
                      height: dimensions.height * 0.055,
                      textAlign: 'center',
                      opacity: 0.77,

                    }}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleDeleteImage(index)} style={{
                position: 'relative',
                zIndex: 1,
              }}>
                <Image
                  source={{ uri: images[0] }}
                  style={{
                    width: dimensions.width * 0.3,
                    height: dimensions.width * 0.3,
                    marginRight: dimensions.width * 0.03,
                    borderRadius: dimensions.width * 0.04,
                    zIndex: 2,
                    position: 'relative',
                  }}
                  resizeMode="cover"
                />
                <Image
                  source={require('../assets/images/photoImage.png')}
                  style={{
                    width: dimensions.height * 0.055,
                    height: dimensions.height * 0.055,
                    textAlign: 'center',
                    position: 'absolute',
                    zIndex: 3,
                    top: '32%',
                    left: '10%',
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>

          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="rgba(255, 255, 255, 0.77)"
            style={{
              padding: dimensions.width * 0.03,
              paddingHorizontal: dimensions.width * 0.05,
              backgroundColor: '#23263C',
              borderRadius: dimensions.width * 0.025,
              width: dimensions.width * 0.9,
              marginBottom: dimensions.height * 0.008,
              color: 'white',
              fontFamily: fontMontserratRegular,
              fontSize: dimensions.width * 0.046,
              fontWeight: 400,
              textAlign: 'left',
            }}
          />

          <TextInput
            placeholder="Local"
            value={local}
            onChangeText={setLocal}
            placeholderTextColor="rgba(255, 255, 255, 0.77)"
            style={{
              padding: dimensions.width * 0.03,
              paddingHorizontal: dimensions.width * 0.05,
              backgroundColor: '#23263C',
              borderRadius: dimensions.width * 0.025,
              width: dimensions.width * 0.9,
              marginBottom: dimensions.height * 0.008,
              color: 'white',
              fontFamily: fontMontserratRegular,
              fontSize: dimensions.width * 0.046,
              fontWeight: 400,
              textAlign: 'left',
            }}
          />

          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="rgba(255, 255, 255, 0.77)"
            multiline={true}
            style={{
              padding: dimensions.width * 0.03,
              paddingHorizontal: dimensions.width * 0.05,
              backgroundColor: '#23263C',
              borderRadius: dimensions.width * 0.025,
              width: dimensions.width * 0.9,
              marginBottom: dimensions.height * 0.008,
              color: 'white',
              fontFamily: fontMontserratRegular,
              fontSize: dimensions.width * 0.046,
              fontWeight: '400',
              textAlign: 'left',
              alignSelf: 'flex-start',
              height: dimensions.height * 0.12,
              textAlignVertical: 'top'
            }}
          />

          <Text
            style={{
              fontFamily: fontMontserratRegular,
              color: 'rgba(255, 255, 255, 0.77)',
              fontSize: dimensions.width * 0.04,
              textAlign: 'left',
              marginTop: dimensions.height * 0.019,
              marginBottom: dimensions.height * 0.014,
              fontWeight: 300,
            }}>
            Additional information
          </Text>

          <TextInput
            placeholder="Type of coating"
            value={typeOfCoating}
            onChangeText={setTypeOfCoating}
            placeholderTextColor="rgba(255, 255, 255, 0.77)"
            style={{
              padding: dimensions.width * 0.03,
              paddingHorizontal: dimensions.width * 0.05,
              backgroundColor: '#23263C',
              borderRadius: dimensions.width * 0.025,
              width: dimensions.width * 0.9,
              marginBottom: dimensions.height * 0.008,
              color: 'white',
              fontFamily: fontMontserratRegular,
              fontSize: dimensions.width * 0.046,
              fontWeight: 400,
              textAlign: 'left',
            }}
          />

          <TextInput
            placeholder="Size"
            value={size}
            onChangeText={setSize}
            placeholderTextColor="rgba(255, 255, 255, 0.77)"
            style={{
              padding: dimensions.width * 0.03,
              paddingHorizontal: dimensions.width * 0.05,
              backgroundColor: '#23263C',
              borderRadius: dimensions.width * 0.025,
              width: dimensions.width * 0.9,
              marginBottom: dimensions.height * 0.008,
              color: 'white',
              fontFamily: fontMontserratRegular,
              fontSize: dimensions.width * 0.046,
              fontWeight: 400,
              textAlign: 'left',
            }}
          />

          <TextInput
            placeholder="Services"
            value={services}
            onChangeText={setServices}
            placeholderTextColor="rgba(255, 255, 255, 0.77)"
            multiline={true}
            style={{
              padding: dimensions.width * 0.03,
              paddingHorizontal: dimensions.width * 0.05,
              backgroundColor: '#23263C',
              borderRadius: dimensions.width * 0.025,
              width: dimensions.width * 0.9,
              marginBottom: dimensions.height * 0.008,
              color: 'white',
              fontFamily: fontMontserratRegular,
              fontSize: dimensions.width * 0.046,
              fontWeight: '400',
              textAlign: 'left',
              alignSelf: 'flex-start',
              height: dimensions.height * 0.12,
              textAlignVertical: 'top'
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddRacetrackScreen;
