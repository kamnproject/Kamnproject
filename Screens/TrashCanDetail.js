import React from 'react';
import { StyleSheet, Text, View,Image,Button,TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import moment from 'moment'
import { createMaterialTopTabNavigator, BottomTabBar, createDrawerNavigator } from 'react-navigation';
import { Header,Card,ListItem,Badge,Divider } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from "firebase";
import db from '../db'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class Detail extends React.Component {
    state={
      list:[],
      secondsTaken:0,
      minutesTaken:0,
        yellow_can:"https://firebasestorage.googleapis.com/v0/b/kamn-e4270.appspot.com/o/images%2Fyellow_can.jpg?alt=media&token=9fbee99d-d095-4797-9295-b9d15fb09021",
    green_can:"https://firebasestorage.googleapis.com/v0/b/kamn-e4270.appspot.com/o/images%2Fgreen_can.jpg?alt=media&token=192b23c3-1fdb-49e8-94e6-8f05018b4151",
    red_can:"https://firebasestorage.googleapis.com/v0/b/kamn-e4270.appspot.com/o/images%2Fred_can.jpg?alt=media&token=d5361926-7dc4-439b-bc3a-45a8a71d4839"
    }
    secondsTaken=0
    minutesTaken=0
    //username = firebase.auth().currentUser.email
username = "khalid@khalid.com"
time=0


trash = this.props.navigation.getParam('trashes')
location = this.trash.Location
//const fdate = trash.Lasttime_full.toDate().getDate()
//const fdate = trash.Lasttime_full.toDate().getDate()
trash_time_of_full=this.trash.Lasttime_full
trashId = this.trash.id
year = this.trash.Lasttime_full.toDate().getFullYear()
month = this.trash.Lasttime_full.toDate().getMonth()+1
date = this.trash.Lasttime_full.toDate().getDate()
time =this.trash.Lasttime_full.toDate().getHours()
min = this.trash.Lasttime_full.toDate().getMinutes()
sec = this.trash.Lasttime_full.toDate().getSeconds()
fulldate = this.date+"-"+this.month+"-"+this.year+" at "+ this.time+":"+this.min+":"+this.sec


    componentWillMount=()=>{
      db.collection("CollectedTrashcans").onSnapshot(querySnapshot => {
        let list = []
        querySnapshot.forEach(doc => {
          list.push({
            id:doc.id,...doc.data()
          })
        })
        this.setState({list:list})


      })

    }
    componentWillUnmount=()=>{
      db.collection("CollectedTrashcans").onSnapshot(()=>{})
    }
handleTime=()=>{
  // this.secondsTaken=setInterval(()=>{this.secondsTaken=this.secondsTaken+1},1000)
  // this.minutesTaken=setInterval(()=>{this.minutesTaken=this.minutesTaken+1},1000)
  //this.sec=setInterval(()=>this.secondsTaken=this.secondsTaken+1,1000)
  setInterval(()=>{this.setState({minutesTaken:this.state.minutesTaken+1})},1000)
  this.off=setInterval(()=>{this.setState({secondsTaken:this.state.secondsTaken+1})},1000)
}
// handleResetTime=()=>{
//   clearInterval(this.off)
//   this.off=setInterval(()=>{this.setState({secondsTaken:this.state.secondsTaken+1})},1000)
// }
    handleCollect= async()=>{
      console.log("id: ",this.trashId)
      console.log("time: ",this.trash_time_of_full)
      await db.collection("User").doc(this.username).update({Work_Status:true})
      await db.collection("TrashCan").doc(this.trashId).update({Status:"In Process"})
      await db.collection("CollectedTrashcans").doc().set({Date_time:new Date().toString(),Employee_id:this.username,Time_of_full:this.trash_time_of_full,Time_taken:0,Trashcan_id:this.trashId})
      
      this.props.navigation.goBack()
    }
    
  render() {
  
    // const battery = navigation.getParam('battery')
    //  const fill = navigation.getParam('fill')
     
// const hour = (time/3600/1000)
// const timestamp = Date(trash.Lasttime_full.toString());
//  const date = trash.Lasttime_full.moment().format('MMM Do YYY, h:mm:ss a')
// var formattedTimestamp =new Intl.DateTimeFormat('en-US',{
//   year: "numeric",
//   month: "short",
//   day: "2-digit",
//   hour: "numeric",
//   minute: "2-digit",
//   second: "2-digit"
// }).format(timestamp);


//let sdate = fdate.toDateString()
    // let date = Date(timeIntervalSince1970: timestamp)
     
     //dt = new Date(day*1000)
    // const fill = navigation.getParam('fill')
    // const fill = navigation.getParam('fill')
    // const fill = navigation.getParam('fill')
    // const fill = navigation.getParam('fill')
    // const fill = navigation.getParam('fill')
    return (
      <View style={styles.container}>
        <View style={{textAlign:"center"}}> 
        <Text style={{textAlign:"center", fontSize:25,fontWeight:"bold"}}>Trash Can Details</Text>
       
       </View>
          <View style={{flexDirection:"row",justifyContent:"space-between",margin:5}}>
          
          <View style={{marginLeft:5}}>
         
          <Text style={{marginBottom: 10}}>
           <Text style={{fontWeight:"bold",fontSize:16}}>Battery: </Text> <Text>{this.trash.Battery_percentage+" %"}</Text>
          </Text>
          <Text style={{marginBottom: 10}}>
           <Text style={{fontWeight:"bold",fontSize:16}}>Fill: </Text> <Text>{this.trash.Fill_percentage+" %"}</Text>
          </Text>
          <Text style={{marginBottom: 10}}>
           <Text style={{fontWeight:"bold",fontSize:16}}>Status: </Text> <Text>{this.trash.Status+" %"}</Text>
          </Text>
           <Text style={{marginBottom: 10}}>
           <Text style={{fontWeight:"bold",fontSize:16}}>Latitude: </Text> <Text>{this.location._lat}</Text>
          </Text>
          <Text style={{marginBottom: 10}}>
           <Text style={{fontWeight:"bold",fontSize:16}}>Longitude: </Text> <Text>{this.location._long}</Text>
          </Text>
          <Text style={{marginBottom: 10}}>
           <Text style={{fontWeight:"bold",fontSize:16}}>Temperature: </Text> <Text>{this.trash.Temperature}</Text>
          </Text>
          <Text style={{marginBottom: 10}}>
           <Text style={{fontWeight:"bold",fontSize:16}}>Last Full: </Text> <Text>{this.fulldate}</Text>
          </Text>
         
          </View>
          
          <View>
          <TouchableOpacity
                         style={{width:wp("30%"),
                         height:wp("10%"),backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",borderRadius:10,alignItems: 'center',justifyContent:"center"
                       }}
                         onPress={() => this.props.navigation.navigate('TrashCanCreate',{trashes:this.trash})}
                         
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       {/* <AntDesign name="profile" borderColor="blue" color="white" size={wp('5.5%')}/> */}
                       <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white"}}> Create Issue </Text>
                       
                       </View>
                       </TouchableOpacity>
                       <TouchableOpacity
                         style={{width:wp("30%"),opacity:this.trash.Fill_percentage<60 && this.trash.Status=="Good"&&this.trash.Status=="In Process"?0.5:1,
                         height:wp("10%"),backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",borderRadius:10,alignItems: 'center',justifyContent:"center"
                       }}
                         onPress={this.handleCollect}
                         disabled={this.trash.Fill_percentage<60 && this.trash.Status=="Good" &&this.trash.Status=="In Process"}
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       {/* <AntDesign name="profile" borderColor="blue" color="white" size={wp('5.5%')}/> */}
                       <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white"}}> Collect</Text>
                       
                       </View>
                       </TouchableOpacity>
                       <TouchableOpacity
                         style={{width:wp("30%"),opacity:this.trash.Fill_percentage<60 && this.trash.Status=="Good"&&this.trash.Status=="In Process"?0.5:1,
                         height:wp("10%"),backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",borderRadius:10,alignItems: 'center',justifyContent:"center"
                       }}
                         onPress={this.handleTime}
                        
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       {/* <AntDesign name="profile" borderColor="blue" color="white" size={wp('5.5%')}/> */}
                       <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white"}}>Time</Text>
                       
                       </View>
                       </TouchableOpacity>
                       <View>
                        {/* {this.state.secondsTaken%60==0&&(this.handleResetTime())} */}
                         <Text>{Math.floor(this.state.minutesTaken/60)+" : "+this.state.secondsTaken}</Text>
                       </View>
          </View>
          </View>
          
          <Text style={{ fontSize: 18, fontWeight: "bold",textAlign:"center" ,borderTopColor:"black",borderBottomColor:"black",borderStyle:"solid",borderTopWidth:2,borderBottomWidth:2}}>History</Text>
          <ScrollView>

            {this.state.list.map((l,i)=><View key={i}>{l.Trashcan_id==this.trash.id && 
            
            <TouchableOpacity>
            
               
       <ListItem
     
     leftAvatar={
     <View>
      
    </View>}
     rightAvatar={<Badge  status={this.trash.Fill_percentage>30 & this.trash.Fill_percentage<60 ?"warning":this.trash.Fill_percentage>60?"error":"success" }/>}
     title={<Text style={{textAlign:"left",fontWeight:"bold"}}>{"Collected by:  "+l.Employee_id}</Text>}
     subtitle={<Text style={{textAlign:"left"}}>{"Time of full: "+"06:00 PM"}</Text>}
    // <Text style={{textAlign:"left"}}>{"Date: "+"23 March 2019"}</Text> <Text style={{textAlign:"left"}}>{"Time: "+"06:50 PM"}</Text>}
     
   />
   <Divider style={{ backgroundColor: 'brown',height:1 }} />
   </TouchableOpacity>}</View>)}
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   
    backgroundColor: '#fff',
  
  },
});
