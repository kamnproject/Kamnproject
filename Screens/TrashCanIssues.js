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

export default class Issues extends React.Component {
  state = {
    issues: [],
    issueActive: []
  };
  temp = "";
  componentDidMount() {
    // go to db and get all the users
    db.collection("Trashcan_Issues").onSnapshot(querySnapshot => {
      let i = [];
      querySnapshot.forEach(doc => {
        i.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ issues: i });
      this.temp = firebase.auth().currentUser.email;
      console.log("Current issue: ", this.state.issues.length);
    });

    {
      this.temp !== "admin@admin.com";

      db.collection("Trashcan_Issues")
        .where("Status", "==", "active")
        .onSnapshot(querySnapshot => {
          let f = [];
          querySnapshot.forEach(doc => {
            f.push({ id: doc.id, ...doc.data() });
          });
          this.setState({ issueActive: f });
          this.temp = firebase.auth().currentUser.email;
          console.log("Current fixed issues: ", this.state.issueActive.length);
        });
    }
  }

  handleDetails = item => {
    this.props.navigation.navigate("IssueDetails", { issue: item });
  };

  list = i => {
    return (
      <View>
        {/* <Divider style={{ backgroundColor: 'brown',height:1 }} /> */}
        <Card
          containerStyle={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "grey",
            elevation: 10
          }}
        >
          <ListItem
            rightAvatar={
              <Button
                containerStyle={{ margin: 8, width: 80, marginLeft: 5 }}
                onPress={() => this.handleDetails(i)}
                title="Details"
              />
            }
            title={
              <Text style={{ textAlign: "left", fontWeight: "bold" }}>
                Employee_id: {i.Employee_id}
              </Text>
            }
            subtitle={
              <View>
                <Text style={{ textAlign: "left" }}>Issue: {i.Issue}</Text>
                <Text style={{ textAlign: "left" }}>Status: {i.Status}</Text>
                <Text style={{ textAlign: "left" }}>
                  {" "}
                  Date_time: {i.Date_time.toDate().toString()}
                </Text>
              </View>
            }
          />
        </Card>
      </View>
    );
  };

  Activelist = i => {
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
                Employee_id: {i.Employee_id}
              </Text>
            }
            subtitle={
              <View>
                <Text style={{ textAlign: "left" }}>Issue: {i.Issue}</Text>
                <Text style={{ textAlign: "left" }}>Status: {i.Status}</Text>
                <Text style={{ textAlign: "left" }}>
                  {" "}
                  Date_time: {i.Date_time.toDate().toString()}
                </Text>
              </View>
            }
          />
        </Card>
      </View>
    );
  };

  handleFixed = () => {
    this.props.navigation.navigate("IssuesHistory");
  };

  render() {
    return (
      <View style={styles.container}>
        {this.temp == "admin@admin.com" ? (
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
                Trashcan Issues
              </Text>

              <Button
                containerStyle={{ margin: 8, width: 200, marginRight: 10 }}
                onPress={this.handleFixed}
                title="Trashcan Issues Supplied"
              />
            </View>

            <ScrollView>
              {this.state.issueActive.length > 0 ? (
                <FlatList
                  style={{ elevation: 10 }}
                  data={this.state.issueActive}
                  keyExtractor={(x, i) => x.id}
                  renderItem={({ item }) => <View>{this.list(item)}</View>}
                />
              ) : (
                <Text style={{ marginLeft: 5 }}>
                  There are currently NO active trash can issues{" "}
                </Text>
              )}
            </ScrollView>
          </View>
        ) : (
          <View>
            <Text
              style={{
                fontWeight: "bold",
                marginLeft: 5,
                marginTop: 5,
                marginBottom: 8
              }}
            >
              {" "}
              Trashcan Issues Active
            </Text>

            <ScrollView>
              {this.state.issueActive.length > 0 ? (
                <FlatList
                  style={{ elevation: 10 }}
                  data={this.state.issueActive}
                  keyExtractor={(x, i) => x.id}
                  renderItem={({ item }) => (
                    <View>{this.Activelist(item)}</View>
                  )}
                />
              ) : (
                <Text style={{ marginLeft: 5 }}>
                  There are currently NO active trash can issues{" "}
                </Text>
              )}
            </ScrollView>
          </View>
        )}
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
