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
  withBadge
} from "react-native-elements";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import firebase from "firebase";
import db from "../db.js";

export default class Ranking extends React.Component {
  state = {
    users: []
  };
  componentWillMount() {
    // go to db and get one the user daily targets
    db.collection("User").onSnapshot(querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });
      let list = this.orderlist(users);
      this.setState({ users: list });
      console.log("users", this.state.users.length);
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
        title={"Name:" + item.name}
        subtitle={
          "Email: " +
          item.id +
          "\n" +
          "Area_id:" +
          item.Area_id +
          "\n" +
          "Points:" +
          item.Points
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
          <Button
            title={"View Profile"}
            
            onPress={() => this.props.navigation.navigate("UserProfile",{username:item.id})}
          />
        }
        onPress={() => this.props.navigation.navigate("UserProfile",{username:item.id})}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#660000"
          placement="center"
          leftComponent={<Entypo name="price-ribbon" size={30} color="white" />}
          centerComponent={{
            text: "Ranking",
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
