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
    search:"",
    filtereddata:[]
  };

  componentWillMount() {
    // go to db and get one the user daily targets
    db.collection("Inventory").onSnapshot(querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });
      let list = this.orderlist(users);
      this.setState({ users: list });
      this.setState({ filtereddata: list });
      console.log("users", this.state.users.length);
    });

  }
  orderlist = users => {
    list = users.sort((a, b) => (a.Month > b.Month ? -1 : 1));
    return list;
  };
  Randcolor = rand => {
    var color = "";
    if (rand == true) {
      color = "success";
    } else {
      color = "warning";
    }
    return color;
  };
  contains =(user, search)=>{
    let result = false
    if (user.Name.includes(search)){
        result=true
    }
   return result
    
}
updateSearch = (search) => {
    
       const data= _.filter(this.state.users, user=>{

        return this.contains(user,search)
       }
        ) 
    this.setState({ search:search, filtereddata:data  });
    
    
  };
  listloop = (item,i) => {
    color = this.Randcolor(item.online);
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
          {this.state.filtereddata.map((item, i) => (
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
