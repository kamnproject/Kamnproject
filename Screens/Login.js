import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header,Overlay } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './LoginScreen'

export default class Login extends React.Component {
  render() {
    return (
       <AppContainer/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

const RootStack = createStackNavigator(
    {
      MyModal: {
        screen: LoginScreen,
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
  );
  
  const AppContainer = createAppContainer(RootStack);
