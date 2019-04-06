import React from "react";
import { StyleSheet, Text, View, ScrollView,Button,TextInput,KeyboardAvoidingView,TouchableOpacity } from "react-native";
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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class InventoryRequestform extends React.Component {
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
      await db.collection('Inventory_History').doc().set({Date_time:new Date().toString(),Employee_id:firebase.auth().currentUser.email,Inventory_id:this.state.item.id,Purpose:this.state.Purpose,Quantity:this.state.takingQuantity,Type:"Requesting"})
     
      this.setState({doneflag:true})
    }
    
   
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      {!this.state.doneflag?
          <Card
          containerStyle={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "grey",
            elevation: 10
          }}
          
        >
       <View style={{textAlign:"center"}}> 
        <Text style={{textAlign:"center", fontSize:20,fontWeight:"bold"}}>Request Inventory Form </Text>
       
       </View>
         <View style={{flexDirection:"row"}}>
          
       
         <View style={{flexDirection:"column"}}>

         <View style={{flexDirection:"row",paddingLeft:20}}>
         <Text style={{ fontSize: 18 }}>Item Id: {this.state.item.Item_id}</Text>

         </View>
         <View style={{flexDirection:"row",paddingLeft:20}}>
         <Text style={{ fontSize: 18 }}>Item Name: {this.state.item.Item_name}</Text>
         </View>
         <View style={{flexDirection:"row",paddingLeft:20}}>
         <Text style={{ fontSize: 18, }}>Current Quantity:{this.state.item.Quantity} </Text>
         </View>
         
         <Text style={{ fontSize: 18,fontWeight: "bold", padding:20 }}>Please Enter Quantity taking: {"\n"}</Text>
         <View style={{flexDirection:"row",padding:20}}>
         <TextInput 
        value={this.state.takingQuantity}
        onChangeText= {(takingQuantity)=> this.setState({takingQuantity})}
       style={{borderWidth:1, borderColor:"black", width: wp('50%'),fontSize: 18,paddingLeft:20}}
       containerStyle={{borderWidth:1, borderColor:"black", width: wp('50%'),  borderWidth: 0.5, borderRadius: 5, padding: 3}}
    />
         </View>
         
         <Text style={{ fontSize: 18, fontWeight: "bold",paddingLeft:20 }}>Please Enter Purpose: {"\n"}</Text>
         <View style={{flexDirection:"row",padding:20}}>
         <TextInput 
        value={this.state.Purpose}
        onChangeText= {(Purpose)=> this.setState({Purpose})}
       style={{borderWidth:1, borderColor:"black", width: wp('80%'),height:80,fontSize: 18,paddingLeft:20}}
       containerStyle={{borderWidth:1, borderColor:"black", width: wp('80%'),height:80,  borderWidth: 0.5, borderRadius: 5, padding: 3}}
    />
  </View>

          </View>
          
         </View>
         <View style={{flexDirection:"row-reverse",padding:20}}>
         {/* <Button title="Submit" onPress={this.handleRequest } style={{  fontSize: 18, fontWeight: "bold" }}/> */}
         <TouchableOpacity
                         style={{flexDirection:"column",alignItems: 'center',justifyContent:"center",
                         backgroundColor: '#DDDDDD', marginTop:5,
                         padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",width:wp("15%"),height:wp("10%"),
                       }}
                       onPress={this.handleRequest }
                       >
                       <Text style={{ fontSize: wp('3.5%'),textAlign:"center", fontWeight: "bold",color:"white" }} >Submit</Text>
                       </TouchableOpacity>

         </View>
         </Card>:
    <View style={styles.container}>
    <View style={{flexDirection:"row",padding:20}}>
    <Text>You have submitted the form </Text>
    </View>
    <View style={{flexDirection:"row",padding:20}}>
    <Text>Now Press the back button to go back</Text>
    </View>
    <View style={{flexDirection:"row",padding:20}}>
         {/* <Button title="Go Back" onPress={() => this.props.navigation.goBack()} style={{  fontSize: 18, fontWeight: "bold" }}/> */}

         </View>
         <TouchableOpacity
                         style={{flexDirection:"column",alignItems: 'center',justifyContent:"center",
                         backgroundColor: '#DDDDDD', marginTop:5,
                         padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",width:wp("15%"),height:wp("10%"),
                       }}
                       onPress={() => this.props.navigation.goBack()}
                       >
                       <Text style={{ fontSize: wp('3.5%'),textAlign:"center", fontWeight: "bold",color:"white" }} >Go Back</Text>
                       </TouchableOpacity>
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
