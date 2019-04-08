import React from "react";
import { StyleSheet, Text, View, ScrollView,Button,TouchableOpacity,Image,} from "react-native";
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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class MyEmployee extends React.Component {
  state = {
    users: [],
    search:"",filtereddata:[]
  };
  areaid=""
  areainfo={}
  location={
    "_lat":0,
    "_long":0
  }
  async componentWillMount() {
    // go to db and get one the user daily targets
    areaid=this.props.navigation.getParam('areaid')
    const areainfo1= await db.collection("Area").doc(this.props.navigation.getParam('areaid')).get()
    this.areainfo=areainfo1.data()

   // this.props.navigation.getParam('areainfo')

    this.location=areainfo1.data().Location

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
avatarURL = (email) => {
  return "avatars%2F" +email.replace("@", "%40")
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
        title={ <Text style={{fontSize: wp('3%')}}>{ "Name:" + item.name }</Text>}
        subtitle={
          <View>
            <Text style={{fontSize: wp('3%')}}>{
          "Email: " +
          item.id +
          "\n" +
          "Area_id:" +
          item.Area_id +
          "\n" +
          "Role:" +
          item.Role
            }
          </Text>
          </View>
        }
        titleStyle={{ textAlign: "left" }}
        subtitleStyle={{ textAlign: "left" }}
        leftAvatar={
          //   <Avatar
          //   rounded
          //   title={(i+1)+""}
          //   size="medium"
          //   placeholderStyle={backgroundColor="red"}
          // />
          <Image
          style={{ width: 25, height: 25 }}
          source={{ uri: `https://firebasestorage.googleapis.com/v0/b/cp3700-f5264.appspot.com/o/${this.avatarURL(item.id)}?alt=media&token=c2f678a6-16ba-436b-86b9-7e7653cec231` }}
        />
  

        }
        rightAvatar={
          <View style={{flexDirection:"column"}}>
          
           <TouchableOpacity
                         style={{flexDirection:"column",alignItems: 'center',justifyContent:"center",
                         backgroundColor: '#DDDDDD',
                         padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",width:wp("25%"),height:wp("10%"),
                       }}
                       onPress={() => this.props.navigation.navigate("UserProfile",{username:item.id})}
                       >
                       <Text style={{ fontSize: wp('3.5%'),textAlign:"center", fontWeight: "bold",color:"white" }} >View Profile</Text>
                       </TouchableOpacity>
          {this.props.navigation.getParam('role')=="Admin"&&
      <TouchableOpacity
      
                         style={{flexDirection:"column",alignItems: 'center',justifyContent:"center",
                         backgroundColor: '#DDDDDD', marginTop:5,
                         padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",width:wp("25%"),height:wp("10%"),
                       }}
                       onPress={() => this.props.navigation.navigate("Usernotification",{username:item.id})}
                       >
                       <Text style={{ fontSize: wp('3.5%'),textAlign:"center", fontWeight: "bold",color:"white" }} >Notify</Text>
                       </TouchableOpacity>
        
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
            text: "My Employees",
            style: { color: "#fff", fontSize: 25 }
          }}
          
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
        provider={"google"}
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
              <Text style={{ textAlign: "left", fontWeight: "bold",fontSize: wp('3%') }}>
                Area Name: {this.areainfo.Name}
              </Text>
            }
            subtitle={
              <View>
                <Text style={{ textAlign: "left",fontSize: wp('3%') }}> Address: {this.areainfo.Address}</Text>
                <Text style={{ textAlign: "left",fontSize: wp('3%') }}>Contact: {this.areainfo.Emergency_contact}</Text>

              </View>
            }
           
          />


        </Card>

<View>
<View style={{textAlign:"center"}}> 
        <Text style={{textAlign:"center", fontSize:20,fontWeight:"bold"}}>Employee List</Text>
       
       </View>
                    <SearchBar
                placeholder="Filter by Name"
                lightTheme round
                onChangeText={this.updateSearch}
                value={this.state.search}
                containerStyle={height=5}
              
            /> 
           <Text> {this.areaid}</Text>
        {/* <Text>Ranking</Text> */}
        {this.props.navigation.getParam('role')=="Admin"&&
        <View style={{alignItems: 'center',justifyContent:"center",marginTop:5}}>
<TouchableOpacity
    style={{width:wp("95%"),
    height:wp("7%") ,
    borderRadius:15,backgroundColor:"#567D46",alignItems: 'center',justifyContent:"center"
}}
onPress={() => this.props.navigation.navigate("Sendnotificationarea",{"areaid":this.props.navigation.getParam('areaid')})}
    
><View style={{alignItems: 'center',justifyContent:"center",margin:5}}>
                       <Text style={{ fontSize: wp('3%'), fontWeight: "bold" ,color:"white"}}> Notify All </Text>
                       </View></TouchableOpacity>
                       </View>
        }
        
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
