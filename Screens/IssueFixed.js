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
// import {Card} from 'react-native-shadow-cards';

export default class IssueFixed extends React.Component {
  state = {
    issueFixed: []
  };
  temp = "";
  //inside componentDidMount goes through the trashcan issues collection and checks if the status is fixed then display those list
  componentDidMount() {
    // go to db and get all the users
    db.collection("Trashcan_Issues")
      .where("Status", "==", "fixed")
      .onSnapshot(querySnapshot => {
        let f = [];
        querySnapshot.forEach(doc => {
          f.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ issueFixed: f });
        this.temp = firebase.auth().currentUser.email;
        console.log("Current fixed issues: ", this.state.issueFixed.length);
      });
  }

  //  list method displays the specifed items from the trash can collection
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
                Employee_id: {i.Employee_id}
              </Text>
            }
            subtitle={
              <View>
                <Text style={{ textAlign: "left" }}>Issue: {i.Issue}</Text>
                <Text style={{ textAlign: "left" }}>Status: {i.Status}</Text>
                <Text style={{ textAlign: "left" }}>
                  Date_time: {item.Date_time.toDate().toString()}{" "}
                </Text>
              </View>
            }
          />
        </Card>
      </View>
    );
  };

  // checks if user is admin then display the fixed trash can issues list
  //  if the issue fixd length is greater then 0 then show list otherwise display sentence saying no list currently
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: "bold",
            marginLeft: 5,
            marginTop: 5,
            marginBottom: 8,
            fontSize: 20
          }}
        >
          {" "}
          Trashcan Issues supplied
        </Text>

        {this.temp == "admin@admin.com" ? (
          <ScrollView>
            {this.state.issueFixed.length > 0 ? (
              <FlatList
                style={{ elevation: 10 }}
                data={this.state.issueFixed}
                keyExtractor={(x, i) => x.id}
                renderItem={({ item }) => <View>{this.list(item)}</View>}
              />
            ) : (
              <Text> there are currently No Trash can issues supplied </Text>
            )}
          </ScrollView>
        ) : null}
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
