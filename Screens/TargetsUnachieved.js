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
    targets: [],
    id: ""
  };
  target = [];
  temp = "";
  //email = firebase.auth().currentUser.email

  componentWillMount() {
    db.collection(`User`)
      .orderBy("Area_id")
      .onSnapshot(querySnapshot => {
        let list = [];
        querySnapshot.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ users: list });
        console.log("Current users: ", this.state.users.length);
      });

    {
      this.state.users.map((item, i) => {
        this.target = [];
        db.collection(`User/${item.id}/Daily_targets`)
          .doc()
          .orderBy("date")
          .where("Target_achieved", "<", "Target_todo")
          .where("date", "<", new Date())
          .onSnapshot(querySnapshot => {
            console.log("Current jadhjasdfhas: ", this.tem);
            querySnapshot.forEach(doc => {
              this.target.push({
                id: doc.id,
                ...doc.data()
              });
            });

            this.setState({ targets: this.target });
            // this.setState({ filtereddata: this.questans })

            console.log("Current targets: ", this.target.length);
            console.log("Current feed: ", this.target);
          });
      });
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
      </View>
    );
  };

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
          />

          {this.temp == "amanager@manger.com" ? (
            <ScrollView>
              <Text
                style={{
                  fontWeight: "bold",
                  marginLeft: 5,
                  marginTop: 5,
                  marginBottom: 8
                }}
              >
                {" "}
                Daily Targets Not Achieved
              </Text>

              {this.state.users.length > 0 ? (
                <FlatList
                  style={{ elevation: 10 }}
                  data={this.state.users}
                  keyExtractor={(x, i) => x.id}
                  renderItem={({ item }) => <View>{this.list(item)}</View>}
                />
              ) : (
                <Text style={{ marginLeft: 8 }}>
                  There are currently NO targets unachieved{" "}
                </Text>
              )}
            </ScrollView>
          ) : null}
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
