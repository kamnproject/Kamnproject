import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import { createMaterialTopTabNavigator, BottomTabBar, createDrawerNavigator } from 'react-navigation';
import { Header } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserProfileScreen from './UserProfile'
import RankingScreen from './Ranking'
import Home from './Home'


export default class MainMap extends React.Component {
  render() {
    return (
        <AppContainer2/>

    );
  }
}
const RootStack1 = createStackNavigator(
    {
        Main: {
            screen: Home,
          },
      Ranking:{
        screen:RankingScreen,
        
        
      },
      UserProfile:{
          screen:UserProfileScreen
      }
    },
    {initialRouteName: "Main",
        headerMode:"none"
    }
    
  
  );
  const AppContainer2 = createAppContainer(RootStack1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
