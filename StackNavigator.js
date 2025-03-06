import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider, UserContext } from './src/context/UserContext';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store';
import { loadUserData } from './src/redux/userSlice';

const Stack = createNativeStackNavigator();

const HippodromeGuideStack = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <UserProvider>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </UserProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { user, setUser } = useContext(UserContext);
  const [initializingHippodromeGuideApp, setInitializingHippodromeGuideApp] = useState(true);

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  useEffect(() => {
    const loadHippodromeGuideUser = async () => {
      try {
        const deviceId = await DeviceInfo.getUniqueId();
        const storageKey = `currentUser_${deviceId}`;
        const storedHippodromeGuideUser = await AsyncStorage.getItem(storageKey);

        if (storedHippodromeGuideUser) {
          setUser(JSON.parse(storedHippodromeGuideUser));
        }
      } catch (error) {
        console.error('Error loading of hippodrome user', error);
      } finally {
        setInitializingHippodromeGuideApp(false);
      }
    };
    loadHippodromeGuideUser();
  }, [setUser]);

  if (initializingHippodromeGuideApp) {
    return (
      <View style={{
        backgroundColor: '#181A29',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default HippodromeGuideStack;
