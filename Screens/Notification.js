import React from "react";
// import { StyleSheet, Text, View } from 'react-native';
// import { Header } from 'react-native-elements';
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import firebase from "firebase";
import db from "../db";
// import { Header } from 'react-native-elements';
//import Entypo from '@expo/vector-icons/Entypo';
import {
  Input,
  Button,
  CheckBox,
  Card,
  TouchableOpacity
} from "react-native-elements";
import { Header, ListItem, Divider, Badge } from "react-native-elements";
import FormScreen from "../Screens/Notification_form";
import moment from "moment";
export default class Notification extends React.Component {
  state = {
    notifications: [],
    areaid: "",
    area: [],
    singleUser: [],
    allUserValue: "",
    UserValue: "",
    AreaValue: "",
    flagUser: false,
    flagArea: false,
    flagAll: false,
    title: "",
    message: "",
    checked: "",
    flagArea1: false,
    area_ids: "",
    userarea: {}
  };
  temp = "";

  componentWillMount = async () => {
    // go to db and get all the users
    this.temp = firebase.auth().currentUser.email
   // this.temp = "khalid@khalid.com";
    //this.temp="admin@admin.com"
    this.methodNotification();
    this.methodArea();
  };

  methodNotification = async () => {
    db.collection(`notification`).where("Employee_id", "==", this.temp = firebase.auth().currentUser.email).onSnapshot(querySnapshot => {
      let list = [];
      querySnapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ notifications: list });

      console.log("Current notification: ", this.state.notifications.length);
    });
  };
  area = [];
  methodArea = async () => {
    db.collection(`User`).onSnapshot(querySnapshot => {
      let userarea = {};
      querySnapshot.forEach(doc => {
        if (doc.id == this.temp) {
          userarea = { id: doc.id, ...doc.data() };
        }
      });
      this.setState({ userarea: userarea });

      console.log("Current notification: ", this.state.userarea.length);
    });
  };
  
  Todaydate = () => {
    let today = new Date()
    format = today.getDate() + "/" + (today.getMonth() + 1)
    this.setState({ today: format })
}

  

  render() {
    console.log("Area id", this.state.userarea.Area_id);
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ fontWeight: "bold", margin: 5, fontSize: 20 }}>
            {" "}
            Notification
          </Text>

          {this.temp !== "admin@admin.com" ? (
            <ScrollView>
              {this.state.notifications.length>0?
              <FlatList
                style={{ elevation: 10 }}
                data={this.state.notifications}
                keyExtractor={(x, i) => x.id}
                renderItem={({ item }) => (
                  <View>
                    {/* <Text>{item.Message}</Text> */}
                    {/* {this.list(item)} */}
                    <View key={item.id}>
                      {this.temp == item.Employee_id ||
                      item.Type == "all" ||
                      item.Area_id === this.state.userarea.Area_id ? (
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
                              <Text
                                style={{
                                  textAlign: "left",
                                  fontWeight: "bold"
                                }}
                              >
                                Title: {item.title}
                              </Text>
                            }
                            subtitle={
                              <View>
                                <Text style={{ textAlign: "left" }}>
                                  Message: {item.Message}
                                </Text>

                                 <Text style={{ textAlign: "left" }}>
                              
                               
                                    Date_time:  { item.Date_time.toDate().toString()}
                                </Text>  

                                <Text style={{ textAlign: "left" }}>
                                  Type: {item.Type}
                                </Text>
                              </View>
                            }
                          />
                        </Card>
                      ) : null}
                    </View>
                  </View>
                )}
              />
           :
           <Text style={{marginLeft: 5}}>There are currently NO notifications   </Text>
              }
            </ScrollView>
          ) : (
            <FormScreen />
          )}
        </View>
      </ScrollView>
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
