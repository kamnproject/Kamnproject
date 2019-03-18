import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import { createMaterialTopTabNavigator, BottomTabBar, createDrawerNavigator } from 'react-navigation';
import { Header } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import firebase from 'firebase'
import db from '../db.js'
export default class Profile extends React.Component {
  state={
    user:{},
    location:{}
  }
  componentWillMount() {
 
    // go to db and get one the user daily targets
    db.collection('User').where(firebase.firestore.FieldPath.documentId(), '==', 'a@a.com').onSnapshot(querySnapshot => {
      let user = {}
      let location={}
      querySnapshot.forEach(doc => {
        user={ id: doc.id, ...doc.data() }
        location=doc.data().Current_location
      })
      this.setState({user})
      this.setState({location})
      console.log("user",location)


    })

  
  }



  render() {
    return (
      <View style={styles.container}>
      <View style={{flexDirection:"column"}}>
            <View style={{}}>
              <Header
            backgroundColor="#12A5F4"
            placement="left"
        leftComponent={<MaterialCommunityIcons  name="face-profile" color="white" size={30}/>}
        centerComponent={{ text: '', style: { color: '#fff',fontSize:25 } }}
        rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('Profile')}/>}
      />
            </View>

              <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:"#12A5F4"}}>
                  <Text style={{textAlign:"center",color:"white",fontWeight:"bold",fontSize:22}}>{this.state.user.Name}</Text>
                  
                </View>
                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:"#12A5F4"}}>
                <Text style={{textAlign:"center",color:"white",fontWeight:"bold"}}>{this.state.user.Online&&"Online"} | Male | Points :{this.state.user.Points}</Text>
                  
                </View>
                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:"#12A5F4",paddingTop:25,paddingBottom:25}}>
                <Image style={{height:120,width:120,borderRadius:150}} source={require("../assets/home.png")}/>
                  
                </View>
   
                <View style={{flexDirection:"row" ,justifyContent:"space-evenly"}}>

                 <TouchableOpacity
                         style={{flexDirection:"column",width:"34%",
                         height:50 ,alignItems: 'center',justifyContent:"center",
                         backgroundColor: '#DDDDDD',
                         backgroundColor:"white",borderRightColor:"lightgray",borderWidth:2,borderStyle:"solid",borderTopColor:"white",borderBottomColor:"lightgray"
                       }}
                        disable={true}
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       
                       <Text style={{ fontSize: 14, fontWeight: "bold" ,color:"black"}}> Online </Text>
                       <Text style={{ fontSize: 14 ,color:"black"}}> {this.state.user.Online&&"Yes"}  </Text>
                       </View>
                       </TouchableOpacity>
                       <TouchableOpacity
                         style={{flexDirection:"column",width:"34%",
                         height:50 ,alignItems: 'center',justifyContent:"center",
                         backgroundColor: '#DDDDDD',
                         backgroundColor:"white",borderRightColor:"lightgray",borderWidth:2,borderStyle:"solid",borderTopColor:"white",borderBottomColor:"lightgray"
                       }}
                        disable={true}
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       
                       <Text style={{ fontSize: 14, fontWeight: "bold" ,color:"black"}}> Points Earned </Text>
                       <Text style={{ fontSize: 14 ,color:"black"}}> {this.state.user.Points} </Text>
                       </View>
                       </TouchableOpacity>
                       <TouchableOpacity
                         style={{flexDirection:"column",width:"34%",
                         height:50 ,alignItems: 'center',justifyContent:"center",
                         backgroundColor: '#DDDDDD',
                         backgroundColor:"white",borderRightColor:"lightgray",borderWidth:2,borderTopColor:"white",borderBottomColor:"lightgray"
                       }}
                        disable={true}
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       
                       <Text style={{ fontSize: 14, fontWeight: "bold" ,color:"black"}}> Area_id </Text>
                       <Text style={{ fontSize: 14,color:"black"}}> {this.state.user.Area_id} </Text>
                       </View>
                       </TouchableOpacity>
                

                </View>
                <View style={{flexDirection:"row" ,backgroundColor:"lightgray"}}>
                <Text style={{textAlign:"left",fontSize:14,color:"gray",fontWeight:"bold",padding:5}}>Contact Information</Text>
                </View>
                <View style={{flexDirection:"row" ,backgroundColor:"white"}}>
                <Text style={{textAlign:"left",fontSize:14,color:"lightblue",fontWeight:"bold",padding:5}}>Email</Text>
                
                </View>
                <View style={{flexDirection:"row" ,backgroundColor:"white"}}>
                <Text style={{textAlign:"left",fontSize:14,color:"black",fontWeight:"bold",padding:5}}>{this.state.user.id}</Text>
                </View>

                <View style={{flexDirection:"row" ,backgroundColor:"white"}}>
                <Text style={{textAlign:"left",fontSize:14,color:"lightblue",fontWeight:"bold",padding:5}}>Phone</Text>
                
                </View>
                <View style={{flexDirection:"row" ,backgroundColor:"white"}}>
                <Text style={{textAlign:"left",fontSize:14,color:"black",fontWeight:"bold",padding:5}}>{this.state.user.Phone_no}</Text>
                </View>

                <View style={{flexDirection:"row" ,backgroundColor:"white"}}>
                <Text style={{textAlign:"left",fontSize:14,color:"lightblue",fontWeight:"bold",padding:5}}>Badges Earned</Text>
                
                </View>
                <View style={{flexDirection:"row" ,backgroundColor:"white"}}>
                <Text style={{textAlign:"left",fontSize:14,color:"black",fontWeight:"bold",padding:5}}>{" "+this.state.user.Badges_earned}</Text>
                </View>
                <View style={{flexDirection:"row" ,backgroundColor:"white"}}>
                <Text style={{textAlign:"left",fontSize:14,color:"lightblue",fontWeight:"bold",padding:5}}>Current Location</Text>
                
                </View>
                <View style={{flexDirection:"row" ,backgroundColor:"white"}}>
                <Text style={{textAlign:"left",fontSize:14,color:"black",fontWeight:"bold",padding:5}}>{this.state.location._lat} N, {this.state.location._long} E</Text>
                </View>
                
            </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  
  },
  imgprofile:{
    marginLeft:150,
    marginTop:50,
    height:120,
    width:120,
    borderRadius:150
  },
  name:{
    color:"white",
    fontSize:22,
    textAlign:"center",
    marginTop:12,
  },
  username:{
    color:"grey",
    fontSize:16,
    textAlign:"center",
    marginTop:4
  },
  itemprofile:{
    marginTop:30,
    flex:1,
    flexDirection:"row",
    // alignItems:"center",
    // justifyContent:"center"
  }
});
