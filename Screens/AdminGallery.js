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

import { TouchableOpacity } from 'react-native';
export default class AdminGallery extends React.Component {
  state={
    inventoryimages:[],
    Trashcanimages:[],
    issuesimages:[]

  }
  componentWillMount=async ()=>{
    await db.collection("AdminScreenshots").where("category","==","inventory").onSnapshot(querySnapshot => {
      let inventoryimages = [];
      
      querySnapshot.forEach(doc => {
        inventoryimages.push(doc.data().url );
      });
      //let list = this.orderlist(users);
      
      this.setState({ inventoryimages: inventoryimages });
     
      
      console.log("inventoryimages", this.state.inventoryimages.length);
      //console.log("inventoryimages",this.state.inventoryimages)
    });
    await db.collection("AdminScreenshots").where("category","==","trashcan").onSnapshot(querySnapshot => {
      let Trashcanimages = [];
      
      querySnapshot.forEach(doc => {
        Trashcanimages.push(doc.data().url );
      });
      //let list = this.orderlist(users);
      
      this.setState({ Trashcanimages: Trashcanimages });
     
      
      console.log("Trashcanimages", this.state.Trashcanimages.length);
      //console.log("inventoryimages",this.state.inventoryimages)
    });
   

  }
  render() {
    
    return (
      <ScrollView>
      <View style={{flexDirection:"column"}}>
      <View style={{flexDirection:"column"}}>
      <Text>Screeshots Inventory Statics</Text>
      <View style={{flexDirection:"row",flexWrap:"wrap"}}>
      {
        this.state.inventoryimages.map((x,i)=>
        
        <View style={{flexDirection:"column",padding:5}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SinglePic',{pic:x})}>
        <Image style={{width: 120, height: 120}}  source={{uri : x}}/>
        </TouchableOpacity>
        </View>
        
      )
      }</View>
</View>
<View style={{flexDirection:"column"}}>
<Text>{" "}</Text>
            <Text>Screeshots Trashcan Statics</Text>
      <View style={{flexDirection:"row",flexWrap:"wrap"}}>
      {
        this.state.Trashcanimages.map((x,i)=>
        
        <View style={{padding:5}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SinglePic',{pic:x})}>
        <Image style={{width: 120, height: 120}}  source={{uri : x}}/>
        </TouchableOpacity>
        </View>
        
      )
      }</View></View>

      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container2: { flex: 1, padding: 10, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
