import React from "react";
import { StyleSheet, Text, View, ScrollView,Button,TouchableOpacity } from "react-native";
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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class EOM extends React.Component {
  state = {
    users: [],
    search:"",filtereddata:[]
  };
  techCompanies = [
    { label: "Apple", value: 1 },
    { label: "Facebook", value: 2 },
    { label: "Netflix", value: 3 },
    { label: "Tesla", value: 4 },
    { label: "Amazon", value: 5 },
    { label: "Alphabet", value: 6 },
  ];
  componentWillMount() {
    // go to db and get one the user daily targets
    db.collection("EOM").onSnapshot(querySnapshot => {
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
    if (user.Month.includes(search)){
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
        title={ <Text style={{fontSize: wp('3%')}}>{item.Month }</Text> }
        subtitle={
          <View>
          <Text style={{fontSize: wp('3%')}}>{
          "Employee_id: " +
          item.Employee_id +
          "\n" +
          "Achieved Target:" +
          item.Achieved_Target +
          "\n" +
          "Year:" +
          item.Year
        }
        </Text>
        </View>
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
        rightAvatar={
          <TouchableOpacity
                         style={{flexDirection:"column",alignItems: 'center',justifyContent:"center",
                         backgroundColor: '#DDDDDD',
                         padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",width:wp("25%"),height:wp("10%"),
                       }}
                       onPress={() => this.props.navigation.navigate("UserProfile",{username:item.Employee_id})}
                       >
                       <Text style={{ fontSize: wp('3.5%'),textAlign:"center", fontWeight: "bold",color:"white" }} >View Profile</Text>
                       </TouchableOpacity>
        }
        onPress={() => this.props.navigation.navigate("UserProfile",{username:item.Employee_id})}
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
            text: "EOM",
            style: { color: "#fff", fontSize: 25 }
          }}
          
        />   
                    <SearchBar
                placeholder="Filter by Month"
                lightTheme round
                onChangeText={this.updateSearch}
                value={this.state.search}
                containerStyle={height=5}
            /> 
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
