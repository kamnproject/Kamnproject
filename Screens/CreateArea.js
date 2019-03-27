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
import {KeyboardAvoidingView} from 'react-native';
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
export default class Form extends React.Component {

state = {

Area: [],
address: "",
emergency: "",
location: "",
name: "",
longitude: 0,
latitude: 0

}



componentWillMount = () => {
  // go to db and get all the users
  db.collection(`Area`).onSnapshot(querySnapshot => {
    let a = [];
    querySnapshot.forEach(doc => {
      a.push({ id: doc.id, ...doc.data() });
    });
    this.setState({ Area: a });
    console.log("Current users: ", this.state.Area.length);
  });

};


handleSend = async () => {
let name = this.state.name
let address = this.state.address
let emergency = this.state.emergency
//let location = this.state.location
let latitude = parseFloat(this.state.latitude)
let longitude = parseFloat(this.state.longitude)

console.log("latiotude: ",latitude)

  if ( name != "" && address != ""  && emergency != ""  && longitude != 0 && latitude != 0) {
        await db.collection('Area').doc().set({ Name: this.state.name, Address: this.state.address , Emergency_contact: this.state.emergency, Location: new firebase.firestore.GeoPoint(latitude=latitude, longitude=longitude ) })
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
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.container}>
  
  <Header
      backgroundColor="#567D46"
      placement="left"
  leftComponent={<Ionicons  name="md-arrow-round-back" size={30} color="white"  onPress={() => this.props.navigation.goBack()}/>}
  centerComponent={{ text: 'Create Area', style: { color: '#fff',fontSize:25 } }}
  rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('NotifcationMain')}/>}
/>




  <ScrollView>
<Card style={{borderRadius: 10, backgroundColor: 'blue'}}>
        

    <Text style={{marginTop: 5, marginLeft: 5}}> Name </Text> 
    <Input 
    
        // placeholder='Title'
        value={this.state.name}
        onChangeText= {(name)=> this.setState({name})}
       containerStyle={{borderWidth:1, borderColor:"black", width: 80,  borderWidth: 0.5, borderRadius: 5, padding: 3, width: '100%'}}
    />

    <Text style={{marginTop: 8, marginLeft: 5, justifyContent: "flex-start"}}> Address </Text> 
    <Input 
        multiline= {true}
        numberOfLines = {4}
        // placeholder='Message'
        value={this.state.address}
        onChangeText= {(address)=> this.setState({address})}
       style={{borderWidth:1, borderColor:"black", width: 80}}
       containerStyle={{borderWidth:1, borderColor:"black", width: 80,  borderWidth: 0.5, borderRadius: 5, padding: 3, width: '100%'}}
    />

      
     
        <Text style={{marginTop: 8, marginLeft: 5, justifyContent: "flex-start"}}> Emergency Contact </Text> 
      <Input 
            multiline= {true}
            
           //  placeholder='Click a User from list below'
            value={this.state.emergency}
            onChangeText= {(emergency)=> this.setState({emergency})}
          style={{borderWidth:1, borderColor:"black", width: 80}}
          containerStyle={{borderWidth:1, borderColor:"black", width: 80,  borderWidth: 0.5, borderRadius: 5, padding: 3, width: '100%'}}
        />
     
        <Text style={{marginTop: 8, marginLeft: 5, justifyContent: "flex-start"}}>Longitude </Text> 
      <Input 
           //multiline= {true}
            
           //  placeholder='Click an Area from list below'
            value={this.state.longitude}
            onChangeText= {(longitude)=> this.setState({longitude})}
          style={{borderWidth:1, borderColor:"black", width: 80}}
          containerStyle={{borderWidth:1, borderColor:"black", width: 80,  borderWidth: 0.5, borderRadius: 5, padding: 3, width: '100%'}}
        />

<       Text style={{marginTop: 8, marginLeft: 5, justifyContent: "flex-start"}}>Latitude </Text> 
      <Input 
            //multiline= {true}
            
           //  placeholder='Click an Area from list below'
            value={this.state.latitude}
            onChangeText= {(latitude)=> this.setState({latitude})}
          style={{borderWidth:1, borderColor:"black", width: 80}}
          containerStyle={{borderWidth:1, borderColor:"black", width: 80,  borderWidth: 0.5, borderRadius: 5, padding: 3, width: '100%'}}
        />
     
      
    
</Card>

<Button 
  containerStyle={{marginTop: 8, width: '90%', alignContent: "center", marginLeft: 20}}
  onPress = {this.handleSend}
  title="Send"
/>

</ScrollView>
      </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
});
