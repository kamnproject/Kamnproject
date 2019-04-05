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
    let Area_id = this.props.navigation.getParam('areaid')
    db.collection(`User`)
      .where("Area_id","==",Area_id).where("Role","==","Employee")
      .onSnapshot(querySnapshot => {
        this.target= [];
        querySnapshot.forEach(doc1 => {
          db.collection(`User/${doc1.id}/Daily_targets`).orderBy("date","desc").limit(1).onSnapshot(querySnapshot2 => {
            
            querySnapshot2.forEach(doc2 => {
                if(doc2.data().Target_achieved < doc2.data().Target_todo){
                    this.target.push({
                        id:doc2.id,
                        username:doc1.id,
                      ...doc2.data()
                    });
                    console.log("Current : ", doc1.id);
                }
                
              console.log("Current feedsdasdsadsadd: ", this.target);
            });
            this.setState({ targets: this.target });
            
        });
        
        //console.log("Current feed: ", this.target);
        });

      });

     
    
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
                name: {i.username}
              </Text>
            }
            subtitle={
              <View>
                <Text style={{ textAlign: "left" }}>Target to do: {i.Target_todo}</Text>
                <Text style={{ textAlign: "left" }}>Date: {i.date.toDate().toString()}</Text>
                <Text style={{ textAlign: "left" }}>
                Target achived: {i.Target_achieved}
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
<ScrollView>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          />

          
            
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
                {/* {this.state.targets.map((x,i)=><Text>{x.username}</Text>)}
                {this.target.map((x,i)=><Text>{x.username}</Text>)} */}
                <FlatList
                  style={{ elevation: 10 }}
                  data={this.state.targets}
                  keyExtractor={(x, i) => x.id}
                  renderItem={({ item }) => <View>{this.list(item)}</View>}
                />
            
            
         
        </View>
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