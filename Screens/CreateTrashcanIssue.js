import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Alert,TextInput } from 'react-native';
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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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

area: [],
singleUser: [],
allUserValue: "",
UserValue: "",
AreaValue: "",
flagUser:false,
flagArea: false,
flagAll:false,
title: "",
message: "",
areaid: ""

}

//username = firebase.auth().currentUser.email
username = "khalid@khalid.com"
componentWillMount = () => {

};
trash = this.props.navigation.getParam('trashes')
handleSend = async () => {
   const title = this.state.title
   const message = this.state.message
   //const user = this.username
   const trash = this.trash.id
console.log("TrashId: ",area)
  if ( title != "" && message != "" ) {
        await db.collection('Trashcan_Issues').doc().set({Date_time:firebase.firestore.Timestamp.fromDate(new Date()), Employee_id: this.username ,Title:this.state.title, Issue:this.state.message, Status:"Active", Trashcan_id: trash})
        Alert.alert("Issue Sent")
        this.props.navigation.goBack()
  }

  else 
  {    
         Alert.alert("enter all the fields")
   }

}



  render() {
    
    return (
      <View style={styles.container}>
  

  <ScrollView>
<Card style={{borderRadius: 10, backgroundColor: 'blue'}}>
        <Text style={{margin: 5, fontSize: 20}}>Issue form</Text>
        <Text style={{margin: 5}}>Submit the issue to Admin</Text>

    <Text style={{marginTop: 5, marginLeft: 5}}> Title </Text> 
    <Input 
    
        // placeholder='Title'
        value={this.state.title}
        onChangeText= {(title)=> this.setState({title})}
       containerStyle={{borderWidth:1, borderColor:"black", width: 80,  borderWidth: 0.5, borderRadius: 5, padding: 3, width: '100%'}}
    />

    <Text style={{marginTop: 8, marginLeft: 5, justifyContent: "flex-start"}}> Issue </Text> 
    <Input 
        multiline= {true}
        numberOfLines = {4}
        // placeholder='Message'
        value={this.state.message}
        onChangeText= {(message)=> this.setState({message})}
       style={{borderWidth:1, borderColor:"black", width: 80}}
       containerStyle={{borderWidth:1, borderColor:"black", width: 80,  borderWidth: 0.5, borderRadius: 5, padding: 3, width: '100%'}}
    /> 
    
</Card>
<View style={{alignItems: 'center',justifyContent:"center",marginTop:5}}>
<TouchableOpacity
    style={{width:wp("95%"),
    height:wp("10%") ,
    borderRadius:15,backgroundColor:"#567D46",alignItems: 'center',justifyContent:"center"
}}
    onPress={this.handleSend}
    
><View style={{alignItems: 'center',justifyContent:"center",margin:5}}>
                       <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white"}}> Send </Text>
                       </View></TouchableOpacity>
                       </View>

</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    textAlign:"center"
  },
});