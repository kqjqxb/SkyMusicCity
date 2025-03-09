import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import SettingsScreen from './SettingsScreen';
import { ScrollView } from 'react-native-gesture-handler';
import { ChevronLeftIcon, XCircleIcon } from 'react-native-heroicons/solid';
import ArticlesScreen from './ArticlesScreen';
import PlayerScreen from './PlayerScreen';
import PianoScreen from './PianoScreen';
import { BarChart } from 'react-native-chart-kit';

const fontMontserratRegular = 'Montserrat-Regular';
const fontDMSansRegular = 'DMSans18pt-Regular';
const fontDMSansBlack = 'DMSans18pt-Black';

const bottomBtns = [
  {
    id: 1,
    screen: 'Home',
    title: 'My music city',
    btnSilverIcon: require('../assets/icons/silverIcons/homeIcon.png'),
    btnGoldIcon: require('../assets/icons/goldIcons/homeIcon.png'),
  },
  {
    id: 2,
    screen: 'Player',
    title: 'Player',
    btnSilverIcon: require('../assets/icons/silverIcons/musicIcon.png'),
    btnGoldIcon: require('../assets/icons/goldIcons/musicIcon.png'),
  },
  {
    id: 3,
    screen: 'Articles',
    title: 'Articles',
    btnSilverIcon: require('../assets/icons/silverIcons/articlesIcon.png'),
    btnGoldIcon: require('../assets/icons/goldIcons/articlesIcon.png'),
  },
  {
    id: 4,
    screen: 'Piano',
    title: 'Piano',
    btnSilverIcon: require('../assets/icons/silverIcons/pianoIcon.png'),
    btnGoldIcon: require('../assets/icons/goldIcons/pianoIcon.png'),
  },
]

const formatSkyMusicDate = (date) => {
  if (!date) return 'Date';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const HomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedScreen, setSelectedScreen] = useState('Home');
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [minutes, setMinutes] = useState('');
  const [homeMusics, setHomeMusics] = useState([]);

  const [selectedAverageMode, setSelectedAverageMode] = useState('By days');
  const [selectedModeOfMusic, setSelectedModeOfMusic] = useState('');
  const [deleteHomeMusicModalVisible, setDeleteHomeMusicModalVisible] = useState(false);
  const [homeMusicToDelete, setHomeMusicToDelete] = useState(null);
  const [isPianoStarted, setIsPianoStarted] = useState(false);
  const [todayListened, setTodayListened] = useState(0);
  const [totalListened, setTotalListened] = useState(0);
  const [allMusic, setAllMusic] = useState([]);


  const getWeeklyData = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyData = Array(7).fill(0);

    allMusic.forEach(item => {
      const day = new Date(item.date).getDay();
      weeklyData[day] += parseInt(item.minutes, 10);
    });

    const maxMinutes = Math.max(...weeklyData);
    const barColors = weeklyData.map(minutes => minutes === maxMinutes ? '#B38C31' : '#202020');

    return {
      labels: daysOfWeek,
      datasets: [{
        data: weeklyData,
        colors: barColors.map(color => () => color),
      }],
    };
  };

  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const monthlyData = Array(7).fill(0);

    allMusic.forEach(item => {
      const month = new Date(item.date).getMonth();
      if (month < 7) {
        monthlyData[month] += parseInt(item.minutes, 10);
      }
    });

    const maxMinutes = Math.max(...monthlyData);
    const barColors = monthlyData.map(minutes => minutes === maxMinutes ? '#B38C31' : '#202020');

    return {
      labels: months,
      datasets: [{
        data: monthlyData,
        colors: barColors.map(color => () => color),
      }],
    };
  };

  const handleDateChange = (event, selectedDate) => {

    setDate(selectedDate);
  };

  const handleDeleteHomeMusic = async (id) => {
    const musicToDelete = allMusic.find(item => item.id === id);
    const updatedAllMusic = allMusic.filter(item => item.id !== id);
    setAllMusic(updatedAllMusic);

    if (musicToDelete) {
      const musicDate = new Date(musicToDelete.date).toDateString();
      const currentDate = new Date().toDateString();

      if (musicDate === currentDate) {
        const updatedHomeMusics = homeMusics.filter(item => item.id !== id);
        setHomeMusics(updatedHomeMusics);
        setTodayListened(prev => prev - musicToDelete.minutes); 
      }

      setTotalListened(prev => prev - musicToDelete.minutes); 
    }

    await AsyncStorage.setItem('homeMusics', JSON.stringify(updatedAllMusic));
  };

  const handleSaveHomeMusic = async () => {
    const hereMusics = JSON.parse(await AsyncStorage.getItem('homeMusics')) || [];
    const newId = hereMusics.length > 0 ? Math.max(...hereMusics.map(e => e.id)) + 1 : 1;
    const newMusic = {
      id: newId,
      date: date,
      minutes: parseInt(minutes, 10),
      modeOfMusic: selectedModeOfMusic,
    };

    try {
      hereMusics.unshift(newMusic);
      setAllMusic(hereMusics);

      const musicDate = new Date(newMusic.date).toDateString();
      const currentDate = new Date().toDateString();

      if (musicDate === currentDate) {
        setHomeMusics(prev => [newMusic, ...prev]);
        setTodayListened(prev => prev + newMusic.minutes); 
      }

      setTotalListened(prev => prev + newMusic.minutes); 
      setModalVisible(false);
      setMinutes('');
      setDate(new Date());
      setSelectedModeOfMusic('');
      await AsyncStorage.setItem('homeMusics', JSON.stringify(hereMusics));
    } catch (error) {
      console.error('Error saving homeMusic:', error);
    }
  };


  useEffect(() => {
    const loadHomeMusics = async () => {
      try {
        const storedHomeMusics = await AsyncStorage.getItem('homeMusics');
        if (storedHomeMusics) {
          const parsedHomeMusics = JSON.parse(storedHomeMusics);
          const currentDate = new Date().toDateString();
          const filteredHomeMusics = parsedHomeMusics.filter(item => {
            const musicDate = new Date(item.date).toDateString();
            return musicDate === currentDate;
          });
          setAllMusic(parsedHomeMusics);
          setHomeMusics(filteredHomeMusics);
          const totalMinutesToday = filteredHomeMusics.reduce((sum, item) => sum + parseInt(item.minutes, 10), 0); 
          setTodayListened(totalMinutesToday); 

          const totalMinutesAllTime = parsedHomeMusics.reduce((sum, item) => sum + parseInt(item.minutes, 10), 0);
          setTotalListened(totalMinutesAllTime); 

          await AsyncStorage.setItem('homeMusics', JSON.stringify(parsedHomeMusics));
        }
      } catch (error) {
        console.error('Error loading homeMusics:', error);
      }
    };

    loadHomeMusics();

    const now = new Date();
    const millisTillMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0) - now;
    const timer = setTimeout(() => {
      setTodayListened(0);
      setHomeMusics([]);
      AsyncStorage.setItem('homeMusics', JSON.stringify([]));
    }, millisTillMidnight);

    return () => clearTimeout(timer);
  }, [selectedScreen]);

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
                paddingBottom: dimensions.height * 0.016,
              }}>
              My Music City
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
              paddingBottom: dimensions.height * 0.21,
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
                    {totalListened ? totalListened : 0}
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
                    opacity: 0.5,
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

                {selectedAverageMode === 'By days' ? (
                  <View style={{
                    marginTop: dimensions.height * 0.016,
                    width: dimensions.width * 0.9,
                    maxWidth: dimensions.width * 0.9,
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
                        Today listened
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
                        {todayListened ? todayListened : 0}
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
                ) : selectedAverageMode === 'By weeks' ? (
                  <View style={{
                    marginTop: dimensions.height * 0.016,
                    width: dimensions.width * 0.9,
                    backgroundColor: '#202020',
                    borderRadius: dimensions.width * 0.034,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: dimensions.height * 0.025,
                  }}>
                    <ScrollView horizontal={true} contentContainerStyle={{ alignItems: 'center' }}>
                      <View style={{
                        transform: [{ scale: 0.9 }],
                        paddingBottom: dimensions.height * 0.03,
                      }}>
                        <BarChart
                          data={getWeeklyData()}
                          width={dimensions.width * 1} 
                          height={dimensions.height * 0.25}
                          chartConfig={{
                            strokeWidth: 1,
                            backgroundColor: '#202020',
                            backgroundGradientFrom: '#202020',
                            backgroundGradientTo: '#202020',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                              borderRadius: dimensions.width * 0.034,
                            },
                            propsForBackgroundLines: {
                              strokeDasharray: '', 
                            },
                          }}
                          verticalLabelRotation={30}
                          fromZero
                          showBarTops
                          withInnerLines={false}
                        />
                      </View>
                    </ScrollView>
                    <View style={{
                      backgroundColor: '#363636',
                      width: dimensions.width * 0.9,
                      paddingVertical: dimensions.height * 0.01,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingHorizontal: dimensions.width * 0.025,
                      borderBottomLeftRadius: dimensions.width * 0.034,
                      borderBottomRightRadius: dimensions.width * 0.034,
                      flexDirection: 'row',
                    }}>
                      <Image
                        source={require('../assets/images/headphonesImage.png')}
                        style={{
                          width: dimensions.width * 0.23,
                          height: dimensions.width * 0.23,
                          alignSelf: 'flex-start',
                        }}
                        resizeMode='contain'
                      />
                      <Text
                        style={{
                          fontFamily: fontDMSansRegular,
                          fontWeight: 500,
                          color: 'white',
                          fontSize: dimensions.width * 0.043,
                          textAlign: 'left',
                          maxWidth: dimensions.width * 0.57,
                          marginLeft: dimensions.width * 0.016,
                        }}>
                        On {getWeeklyData().labels[getWeeklyData().datasets[0].data.indexOf(Math.max(...getWeeklyData().datasets[0].data))]}, you listened to music the most
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={{
                    marginTop: dimensions.height * 0.016,
                    width: dimensions.width * 0.9,
                    backgroundColor: '#202020',
                    borderRadius: dimensions.width * 0.034,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: dimensions.height * 0.025,
                  }}>
                    <ScrollView horizontal={true} contentContainerStyle={{ alignItems: 'center' }}>
                      <View style={{
                        transform: [{ scale: 0.9 }],
                        paddingBottom: dimensions.height * 0.03,
                      }}>
                        <BarChart
                          data={getMonthlyData()}
                          width={dimensions.width * 1} // Збільшення ширини графіка
                          height={dimensions.width * 0.5}
                          chartConfig={{
                            backgroundColor: '#202020',
                            backgroundGradientFrom: '#202020',
                            backgroundGradientTo: '#202020',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                              borderRadius: dimensions.width * 0.034,
                            },
                            propsForBackgroundLines: {
                              strokeDasharray: '', // solid background lines with no dashes
                            },
                          }}
                          verticalLabelRotation={30}
                          fromZero
                          showBarTops
                          withInnerLines={false}
                        />
                      </View>
                    </ScrollView>
                    <View style={{
                      backgroundColor: '#363636',
                      width: dimensions.width * 0.9,
                      paddingVertical: dimensions.height * 0.01,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingHorizontal: dimensions.width * 0.025,
                      borderBottomLeftRadius: dimensions.width * 0.034,
                      borderBottomRightRadius: dimensions.width * 0.034,
                      flexDirection: 'row',
                    }}>
                      <Image
                        source={require('../assets/images/headphonesImage.png')}
                        style={{
                          width: dimensions.width * 0.23,
                          height: dimensions.width * 0.23,
                          alignSelf: 'flex-start',
                        }}
                        resizeMode='contain'
                      />
                      <Text
                        style={{
                          fontFamily: fontDMSansRegular,
                          fontWeight: 500,
                          color: 'white',
                          fontSize: dimensions.width * 0.043,
                          textAlign: 'left',
                          maxWidth: dimensions.width * 0.57,
                          marginLeft: dimensions.width * 0.016,
                        }}>
                        In {getMonthlyData().labels[getMonthlyData().datasets[0].data.indexOf(Math.max(...getMonthlyData().datasets[0].data))]}, you listened to music the most
                      </Text>
                    </View>
                  </View>
                )}

                <Text
                  style={{
                    fontFamily: fontDMSansRegular,
                    color: 'white',
                    opacity: 0.5,
                    fontSize: dimensions.width * 0.034,
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                    fontWeight: 300,
                    marginTop: dimensions.height * 0.03,
                  }}>
                  Music
                </Text>

                {homeMusics.length !== 0 ? (

                  <View style={{
                    width: dimensions.width * 0.9,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: dimensions.height * 0.016,
                  }}>
                    {homeMusics.map((item, index) => (
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
                ) : (
                  <TouchableOpacity style={{
                    width: dimensions.width * 0.9,
                    marginTop: dimensions.height * 0.01,
                    backgroundColor: '#202020',
                    borderRadius: dimensions.width * 0.034,
                    alignSelf: 'center',
                    paddingVertical: dimensions.height * 0.05,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text
                      style={{
                        fontFamily: fontDMSansBlack,
                        color: 'white',
                        fontSize: dimensions.width * 0.05,
                        textAlign: 'center',
                        alignSelf: 'center',
                      }}>
                      Add some music to see it here
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              width: dimensions.width * 0.9,
              backgroundColor: '#B38C31',
              borderRadius: dimensions.width * 0.034,
              height: dimensions.height * 0.061,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              position: 'absolute',
              bottom: dimensions.height * 0.111,
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
        </View>
      ) : selectedScreen === 'Settings' ? (
        <SettingsScreen setSelectedScreen={setSelectedScreen} selectedScreen={selectedScreen} />
      ) : selectedScreen === 'Articles' ? (
        <ArticlesScreen setSelectedScreen={setSelectedScreen} />
      ) : selectedScreen === 'Player' ? (
        <PlayerScreen setSelectedScreen={setSelectedScreen} selectedScreen={selectedScreen} />
      ) : selectedScreen === 'Piano' ? (
        <PianoScreen setSelectedScreen={setSelectedScreen} selectedScreen={selectedScreen} isPianoStarted={isPianoStarted} setIsPianoStarted={setIsPianoStarted} />
      ) : null}

      {selectedScreen !== 'BubblesGame' &&
        selectedScreen !== 'LocDetails' &&
        selectedScreen !== 'Settings' &&
        !(selectedScreen === 'Piano' && isPianoStarted) && (
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
                }}
              >
                <Image
                  source={selectedScreen === button.screen ? button.btnGoldIcon : button.btnSilverIcon}
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
                    color: selectedScreen === button.screen ? '#B38C31' : '#656565',
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
              setModalVisible(false);
              setMinutes('');
              setSelectedModeOfMusic('');
              setDate(new Date());
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
              Add data
            </Text>

            <TouchableOpacity onPress={() => {
              handleSaveHomeMusic();
            }} style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}
              disabled={minutes.length === 0 || selectedModeOfMusic === ''}
            >
              <Text
                style={{
                  fontFamily: fontMontserratRegular,
                  color: '#B38C31',
                  opacity: minutes.length === 0 ? 0.5 : 1,
                  fontSize: dimensions.width * 0.043,
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontWeight: 500,
                  right: dimensions.width * 0.019,
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>


          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
            paddingBottom: dimensions.height * 0.16,
          }} style={{}}>
            <View style={{
              width: dimensions.width * 0.9,
              alignSelf: 'center',
            }}>
              <Image
                source={require('../assets/images/addDataImage.png')}
                style={{
                  width: dimensions.width * 0.84,
                  height: dimensions.width * 0.44,
                  alignSelf: 'center',
                  marginTop: dimensions.height * 0.01,
                }}
                resizeMode='contain'
              />
              <Text
                style={{
                  fontFamily: fontDMSansRegular,
                  color: 'white',
                  opacity: 0.7,
                  fontSize: dimensions.width * 0.043,
                  textAlign: 'left',
                  alignSelf: 'flex-start',
                  fontWeight: 300,
                }}>
                Date
              </Text>

              <View style={{
                width: dimensions.width * 0.9,
                backgroundColor: '#202020',
                borderRadius: dimensions.width * 0.034,
                alignItems: 'center',
                justifyContent: 'center',
                padding: dimensions.width * 0.01,
                alignSelf: 'center',
                marginTop: dimensions.height * 0.01,
              }}>
                <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display="inline"
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    handleDateChange(event, selectedDate);
                  }}
                  textColor='white'
                  zIndex={1000}
                  dateColor='white'
                  style={{
                    width: dimensions.width * 0.9,
                    fontSize: dimensions.width * 0.03,
                  }}
                  themeVariant='dark' //worked on ios only
                  accentColor='#B38C31' //worked on ios only
                />
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
                height: dimensions.height * 0.07,
              }}>
                <TextInput
                  placeholder="Number of minutes listened"
                  value={minutes}
                  onChangeText={setMinutes}
                  maxLength={3}
                  keyboardType='numeric'
                  placeholderTextColor="rgba(255, 255, 255, 0.57)"
                  style={{
                    maxWidth: dimensions.width * 0.7,
                    fontFamily: fontDMSansRegular,
                    fontSize: dimensions.width * 0.04,
                    color: 'white',
                  }}
                />
                {minutes.length > 0 && (
                  <TouchableOpacity onPress={() => {
                    setMinutes('');
                  }}>
                    <XCircleIcon size={dimensions.height * 0.03} color='#8E8E93' />
                  </TouchableOpacity>
                )}
              </View>

              <Text
                style={{
                  fontFamily: fontDMSansRegular,
                  color: 'white',
                  opacity: 0.7,
                  fontSize: dimensions.width * 0.037,
                  textAlign: 'left',
                  alignSelf: 'flex-start',
                  fontWeight: 300,
                  marginTop: dimensions.height * 0.035,
                }}>
                Choosing the mood of the music for the day
              </Text>

              <View style={{
                width: dimensions.width,
                alignSelf: 'center',
                marginTop: dimensions.height * 0.01,
              }}>
                {['Calm', 'Energetic', 'Sad', 'Joyful', 'Nostalgic', 'Soothing', 'Dynamic', 'Romantic', 'Aggressive', 'Confident', 'Light', 'Deep', 'Experimental'].map((musicMode, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedModeOfMusic(musicMode);
                    }}
                    key={index} style={{
                      width: dimensions.width * 0.9,
                      borderRadius: dimensions.width * 0.023,
                      borderColor: '#B38C31',
                      borderWidth: selectedModeOfMusic === musicMode ? dimensions.width * 0.0043 : 0,
                      backgroundColor: '#202020',
                      padding: dimensions.width * 0.04,
                      marginBottom: dimensions.height * 0.007,
                      alignSelf: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{
                      fontFamily: fontDMSansRegular,
                      color: 'white',
                      fontWeight: 500,
                      fontSize: dimensions.width * 0.04,
                      textAlign: 'center',
                      maxWidth: dimensions.width * 0.8,
                    }}
                      numberOfLines={1}
                    >
                      {musicMode}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

        </SafeAreaView>
      </Modal>


      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteHomeMusicModalVisible}
        onRequestClose={() => {
          setDeleteHomeMusicModalVisible(!deleteHomeMusicModalVisible);
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setDeleteHomeMusicModalVisible(false);
          }}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            width: dimensions.width,
            zIndex: 1000,
            height: dimensions.height,
            alignSelf: 'center',
            justifyContent: 'flex-end',
          }}>
          <SafeAreaView style={{
            flex: 1,
            justifyContent: 'flex-end'
          }}>
            <View style={{
              width: dimensions.width * 0.9,
              backgroundColor: 'rgb(18, 18, 18)',
              borderRadius: dimensions.width * 0.034,
              alignSelf: 'center',
            }}>
              <TouchableOpacity
                onPress={() => {
                  setDeleteHomeMusicModalVisible(false);
                }}
                style={{
                  width: dimensions.width * 0.9,
                  borderBottomColor: '#545458A6',
                  borderBottomWidth: dimensions.width * 0.0019,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: dimensions.height * 0.025,
                }}>
                <Text style={{
                  fontFamily: fontDMSansRegular,
                  color: '#0A84FF',
                  fontWeight: 300,
                  fontSize: dimensions.width * 0.05,
                  textAlign: 'center',
                  maxWidth: dimensions.width * 0.8,
                }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  handleDeleteHomeMusic(homeMusicToDelete.id);
                }}
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: dimensions.height * 0.025,
                }}>
                <Text style={{
                  fontFamily: fontDMSansRegular,
                  color: '#FF453A',
                  fontWeight: 600,
                  fontSize: dimensions.width * 0.05,
                  textAlign: 'center',
                  maxWidth: dimensions.width * 0.8,
                }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default HomeScreen;
