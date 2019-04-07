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

export default class CollectedTrashcans extends React.Component {
  state = {
    trashes: [],
    search:"",
    filtereddata:[]
  };

  componentWillMount() {
    // go to db and get one the user daily targets
    db.collection("CollectedTrashcans").onSnapshot(querySnapshot => {
      let trashes = [];
      querySnapshot.forEach(doc => { 
        
        trashes.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ trashes});
      //let list = this.orderlist(users);
    //   
    //   this.setState({ filtereddata: list });
      //console.log("users", this.state.users.length);
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
    //color = this.Randcolor(item.online);
    const year = item.Time_of_full.toDate().getFullYear()
    const month = item.Time_of_full.toDate().getMonth()+1
    const date = item.Time_of_full.toDate().getDate()
    const time = item.Time_of_full.toDate().getHours()
    const min = item.Time_of_full.toDate().getMinutes()
    const sec = item.Time_of_full.toDate().getSeconds()
    const fulldate = date+"-"+month+"-"+year+" at "+ time+":"+min+":"+sec
    const year2 = item.Date_time.toDate().getFullYear()
    const month2 = item.Date_time.toDate().getMonth()+1
    const date2 = item.Date_time.toDate().getDate()
    const time2 = item.Date_time.toDate().getHours()
    const min2 = item.Date_time.toDate().getMinutes()
    const sec2 = item.Date_time.toDate().getSeconds()
    const fulldate2 = date2+"-"+month2+"-"+year2+" at "+ time2+":"+min2+":"+sec2
    return (
      <ListItem // key={i}
        title={"Id: "+item.id}
        subtitle={
          "Collected by: " +
          item.Employee_id +
          "\n" +
          "Time of full: " +
          fulldate +
          "\n" +
          "Time of Collection: " +
          fulldate2+
          "\n" +
          "Time Taken: " +
          item.Time_taken 
        }
        titleStyle={{ textAlign: "left" }}
        subtitleStyle={{ textAlign: "left" }}
        leftAvatar={
            <Avatar
            rounded
            subtitle={item.Year}
            size="medium"
            placeholderStyle={backgroundColor="red"}
          />

        }

        
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#567D46"
          placement="center"
          leftComponent={<Ionicons name="ios-arrow-round-back" size={30} color="white"onPress={() => this.props.navigation.goBack()}/>}
          centerComponent={{
            text: "Collected Trashcans",
            style: { color: "#fff", fontSize: 25 }
          }}
        />   

        {/* <Text>Ranking</Text> */}
        <ScrollView>
          {this.state.trashes.map((item, i) => (
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
