import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Informasi, Obat, Splash } from '../pages'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigator } from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
  <Tab.Navigator tabBarOptions={{showLabel: false}} tabBar={props => <BottomTabNavigator {...props} />}>
    <Tab.Screen  name="Home" component={Home} />
    <Tab.Screen  name="Informasi" component={Informasi} />
    <Tab.Screen  name="Notif" component={Obat} />
  </Tab.Navigator>
  )
}

const Router = () => {
    return (
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
        <Stack.Screen name="MainApp" component={MainApp}   options={{ headerShown: false }}/>
      </Stack.Navigator>
    )
}

export default Router
