import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-gesture-handler';
import store from './redux/store';
import {Provider, useSelector} from 'react-redux';
import FlashMessage from 'react-native-flash-message';

LogBox.ignoreLogs(['Setting a timer']);

const MainApp = () => {
  const stateGlobal = useSelector(state => state);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};


export default App;