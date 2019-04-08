import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView , TouchableOpacity} from 'react-native';
import { Header, Overlay,SearchBar,Card } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import firebase, { firestore } from 'firebase'
import db from '../db.js'
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import { FlatList, ListItem, Divider,Badge, } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import _ from "lodash";
export default class inbox extends React.Component {
    state = {
        issues: [],
        User_issues: [],
        name: "",
        message: "",
        reply:"",
        namee:[],
        search:"",
        filtereddata:[]

    }
    user=""
    managerareaid=""
    users = []
    User_issue = []
    tem = ""
    

    async componentWillMount() {
        // go to db and get all the users
            // console.log("Current admin: ", firebase.auth().currentUser.email)
            // let temp = firebase.auth().currentUser.email
            const querySnapshot = await db.collection("User").doc(firebase.auth().currentUser.email).get();
            this.user = querySnapshot.data().Role
            this.managerareaid= querySnapshot.data().Area_id
            // let areaid="1"
            // let Role="Employee"
             let temp =firebase.auth().currentUser.email
             //let temp ="amanager@manger.com"
        this.tem = temp
            
            console.log("Current temp: ", temp)
  
         
            db.collection(`User/${this.tem}/User_issues`).orderBy("Date").onSnapshot(querySnapshot => {
                // this.User_issue = []
                querySnapshot.forEach(doc => {
                    
                    this.User_issue.push({
                        id: doc.id, ...doc.data(),
                        username: this.tem
                    })
                })
                this.setState({ User_issues: this.User_issue })

                console.log("Current messages: ",
                    this.User_issue.length)

            })
            

        
    }
    contains =(user, search)=>{
        let result = false
        if (user.username.includes(search)){
            result=true
        }
       return result
        
    }
    updateSearch = (search) => {
        
           const data= _.filter(this.state.User_issues, user=>{
    
            return this.contains(user,search)
           }
            ) 
        this.setState({ search:search, filtereddata:data  });    
      };
    render() {
        return (
            <ScrollView>
            <View>
            {this.user==="Employee"? 
this.state.User_issues.map(m =>
                            m.Message!==""?
                            <View key={m.id} style={{}}>
                            
                                <View key={m.id}>
                                    {console.log("m", m.Date.toDate().getDate())}
                                  
                                    <Text style={{ fontWeight: "bold", fontSize: 20 }}></Text>
                                    <Text>
                        
                                    </Text>
                                    {/* {this.user!="Employee"&&<Text style={{ fontSize: wp('3.5%'), fontWeight: "bold",color:"black" }}>From {m.username}: </Text>} */}
                                    <Text  style={{ fontSize: wp('3.5%'), fontWeight: "bold",color:"black" }}>Issue: {m.Message} </Text>
                                    
                                    
                                       {(m.Reply===""&&this.user=="Employee")&&<Text>No Reply Yet</Text>}
                                    {m.Reply!==""&&<Text style={{ fontSize: wp('3.5%'), fontWeight: "bold",color:"black" }} >Reply:{m.Reply}</Text>}
                                    <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold",color:"black" }}>Time:{m.Date.toDate().getDate()}{"/"}{m.Date.toDate().getMonth() + 1}{"   "}{m.Date.toDate().getHours()}{":"}{m.Date.toDate().getMinutes()} </Text>
                        
                                       {(m.Reply===""&&this.user!="Employee")&&
                                       <View style={{width: 50,flex:0.2, padding:5}}>
                                                 
                                      <TouchableOpacity
                                             style={styles.button}
                                       onPress={()=>this.props.navigation.navigate('inboxD', {message:m })}> 
                                       <Text  style={{  color: "white" }} >Reply</Text>
                                       </TouchableOpacity>
                                    </View>}
                    
                                </View>
                                <Divider style={{ backgroundColor: '#567D46', height: 1 }} />
                        
                            </View>:<Text style={{ fontSize: wp('3.5%'), fontWeight: "bold",color:"black" }}>You have not sent any issue reports yet</Text>
                        )
           :<View>
           <Text style={{fontSize: wp('4%'), fontWeight: "bold",color:"black"}}>Your Inbox History</Text>
          { this.state.User_issues.map(m =>
            m.Message!==""?
            <View key={m.id} style={{}}>
            
                <View key={m.id}>
                    {console.log("m", m.Date.toDate().getDate())}
            
                    <Text  style={{ fontSize: wp('3.5%'), fontWeight: "bold",color:"black" }}>Issue: {m.Message} </Text>
                      
                       {(m.Reply===""&&this.user=="Employee")&&<Text>No Reply Yet</Text>}
                    {m.Reply!==""&&<Text style={{ fontSize: wp('3.5%'), fontWeight: "bold",color:"black" }} >Reply:{m.Reply}</Text>}
                    <Text  style={{  fontWeight: "bold", color: "black" }}>Time:{m.Date.toDate().getDate()}{"/"}{m.Date.toDate().getMonth() + 1}{"   "}{m.Date.toDate().getHours()}{":"}{m.Date.toDate().getMinutes()} </Text>
        
    
                </View>
                <Divider style={{ backgroundColor: '#567D46', height: 1 }} />
        
            </View>
            :<Text>You have not sent any issue reports yet</Text>
        )} 
        </View>
    }

            </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#567D46',
      color:"white",
    
    },
    countContainer: {
      alignItems: 'center',
      padding: 10
    },
    countText: {
      color: '#FF00FF'
    }
  })
  