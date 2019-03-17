import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation'
import RegisterScreen from './Screens/RegisterScreen'
import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
//import { createMaterialTopTabNavigator, BottomTabBar, createDrawerNavigator } from 'react-navigation';
import HomeScreen from './Screens/Home.js'
import ProfileScreen from './Screens/Profile.js'
import MapScreen from './Screens/Map.js'
import SiteMapScreen from './Screens/SiteMap.js'
import LoginScreen from './Screens/LoginScreen'
import { Permissions, AppLoading, Asset, Font, Icon } from 'expo';


export default class App extends React.Component {
  state={
    flag:true
  }
  async componentWillMount() {
    const prompt = await Permissions.askAsync(Permissions.CAMERA)
    console.log("Camera permission 1: ", prompt)
    const result = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    console.log("Camera permission 2: ", result)
  }
  handleChange=()=>{
    this.setState({flag:!!this.state.flag})
    
  }
  render() {
    return (
      <View style={styles.container}>
        <AppContainer/> 
       {/* <AppContainer3/> */}
      </View>
    );
  }
}


const TabPages = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Map : MapScreen,
    SiteMap: SiteMapScreen,
  },
  {
    initialRouterName: 'Login',
    tabBarOptions:{activeTintColor:"#660000",inactiveTintColor:"grey", showLabel:true},
   
    defaultNavigationOptions:({navigation})=>( {
      tabBarIcon:({tintColor})=>{
        const{routeName}=navigation.state;
        if(routeName=='Home')
          return <Entypo  name="home" size={20} color={tintColor}/>
        else if(routeName==="Profile")
          return <MaterialCommunityIcons  name="face-profile" size={20} color={tintColor}/>
        else if(routeName==="Map")
        return <Foundation  name="map" size={20} color={tintColor}/>
        else if(routeName==="SiteMap")
        return <Foundation  name="info" size={20} color={tintColor}/>
      }
      })
  }
)
//const AppContainer2 = createAppContainer(TabPages)


const RootStack = createStackNavigator(
  {
    Main: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
    MyModal: {
      screen: TabPages,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
const AppContainer = createAppContainer(RootStack);
/*******************************************Drawer************************ */
// const MyDrawerNavigator = createDrawerNavigator({
//   Home:TabPages,
//   Main: HomeScreen,
//   Profile: ProfileScreen,
//   Map : MapScreen,
//   SiteMap: SiteMapScreen,
  

// },
// {
//   initialRouterName: 'Home',
//   drawerWidth:150,
//   drawerBackgroundColor:"white",
//   drawerType:"slide",
//   contentOptions:{
//     activeTintColor: 'black',
//     inactiveTintColor:"black",
    
//     activeBackgroundColor:"lightgrey",
//     itemsContainerStyle: {
//       marginVertical: 0,
//     },
//     iconContainerStyle: {
//       opacity: 1,
//     },
//     //labelstyle for the font in the drawer
//     labelStyle:{
//       //fontSize:20,
//       //color:"red"
//     }
   
//   }
// }, 
// )
// const AppContainer3 = createAppContainer(MyDrawerNavigator)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
