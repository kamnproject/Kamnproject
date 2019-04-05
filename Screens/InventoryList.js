import React from "react";
import { StyleSheet, Text, View, ScrollView,Button } from "react-native";
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
import _ from "lodash";

export default class InventoryList extends React.Component {
  state = {
    users: [],
    Requestlist:[],
    Inventory:[]
  };
  // currentuser=firebase.auth().currentUser.email
  currentuser="admin@admin.com"
  //currentuser="khalid@khalid.com"
  componentDidMount() {
    
    let oneuser = "";
    if(this.currentuser!="admin@admin.com"){
    db.collection("User").onSnapshot(querySnapshot =>   { 
      querySnapshot.forEach(doc => {
        if(doc.id==this.currentuser){
          oneuser=doc.data().Area_id
        }

      }
    );
    db.collection("Inventory").where("Area_id","==",oneuser).onSnapshot(querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });

      this.setState({ users: users });

      console.log("users", this.state.users.length);
    });
    console.log("Area_id", oneuser);
    }
  
  );
    
  console.log("Area_id2", oneuser);
    
    // go to db and get one the user daily targets
}
else{

this.ListInventoryHistory()

}

  }
  ListInventoryHistory=async()=>{
    db.collection("Inventory_History").where("Type","==","Taking").onSnapshot(querySnapshot =>   { 
      let Requestlist = [];
      querySnapshot.forEach(doc => {
          Requestlist.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ Requestlist: Requestlist });
  });
  console.log("Lenght", this.state.Requestlist.length);
  db.collection("Inventory").onSnapshot(querySnapshot => {
    let Inventory = [];
    querySnapshot.forEach(doc => {
      Inventory.push({ id: doc.id, ...doc.data() });
    });
  
    this.setState({ Inventory: Inventory });
    console.log("Inventory", this.state.Inventory.length);
  });
  
   }

   adminlistloop = (item,i) => {

    return (
      <ListItem // key={i}
        title={"Name: "+this.state.Inventory.map(x=>(x.id===item.Inventory_id)?x.Item_name:"")}
        subtitle={
          "Taken By: " +
          item.Employee_id
          +"\n" 
          +"Date_Time:"+
          item.Date_time+
          "\n" +
          "Area_id: "+
          this.state.Inventory.map(x=>(x.id===item.Inventory_id)?x.Area_id:"")+
          "\n" +
          "Purpose:"+
          item.Purpose +
          "\n" +
          "Quantity Taken:"+item.Quantity
          
        }
        titleStyle={{ textAlign: "left" }}
        subtitleStyle={{ textAlign: "left" }}
 

      />
      
    );
  };
  listloop = (item,i) => {

    return (
      <ListItem // key={i}
        title={item.Item_name}
        subtitle={
          "Quantity: " +
          item.Quantity 
          
        }
        titleStyle={{ textAlign: "left" }}
        subtitleStyle={{ textAlign: "left" }}
        leftAvatar={
            <Avatar
            rounded
            title={i+1+""}
            size="medium"
            placeholderStyle={backgroundColor="red"}
          />

        }
        rightAvatar={

          <Button title={"Take"}
          onPress={() => this.props.navigation.navigate("Inventorytake",{item:item})}
        />

          
      }

        
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Ranking</Text> */}
        <ScrollView>
        {this.currentuser!="admin@admin.com"?
        <View>
        <View style={{flexDirection:"row",paddingLeft:20}}>
         <Text style={{ fontSize: 18, fontWeight: "bold",textAlign:"center" }}>Inventory Taking  </Text>

         </View>
         
         { this.state.users.map((item, i) => (
            <View key={i}>
              {this.listloop(item,i)}
              <Divider style={{ backgroundColor: "black", height: 1 }} />
            </View>
          ))}
          </View>:
          <View>
            <View style={{flexDirection:"row",paddingLeft:20}}>
         <Text style={{ fontSize: 18, fontWeight: "bold",textAlign:"center" }}>Inventory Taken </Text>

         </View>
          { this.state.Requestlist.map((item, i) => (
            <View key={i}>
              {this.adminlistloop(item,i)}
              <Divider style={{ backgroundColor: "black", height: 1 }} />
            </View>
          ))}
          </View>
          
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
