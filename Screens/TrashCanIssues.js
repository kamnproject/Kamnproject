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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Issues extends React.Component {
  state = {
    issues: [],
    issueActive: []
  };
  temp = "";
  componentDidMount() {
    // go to db and get all the users
    db.collection("Trashcan_Issues").where("Trashcan_id","==",this.props.navigation.getParam('trashes')).onSnapshot(querySnapshot => {
      let i = [];
      querySnapshot.forEach(doc => {
        i.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ issues: i });
      //this.temp = firebase.auth().currentUser.email;
      this.temp="admin@admin.com"
      console.log("Current issue: ", this.state.issues.length);
    });

    {
      this.temp !== "admin@admin.com";

      db.collection("Trashcan_Issues")
        .where("Status", "==", "active").where("Trashcan_id","==",this.props.navigation.getParam('trashes'))
        .onSnapshot(querySnapshot => {
          let f = [];
          querySnapshot.forEach(doc => {
            f.push({ id: doc.id, ...doc.data() });
          });
          this.setState({ issueActive: f });
          this.temp="admin@admin.com"
          console.log("Current fixed issues: ", this.state.issueActive.length);
        });
    }
  }



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
                Date_time: {moment({Date_time: i.Date_time}).format(('MMMM Do YYYY, h:mm:ss a'))}
                 </Text>
              </View>
            }
          />
        </Card>
        {/* <Divider style={{ backgroundColor: 'brown',height:1 }} /> */}
      </View>
    );
  };

  Activelist = i => {
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
                Date_time: {moment({Date_time: i.Date_time}).format(('MMMM Do YYYY, h:mm:ss a'))}
                 </Text>
              </View>
            }
          />
        </Card>
        {/* <Divider style={{ backgroundColor: 'brown',height:1 }} /> */}
      </View>
    );
  };

  handleFixed = () => {
    this.props.navigation.navigate("FixedScreen",{"trashes":this.props.navigation.getParam('trashes')});
  };

  render() {
    return (
      <View style={styles.container}>
        {this.temp == "admin@admin.com" ? 
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

                              <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent:'center',
                backgroundColor: '#567D46',
                color:"white",
                width:wp("30%"),
                height:wp("10%"),
                borderRadius:5
                }}
                onPress={this.handleFixed} >
                <Text  style={{ fontSize: wp('3.5%'), fontWeight: "bold", color: "white" }} >Trashcan Issues Supplied</Text>
                </TouchableOpacity>
            </View>

            <ScrollView>
            {this.state.issueActive.length>0?
              <FlatList
                style={{ elevation: 10 }}
                data={this.state.issueActive}
                keyExtractor={(x, i) => x.id}
                renderItem={({ item }) => <View>{this.list(item)}</View>}
              />
              :
              <Text style={{marginLeft: 5}}>There are currently NO active trash can issues  </Text>
            }
            </ScrollView>
          </View>
         : 
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
            {this.state.issueActive.length>0?
              <FlatList
                style={{ elevation: 10 }}
                data={this.state.issueActive}
                keyExtractor={(x, i) => x.id}
                renderItem={({ item }) => (
                  // onPress = {()=>this.handleDetails(item)}

                  <View>{this.Activelist(item)}</View>
                )}
              />
              :
              <Text style={{marginLeft: 5}}>There are currently NO active trash can issues  </Text>
              }
            </ScrollView>
            
          </View>
        
          
           
         

        }
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