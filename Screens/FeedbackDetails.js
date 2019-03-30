import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  createMaterialTopTabNavigator,
  BottomTabBar,
  createDrawerNavigator
} from "react-navigation";
import { Header } from "react-native-elements";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import firebase from "firebase";
import db from "../db.js";
import { uploadImageAsync } from "../ImageUtils";
import { ImagePicker } from "expo";

export default class FeedbackDetails extends React.Component {
  state = {
    user: {},
    location: {},
    avatar: "",
    feekback:[], 
    Question_Answer:[],
    message:"",
    today:""
  };
questans=[]
  componentWillMount() {
    this.Todaydate()
    let feekback=this.props.navigation.getParam('feedback')
this.setState({feekback:feekback})
db.collection(`User/${feekback.username}/Daily_Feedbacks`).orderBy("date").onSnapshot(querySnapshot => {
    console.log("Current jadhjasdfhas: ",this.tem)
    querySnapshot.forEach(doc => {
        this.questans.push({
            id: doc.id, ...doc.data()
        })
    })
    this.setState({ Question_Answer: this.questans })

    console.log("Current messages: ",
        this.questans.length)
        console.log("Current feed: ",
    this.questans)
        console.log("id item: ",
        this.questans)
})

  
  
   
}
Todaydate = () => {
  let today = new Date()
  format = today.getDate() + "/" + (today.getMonth() + 1)
  this.setState({ today: format })
}
notify = async () => {
    
    await db.collection("notification").doc().set({ Area_id:"",Date_time: new Date(), Message: "Thank you for giving us your daily feedback. I will talk about the problem you are facing in person with you for more details", Type:"For You only", title: "Hi" +" " +this.state.feekback.name, Employee_id:this.state.feekback.username  })
     this.props.navigation.navigate('Feedback')
 }

  render() {
    return (


          <View >
            <Header
              backgroundColor='#567D46'
              placement="center"
              leftComponent={
                <MaterialCommunityIcons
                  name="keyboard-backspace"
                  color="white"
                  size={30}
                  onPress={() => this.props.navigation.goBack()}
                />
              }
              centerComponent={{
                text: "Feedback",
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
          
         {
            this.state.Question_Answer.map((m,i)=><View>
                     {this.state.today === m.date.toDate().getDate() + "/" + (m.date.toDate().getMonth() + 1) &&<View> 
                            {m.Answer.map((l,index)=> <View>
                     
                                     <Text style={{ fontSize: wp('4.5%'), fontWeight: "bold" ,color:"black"}}>Question {index+1}: {m.Question[index]}: {'\n'}</Text>
                                  
                                     
                                     <Text style={{ fontSize: wp('4.5%'), fontWeight: "bold" ,color:"black"}}>Answer: {m.Answer[index]} {'\n'}</Text>
                                   
                                     
                                     </View>
                            )} 
                                 
                 </View>
                     } 
                     </View> 
                    
                    )} 
            <View style= {{width:"15%",height: "14%",paddingTop: "3%"}}>

                <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent:'center',
                backgroundColor: '#567D46',
                color:"white",
                height:"100%"
                }}
                onPress={this.notify} >
                <Text  style={{fontWeight:"bold", color:"white"}} >Notify</Text>
                </TouchableOpacity>

            </View>
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  imgprofile: {
    marginLeft: 150,
    marginTop: 50,
    height: 120,
    width: 120,
    borderRadius: 150
  },
  name: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    marginTop: 12
  },
  username: {
    color: "grey",
    fontSize: 16,
    textAlign: "center",
    marginTop: 4
  },
  itemprofile: {
    marginTop: 30,
    flex: 1,
    flexDirection: "row"
    // alignItems:"center",
    // justifyContent:"center"
  },

button: {
      alignItems: 'center',
      backgroundColor: 'brown',
      color:"white"
    },
   
  
});
