import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Foundation from "@expo/vector-icons/Foundation";
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
import MapView from 'react-native-maps'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class AdminTrashcanIssuesDetails extends React.Component {
  state = {
    issues: [],
    status:"",
    employee:"",
    issues:"",
    trashcan:{},
    location:{
        "_lat":0,
        "_long":0
    },
    long:0,
    lat:0,
    Area_id:"",
    Status:""

  };
  temp = "";
  trashcan={}
  trashes={}

  async componentDidMount() {
    this.trashes=this.props.navigation.getParam('trashes')
    // go to db and get all the users
    console.log("sadsadasasasasasassssssssssssas",this.trashes)
    this.setState({employee:this.trashes.Employee_id})
    this.setState({status:this.trashes.Status})
    this.setState({issues:this.trashes.Issue})
    this.employee=this.trashes.Employee_id
    this.status=this.trashes.Status
    let id =this.trashes.Trashcan_id
    this.issues=this.trashes.Issue


    const trashcan= await db.collection("TrashCan").doc(this.trashes.Trashcan_id).get()
    this.trashcan= trashcan.data()

this.setState({trashcan})
this.setState({Area_id:trashcan.data().Area_id})
this.setState({Status:trashcan.data().Status})
this.setState({lat:trashcan.data().Location._lat})
this.setState({long:trashcan.data().Location._long})
    console.log("sadsadas",trashcan.data())
  }

  handleIssue=async ()=>{
   console.log("idddddddddd",this.trashes.id)
    await db.collection('Trashcan_Issues').doc(this.trashes.id).update({Status:"fixed"})
     this.props.navigation.goBack()
  }
  

  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
                 <Header
      backgroundColor="#567D46"
      placement="center"
  leftComponent={<Ionicons name="ios-arrow-round-back" size={30} color="white"onPress={() => this.props.navigation.goBack()}/>}
  centerComponent={{ text: 'Issue Details', style: { color: '#fff',fontSize:25 } }}
 // rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('Profile')}/>}
/>
   

            <Card
          containerStyle={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "grey",
            elevation: 10
          }}
          
        >

        <View style={{textAlign:"center"}}> 
        <Text style={{textAlign:"center", fontSize:20,fontWeight:"bold"}}>Trashcan Issue</Text>
       
       </View>

          <ListItem
           
            title={
              <Text style={{ textAlign: "left", fontWeight: "bold" }}>
                Employee_id: {this.state.employee}
              </Text>
            }
            subtitle={
              <View>
                <Text style={{ textAlign: "left" }}>Issue: {this.state.issues}</Text>
                <Text style={{ textAlign: "left" }}>Status: {this.state.status}</Text>
                <Text style={{ textAlign: "left" }}>
                Date_time: {moment({Date_time: this.trashes.Date_time}).format(('MMMM Do YYYY, h:mm:ss a'))}
                 </Text>
              </View>
            }
           
          />
                         <View style={{flexDirection:"row-reverse"}}>
                       <TouchableOpacity
                         style={{width:wp("30%"),
                         height:wp("10%"),float:"right",backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",borderRadius:10,alignItems: 'center',justifyContent:"center"
                       }}
                       onPress={this.handleIssue}
                         
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       {/* <AntDesign name="profile" borderColor="blue" color="white" size={wp('5.5%')}/> */}
                       <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}>Fix it </Text>
                       
                       </View>
                       </TouchableOpacity>
                       </View>
        </Card>
         
        <Card
          containerStyle={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "grey",
            elevation: 10
          }}
          
        >
                    

              <View style={{textAlign:"center"}}> 
        <Text style={{textAlign:"center", fontSize:20,fontWeight:"bold"}}>Trashcan Details</Text>
       
       </View>
          <ListItem
           
            title={
              <Text style={{ textAlign: "left", fontWeight: "bold" }}>
                Area_id: {this.state.Area_id}
              </Text>
            }
            subtitle={
              <View>
                <Text style={{ textAlign: "left" }}>Trashcan_id: {this.state.trashcan.id}</Text>
                <Text style={{ textAlign: "left" }}>Status: {this.state.Status}</Text>

              </View>
            }
           
          />
          <MapView
        style={{flex: 1,width:300,height:250}}
        region={{
          latitude: this.state.lat,
          longitude: this.state.long,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004
        }}
        showsUserLocation={true}
        provider={"google"}
      >
          <MapView.Marker
   
     coordinate={{latitude:this.state.lat,longitude:this.state.long}}
     />
     </MapView>

        </Card>
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