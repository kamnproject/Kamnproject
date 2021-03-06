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
import CreateTrashcanIssues from './CreateTrashcanIssue'
import TrashCanIssues from '../Screens/TrashCanIssues'
import IssueDetailScreen from  '../Screens/IssueDetails'
import FixedScreen from '../Screens/IssueFixed'

export default class Trashlist extends React.Component {
  render() {
    return (
        <View style = {styles.container} >
         <Header
      backgroundColor="#567D46"
      placement="center"
  leftComponent={<Foundation  name="map" size={30} color="white"/>}
  centerComponent={{ text: 'Map', style: { color: '#fff',fontSize:25 } }}
 
/>
       <AppContainer2/>
       </View>
    );
  }
}
const AppNavigator = createStackNavigator({
  Map: Mapview
  }, {
    initialRouteName: 'Map',
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
  Trashcans :Trashes,
  TrashDetail : TrashCanDetail,
  TrashCanCreate:CreateTrashcanIssues,
  TrashCanIssues:TrashCanIssues,
  IssueDetailScreen:IssueDetailScreen,
  FixedScreen: FixedScreen
  }, {
    initialRouteName: 'Trashcans',
    headerMode:'none'
  }
)

const TabPages = createMaterialTopTabNavigator(
    {
      Map: AppNavigator,
      Trashcans:AppNavigator2,
      //TrashDetail :AppNavigator,
    },
    {
     
      initialRouteName: 'Map',
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
    //   defaultNavigationOptions:({navigation})=>( {
      
    //     tabBarIcon:()=>{
    //       const{routeName}=navigation.state;
    //       if(routeName=='Home')
    //     return <Entypo  name="home" size={30} color="red"/>
    //   else if(routeName==="Chat")
    // return <Entypo  name="chat" size={30} color="red"/> }
    //     })
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