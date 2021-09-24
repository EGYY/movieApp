import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import {useFonts} from "expo-font";
import AppLoading from "expo-app-loading";

const Stack = createStackNavigator()

export default function App() {
    const [fontLoaded] = useFonts({
        Regular: require('./assets/fonts/Nunito-Regular.ttf'),
        Bold: require('./assets/fonts/Nunito-Bold.ttf'),
        Black: require('./assets/fonts/Nunito-Black.ttf'),
        ExtraBold: require('./assets/fonts/Nunito-ExtraBold.ttf'),
        ExtraLight: require('./assets/fonts/Nunito-ExtraLight.ttf'),
        Light: require('./assets/fonts/Nunito-Light.ttf'),
        SemiBold: require('./assets/fonts/Nunito-SemiBold.ttf')
    })
  return fontLoaded ? (
      <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen name={'Home'}
                         component={HomeScreen}
                         options={{
                           headerShown: false
                         }}
           />
           <Stack.Screen
               name={'Film'}
               component={MovieScreen}
               options={{
                   headerShown: false
               }}
           />
         </Stack.Navigator>
      </NavigationContainer>
  ) : <AppLoading/>;
}

