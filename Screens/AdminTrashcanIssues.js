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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class AdminTrashcanIssues extends React.Component {
  state = {
    issues: [],
   
  };
  temp = "";
  componentDidMount() {
    // go to db and get all the users
    db.collection("Trashcan_Issues").where("Status","==","active").onSnapshot(querySnapshot => {
      let i = [];
      querySnapshot.forEach(doc => {
        i.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ issues: i });

      console.log("Current issue: ", this.state.issues.length);
    });

   
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
            onPress={()=>this.props.navigation.navigate("AdminTrashcanIssuesDetails",{"trashes":i})}
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
    this.props.navigation.navigate("AdminTrashcanIssuesHistory");
  };

  render() {
    return (
      <View style={styles.container}>
                 <Header
      backgroundColor="#567D46"
      placement="center"
  leftComponent={<Ionicons name="ios-arrow-round-back" size={30} color="white"onPress={() => this.props.navigation.goBack()}/>}
  centerComponent={{ text: 'Trashcan Issues', style: { color: '#fff',fontSize:25 } }}
  //rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('Profile')}/>}
/>
          <View>
          {/* <View style={{textAlign:"center"}}> 
        <Text style={{textAlign:"center", fontSize:25,fontWeight:"bold"}}>Trash Can Details</Text>
       
       </View> */}
<View style={{flexDirection:"row-reverse"}}>
                       <TouchableOpacity
                         style={{width:wp("30%"),
                         height:wp("10%"),float:"right",backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",borderRadius:10,alignItems: 'center',justifyContent:"center"
                       }}
                       onPress={this.handleFixed}
                         
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       {/* <AntDesign name="profile" borderColor="blue" color="white" size={wp('5.5%')}/> */}
                       <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> Issues History </Text>
                       
                       </View>
                       </TouchableOpacity>
</View>
            <ScrollView>
            {this.state.issues.length>0?
              <FlatList
                style={{ elevation: 10 }}
                data={this.state.issues}
                keyExtractor={(x, i) => x.id}
                renderItem={({ item }) => <View>{this.list(item)}</View>}
              />
              :
              <Text style={{marginLeft: 5}}>There are currently NO active trash can issues  </Text>
            }
            </ScrollView>
          </View>
         
            
            
        
        
          
           
         

        
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