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
  withBadge,SearchBar
} from "react-native-elements";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import firebase from "firebase";
import db from "../db.js";
import _ from "lodash";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class ListofManagers extends React.Component {
  state = {
    users: [],
  
  };
  areas=[]
  componentWillMount() {
    // go to db and get one the user daily targets
    db.collection("User").where("Role","==","Manager").onSnapshot(querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        
          users.push({ id: doc.id, ...doc.data() });

        
      });
      let list = this.orderlist(users);
      this.setState({ users: list });
      this.setState({ filtereddata: list });
      console.log("users", this.state.users.length);
    });
    db.collection("Area").onSnapshot(querySnapshot => {
      let areas = [];
      querySnapshot.forEach(doc => {
        
        areas.push({ id: doc.id, ...doc.data() });

        
      });
      this.areas=areas
    });
  }
  orderlist = users => {
    list = users.sort((a, b) => (a.Points > b.Points ? -1 : 1));
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

  listloop = (item,i) => {
    color = this.Randcolor(item.online);
    return (
      <ListItem // key={i}
        title={<Text style={{fontSize: wp('3%')}}>{ "Name:" + item.name }</Text>}
        subtitle={
          <View>
            <Text style={{fontSize: wp('3%')}}>{
          "Email: " +
          item.id +
          "\n" +
          "Area_id:" +
          item.Area_id +
          "\n" +
          "Role:" +
          item.Role
            }
          </Text>
          </View>
        }
        titleStyle={{ textAlign: "left" }}
        subtitleStyle={{ textAlign: "left" }}
        leftAvatar={
            <Avatar
            rounded
            title={(i+1)+""}
            size="medium"
            placeholderStyle={backgroundColor="red"}
          />

        }
        rightAvatar={
          <View style={{flexDirection:"column"}}>

<TouchableOpacity
              style={{flexDirection:"column",alignItems: 'center',justifyContent:"center",
              backgroundColor: '#DDDDDD',
              padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",width:wp("25%"),height:wp("10%"),
            }}
            onPress={() => this.props.navigation.navigate("UserProfile",{username:item.id})}
            >
            <Text style={{ fontSize: wp('3.5%'),textAlign:"center", fontWeight: "bold",color:"white" }} >View Profile</Text>
            </TouchableOpacity>
{this.props.navigation.getParam('role')=="Admin"&&
<TouchableOpacity
              style={{flexDirection:"column",alignItems: 'center',justifyContent:"center",
              backgroundColor: '#DDDDDD', marginTop:5,
              padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",width:wp("25%"),height:wp("10%"),
            }}
            onPress={() => this.props.navigation.navigate("Usernotification",{username:item.id})}
            >
            <Text style={{ fontSize: wp('3.5%'),textAlign:"center", fontWeight: "bold",color:"white" }} >Notify</Text>
            </TouchableOpacity>

}

</View>
        }
        onPress={() => this.props.navigation.navigate("UserProfile",{username:item.id})}
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
            text: "List of Managers",
            style: { color: "#fff", fontSize: 25 }
          }}
        />

        {/* <Text>Ranking</Text> */}
        <ScrollView>
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
