import React from 'react';
import { StyleSheet, Text, View, FlatList,ScrollView, TouchableOpacity,Image} from 'react-native';
import { Header,Overlay,Avatar,Badge,Divider } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './LoginScreen'
import db from '../db'
import firebase,{firestore} from 'firebase'
import { ListItem } from 'react-native-elements';
//import TrashDetail from './TrashCanDetail'
//import console = require('console');

export default class Trashlist extends React.Component {

  state={
    trashlist:[],
    area_id:"",
    users:{},
    yellow_can:"https://firebasestorage.googleapis.com/v0/b/kamn-e4270.appspot.com/o/images%2Fyellow_can.jpg?alt=media&token=9fbee99d-d095-4797-9295-b9d15fb09021",
    green_can:"https://firebasestorage.googleapis.com/v0/b/kamn-e4270.appspot.com/o/images%2Fgreen_can.jpg?alt=media&token=192b23c3-1fdb-49e8-94e6-8f05018b4151",
    red_can:"https://firebasestorage.googleapis.com/v0/b/kamn-e4270.appspot.com/o/images%2Fred_can.jpg?alt=media&token=d5361926-7dc4-439b-bc3a-45a8a71d4839"
  }
  componentWillMount=()=>{
    //go to db and get all the users
    //let email = firebase.auth().currentUser.email
    let email = "khalid@khalid.com"
    let area_ids=""
    db.collection("User").where(firebase.firestore.FieldPath.documentId(),"==",email).onSnapshot(querySnapshot => {
      let users = {}
      querySnapshot.forEach(doc => {
        users={
          id:doc.id,...doc.data()
        }
      })
      this.setState({users})
    })
    //user = db.collection("User").doc(email).get()
    //console.log("user:---------------",user)
  //    user = db.collection("User").doc(email).get().then(function(doc){
  //     if (doc.exists) {
        
  //       console.log("trashList areaId;----", doc.data().Area_id);
  //       area_ids=doc.data().Area_id
  //       console.log("trashList areaId;----", area_ids);
  //       this.setState({area_id:area_ids})
  //       //console.log("don't know----!", this.state.area_id);

        
        
  //   } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //   }
  // })
  
//console.log("-------------------------",area_ids)

    db.collection("TrashCan").onSnapshot(querySnapshot => {
      let list = []
      querySnapshot.forEach(doc => {
        list.push({
          id:doc.id,...doc.data()
        })
      })
      this.setState({trashlist:list})
    })
  }
  // componentDidMount = () => {
  //   this.state
  // }
  list= (trash) => {
   return (
       <View>
           <TouchableOpacity
               onPress={()=>this.props.navigation.navigate('TrashDetail',{trashes:trash})}> 
               {/* onPress={()=>this.props.navigation.navigate('Profile',{gender:item.gender,source:item.picture.thumbnail,first:item.name.first,last:item.name.last,email:item.email,phone:item.phone,street:item.location.street,city:item.location.city,state:item.location.state,post:item.location.postcode})}> */}
               
       <ListItem
     
     leftAvatar={
     <View>
       <Image
          style={{width: 66, height: 58}}
          source={trash.Fill_percentage>=30 & trash.Fill_percentage<60 ?{uri:this.state.yellow_can}:trash.Fill_percentage>=60?{uri:this.state.red_can}:{uri:this.state.green_can}}
        />
    </View>}
     rightAvatar={<Badge  status={trash.Fill_percentage>=30 & trash.Fill_percentage<60 ?"warning":trash.Fill_percentage>=60?"error":"success" }/>}
     title={<Text style={{textAlign:"left",fontWeight:"bold"}}>{"Trash "+trash.Area_id +" Fill "+trash.Fill_percentage +"%"}</Text>}
     subtitle={<Text style={{textAlign:"left"}}>{"Status: "+trash.Status}</Text>}
     
   />
   <Divider style={{ backgroundColor: 'brown',height:1 }} />
   </TouchableOpacity>
   </View>
   )
   
}
  render() {
    return (
       <View>
         <ScrollView>
                
                <FlatList 
                    data = {this.state.trashlist}
                    extraData={this.state}
                    keyExtractor = {(x,i)=>x.id}
                    renderItem = {({item})=> 
                     this.state.users.Area_id == item.Area_id &&
                    <View>
                        {this.list(item)}
                    </View>
                   }
                />
                <FlatList 
                    data = {this.state.users}
                    extraData={this.state}
                    keyExtractor = {(x,i)=>x.id}
                    renderItem = {({item})=> 
                     //this.state.users[0].Area_Id == item.Area_id &&
                    <View>
                        {this.list(item)}
                    </View>
                   }
                />
            </ScrollView>
         </View>
    );
  }
}