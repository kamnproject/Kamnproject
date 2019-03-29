import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header,Overlay } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen'
import Mapview from './Map'
import Trashes from './Trashlist'
import TrashCanDetail from './TrashCanDetail'
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import NotificationScreen from './Notification'
//import NotificationScreen from './Notification_form'
import TrashCanIssuesScreen from './TrashCanIssues'
import IssueDetailScreen from  '../Screens/IssueDetails'
import FixedScreen from '../Screens/IssueFixed'

export default class NotificationMain extends React.Component {
  render() {
    return (
        <View style = {styles.container} >
         <Header
      backgroundColor="#567D46"
      placement="left"
  leftComponent={<Ionicons  name="md-arrow-round-back" size={30} color="white"  onPress={() => this.props.navigation.goBack()}/>}
  centerComponent={{ text: 'Notification', style: { color: '#fff',fontSize:25 } }}
  rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('NotifcationMain')}/>}
/>
       <AppContainer2/>
       </View>
    );
  }
}
const AppNavigator = createStackNavigator({
  Notification: NotificationScreen
  }, {
    initialRouteName: 'Notification',
    headerMode:'none'
  }
)
// const AppNavigator = createStackNavigator({
//   TrashDetail : TrashCanDetail
//   }, {
//     initialRouteName: 'TrashDetail',
//     //headerMode:'none'
//   }
// )


const AppNavigator2 = createStackNavigator({
    TrashCanIssues :TrashCanIssuesScreen,
    IssueDetails:IssueDetailScreen,
    IssuesHistory:FixedScreen
  }, {
    initialRouteName: 'TrashCanIssues',
    headerMode:'none'
  }
)

const TabPages = createMaterialTopTabNavigator(
    {
      Notification: AppNavigator,
      TrashCanIssues:AppNavigator2,
      //TrashDetail :AppNavigator,
    },
    {
     
      initialRouteName: 'Notification',
      animationEnabled:true,
      tabBarOptions:{
        activeTintColor:"white",inactiveTintColor:"white",showLabel:true,color:"blue",
        indicatorStyle: {
          backgroundColor:"yellow",
          opacity:1.5,
          
        },
        
        allowFontScaling: true,
        style:{
          backgroundColor:"#567D46",
          tabBarButtonColor: "black",
          navBarTextFontSize: 20,
          tabFontFamily: "Avenir-Medium"
        },
        labelStyle: {
          fontSize: 15,
          textAlign: "center"
        },
      },

    }
  )
  const AppContainer2 = createAppContainer(TabPages)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
  });