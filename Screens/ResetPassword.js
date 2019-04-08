import React from "react";
import { StyleSheet, Text, View, ScrollView,Button,TextInput,KeyboardAvoidingView,TouchableOpacity,Alert } from "react-native";
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

export default class ResetPassword extends React.Component {
  state = {
    Email:""
  };

  handleRequest=async ()=>{
   firebase.auth().sendPasswordResetEmail(this.state.Email).then(function(user){
    
   }).catch(function(e){
       console.log(e)
   })
    Alert.alert("Check your email")
    this.props.navigation.goBack()
   
  }

  render() {
    return (
        <View style={{flex:1}}>
            <Header
          backgroundColor="#567D46"
          placement="center"
          leftComponent={<Ionicons name="ios-arrow-round-back" size={30} color="white"onPress={() => this.props.navigation.goBack()}/>}
          centerComponent={{
            text: "Reset Password",
            style: { color: "#fff", fontSize: 25 }
          }}
          
        />
      

         <Text style={{ fontSize: 18, fontWeight: "bold",paddingLeft:20 }}>Please Enter Your email: {"\n"}</Text>
         <View style={{flexDirection:"row",padding:20}}>
         <TextInput 
        value={this.state.Email}
        onChangeText= {(Email)=> this.setState({Email})}
       style={{borderWidth:1, borderColor:"black", width: wp('80%'),height:20,fontSize: 18,paddingLeft:20}}
       containerStyle={{borderWidth:1, borderColor:"black", width: wp('80%'),height:80,  borderWidth: 0.5, borderRadius: 5, padding: 3}}
    />
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
         </View>
   
    );
  }
}

const styles = StyleSheet.create({
  container: {
     //flex: 1,
    backgroundColor: "#fff"
  }
});
