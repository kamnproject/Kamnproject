import React from "react";
import { StyleSheet, Text, View, ScrollView,Button,TouchableOpacity } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  createMaterialTopTabNavigator,
  BottomTabBar,
  createDrawerNavigator
} from "react-navigation";
import {
  Header,
  ListItem,
  Divider,
  Avatar,
  Badge,
  Icon,
  withBadge, SearchBar
} from "react-native-elements";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import firebase from "firebase";
import db from "../db.js";
import _ from "lodash";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class InventoryList extends React.Component {
  state = {
    users: [],
    Requestlist:[],
    Inventory:[]
  };
  // currentuser=firebase.auth().currentUser.email
  currentuser="admin@admin.com"
  //currentuser="khalid@khalid.com"
  Role=""
  areaid=""
  async componentWillMount() {
    const querySnapshot = await db.collection("User").doc(firebase.auth().currentUser.email).get();
    //const querySnapshot = await db.collection("User").doc("a@a.com").get();
     //const querySnapshot = await db.collection("User").doc("admin@admin.com").get();
    
    this.Role = querySnapshot.data().Role
    this.areaid= querySnapshot.data().Area_id

    if(this.Role=="Manager"){

    db.collection("Inventory").where("Area_id","==",this.areaid).onSnapshot(querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });

      this.setState({ users: users });

      console.log("users", this.state.users.length);
    });
    //console.log("Area_id", oneuser);
  
  }

else{

this.ListInventoryHistory()

}

  }
  ListInventoryHistory=async()=>{
    db.collection("Inventory_History").where("Type","==","Taking").onSnapshot(querySnapshot =>   { 
      let Requestlist = [];
      querySnapshot.forEach(doc => {
          Requestlist.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ Requestlist: Requestlist });
  });
  console.log("Lenght", this.state.Requestlist.length);
  db.collection("Inventory").onSnapshot(querySnapshot => {
    let Inventory = [];
    querySnapshot.forEach(doc => {
      Inventory.push({ id: doc.id, ...doc.data() });
    });
  
    this.setState({ Inventory: Inventory });
    console.log("Inventory", this.state.Inventory.length);
  });
  
   }

   adminlistloop = (item,i) => {
     let name=""
    this.state.Inventory.map(x=>x.id===item.Inventory_id?name=x.Item_name:null)
    let areaid=""
    this.state.Inventory.map(x=>(x.id===item.Inventory_id)?areaid=x.Area_id:"")
    return (
      <ListItem // key={i}
        title={"Name: "+name}
        subtitle={
          "Taken By: " +
          item.Employee_id
          +"\n" 
          +"Date_Time:"+
          item.Date_time+
          "\n" +
          "Area_id: "+
          areaid
         +
          "\n" +
          "Purpose:"+
          item.Purpose +
          "\n" +
          "Quantity Taken:"+item.Quantity
          
        }
        titleStyle={{ textAlign: "left" }}
        subtitleStyle={{ textAlign: "left" }}
 

      />
      
    );
  };
  listloop = (item,i) => {

    return (
      <ListItem // key={i}
        title={<Text style={{fontSize: wp('3%')}}>{item.Item_name}</Text>}
        subtitle={
          <View>
            <Text style={{fontSize: wp('3%')}}>{
          "Quantity: " +
          item.Quantity 
        }
        </Text>
        </View>
        }
        titleStyle={{ textAlign: "left" }}
        subtitleStyle={{ textAlign: "left" }}
        leftAvatar={
            <Avatar
            rounded
            title={i+1+""}
            size="medium"
            placeholderStyle={backgroundColor="red"}
          />

        }
        rightAvatar={
<TouchableOpacity
                         style={{flexDirection:"column",alignItems: 'center',justifyContent:"center",
                         backgroundColor: '#DDDDDD', marginTop:5,
                         padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",width:wp("20%"),height:wp("10%"),
                       }}
                       onPress={() => this.props.navigation.navigate("Inventorytake",{item:item})}
                       >
                       <Text style={{ fontSize: wp('3.5%'),textAlign:"center", fontWeight: "bold",color:"white" }} >Take</Text>
                       </TouchableOpacity>


          
      }

        
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Ranking</Text> */}
        <ScrollView>
        {this.Role=="Manager"?
        <View>
  
  <View style={{textAlign:"center"}}> 
        <Text style={{textAlign:"center", fontSize:20,fontWeight:"bold"}}>Take Inventory </Text>
       
       </View>
         
         { this.state.users.map((item, i) => (
            <View key={i}>
              {this.listloop(item,i)}
              <Divider style={{ backgroundColor: "black", height: 1 }} />
            </View>
          ))}
          </View>:
          <View>

         <View style={{textAlign:"center"}}> 
        <Text style={{textAlign:"center", fontSize:20,fontWeight:"bold"}}>Inventory Taken</Text>
       
       </View>
          { this.state.Requestlist.map((item, i) => (
            <View key={i}>
              {this.adminlistloop(item,i)}
              <Divider style={{ backgroundColor: "black", height: 1 }} />
            </View>
          ))}
          </View>
          
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
