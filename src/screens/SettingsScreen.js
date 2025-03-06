import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
} from 'react-native';
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/solid';

const fontMontserratRegular = 'Montserrat-Regular';

const linksButtons = [
  {
    id: 1,
    title: 'Terms of use',
    link: 'https://www.termsfeed.com/live/826bd1df-20da-474d-9982-6b78da09c52e',
  },
  {
    id: 2,
    title: 'Privacy Policy',
    link: 'https://www.termsfeed.com/live/08074c95-a44e-4c3f-b020-8233b38bfe7f'
  }
]

const SettingsScreen = ({ setSelectedScreen }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

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
          // setSelectedScreen('Home');
          backBackBack();
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
            right: dimensions.width * 0.091,
          }}>
          Settings
        </Text>
        <View></View>
      </View>

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
          source={require('../assets/images/settingsHorseImage.png')}
          style={{
            width: dimensions.width * 0.7,
            height: dimensions.height * 0.25,
            marginBottom: dimensions.height * 0.03,
          }}
          resizeMode='contain'
        />
      </View>

      {linksButtons.map((button) => (
        <TouchableOpacity
          key={button.id}
          onPress={() => {
            Linking.openURL(button.link);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: dimensions.width * 0.05,
            backgroundColor: '#23263C',
            borderRadius: dimensions.width * 0.05,
            width: dimensions.width * 0.9,
            marginTop: dimensions.height * 0.01,
          }}>
          <Text style={{
            color: 'white',
            fontSize: dimensions.width * 0.04,
            fontFamily: fontMontserratRegular,
            fontWeight: 400,
          }}>
            {button.title}
          </Text>
          <ChevronRightIcon size={dimensions.height * 0.03} color='white' />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SettingsScreen;
