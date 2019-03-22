import React from "react";
import { StyleSheet, Text, View, ScrollView,Button,TextInput,KeyboardAvoidingView } from "react-native";
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
  withBadge, SearchBar,Card
} from "react-native-elements";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import firebase from "firebase";
import db from "../db.js";
import _ from "lodash";

export default class InventoryTake extends React.Component {
  state = {
    item: [],
    Purpose:"",
    takingQuantity:"",
    doneflag:false
  };

  componentWillMount() {
    // go to db and get one the user daily targets
    let item= this.props.navigation.getParam('item')
    this.setState({item})

  }
  handleRequest=async ()=>{
    if(this.state.Purpose&&this.state.takingQuantity){
      await db.collection('Inventory_History').doc().set({Date_time:new Date().toString(),Employee_id:firebase.auth().currentUser.email,Inventory_id:this.state.item.id,Purpose:this.state.Purpose,Quantity:this.state.takingQuantity,Type:"Taking"})
      let changeditem= this.state.item
      changeditem.Quantity= parseInt(this.state.item.Quantity)-parseInt(this.state.takingQuantity)
      const result=await db.collection('Inventory').doc(this.state.item.id).set({Area_id:changeditem.Area_id,Item_id:changeditem.Item_id,Item_name:changeditem.Item_name,Quantity:changeditem.Quantity})
      this.setState({doneflag:true})
    }
    
   
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      {!this.state.doneflag?
      <View style={styles.container}>
         <View style={{flexDirection:"row"}}>
         <View style={{flexDirection:"column"}}>
         <View style={{flexDirection:"row",paddingLeft:20}}>
         <Text style={{ fontSize: 18, fontWeight: "bold" }}>Inventory Taking Form </Text>

         </View>
         <View style={{flexDirection:"row",paddingLeft:20}}>
         <Text style={{ fontSize: 18, fontWeight: "bold" }}>Item Id: {this.state.item.Item_id}</Text>

         </View>
         <View style={{flexDirection:"row",paddingLeft:20}}>
         <Text style={{ fontSize: 18, fontWeight: "bold" }}>Item Name: {this.state.item.Item_name}</Text>
         </View>
         <View style={{flexDirection:"row",paddingLeft:20}}>
         <Text style={{ fontSize: 18, fontWeight: "bold" }}>Current Quantity:{this.state.item.Quantity} </Text>
         </View>
         <View style={{flexDirection:"row",padding:20}}>
         <Text style={{ fontSize: 18, fontWeight: "bold" }}>Please Enter Quantity taking: </Text>
         <TextInput 
        value={this.state.takingQuantity}
        onChangeText= {(takingQuantity)=> this.setState({takingQuantity})}
       style={{borderWidth:1, borderColor:"black", width: 80,fontSize: 18}}
       containerStyle={{borderWidth:1, borderColor:"black", width: 80,  borderWidth: 0.5, borderRadius: 5, padding: 3, width: '100%'}}
    />
         </View>
         <View style={{flexDirection:"row",padding:20}}>
         <Text style={{ fontSize: 18, fontWeight: "bold" }}>Please Enter Purpose: </Text>
         <TextInput 
        value={this.state.Purpose}
        onChangeText= {(Purpose)=> this.setState({Purpose})}
       style={{borderWidth:1, borderColor:"black", width: 150,height:80,fontSize: 18}}
       containerStyle={{borderWidth:1, borderColor:"black", width: 200,height:80,  borderWidth: 0.5, borderRadius: 5, padding: 3, width: '100%'}}
    />
         </View>
         <View style={{flexDirection:"row",padding:20}}>
         <Button title="Submit" onPress={this.handleRequest } style={{  fontSize: 18, fontWeight: "bold" }}/>

         </View>
          </View>
          
         </View>
         </View>:
    <View style={styles.container}>
    <View style={{flexDirection:"row",padding:20}}>
    <Text>You have submitted the form </Text>
    </View>
    <View style={{flexDirection:"row",padding:20}}>
    <Text>Now Press the back button to go back</Text>
    </View>
    <View style={{flexDirection:"row",padding:20}}>
         <Button title="Go Back" onPress={() => this.props.navigation.goBack()} style={{  fontSize: 18, fontWeight: "bold" }}/>

         </View>
         </View>
  }
         </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
    backgroundColor: "#fff"
  }
});
