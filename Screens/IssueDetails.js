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
  Button,
  Card
} from "react-native-elements";
import db from "../db";
import firebase from "firebase";
// import console = require('console');

export default class IssueDetails extends React.Component {
  state = {
    issues: [],
    status: "",
    areaid: "",
    date_time: "",
    user: "",
    type: "",
    message: "",
    title: "",
    singleissue: "",
    tid: "",
    eid: ""
  };

  componentDidMount() {
 
    let detail = this.props.navigation.getParam("issue");
    this.setState({ issues: detail });

  }

  //list method  gets all the necessary fields from the trashcan issues collection 
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
            rightAvatar={
              <View style={{ width: 60, marginRight: 8 }}>
                {/* <Badge  status="success"/> */}
                <Button
                  containerStyle={{ margin: 8, width: "100%", marginRight: 10 }}
                  onPress={this.handleSend}
                  title="reply"
                />
              </View>
            }
            subtitle={
              <View>
                <Text style={{ textAlign: "left" }}>Issue: {i.Issue}</Text>
                <Text style={{ textAlign: "left" }}>Status: {i.Status}</Text>
                <Text style={{ textAlign: "left" }}>
                  Trashcan_id: {i.Trashcan_id}
                </Text>
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

  // once reply is clicked it sets all the fields inside trashcan issues and updates the status.
  // then sends a notifcation to that user saying request complete
  reply = async () => {
    console.log("ID", this.state.issues.id);
    await db
      .collection("Trashcan_Issues")
      .doc(this.state.issues.id)
      .set({
        Issue: this.state.issues.Issue,
        Date_time: this.state.issues.Date_time,
        Trashcan_id: this.state.issues.Trashcan_id,
        Status: "fixed",
        Employee_id: this.state.issues.Employee_id
      });
    await db
      .collection("notification")
      .doc()
      .set({
        Employee_id: this.state.eid,
        message: "your request has been fulfilled",
        title: this.state.title,
        Area_id: this.state.areaid,
        Type: this.state.type,
        Date_time: firebase.firestore.Timestamp.fromDate(new Date())
      });

    this.props.navigation.navigate("IssuesHistory");
  };

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
          Trashcan Issues Details{" "}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ marginLeft: 10 }}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Issue:</Text>
              {this.state.issues.Issue}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Status:</Text>
              {this.state.issues.Status}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Trashcan_id:</Text>
              {this.state.issues.Trashcan_id}
            </Text>
            {/* <Text> Date_time:  {this.state.issues.Trashcan_id}</Text> */}
          </View>

          <View>
            <Button
              containerStyle={{ margin: 8, width: 70, marginRight: 10 }}
              onPress={() => this.reply()}
              title="reply"
            />
          </View>
        </View>

        <ScrollView>
          <FlatList
            style={{ elevation: 10 }}
            data={this.state.issues}
            keyExtractor={(x, i) => x.id}
            renderItem={({ item }) => <View>{this.list(item)}</View>}
          />
        </ScrollView>
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
