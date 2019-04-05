import React from "react";
import { StyleSheet, Text, View, ScrollView,Button} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  createMaterialTopTabNavigator,
  BottomTabBar,
  createDrawerNavigator
} from "react-navigation";
import MapView from 'react-native-maps'
import {
  Header,
  ListItem,
  Divider,
  Avatar,
  Badge,
  Icon,
  withBadge, SearchBar,Card 
} from "react-native-elements";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import firebase from "firebase";
import db from "../db.js";
import _ from "lodash";

export default class EmployeeList extends React.Component {
  state = {
    users: [],
    search:"",filtereddata:[]
  };
  areaid=""
  areainfo={}
  location={}
  componentWillMount() {
    // go to db and get one the user daily targets
    areaid=this.props.navigation.getParam('areaid')
    this.areainfo=this.props.navigation.getParam('areainfo')
    this.location=this.areainfo.Location

    db.collection("User").where("Area_id","==",areaid).onSnapshot(querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });
      let list = this.orderlist(users);
      this.setState({ users: list });
      this.setState({ filtereddata: list });
      console.log("users", this.state.users.length);
    });

  }
  orderlist = users => {
    list = users.sort((a, b) => (a.Month > b.Month ? -1 : 1));
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
  contains =(user, search)=>{
    let result = false
    if (user.name.includes(search)){
        result=true
    }
   return result
    
}
updateSearch = (search) => {
    
       const data= _.filter(this.state.users, user=>{

        return this.contains(user,search)
       }
        ) 
    this.setState({ search:search, filtereddata:data  });
    
    
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
          "Role:" +
          item.Role
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
          <View>
          <Button
            title={"View Profile"}
            
            onPress={() => this.props.navigation.navigate("UserProfile",{username:item.id})}
          />
          {this.props.navigation.getParam('role')&&
        <Button
        title={"Send A Notification"}
        
        onPress={() => this.props.navigation.navigate("Usernotification",{username:item.id})}
      />
        
        }
          
          </View>
        }
        onPress={() => this.props.navigation.navigate("UserProfile",{username:item.id})}
      />
    );
  };

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <Header
          backgroundColor="#567D46"
          placement="center"
          leftComponent={<Ionicons name="ios-arrow-round-back" size={30} color="white"onPress={() => this.props.navigation.goBack()}/>}
          centerComponent={{
            text: "Area Info",
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
                <MapView
        style={{width:"100%",height:150}}
        region={{
          latitude: this.location._lat,
          longitude: this.location._long,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004
        }}
        showsUserLocation={true}
      >
          <MapView.Marker
   
     coordinate={{latitude:this.location._lat,longitude:this.location._long}}
     />
     </MapView>  
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
                Area Name: {this.areainfo.Name}
              </Text>
            }
            subtitle={
              <View>
                <Text style={{ textAlign: "left" }}> Address: {this.areainfo.Address}</Text>
                <Text style={{ textAlign: "left" }}>Contact: {this.areainfo.Emergency_contact}</Text>

              </View>
            }
           
          />


        </Card>

<View>
                    <SearchBar
                placeholder="Filter by Name"
                lightTheme round
                onChangeText={this.updateSearch}
                value={this.state.search}
                containerStyle={height=5}
              
            /> 
           <Text> {this.areaid}</Text>
        {/* <Text>Ranking</Text> */}
        {this.props.navigation.getParam('role')&&<Button title={"Notify All"} onPress={() => this.props.navigation.navigate("Sendnotificationarea",{"areaid":this.props.navigation.getParam('areaid')})}/>}
        
          {this.state.filtereddata.map((item, i) => (
            <View key={i}>
              {this.listloop(item,i)}
              <Divider style={{ backgroundColor: "black", height: 1 }} />
            </View>
          ))}
          
         </View> 
         
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
