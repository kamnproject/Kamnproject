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

export default class Area extends React.Component {
  state = {
    users: [],
    search:"",filtereddata:[]
  };

  componentWillMount() {
    // go to db and get one the user daily targets
    db.collection("Area").onSnapshot(querySnapshot => {
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
        title={item.Name}
        subtitle={
          "Area Id: " +
          item.id +
          "\n" +
          "Emergency coontact" +
          item.Emergency_contact +
          "\n" +
          "Location" +
          item.Location._lat+ item.Location._long+
          "\n" +
          "Address" +
          item.Address
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

        onPress={() => this.props.navigation.navigate("EmployeeList",{areaid:item.id})}
      />
    );
  };
  //temp = "admin@admin.com"
  temp="a@a.com"
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#567D46"
          placement="center"
          leftComponent={<Ionicons name="ios-arrow-round-back" size={30} color="white"onPress={() => this.props.navigation.goBack()}/>}
          centerComponent={{
            text: "Areas",
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
                    <SearchBar
                placeholder="Filter by Area Name"
                lightTheme round
                onChangeText={this.updateSearch}
                value={this.state.search}
                containerStyle={height=5}
                showLoading={true}
            /> 
              {
                  this.temp == "admin@admin.com" ?
              <Button 
                      containerStyle={{marginLeft: 270, width: 140, justifyContent: 'flex-start'}}
                      onPress = {()=>this.props.navigation.navigate('CreateArea')}
                      title="Create Area"
                      
                      />
                :
                null
   
  }
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
