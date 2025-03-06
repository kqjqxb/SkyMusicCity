import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChevronLeftIcon, PlusIcon, XCircleIcon } from 'react-native-heroicons/solid';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
const fontMontserratRegular = 'Montserrat-Regular';

const formatHippodromeDate = (date) => {
  if (!date) return 'Date';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const AddHorseScreen = ({ setSelectedScreen }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [dietObjects, setDietObjects] = useState([]);
  const [dietTitle, setDietTitle] = useState('');
  const [isFirstPageWasVisible, setIsFirstPageWasVisible] = useState(false);
  const [selectedTypeOfTraining, setSelectedTypeOfTraining] = useState('');
  const [date, setDate] = useState(new Date());
  const [initialMinDate, setInitialMinDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const scrollViewHippodromeRef = useRef(null);

  useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();
    const timer = setTimeout(() => {
      setInitialMinDate(new Date(new Date().setHours(0, 0, 0, 0)));
    }, msUntilMidnight);
    return () => clearTimeout(timer);
  }, [initialMinDate]);

  useEffect(() => {
    scrollViewHippodromeRef.current.scrollTo({ y: 0, animated: false });
  }, [isFirstPageWasVisible]);


  const handleDateChange = (event, selectedDate) => {
    if (selectedDate && selectedDate >= new Date().setHours(0, 0, 0, 0)) {
      setDate(selectedDate);
    } else {
      Alert.alert('Please select a future date.');
    }
  };

  const handleDeleteHorseImage = (index) => {
    Alert.alert(
      "Delete horse Image",
      "Are you sure you want to delete horse image?",
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

  const toggleReminderSwitch = () => {
    const newValue = !isReminderEnabled;
    setIsReminderEnabled(newValue);
  };

  const addDiet = () => {
    if (dietTitle !== '') {
      const newId = dietObjects.length > 0 ? Math.max(...dietObjects.map(hereDiet => hereDiet.id)) + 1 : 1;
      const newDiet = { id: newId, dietTitle: dietTitle };
      setDietObjects([...dietObjects, newDiet]);
      setDietTitle('');
      scrollViewHippodromeRef.current?.scrollToEnd({ animated: true });
    }
  };

  const removeDiet = async (dietToRemove) => {
    try {
      const updatedDiets = dietObjects.filter(hereDiet =>
        !(hereDiet.id === dietToRemove.id)
      );
      setDietObjects(updatedDiets);
    } catch (error) {
      Alert.alert('Error', 'Failed to remove diet.');
    }
  };

  const handleSave = async () => {
    const horses = JSON.parse(await AsyncStorage.getItem('horses')) || [];
    const newId = horses.length > 0 ? Math.max(...horses.map(e => e.id)) + 1 : 1;
    const newHorse = {
      id: newId,
      name: name,
      breed: breed,
      age: age,
      height: height,
      weight: weight,
      image: images[0],
      diet: dietObjects,
      typeOfTraining: selectedTypeOfTraining,
      date: date,
      isReminderEnabled: isReminderEnabled,
    };
    try {
      horses.unshift(newHorse);
      await AsyncStorage.setItem('horses', JSON.stringify(horses));
      setSelectedScreen('Horses');
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
          if (isFirstPageWasVisible) {
            setIsFirstPageWasVisible(false);
          } else setSelectedScreen('Horses');
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
          Add horse
        </Text>

        <TouchableOpacity onPress={() => {
          if (!isFirstPageWasVisible) {
            setIsFirstPageWasVisible(true);
          } else handleSave();
        }} style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: dimensions.height * 0.023,
          alignSelf: 'flex-start',
        }}
        disabled={(!isFirstPageWasVisible && (name === '' || breed === '' || age === '' ||
          height === '' || weight === '')) || (isFirstPageWasVisible && (selectedTypeOfTraining === '' || date === ''))}
        >
          <Text
            style={{
              fontFamily: fontMontserratRegular,
              color: (!isFirstPageWasVisible && (name === '' || breed === '' || age === '' || height === '' || weight === ''))
                || (isFirstPageWasVisible && (selectedTypeOfTraining === '' || date === '')) ? '#848484' : '#0A84FF',
              fontSize: dimensions.width * 0.04,
              textAlign: 'center',
              alignSelf: 'center',
              fontWeight: 400,
              marginLeft: dimensions.width * 0.01,
            }}>
            {isFirstPageWasVisible ? 'Done' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView ref={scrollViewHippodromeRef} contentContainerStyle={{ paddingBottom: dimensions.height * 0.25 }} showsVerticalScrollIndicator={false} style={{
        width: dimensions.width,
        alignSelf: 'center',
      }}>
        <View style={{
          alignSelf: 'center',

        }}>
          <Image
            source={require('../assets/images/racetrackHorseImage.png')}
            style={{
              width: dimensions.width * 0.7,
              height: dimensions.height * 0.25,
              marginBottom: dimensions.height * 0.03,
              alignSelf: 'center',
            }}
            resizeMode='contain'
          />
          {!isFirstPageWasVisible ? (
            <>
              <View style={{
                width: dimensions.width * 0.9,
                alignSelf: 'center',
                marginTop: -dimensions.height * 0.02,
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
                  <TouchableOpacity onPress={() => handleDeleteHorseImage(0)} style={{
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
                        marginBottom: dimensions.height * 0.01,
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
                placeholderTextColor="rgba(255, 255, 255, 0.57)"
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
                placeholder="Breed"
                value={breed}
                onChangeText={setBreed}
                placeholderTextColor="rgba(255, 255, 255, 0.57)"
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
                keyboardType='numeric'
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                placeholderTextColor="rgba(255, 255, 255, 0.57)"
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
                }}
              />

              <TextInput
                keyboardType='numeric'
                placeholder="Height (cm)"
                value={height}
                onChangeText={setHeight}
                placeholderTextColor="rgba(255, 255, 255, 0.57)"
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
                }}
              />

              <TextInput
                keyboardType='numeric'
                placeholder="Weight (kg)"
                value={weight}
                onChangeText={setWeight}
                placeholderTextColor="rgba(255, 255, 255, 0.57)"
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
                }}
              />

              <Text
                style={{
                  fontFamily: fontMontserratRegular,
                  color: 'rgba(255, 255, 255, 0.77)',
                  fontSize: dimensions.width * 0.048,
                  textAlign: 'left',
                  marginTop: dimensions.height * 0.019,
                  marginBottom: dimensions.height * 0.014,
                  fontWeight: 300,
                }}>
                Diet
              </Text>

              <View style={{
                width: dimensions.width * 0.9,
                padding: dimensions.width * 0.03,
                paddingHorizontal: dimensions.width * 0.05,
                backgroundColor: '#23263C',
                borderRadius: dimensions.width * 0.025,
              }}>
                {dietObjects.map((dietObj, index) => (
                  <View key={dietObj.id} style={{
                    width: dimensions.width * 0.8,
                    borderRadius: dimensions.width * 0.023,
                    backgroundColor: '#363B5C',
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
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {dietObj.dietTitle}
                    </Text>

                    <TouchableOpacity
                      onPress={() => removeDiet(dietObj)}
                      style={{
                        zIndex: 100,
                        right: dimensions.width * 0.014,
                        alignItems: 'center',
                        maxWidth: '10%',

                      }}>
                      <XCircleIcon size={dimensions.height * 0.03} color='white' />
                    </TouchableOpacity>
                  </View>
                ))}
                <TextInput
                  placeholder="Enter text..."
                  value={dietTitle}
                  onChangeText={setDietTitle}
                  placeholderTextColor="rgba(255, 255, 255, 0.57)"
                  multiline={true}
                  style={{
                    paddingVertical: dimensions.height * 0.016,
                    paddingHorizontal: dimensions.width * 0.05,
                    backgroundColor: '#363B5C',
                    width: dimensions.width * 0.8,
                    borderRadius: dimensions.width * 0.025,
                    marginBottom: dimensions.height * 0.008,
                    color: 'white',
                    fontFamily: fontMontserratRegular,
                    fontSize: dimensions.width * 0.04,
                    fontWeight: '400',
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                    textAlignVertical: 'top',
                    marginTop: dimensions.height * 0.00,
                  }}
                />
                <TouchableOpacity
                  onPress={addDiet}
                  style={{
                    width: dimensions.width * 0.8,
                    padding: dimensions.width * 0.03,
                    backgroundColor: 'white',
                    borderRadius: dimensions.width * 0.025,
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
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text
                style={{
                  fontFamily: fontMontserratRegular,
                  color: 'rgba(255, 255, 255, 0.77)',
                  fontSize: dimensions.width * 0.048,
                  textAlign: 'left',
                  marginTop: dimensions.height * 0.019,
                  marginBottom: dimensions.height * 0.014,
                  fontWeight: 300,
                  marginTop: -dimensions.height * 0.05,
                }}>
                Workout journal
              </Text>

              <View style={{
                width: dimensions.width * 0.9,
                padding: dimensions.width * 0.03,
                paddingHorizontal: dimensions.width * 0.05,
                backgroundColor: '#23263C',
                borderRadius: dimensions.width * 0.025,
              }}>
                <Text
                  style={{
                    fontFamily: fontMontserratRegular,
                    color: 'rgba(255, 255, 255, 0.77)',
                    fontSize: dimensions.width * 0.043,
                    textAlign: 'left',
                    marginTop: dimensions.height * 0.005,
                    marginBottom: dimensions.height * 0.014,
                    fontWeight: 300,
                  }}>
                  Type of training
                </Text>

                {['Gallop', 'Trot', 'Dressage', 'Racing', 'Jogging', 'Physical training', 'Arena training', 'Jumping over barriers'].map((training, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedTypeOfTraining(training);
                    }}
                    key={index} style={{
                      width: dimensions.width * 0.8,
                      borderRadius: dimensions.width * 0.023,
                      borderColor: '#0A84FF',
                      borderWidth: selectedTypeOfTraining === training ? dimensions.width * 0.0043 : 0,
                      backgroundColor: '#363B5C',
                      padding: dimensions.width * 0.04,
                      marginBottom: dimensions.height * 0.007,
                      alignSelf: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
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
                      numberOfLines={1}
                    >
                      {training}
                    </Text>
                  </TouchableOpacity>
                ))}

                <Text
                  style={{
                    fontFamily: fontMontserratRegular,
                    color: 'rgba(255, 255, 255, 0.77)',
                    fontSize: dimensions.width * 0.043,
                    textAlign: 'left',
                    marginTop: dimensions.height * 0.019,

                    fontWeight: 300,
                  }}>
                  Training date
                </Text>

                <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display="spinner"
                  minimumDate={initialMinDate}
                  onChange={(event, selectedDate) => {
                    handleDateChange(event, selectedDate);
                  }}
                  textColor='white'
                  zIndex={1000}
                />

                <View style={{
                  width: dimensions.width * 0.8,
                  borderRadius: dimensions.width * 0.025,
                  backgroundColor: '#363B5C',
                  padding: dimensions.width * 0.03,
                  marginBottom: dimensions.height * 0.007,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Text
                    style={{
                      fontFamily: fontMontserratRegular,
                      color: 'white',
                      fontSize: dimensions.width * 0.043,
                      textAlign: 'left',
                      fontWeight: 300,
                    }}>
                    Reminder
                  </Text>
                  <Switch
                    trackColor={{ false: '#948ea0', true: '#0A84FF' }}
                    thumbColor={'white'}
                    ios_backgroundColor="#3E3E3E"
                    onValueChange={toggleReminderSwitch}
                    value={isReminderEnabled}
                  />
                </View>

                <Text
                  style={{
                    fontFamily: fontMontserratRegular,
                    color: 'white',
                    fontSize: dimensions.width * 0.046,
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                    fontWeight: 400,
                    marginTop: dimensions.height * 0.019,
                  }}>
                  {formatHippodromeDate(date)}
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddHorseScreen;
