import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
} from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';

const fontMontserratRegular = 'Montserrat-Regular';
const fontDMSansRegular = 'DMSans18pt-Regular';

const musiclinksTaPButtons = [
  {
    id: 1,
    title: 'Terms of use',
    link: 'https://www.termsfeed.com/live/8eeffd4c-e1f9-4edf-8122-97217689b2fe',
  },
  {
    id: 2,
    title: 'Privacy Policy',
    link: 'https://www.termsfeed.com/live/5a7227ad-8d7d-4698-ae44-18e66b41d76f'
  }
]

const SettingsScreen = ({ }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

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
        paddingBottom: dimensions.height * 0.016,
        zIndex: 5
      }}>
        <TouchableOpacity onPress={() => {
          closeSkyMusicSettings();
          // setSelectedScreen('Home');
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
              textAlign: 'left',
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
            paddingHorizontal: dimensions.width * 0.05,
            fontWeight: 600,
            right: dimensions.width * 0.091,
          }}>
          Settings
        </Text>
        <Text></Text>
      </View>

      <Image
        source={require('../assets/images/settingsMusicImage.png')}
        style={{
          width: dimensions.width * 0.8,
          height: dimensions.height * 0.3,
          marginBottom: dimensions.height * 0.03,
        }}
        resizeMode='contain'
      />

      <View style={{
        width: dimensions.width * 0.9,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#202020',
        borderRadius: dimensions.width * 0.05,
      }}>
        {musiclinksTaPButtons.map((button) => (
          <TouchableOpacity
            key={button.id}
            onPress={() => {
              Linking.openURL(button.link);
            }}
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: dimensions.width * 0.9,
              borderBottomColor: 'rgba(255, 255, 255, 0.39)',
              borderBottomWidth: button.id !== musiclinksTaPButtons.length ? dimensions.width * 0.001 : 0,
              paddingVertical: dimensions.height * 0.025,
            }}>
            <Text style={{
              color: 'white',
              fontSize: dimensions.width * 0.04,
              fontFamily: fontMontserratRegular,
              fontWeight: 500,
              textAlign: 'left',
              alignSelf: 'flex-start',
              paddingHorizontal: dimensions.width * 0.05,
              maxWidth: dimensions.width * 0.8,
            }}>
              {button.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
