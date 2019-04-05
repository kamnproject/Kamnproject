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
      placement="left"
  leftComponent={<Foundation  name="map" size={30} color="white"/>}
  centerComponent={{ text: 'Map', style: { color: '#fff',fontSize:25 } }}
  rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('Profile')}/>}
/>
    <Button title="Fix it" onPress={this.handleIssue}/>
            <Card
          containerStyle={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "grey",
            elevation: 10
          }}
          
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
        </Card>
         
        <Card
          containerStyle={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "grey",
            elevation: 10
          }}
          
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
                Trashcan Details
              </Text>
          <ListItem
           
            title={
              <Text style={{ textAlign: "left", fontWeight: "bold" }}>
                Area_id: {this.state.Area_id}
              </Text>
            }
            subtitle={
              <View>
                <Text style={{ textAlign: "left" }}> Trashcan_id: {this.state.trashcan.id}</Text>
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