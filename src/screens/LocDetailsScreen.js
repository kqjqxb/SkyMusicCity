import React, { useState, } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';

const fontMontserratRegular = 'Montserrat-Regular';
import { ScrollView } from 'react-native-gesture-handler';

const LocDetailsScreen = ({ setSelectedScreen, selectedHippodromeLoc }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  return (
    <View style={{
      flex: 1,
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: '#181A29',
    }}>
      <View style={{
        backgroundColor: '#23263C',
        width: dimensions.width,
        height: dimensions.height * 0.12,
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderRadius: dimensions.width * 0.07,
        paddingHorizontal: dimensions.width * 0.05,
        paddingTop: dimensions.height * 0.05,
        zIndex: 5
      }}>
        <TouchableOpacity onPress={() => {
          // setSelectedScreen('Home');
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
            source={selectedHippodromeLoc.image}
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
                marginTop: dimensions.width * 0.014,
              }}>
              {selectedHippodromeLoc.title}
            </Text>

            <View style={{
              flexDirection: 'row',
              width: dimensions.width * 0.9,
              alignSelf: 'flex-start',
              marginTop: dimensions.height * 0.014,
            }}>
              <View style={{
                backgroundColor: '#363B5C',
                borderRadius: dimensions.width * 0.016,
                padding: dimensions.height * 0.014,
                paddingHorizontal: dimensions.width * 0.03,
              }}>
                <Text
                  style={{
                    fontFamily: fontMontserratRegular,
                    color: 'white',
                    fontSize: dimensions.width * 0.04,
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                    fontWeight: 300,
                  }}>
                  The most popular
                </Text>
              </View>

              <View style={{
                backgroundColor: '#363B5C',
                borderRadius: dimensions.width * 0.016,
                padding: dimensions.height * 0.014,
                paddingHorizontal: dimensions.width * 0.03,
                marginLeft: dimensions.width * 0.03,
              }}>
                <Text
                  style={{
                    fontFamily: fontMontserratRegular,
                    color: 'white',
                    fontSize: dimensions.width * 0.04,
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                    fontWeight: 300,
                  }}>
                  {selectedHippodromeLoc.visitors} visitors
                </Text>
              </View>
            </View>

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
              {selectedHippodromeLoc.description}
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
              History
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
              {selectedHippodromeLoc.history}
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
              Address
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
              {selectedHippodromeLoc.address}
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
              Popular Races (Historical)
            </Text>
            {selectedHippodromeLoc.popularRaces.map((popularPlace) => (
              <Text
                key={popularPlace.id}
                style={{
                  fontFamily: fontMontserratRegular,
                  color: 'white',
                  fontSize: dimensions.width * 0.043,
                  textAlign: 'left',
                  alignSelf: 'flex-start',
                  fontWeight: 300,
                  marginTop: dimensions.height * 0.01,
                  marginLeft: dimensions.width * 0.03,
                }}>
                · {popularPlace.title}
              </Text>
            ))}

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
              Upcoming Events
            </Text>
            {selectedHippodromeLoc.upcomingEvents.map((upcomingEvent) => (
              <Text
                key={upcomingEvent.id}
                style={{
                  fontFamily: fontMontserratRegular,
                  color: 'white',
                  fontSize: dimensions.width * 0.043,
                  textAlign: 'left',
                  alignSelf: 'flex-start',
                  fontWeight: 300,
                  marginTop: dimensions.height * 0.01,
                  marginLeft: dimensions.width * 0.03,
                }}>
                · {' '}{upcomingEvent.title}
              </Text>
            ))}
          </View>

          <MapView
            style={{
              width: dimensions.width,
              borderRadius: dimensions.width * 0.04,
              alignSelf: 'center',
              height: dimensions.height * 0.23,
              width: dimensions.width * 0.9,
              marginTop: dimensions.height * 0.03,
              zIndex: 0
            }}
            region={{
              latitude: selectedHippodromeLoc.coordinates.latitude,
              longitude: selectedHippodromeLoc.coordinates.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={selectedHippodromeLoc.coordinates}
              title={selectedHippodromeLoc.title}
              description={selectedHippodromeLoc.description}
              pinColor="#0A84FF"
            />
          </MapView>
        </View>
      </ScrollView>
    </View>
  );
};

export default LocDetailsScreen;
