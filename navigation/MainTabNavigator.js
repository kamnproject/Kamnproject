import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../Screens/Home';
import LinksScreen from '../Screens/LinksScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import RankingScreen from '../Screens/Ranking';
import EOMScreen from '../Screens/EOM';
import AreaScreen from '../Screens/Area';
import EmployeeListScreen from '../Screens/EmployeeList';
import InventoryList from '../Screens/InventoryList';
import ProfileScreen from '../Screens/Profile';
import MapScreen from '../Screens/MapScreen';
import UserProfileScreen from '../Screens/UserProfile'
import MainInventory from '../Screens/MainInventory'
import LiveMap from '../Screens/Map';
import TrashList from '../Screens/Trashlist';
import TrashDetails from '../Screens/TrashCanDetail';

import inboxScreen from '../Screens/inbox'
import inboxDetails from '../Screens/inboxDetails'
import createissue from '../Screens/issuecreate'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Foundation from '@expo/vector-icons/Foundation';
//import MapView from 'react-native-maps';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Ranking:RankingScreen,
  EOM:EOMScreen,
  UserProfile:UserProfileScreen,
  Inbox: inboxScreen,
  InventoryList:InventoryList,
  EmployeeList:EmployeeListScreen,
  createissue:createissue,
  inboxD:inboxDetails,
  Area:AreaScreen,
  Register:RegisterScreen,
  Inventory:MainInventory


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
  MapV:LiveMap,
  Trashes:TrashList,
  TrashDetail:TrashDetails
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
  tabBarOptions:{style:{ backgroundColor:"white",borderTopColor:"grey",borderTopWidth:1,borderStyle:"solid"},activeTintColor:"#567D45",inactiveTintColor:"#C0C0C0", showLabel:false},
});
