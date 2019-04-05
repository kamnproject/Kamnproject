import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Alert } from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import { createMaterialTopTabNavigator, BottomTabBar, createDrawerNavigator } from 'react-navigation';
// import { Header } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import {  Input, Button, CheckBox, Card } from 'react-native-elements';
import {
  Header,
  Avatar,
  ListItem,
  Divider,
  Badge
} from "react-native-elements";
import db from "../db";
import firebase from 'firebase'
export default class Usernotification extends React.Component {

state = {

area: [],
singleUser: [],
allUserValue: "",
UserValue: this.props.navigation.getParam('username'),
AreaValue: "",
flagUser:false,
flagArea: false,
flagAll:false,
title: "",
message: "",
areaid: ""

}



componentWillMount = () => {
  // go to db and get all the users
  db.collection(`User`).onSnapshot(querySnapshot => {
    let list = [];
    querySnapshot.forEach(doc => {
      list.push({ id: doc.id, ...doc.data() });
    });
    this.setState({ singleUser: list });
    console.log("Current users: ", this.state.singleUser.length);
  });

  db.collection(`Area`).onSnapshot(querySnapshot => {
    let list = [];
    querySnapshot.forEach(doc => {
      list.push({ id: doc.id, ...doc.data() });
    });
    this.setState({ area: list });
    console.log("Current areas: ", this.state.area.length);
  });



};


handleSend = async () => {
   const title = this.state.title
   const message = this.state.message
   const user = this.state.UserValue
   const area = this.state.areaid

  if ( title != "" && message != "" ) {
        await db.collection('notification').doc().set({ Area_id: area, Employee_id: user , Message: this.state.message, title, Type: this.state.allUserValue  ,Date_time:firebase.firestore.Timestamp.fromDate(new Date()) })
        Alert.alert("Message Send")
        this.props.navigation.navigate('Home')
  }

  else 
  {    
         Alert.alert("enter all the fields")
   }

}



  render() {
    return (
      <View style={styles.container}>
          <Header
          backgroundColor="#567D46"
          placement="center"
          leftComponent={<Ionicons name="ios-arrow-round-back" size={30} color="white"onPress={() => this.props.navigation.goBack()}/>}
          centerComponent={{
            text: "Employees List",
            style: { color: "#fff", fontSize: 25 }
          }}
          rightComponent={
            <Ionicons
              name="ios-notifications"
              color="white"
              size={30}
              onPress={() => this.props.navigation.navigate("Profile")}
            />
          }
          
        />

  <ScrollView>
<Card style={{borderRadius: 10, backgroundColor: 'blue'}}>
        <Text style={{margin: 5, fontSize: 20}}>Notification form</Text>

    <Text style={{marginTop: 5, marginLeft: 5}}> Title </Text> 
    <Input 
    
        // placeholder='Title'
        value={this.state.title}
        onChangeText= {(title)=> this.setState({title})}
       containerStyle={{borderWidth:1, borderColor:"black", width: 80,  borderWidth: 0.5, borderRadius: 5, padding: 3, width: '100%'}}
    />

    <Text style={{marginTop: 8, marginLeft: 5, justifyContent: "flex-start"}}> Message </Text> 
    <Input 
        multiline= {true}
        numberOfLines = {4}
        // placeholder='Message'
        value={this.state.message}
        onChangeText= {(message)=> this.setState({message})}
       style={{borderWidth:1, borderColor:"black", width: 80}}
       containerStyle={{borderWidth:1, borderColor:"black", width: 80,  borderWidth: 0.5, borderRadius: 5, padding: 3, width: '100%'}}
    />


      <View>
        <Text style={{marginTop: 8, marginLeft: 5, justifyContent: "flex-start"}}> User ID </Text> 
      <Input 
            multiline= {true}
            
             placeholder={this.state.UserValue}
            value={this.state.UserValue}
          style={{borderWidth:1, borderColor:"black", width: 80}}
          containerStyle={{borderWidth:1, borderColor:"black", width: 80,  borderWidth: 0.5, borderRadius: 5, padding: 3, width: '100%'}}
        />
      </View>

</Card>

<Button 
  containerStyle={{marginTop: 8, width: '90%', alignContent: "center", marginLeft: 20}}
  onPress = {this.handleSend}
  title="Send"
/>

</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
});
