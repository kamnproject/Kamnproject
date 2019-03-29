import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  createMaterialTopTabNavigator,
  BottomTabBar,
  createDrawerNavigator
} from "react-navigation";
import { Header } from "react-native-elements";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import firebase from "firebase";
import db from "../db.js";
import { uploadImageAsync } from "../ImageUtils";
import { ImagePicker } from "expo";

export default class Profile extends React.Component {
  state = {
    user: {},
    location: {},
    avatar: ""
  };
  componentDidMount() {
    let username=this.props.navigation.getParam('username')
    // go to db and get one the user daily targets
    if(this.props.navigation.getParam('username')){
      username=this.props.navigation.getParam('username')
    }
    else{
      username="a@a.com"
    }
    

    db.collection("User")
      .where(
        firebase.firestore.FieldPath.documentId(),
        "==",
        username
      )
      .onSnapshot(querySnapshot => {
        let user = {};
        let location = {};
        querySnapshot.forEach(doc => {
          user = { id: doc.id, ...doc.data() };
          location = doc.data().Current_location;
        });
        this.setState({ user });
        this.setState({ location });
        console.log("user", location);
      });
  }

  pickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ avatar: result.uri });
      await uploadImageAsync("avatars", result.uri, this.state.user.id);
      await db
        .collection("User")
        .doc(this.state.user.id)
        .update({ avatar: this.state.user.id });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "column" }}>
          <View style={{}}>
            <Header
              backgroundColor="#567D46"
              placement="center"
              leftComponent={
                <MaterialCommunityIcons
                  name="face-profile"
                  color="white"
                  size={30}
                />
              }
              centerComponent={{
                text: "My Profile",
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
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#567D46"
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 22
              }}
            >
              {this.state.user.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#567D46"
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold"
              }}
            >
              {this.state.user.online && "Online"} | Points :
              {this.state.user.Points}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#567D46",
              paddingTop: 25,
              paddingBottom: 25
            }}
          >
            <TouchableOpacity onPress={this.pickAvatar}>
              <Image
                style={{ height: 120, width: 120, borderRadius: 150 }}
                source={require("../assets/home.png")}
              />
              <MaterialCommunityIcons
                style={{ paddingLeft: 100 }}
                name="camera"
                color="white"
                size={20}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "column",
                width: "34%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#DDDDDD",
                backgroundColor: "white",
                borderRightColor: "lightgray",
                borderWidth: 2,
                borderStyle: "solid",
                borderTopColor: "white",
                borderBottomColor: "lightgray"
              }}
              disable={true}
            >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "#567D46" }}
                >
                  {" "}
                  Online{" "}
                </Text>
                <Text style={{ fontSize: 14, color: "black" }}>
                  {" "}
                  {this.state.user.online && "Yes"}{" "}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "column",
                width: "34%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#DDDDDD",
                backgroundColor: "white",
                borderRightColor: "lightgray",
                borderWidth: 2,
                borderStyle: "solid",
                borderTopColor: "white",
                borderBottomColor: "lightgray"
              }}
              disable={true}
            >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "#567D46" }}
                >
                  {" "}
                  Points Earned{" "}
                </Text>
                <Text style={{ fontSize: 14, color: "black" }}>
                  {" "}
                  {this.state.user.Points}{" "}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "column",
                width: "34%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#DDDDDD",
                backgroundColor: "white",
                borderRightColor: "lightgray",
                borderWidth: 2,
                borderTopColor: "white",
                borderBottomColor: "lightgray"
              }}
              disable={true}
            >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "#567D46" }}
                >
                  {" "}
                  Area_id{" "}
                </Text>
                <Text style={{ fontSize: 14, color: "black" }}>
                  {" "}
                  {this.state.user.Area_id}{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", backgroundColor: "#567D46" }}>
            <Text
              style={{
                textAlign: "left",
                fontSize: 14,
                color: "white",
                fontWeight: "bold",
                padding: 5
              }}
            >
              Contact Information
            </Text>
          </View>
          <View style={{ flexDirection: "row", backgroundColor: "white" }}>
            <Text
              style={{
                textAlign: "left",
                fontSize: 14,
                color: "#567D46",
                fontWeight: "bold",
                padding: 5
              }}
            >
              Email
            </Text>
          </View>
          <View style={{ flexDirection: "row", backgroundColor: "white" }}>
            <Text
              style={{
                textAlign: "left",
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
                padding: 5
              }}
            >
              {this.state.user.id}
            </Text>
          </View>

          <View style={{ flexDirection: "row", backgroundColor: "white" }}>
            <Text
              style={{
                textAlign: "left",
                fontSize: 14,
                color: "#567D46",
                fontWeight: "bold",
                padding: 5
              }}
            >
              Phone
            </Text>
          </View>
          <View style={{ flexDirection: "row", backgroundColor: "white" }}>
            <Text
              style={{
                textAlign: "left",
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
                padding: 5
              }}
            >
              {this.state.user.Phone_no}
            </Text>
          </View>

          <View style={{ flexDirection: "row", backgroundColor: "white" }}>
            <Text
              style={{
                textAlign: "left",
                fontSize: 14,
                color: "#567D46",
                fontWeight: "bold",
                padding: 5
              }}
            >
              Badges Earned
            </Text>
          </View>
          <View style={{ flexDirection: "row", backgroundColor: "white" }}>
            <Text
              style={{
                textAlign: "left",
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
                padding: 5
              }}
            >
              {this.state.user.Badges_earned != ""
                ? " " + this.state.user.Badges_earned
                : "None"}
            </Text>
          </View>
          <View style={{ flexDirection: "row", backgroundColor: "white" }}>
            <Text
              style={{
                textAlign: "left",
                fontSize: 14,
                color: "#567D46",
                fontWeight: "bold",
                padding: 5
              }}
            >
              Current Location
            </Text>
          </View>
          <View style={{ flexDirection: "row", backgroundColor: "white" }}>
            <Text
              style={{
                textAlign: "left",
                fontSize: 14,
                color: "black",
                fontWeight: "bold",
                padding: 5
              }}
            >
              {this.state.location._lat} N, {this.state.location._long} E
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  imgprofile: {
    marginLeft: 150,
    marginTop: 50,
    height: 120,
    width: 120,
    borderRadius: 150
  },
  name: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    marginTop: 12
  },
  username: {
    color: "grey",
    fontSize: 16,
    textAlign: "center",
    marginTop: 4
  },
  itemprofile: {
    marginTop: 30,
    flex: 1,
    flexDirection: "row"
    // alignItems:"center",
    // justifyContent:"center"
  }
});
