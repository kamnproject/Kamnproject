import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/Home';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RankingScreen from '../screens/Ranking';
import ProfileScreen from '../screens/Profile';
import MapScreen from '../screens/Map';
import UserProfileScreen from '../screens/UserProfile'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Foundation from '@expo/vector-icons/Foundation';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Ranking:RankingScreen,
  UserProfile:UserProfileScreen
},
{
  mode: 'modal',
  headerMode: 'none',
}
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused,tintColor }) => (
    <Entypo  
    name={Platform.OS === 'ios' ? 'home' : 'home'}
      size={25} 
      color={tintColor}
    />
  ),
};

const MapStack = createStackNavigator({
  Map: MapScreen,
},
{
  headerMode: 'none'
});

MapStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused,tintColor }) => (
   
    <Foundation  
    name={Platform.OS === 'ios' ? 'ios-link' : 'map'}
    size={20} 
    color={tintColor}/>
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const MyProfleStack = createStackNavigator({
  Profile: ProfileScreen,
}
,
{
  headerMode: 'none',
});

MyProfleStack.navigationOptions = {
  tabBarLabel: 'MyProfile',
  
  tabBarIcon: ({ focused,tintColor }) => (
    <MaterialCommunityIcons
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-face' : 'face-profile'}
      size={25}
      color={tintColor}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  MapStack,
  MyProfleStack,
  
},{
  tabBarOptions:{style:{ backgroundColor:"black",borderTopColor:"grey",borderTopWidth:1,borderStyle:"solid"},activeTintColor:"white",inactiveTintColor:"grey", showLabel:false},
});
