import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

LogBox.ignoreLogs(['Setting a timer']);

const App = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;
