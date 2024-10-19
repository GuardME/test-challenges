import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './router/Navigation/AppNavigator';
import {LogBox} from 'react-native';
export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
