import React, {Component} from 'react';
import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './App/Screens/login';
import DashBoard from './App/Screens/dashboard';
import Signup from './App/Screens/signup';
import Splash from './App/Screens/splash';




const MainNavigator = createStackNavigator({
  Splash : {screen : Splash},
  Login : {screen : Login},
  DashBoard: { screen: DashBoard },
   Signup : {screen: Signup},
},

{

  headerMode: 'float',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#1446A0',
    }, 
       headerTintColor: '#fff'},

});

export default createAppContainer(MainNavigator);