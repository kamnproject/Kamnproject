import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  Header,
  ListItem,
  Divider,
  Badge,
  Card,
  Button
} from "react-native-elements";
import issueDetail from "./IssueDetails";
import db from "../db";
import firebase from "firebase";
import moment from "moment";
// import {Card} from 'react-native-shadow-cards';

export default class TargetsUnachieved extends React.Component {
  state = {
    users: [],
    username: "",
    targets: [],
    id: ""
  };
  temp = "";
  //email = firebase.auth().currentUser.email
  email = "a@a.com";
  componentWillMount() {
    // go to db and get all the users
    // db.collection("User").doc(this.email).collection('Daily_targets').where("Target_achieved", "<=", "Target_todo").where("date", "==", new Date())
    // .onSnapshot(querySnapshot => {
    //   let f = []
    //   querySnapshot.forEach(doc => {

    //     f.push({ id: doc.id, ...doc.data() })
    //   })
    //   this.setState({ users: f })
    //   this.temp = firebase.auth().currentUser.email
    //   console.log("Current user: ", this.state.users.length)
    // })

    {
      this.temp !== "admin@admin.com"
        ? db.collection("User").onSnapshot(querySnapshot => {
            let f = [];
            querySnapshot.forEach(async doc => {
              const user = { id: doc.id, ...doc.data() };
              const Daily_targets = await doc.ref
                .collection("Daily_targets")
                .where("Target_achieved", "<=", "Target_todo")
                .where("date", "==", new Date())
                .get();
              console.log("daily targets", Daily_targets);

              // db.collection(`User/${item.id}/Daily_targets`)

              f.push(user);
              await this.setState({ users: f });
            });
            this.temp = firebase.auth().currentUser.email;
            console.log("Current user: ", this.state.users.length);
          })
        : null;
    }
  }

  handlUser = item => {
    return (
      <View>
        <ListItem
          rightAvatar={<Badge status="success" />}
          title={
            <Text style={{ textAlign: "left", fontWeight: "bold" }}>
              {" "}
              {item.id}
            </Text>
          }
        />
        <Divider style={{ backgroundColor: "brown", height: 1 }} />
      </View>
    );
  };

  list = i => {
    return (
      <View>
        {/* <Divider style={{ backgroundColor: 'brown',height:1 }} /> */}
        {console.log("time:", new Date())}

        <Card
          containerStyle={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "grey",
            elevation: 10
          }}
        >
          <ListItem
            title={
              <Text style={{ textAlign: "left", fontWeight: "bold" }}>
                name: {i.name}
              </Text>
            }
            subtitle={
              <View>
                <Text style={{ textAlign: "left" }}>Area_id: {i.Area_id}</Text>
                <Text style={{ textAlign: "left" }}>online: {i.online}</Text>
                <Text style={{ textAlign: "left" }}>
                  Phone_no: {i.Phone_no}
                </Text>
              </View>
            }
          />
        </Card>
        {/* <Divider style={{ backgroundColor: 'brown',height:1 }} /> */}
      </View>
    );
  };

  //   handleFixed = () => {
  //     this.props.navigation.navigate("IssuesHistory");
  //   };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#567D46"
          placement="left"
          leftComponent={
            <Ionicons
              name="md-arrow-round-back"
              size={30}
              color="white"
              onPress={() => this.props.navigation.goBack()}
            />
          }
          centerComponent={{
            text: "Targets Unacieved",
            style: { color: "#fff", fontSize: 25 }
          }}
          rightComponent={
            <Ionicons
              name="ios-notifications"
              color="white"
              size={30}
              onPress={() => this.props.navigation.navigate("NotifcationMain")}
            />
          }
        />

        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontWeight: "bold",
                marginLeft: 5,
                marginTop: 5,
                marginBottom: 8
              }}
            >
              {" "}
              Daily Targets unAchieved
            </Text>
          </View>

          <ScrollView>
            {this.state.users.length > 0 ? (
              <FlatList
                style={{ elevation: 10 }}
                data={this.state.users}
                keyExtractor={(x, i) => x.id}
                renderItem={({ item }) => <View>{this.list(item)}</View>}
              />
            ) : (
              <Text style={{ marginLeft: 5 }}>
                There are currently NO targets unachieved{" "}
              </Text>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});
