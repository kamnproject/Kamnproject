import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header,Overlay } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen'
import InventoryList from './InventoryList'
import InventoryRequest from './InventoryRequest'
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import Inventorytake from './Inventorytake'
import RequestForm from './Inventoryrequestform'
import SuppliedHistory from './SuppliedHistory'

export default class MainInventory extends React.Component {
  render() {
    return (
        <View style = {styles.container} >
         <Header
      backgroundColor="#567D46"
      placement="center"
  leftComponent={<Ionicons name="ios-arrow-round-back" size={30} color="white"onPress={() => this.props.navigation.goBack()}/>}
  centerComponent={{ text: 'Inventory', style: { color: '#fff',fontSize:25 } }}
/>
       <AppContainer2/>
       </View>
    );
  }
}
const AppNavigator = createStackNavigator({
    Inventorytake:Inventorytake,
    List: InventoryList,
    
  }, {
    initialRouteName: 'List',
    headerMode:'none'
  }
)
const AppNavigator2 = createStackNavigator({
    Request:InventoryRequest,
    Requestform:RequestForm,
    SuppliedHistory:SuppliedHistory
  }, {
    initialRouteName: 'Request',
    headerMode:'none'
  }
)
const TabPages = createMaterialTopTabNavigator(
    {
      Inventory_List: AppNavigator,
      Request:AppNavigator2
      //TrashDetail :AppNavigator,
    },
    {
     
      initialRouteName: 'Inventory_List',
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