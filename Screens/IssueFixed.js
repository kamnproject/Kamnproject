import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Header,ListItem, Divider, Badge, Card, Button } from 'react-native-elements';
import issueDetail from './IssueDetails'
import db from '../db'
import firebase from "firebase";
// import {Card} from 'react-native-shadow-cards';

export default class IssueFixed extends React.Component {
 state = {

issueFixed: []

 }
temp = "" 
 componentDidMount() {
  // go to db and get all the users
  db.collection("Trashcan_Issues").where("Status", "==", "fixed")
    .onSnapshot(querySnapshot => {
      let f = []
      querySnapshot.forEach(doc => {
        f.push({ id: doc.id, ...doc.data() })
      })
      this.setState({ issueFixed: f })
      this.temp = firebase.auth().currentUser.email 
      console.log("Current fixed issues: ", this.state.issueFixed.length)
    })
  }



  list= (i) => {
    
    return (
        <View>
            {/* <Divider style={{ backgroundColor: 'brown',height:1 }} /> */}
       <Card containerStyle={{borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',elevation:10}}>
        <ListItem
      // rightAvatar={ 
    
      // }
      title={<Text style={{textAlign:"left",fontWeight:"bold"}}>Employee_id: {i.Employee_id}</Text>}
      subtitle={
       <View>
            <Text style={{textAlign:"left"}}>Issue: {i.Issue}</Text>
            <Text style={{textAlign:"left"}}>Status: {i.Status}</Text>
           
      </View>
      }
    />
    </Card>
    {/* <Divider style={{ backgroundColor: 'brown',height:1 }} /> */}
    </View>
    )
    
}


  render() {
    return (
      <View style={styles.container}>

        <Text style={{fontWeight: "bold", marginLeft: 5, marginTop: 5, marginBottom: 8, fontSize: 20}}> Trashcan Issues supplied</Text>
        
      {/* {
        this.temp == "admin@admin.com" ? */}
  

        <ScrollView>
                
                <FlatList 
                    style = {{elevation: 10}}
                    data = {this.state.issueFixed}
                    keyExtractor = {(x,i)=>x.id}
                    renderItem = {({item})=> 
                   
                   
                   // onPress = {()=>this.handleDetails(item)}
                    
                    
                    <View>
                        {this.list(item)}
                    </View>
                    
                   
                }
                />
            </ScrollView>
            {/* :
            null

          } */}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
