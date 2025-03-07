import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { ChevronLeftIcon, XCircleIcon, } from 'react-native-heroicons/solid';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';

const formatDuration = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
};

const fontMontserratRegular = 'Montserrat-Regular';
const fontDMSansRegular = 'DMSans18pt-Regular';
const fontDMSansBlack = 'DMSans18pt-Black';

const PlayerScreen = ({ setSelectedScreen }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isFirstModalWasVisible, setIsFirstModalWasVisible] = useState(false);
  const [sounds, setSounds] = useState([]);
  const [musicPlaylists, setMusicPlaylists] = useState([]);
  const [musicTitle, setMusicTitle] = useState('');
  const scrollViewHippodromeRef = useRef(null);
  const [selectedTrackToDelete, setSelectedTrackToDelete] = useState(null);

  // useEffect(() => {
  //   scrollViewHippodromeRef.current.scrollTo({ y: 0, animated: false });
  // }, []);


  const handleSaveMusicPlaylist = async () => {
    const hereMusicsPlaylists = JSON.parse(await AsyncStorage.getItem('musicPlaylists')) || [];
    const newId = hereMusicsPlaylists.length > 0 ? Math.max(...hereMusicsPlaylists.map(e => e.id)) + 1 : 1;
    const newMusic = {
      id: newId,
      title: title,
      description: description ? description : 'No description',
      image: image,
      sounds: sounds,
    };
    try {
      hereMusicsPlaylists.unshift(newMusic);
      setHomeMusics(hereMusicsPlaylists);
      setModalVisible(false);
      await AsyncStorage.setItem('musicPlaylists', JSON.stringify(hereMusicsPlaylists));
    } catch (error) {
      console.error('Error saving musicPlaylists:', error);
    }
  };

  const handlePlaylistImagePicker = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleDeleteTrack = async () => {
    const updatedSounds = sounds.filter(item => item.id !== selectedTrackToDelete.id);
    // await AsyncStorage.setItem('horses', JSON.stringify(updatedSounds));
    Alert.alert(
      "Delete playlist image",
      "Are you sure you want to delete playlist image?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            setSounds(updatedSounds);
          },
          style: "destructive"
        }
      ]
    );
  };
  
  useEffect(() => {
    console.log('sounds:', sounds);
  }, [sounds]);


  // const handleMusicPicker = async () => {
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.audio],
  //     });
  //     // Якщо res — масив, вибираємо перший елемент
  //     const file = Array.isArray(res) ? res[0] : res;
  //     const newTrack = {
  //       id: sounds.length > 0 ? Math.max(...sounds.map(track => track.id)) + 1 : 1,
  //       uri: file.uri,
  //       name: musicTitle ? musicTitle : file.name || 'Unknown Track',
  //     };
  //     setSounds([newTrack, ...sounds]);
  //     setMusicTitle('');
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log('User cancelled document picker');
  //     } else {
  //       console.error('DocumentPicker Error: ', err);
  //     }
  //   }
  // };

  const handleMusicPicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      const file = Array.isArray(res) ? res[0] : res;
      
      // Декодування URI файлу
      const decodedUri = decodeURIComponent(file.uri);
  
      // Збереження файлу локально
      const destPath = `${RNFS.DocumentDirectoryPath}/${file.name}`;
      await RNFS.copyFile(decodedUri, destPath);
  
      const newTrack = {
        id: sounds.length > 0 ? Math.max(...sounds.map(track => track.id)) + 1 : 1,
        uri: destPath,
        name: musicTitle ? musicTitle : file.name || 'Unknown Track',
      };
      setSounds([newTrack, ...sounds]);
      setMusicTitle('');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('DocumentPicker Error: ', err);
      }
    }
  };

  const handleDeletePlaylistImage = (index) => {
    Alert.alert(
      "Delete playlist image",
      "Are you sure you want to delete playlist image?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            setImage('');
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={{
      display: 'flex',
      alignSelf: 'center',
      width: '100%',
      alignItems: 'center',
      flex: 1
    }}>
      <View style={{
        backgroundColor: '#0D0D0D',
        width: dimensions.width,
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
            marginLeft: dimensions.width * 0.044,
            paddingBottom: dimensions.height * 0.016,
          }}>
          Music player
        </Text>

        <TouchableOpacity onPress={() => {
          setSelectedScreen('Settings');
        }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: dimensions.height * 0.016,
          }}
        >
          <Image
            source={require('../assets/icons/goldSettingsIcon.png')}
            style={{
              width: dimensions.height * 0.03,
              height: dimensions.height * 0.03,
              right: dimensions.width * 0.0,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {musicPlaylists.length === 0 ? (
        <>
          <View style={{
            width: dimensions.width * 0.9,
            alignSelf: 'center',
            backgroundColor: '#202020',
            marginTop: dimensions.height * 0.025,
            borderRadius: dimensions.width * 0.04,
            alignItems: 'center',
            paddingVertical: dimensions.height * 0.025,
          }}>
            <Text
              style={{
                fontFamily: fontDMSansRegular,
                color: 'white',
                fontSize: dimensions.width * 0.046,
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: 400,
              }}>
              You don't have anything here yet...
            </Text>
            <Image
              source={require('../assets/images/noMusicPlayersImage.png')}
              style={{
                width: dimensions.width * 0.8,
                height: dimensions.height * 0.23,
              }}
              resizeMode='contain'
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              width: dimensions.width * 0.9,
              backgroundColor: '#B38C31',
              borderRadius: dimensions.width * 0.043,
              height: dimensions.height * 0.061,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: dimensions.height * 0.019,
              zIndex: 1000,
            }}>
            <Text
              style={{
                fontFamily: fontDMSansRegular,
                color: 'white',
                fontSize: dimensions.width * 0.04,
                textAlign: 'left',
                alignSelf: 'center',
                fontWeight: 700,
              }}>
              Add
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <ScrollView ref={scrollViewHippodromeRef} contentContainerStyle={{ paddingBottom: dimensions.height * 0.16 }} style={{}}>
          <View style={{
            width: dimensions.width * 0.9,
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: dimensions.height * 0.016,
          }}>
            {musicPlaylists.map((item, index) => (
              <View key={index} style={{
                width: dimensions.width * 0.43,
                marginBottom: dimensions.height * 0.025,
              }}>
                <Image
                  source={require('../assets/images/roofImage.png')}
                  style={{
                    width: dimensions.width * 0.43,
                    height: dimensions.width * 0.1,
                    alignSelf: 'flex-start',
                  }}
                  resizeMode='stretch'
                />

                <View style={{
                  width: dimensions.width * 0.43,
                  backgroundColor: '#202020',
                  borderBottomLeftRadius: dimensions.width * 0.034,
                  borderBottomRightRadius: dimensions.width * 0.034,
                  padding: dimensions.width * 0.01,
                  position: 'relative',
                  zIndex: 1,
                  paddingVertical: dimensions.height * 0.025,
                  paddingHorizontal: dimensions.width * 0.03,
                }}>
                  <TouchableOpacity
                    onPress={() => {
                      setHomeMusicToDelete(item);
                      setDeleteHomeMusicModalVisible(true);
                    }}
                    style={{
                      position: 'absolute',
                      top: dimensions.height * 0.01,
                      right: dimensions.width * 0.025,
                    }}>
                    <Image
                      source={require('../assets/icons/dotsInDotIcon.png')}
                      style={{
                        width: dimensions.width * 0.077,
                        height: dimensions.width * 0.077,
                        alignSelf: 'flex-end',
                      }}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>

                  <View style={{
                    alignSelf: 'flex-start',
                    width: dimensions.width * 0.3,
                    padding: dimensions.width * 0.005,
                  }}>
                    <Text
                      style={{
                        fontFamily: fontDMSansRegular,
                        color: 'white',
                        opacity: 0.5,
                        fontSize: dimensions.width * 0.034,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        fontWeight: 300,
                        flex: 1
                      }}>
                      {formatSkyMusicDate(new Date(item.date))}
                    </Text>

                    <Text
                      style={{
                        fontFamily: fontDMSansBlack,
                        color: 'white',
                        fontSize: dimensions.width * 0.059,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                      }}>
                      {item.minutes} min
                    </Text>

                    <View style={{
                      backgroundColor: '#656565',
                      borderRadius: dimensions.width * 0.019,
                      marginTop: dimensions.height * 0.01,
                      paddingVertical: dimensions.height * 0.007,
                    }}>
                      <Text
                        style={{
                          fontFamily: fontDMSansRegular,
                          color: 'white',
                          opacity: 0.7,
                          fontSize: dimensions.width * 0.035,
                          textAlign: 'left',
                          alignSelf: 'center',
                          fontWeight: 300,
                        }}>
                        {item.modeOfMusic}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={{
          flex: 1,
          backgroundColor: '#0D0D0D',
        }}>
          <View style={{
            backgroundColor: '#0D0D0D',
            width: dimensions.width,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            borderBottomColor: 'rgba(255, 255, 255, 0.39)',
            borderBottomWidth: dimensions.width * 0.003,
            paddingHorizontal: dimensions.width * 0.05,
            paddingBottom: dimensions.height * 0.016,
            zIndex: 5
          }}>
            <TouchableOpacity onPress={() => {
              if (isFirstModalWasVisible) {
                setIsFirstModalWasVisible(false);
              } else {
                setModalVisible(false);
              }
            }} style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
            }}>
              <ChevronLeftIcon size={dimensions.height * 0.03} color='#B38C31' />
              <Text
                style={{
                  fontFamily: fontMontserratRegular,
                  color: '#b38b31',
                  fontSize: dimensions.width * 0.04,
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontWeight: 500,
                  marginLeft: dimensions.width * 0.01,
                }}>
                Back
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: fontDMSansRegular,
                color: 'white',
                fontSize: dimensions.width * 0.046,
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: 700,
                marginLeft: dimensions.width * 0.043,
                right: dimensions.width * 0.061,
              }}>
              Add music
            </Text>

            <TouchableOpacity onPress={() => {
              if (!isFirstModalWasVisible) {
                setIsFirstModalWasVisible(true);
              } else {
                handleSaveMusicPlaylist();
              }
            }} style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}
              disabled={title === ''}
            >
              <Text
                style={{
                  fontFamily: fontMontserratRegular,
                  color: '#B38C31',
                  opacity: title.length === 0 ? 0.5 : 1,
                  fontSize: dimensions.width * 0.043,
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontWeight: 500,
                  right: dimensions.width * 0.019,
                }}>
                {isFirstModalWasVisible ? 'Save' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>

          {!isFirstModalWasVisible ? (
            <>
              <Text
                style={{
                  fontFamily: fontDMSansRegular,
                  color: 'white',
                  opacity: 0.7,
                  fontSize: dimensions.width * 0.043,
                  textAlign: 'left',
                  alignSelf: 'flex-start',
                  fontWeight: 300,
                  paddingHorizontal: dimensions.width * 0.05,
                  marginTop: dimensions.height * 0.019,
                }}>
                Create a playlist
              </Text>

              {image === '' || !image ? (
                <TouchableOpacity
                  onPress={handlePlaylistImagePicker}
                  style={{
                    width: dimensions.width * 0.9,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: dimensions.height * 0.01,
                    backgroundColor: '#202020',
                    borderRadius: dimensions.width * 0.034,
                    paddingHorizontal: dimensions.width * 0.03,
                    height: dimensions.height * 0.21,
                  }}>
                  <Image
                    source={require('../assets/images/photoImage.png')}
                    style={{
                      width: dimensions.width * 0.23,
                      height: dimensions.width * 0.23,
                      opacity: 0.7,
                    }}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleDeletePlaylistImage}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: dimensions.height * 0.01,
                    borderRadius: dimensions.width * 0.034,
                    position: 'relative',
                  }}>
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: dimensions.width * 0.9,
                      height: dimensions.height * 0.21,
                      borderRadius: dimensions.width * 0.034,
                    }}
                    resizeMode='stretch'
                  />
                  <Image
                    source={require('../assets/images/photoImage.png')}
                    style={{
                      width: dimensions.height * 0.111,
                      height: dimensions.height * 0.111,
                      position: 'absolute',
                      alignSelf: 'center',
                      top: dimensions.height * 0.055,
                    }}
                    resizeMode='contain'
                  />

                </TouchableOpacity>
              )}


              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: dimensions.width * 0.9,
                alignSelf: 'center',
                marginTop: dimensions.height * 0.01,
                backgroundColor: '#202020',
                borderRadius: dimensions.width * 0.034,
                paddingHorizontal: dimensions.width * 0.03,
                height: dimensions.height * 0.055,
              }}>
                <TextInput
                  placeholder="Title"
                  value={title}
                  onChangeText={setTitle}
                  placeholderTextColor="rgba(255, 255, 255, 0.57)"
                  style={{
                    maxWidth: dimensions.width * 0.7,
                    fontFamily: fontDMSansRegular,
                    fontSize: dimensions.width * 0.04,
                    color: 'white',
                  }}
                />
                {title.length > 0 && (
                  <TouchableOpacity onPress={() => {
                    setTitle('');
                  }}>
                    <XCircleIcon size={dimensions.height * 0.03} color='#8E8E93' />
                  </TouchableOpacity>
                )}
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: dimensions.width * 0.9,
                alignSelf: 'center',
                marginTop: dimensions.height * 0.01,
                backgroundColor: '#202020',
                borderRadius: dimensions.width * 0.034,
                paddingHorizontal: dimensions.width * 0.03,
                height: dimensions.height * 0.055,
              }}>
                <TextInput
                  placeholder="Description (optional)"
                  value={description}
                  onChangeText={setDescription}
                  placeholderTextColor="rgba(255, 255, 255, 0.57)"
                  style={{
                    maxWidth: dimensions.width * 0.7,
                    fontFamily: fontDMSansRegular,
                    fontSize: dimensions.width * 0.04,
                    color: 'white',
                  }}
                />
                {description.length > 0 && (
                  <TouchableOpacity onPress={() => {
                    setDescription('');
                  }}>
                    <XCircleIcon size={dimensions.height * 0.03} color='#8E8E93' />
                  </TouchableOpacity>
                )}
              </View>
            </>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
              paddingBottom: dimensions.height * 0.16,
            }} style={{}}>
              <View style={{
                width: dimensions.width,
                alignSelf: 'center',
              }}>
                <Text
                  style={{
                    fontFamily: fontDMSansRegular,
                    color: 'white',
                    opacity: 0.7,
                    fontSize: dimensions.width * 0.043,
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                    fontWeight: 300,
                    paddingHorizontal: dimensions.width * 0.05,
                    marginTop: dimensions.height * 0.019,
                  }}>
                  Importing music
                </Text>
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: dimensions.width * 0.9,
                alignSelf: 'center',
                marginTop: dimensions.height * 0.01,
                backgroundColor: '#202020',
                borderRadius: dimensions.width * 0.034,
                paddingHorizontal: dimensions.width * 0.03,
                height: dimensions.height * 0.055,
              }}>
                <TextInput
                  placeholder="Title"
                  value={musicTitle}
                  onChangeText={setMusicTitle}
                  placeholderTextColor="rgba(255, 255, 255, 0.57)"
                  style={{
                    maxWidth: dimensions.width * 0.7,
                    fontFamily: fontDMSansRegular,
                    fontSize: dimensions.width * 0.04,
                    color: 'white',
                  }}
                />
                {musicTitle.length > 0 && (
                  <TouchableOpacity onPress={() => {
                    setMusicTitle('');
                  }}>
                    <XCircleIcon size={dimensions.height * 0.03} color='#8E8E93' />
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                onPress={handleMusicPicker}
                style={{
                  width: dimensions.width * 0.4,
                  height: dimensions.width * 0.4,
                  marginLeft: dimensions.width * 0.05,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  marginTop: dimensions.height * 0.01,
                  backgroundColor: '#202020',
                  borderRadius: dimensions.width * 0.034,
                  paddingHorizontal: dimensions.width * 0.03,
                }}>
                <Image
                  source={require('../assets/images/fileImage.png')}
                  style={{
                    width: dimensions.width * 0.16,
                    height: dimensions.width * 0.16,
                    opacity: 0.3,
                  }}
                  resizeMode='contain'
                />
              </TouchableOpacity>

              {sounds.length > 0 && (
                sounds.map((track, index) => (
                  <View key={track.id} style={{
                    width: dimensions.width * 0.9,
                    alignSelf: 'center',
                    marginTop: dimensions.height * 0.01,
                    backgroundColor: '#2F2F31',
                    borderRadius: dimensions.width * 0.034,
                    paddingHorizontal: dimensions.width * 0.05,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: dimensions.height * 0.019,
                  }}>
                    <TouchableOpacity>
                      <Image
                        source={require('../assets/icons/playMusicIcon.png')}
                        style={{
                          width: dimensions.width * 0.05,
                          height: dimensions.width * 0.05,
                        }}
                        resizeMode='contain'
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        fontFamily: fontDMSansRegular,
                        color: 'white',
                        fontSize: dimensions.width * 0.034,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        fontWeight: 300,
                      }}>
                      0:00 / 0:50
                    </Text>

                    <View style={{
                      borderRadius: dimensions.width * 0.034,
                      backgroundColor: '#656565',
                      width: dimensions.width * 0.4,
                      height: dimensions.height * 0.0061,
                    }}>
                    </View>

                    <TouchableOpacity onPress={() => {
                      setSelectedTrackToDelete(track);
                      handleDeleteTrack();
                    }}>
                      <Image
                        source={require('../assets/icons/3dotsIcon.png')}
                        style={{
                          width: dimensions.width * 0.05,
                          height: dimensions.width * 0.05,
                        }}
                        resizeMode='contain'
                      />
                    </TouchableOpacity>
                  </View>
                ))
              )}



            </ScrollView>
          )}


        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default PlayerScreen;
