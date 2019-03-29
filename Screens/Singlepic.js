import React from "react";
import { StyleSheet, Text, View, ScrollView,Button,Image , Platform,CameraRoll,FileSystem,Alert } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  createMaterialTopTabNavigator,
  BottomTabBar,
  createDrawerNavigator
} from "react-navigation";
import {
  Header,
  ListItem,
  Divider,
  Avatar,
  Badge,
  Icon,
  withBadge, SearchBar
} from "react-native-elements";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import firebase from "firebase";
import db from "../db.js";


export default class SinglePic extends React.Component {
  state={
    images:[]


  }
  pic=this.props.pic
  componentWillMount=async ()=>{
  

  }
  render() {
    
    return (
      <ScrollView  style={{paddingLeft:20,paddingTop:30,backgroundColor: "black"}}>
      

  
        <Image style={{ width: 350, height: 700}} source={{uri : this.props.navigation.getParam('pic')}}/>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "black",
    justifyContent:"center",alignContent:"center"
  },
  container2: { flex: 1,padding: 10, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
