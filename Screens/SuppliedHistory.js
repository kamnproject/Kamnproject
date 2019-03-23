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

export default class SuppliedHistory extends React.Component {
  state = {
    users: [],
    Inventory:[]
  };
  
  componentDidMount() {
    // let currentuser=firebase.auth().currentUser.email


    db.collection("Inventory_History").where("Type","==","Supplied").onSnapshot(querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });

      this.setState({ users: users });

      console.log("users", this.state.users.length);
    });
    db.collection("Inventory").onSnapshot(querySnapshot => {
      let Inventory = [];
      querySnapshot.forEach(doc => {
        Inventory.push({ id: doc.id, ...doc.data() });
      });
    
      this.setState({ Inventory: Inventory });
      console.log("Inventory", this.state.Inventory.length);
    });

    
    // go to db and get one the user daily targets
   

  }

  listloop = (item,i) => {

    return (
      <ListItem // key={i}
      title={"Name: "+this.state.Inventory.map(x=>(x.id===item.Inventory_id)?x.Item_name:"")}
      subtitle={
        "Requested By: " +
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
        "Quantity Requested:"+item.Quantity
        
      }
      titleStyle={{ textAlign: "left" }}
      subtitleStyle={{ textAlign: "left" }}


    />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Ranking</Text> */}
        <ScrollView>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
         <Text style={{ fontSize: 18, fontWeight: "bold",textAlign:"center" }}>Inventory Supplied  </Text>
         <Button title={"Go Back"} onPress={()=>this.props.navigation.goBack()}></Button>
         </View>
         {/* <SearchBar
                placeholder="Filter by Month"
                lightTheme round
                onChangeText={this.updateSearch}
                value={this.state.search}
                containerStyle={height=5}
                showLoading={true}
            />  */}
          {this.state.users.map((item, i) => (
            <View key={i}>
              {this.listloop(item,i)}
              <Divider style={{ backgroundColor: "black", height: 1 }} />
            </View>
          ))}
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
