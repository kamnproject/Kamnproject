import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header,Overlay } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen'
import StaticsInventory from './StataticsInventory'
import StataticsIssues from './StataticsIssues'
import StataticsTrashcan from './StataticsTrashcan'
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import AdminGallery from './AdminGallery';
import SinglePic from './Singlepic'

export default class StaticsMain extends React.Component {
  render() {
    return (
        <View style = {styles.container} >
         <Header
      backgroundColor="#567D46"
      placement="cemter"
  leftComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.goBack()}/>}
  centerComponent={{ text: 'Statics', style: { color: '#fff',fontSize:25 } }}
  rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('Profile')}/>}
/>
       <AppContainer2/>
       </View>
    );
  }
}
// const AppNavigator = createStackNavigator({
//   StaticsInventory: StaticsInventory

//   }, {
//     initialRouteName: 'Map',
//     headerMode:'none'
//   }
// )
const AppNavigator = createStackNavigator({
  AdminGallery:AdminGallery,
  SinglePic:SinglePic
  }, {
    initialRouteName: 'AdminGallery',
    headerMode:'none'
  }
)


// const AppNavigator2 = createStackNavigator({
//   Trashcans :Trashes,
//   TrashDetail : TrashCanDetail
//   }, {
//     initialRouteName: 'Trashcans',
//     headerMode:'none'
//   }
// )

const TabPages = createMaterialTopTabNavigator(
    {
      Trashcan:StataticsTrashcan,
      Inventory: StaticsInventory,
      Issues:StataticsIssues,
      Gallery:AppNavigator
      //TrashDetail :AppNavigator,
    },
    {
 
      initialRouteName: 'Trashcan',
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
          navBarTextFontSize: 16,
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