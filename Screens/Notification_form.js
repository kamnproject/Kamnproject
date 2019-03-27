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
areaid: "",
colorChange: false

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


 handlUser = (item) => {

  return (
    <View>
    <ListItem
      rightAvatar={<Badge  status="success" />}
      title={<Text style={{textAlign:"left",fontWeight:"bold"}}>User: {item.id}</Text>}
      />
      <Divider style={{ backgroundColor: 'brown',height:1 }} />
  
     </View>


)

 }

 handleArea = (item) => {

      return (
        <View>
        <ListItem
          rightAvatar={<Badge  status="success" />}
          title={<Text style={{textAlign:"left",fontWeight:"bold"}}>Area: {item.Name}</Text>}
          />
          <Divider style={{ backgroundColor: 'blue',height:1 }} />
        </View>

    )

 }
handleUserValue=(id)=>{
  this.setState({UserValue:id})
  this.setState({AreaValue:""})
}

handleAreaValue=(area, id)=>{
  this.setState({AreaValue:area})
  this.setState({areaid:id})
  this.setState({UserValue:""})
}




 handleShowUser=()=>{
  this.setState({flagAll:false})
  this.setState({flagUser:true})
  this.setState({flagArea:false})
  this.setState({allUserValue:"For You only"})
}

handleShowArea=()=>{
  this.setState({flagAll:false})
  this.setState({flagArea:true})
  this.setState({flagUser:false})
  this.setState({allUserValue:"Area"})
}

handleShowAll=(all)=>{
this.setState({flagAll:true})
this.setState({flagUser:false})
this.setState({flagArea:false})
this.setState({allUserValue:"all"})
this.setState({UserValue:""})
this.setState({AreaValue:""})
}


handleSend = async () => {
   const title = this.state.title
   const message = this.state.message
   const user = this.state.UserValue
   const area = this.state.areaid

  if ( title != "" && message != "" ) {
        await db.collection('notification').doc().set({ Area_id: area, Employee_id: user , Message: this.state.message, Title: title, Type: this.state.allUserValue  ,Date_time:firebase.firestore.Timestamp.fromDate(new Date()) })
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

      {  this.state.flagUser ? 
      <View>
        <Text style={{marginTop: 8, marginLeft: 5, justifyContent: "flex-start"}}> User ID </Text> 
      <Input 
            multiline= {true}
            
             placeholder='Click a User from list below'
            value={this.state.UserValue}
          style={{borderWidth:1, borderColor:"black", width: 80}}
          containerStyle={{borderWidth:1, borderColor:"black", width: 80,  borderWidth: 0.5, borderRadius: 5, padding: 3, width: '100%'}}
        />
      </View>
      : 
      null

      }


{  this.state.flagArea ? 
      <View>
        <Text style={{marginTop: 8, marginLeft: 5, justifyContent: "flex-start"}}>Area Name </Text> 
      <Input 
            multiline= {true}
            
             placeholder='Click an Area from list below'
            value={this.state.AreaValue}
          style={{borderWidth:1, borderColor:"black", width: 80}}
          containerStyle={{borderWidth:1, borderColor:"black", width: 80,  borderWidth: 0.5, borderRadius: 5, padding: 3, width: '100%'}}
        />
      </View>
      : 
      null

      }


<View style={{flexDirection: "row", justifyContent: 'space-evenly'}}>


    <CheckBox
      title=  'User'
      checkedIcon='dot-circle-o'
      uncheckedIcon='circle-o'
      checked={this.state.flagUser}
      checkedColor="green"
      onPress= {this.handleShowUser}
      containerStyle = {{width: 110}}
    />

    <CheckBox
      title='Area'
      checkedIcon='dot-circle-o'
      uncheckedIcon='circle-o'
      checked={this.state.flagArea}
      checkedColor="green"
      checkedColor="green"
      onPress= {this.handleShowArea}
      containerStyle = {{width: 105}}
    />

    <CheckBox
      title='All'
      checkedIcon='dot-circle-o'
      uncheckedIcon='circle-o'
      checked={this.state.flagAll}
      checkedColor="green"
      onPress= {this.handleShowAll}
      containerStyle = {{width: 105}}
    />


</View>

 <View style={{flexDirection: "row", marginTop: 8}}>


{ this.state.flagUser ?
<ScrollView>

 
                <FlatList 
                    style = {{elevation: 10}}
                    data = {this.state.singleUser}
                    keyExtractor = {(x,i)=>x.id}
                    renderItem = {({item})=> 
                   <TouchableOpacity
                      onPress = {()=>this.handleUserValue(item.id)}
                   
                   >
                   <View>
                        {this.handlUser(item)}
                    </View>
                    </TouchableOpacity>
                    }
                   
                />

      
  </ScrollView>
:
null

}


{ this.state.flagArea ?
  <ScrollView>

                  <FlatList 
                      style = {{elevation: 10}}
                      data = {this.state.area}
                      keyExtractor = {(x,i)=>x.id}
                      renderItem = {({item})=> 
                      <TouchableOpacity
                      onPress = {()=>this.handleAreaValue(item.Name, item.id)}
                      
                      >
                      <View>
                          {this.handleArea(item)}
                      </View>
                      </TouchableOpacity>
                      
                    }
                  />
        
    </ScrollView>
  :
  null
  
  }


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
