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

    users = []
    User_issue = []
    tem = ""
    
//    {firebase.auth().currentUser.email === "admin@admin.com"?dfgedf:null}
    componentWillMount() {
        // go to db and get all the users
       
        db.collection("User").where("Role","==","Manager").onSnapshot(querySnapshot => {

            this.users = []

            querySnapshot.forEach(doc => {

                this.users.push({
                    id: doc.id, ...doc.data()
                })

            })
            this.setState({ users: this.users })

            console.log("Current users: ",
                this.users)
            // console.log("Current admin: ", firebase.auth().currentUser.email)
            // let temp = firebase.auth().currentUser.email
             let temp ="admin@admin.com"
            // let temp ="amanager@manger.com"
        this.tem = temp
            
            console.log("Current temp: ", temp)
            
            this.tem=== "admin@admin.com"? <div>
            {
                this.state.users.map((item, i)=>{
            db.collection(`User/${item.id}/User_issues`).orderBy("Date").onSnapshot(querySnapshot => {
                console.log("Current jadhjasdfhas: ",this.tem)

                querySnapshot.forEach(doc => {
                    this.User_issue.push({
                        id: doc.id, ...doc.data(),
                        username:item.id
                        

                    })

                })
                this.setState({ User_issues: this.User_issue })
                this.setState({ filtereddata: this.User_issue })

                console.log("Current messages: ",
                    this.User_issue.length)

            })
        })
    }</div>:
   // notadmin
            console.log("normaluser: ",this.tem)
            db.collection(`User/${this.tem}/User_issues`).orderBy("Date").onSnapshot(querySnapshot => {

                querySnapshot.forEach(doc => {
                    this.User_issue.push({
                        id: doc.id, ...doc.data(),
                        name: doc.name
                    })
                })
                this.setState({ User_issues: this.User_issue })
this.User_issue=[]
                console.log("Current messages: ",
                    this.User_issue.length)

            })
            
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
                <Header
      backgroundColor='#567D46'
      placement="left"
  leftComponent={<MaterialCommunityIcons  name="inbox" size={30} color="white"/>}
  centerComponent={{ text: 'Inbox', style: { color: '#fff',fontSize:25 } }}
  rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('Profile')}/>}
/>
                <View>
                
                    {/* <Text style={{ fontWeight: "bold", fontSize: 17 }}> {this.tem} </Text> */}
                </View>
                {this.tem === "admin@admin.com" ?
                
                <View>
               
                <SearchBar
                     placeholder="Filter by Name"
                     lightTheme round
                     onChangeText={this.updateSearch}
                     value={this.state.search}
                     containerStyle={height=5}
                     showLoading={true}
                 /> 
                 <TouchableOpacity
                     style={styles.button}
               onPress={()=>this.props.navigation.navigate('InboxHistory')}> 
               <Text  style={{ fontSize: wp('3.5%'), fontWeight: "bold", color: "white" }} >View Inbox History</Text>
               </TouchableOpacity>
                 {
                    
                    this.state.filtereddata.map(m=>
                         <View >
                          {m.Reply !== ""?
                          null:
                          <View>
                        <View style={{flex:1, flexDirection:"row"}} >
                            <View style={{flex:0.8}}>                           
                            <Text style={{ fontSize: 16 }} key={m.id}>

                                <Text style={{ fontSize: wp('4.2%'), fontWeight: "bold", color: "black" }}>From {m.username}: {'\n'}</Text>
                               <Text style={{ fontSize: wp('4.2%'), fontWeight: "bold", color: "black" }}>Issue: {m.Message} </Text> 
                                {/* {m.Message  == !" " ? <Text>{'\n'} </Text>: <Text style={{ fontWeight: "bold" }} >{'\n'}Issue:{m.Message}{'\n'}</Text>} */}
                                {m.Reply  === "" ? <Text>{'\n'}</Text>: <Text style={{ fontSize: wp('4.2%'), fontWeight: "bold", color: "black" }} >{'\n'}Admin's Reply:{m.Reply}{'\n'}</Text>}
                                
                                <Text style={{ fontSize: wp('3.2%'), fontWeight: "bold", color: "black" }}>Time: {m.Date.toDate().getDate()}{"-"}{m.Date.toDate().getMonth() + 1}{"  :"}{m.Date.toDate().getHours()}{":"}{m.Date.toDate().getMinutes()}</Text>
                                </Text>

                                </View>
                                {m.Reply == ! " " ? 
                            <View style={{width: 20,flex:0.2, paddingTop:10}}>
                         
                    <TouchableOpacity
                     style={styles.button}
               onPress={()=>this.props.navigation.navigate('inboxD', {message:m })}> 
               <Text  style={{ fontSize: wp('3.5%'), color: "white" }} >Reply</Text>
               </TouchableOpacity>
                 </View>
                    :null}                   
                    </View>
                    <Divider style={{ backgroundColor: '#567D46', height: 2 }} />
                    </View>
                        }
                        
                        </View>
                       
                        
                    )} 
 
                </View>
          
                //Not an admin
                : 
                <View style ={{ paddingTop: 10 }}>
                 {/* <View style= {{width:"25%",height: "6%"}}> */}

                    {/* <TouchableOpacity
                     style={{alignItems: 'center',
                     backgroundColor: '#567D46',
                     color:"white",
                     
                     width:"25%",height: "6%"
                   }}
               onPress={()=>this.props.navigation.navigate('createissue', {usere:this.tem})} >
               <Text  style={{ fontSize: wp('3.5%'), fontWeight: "bold", color: "white"}} >Report an Issue</Text>
               </TouchableOpacity> */}
           
            {/* </View> */}
                        {this.state.User_issues.length !=0?<View>
                {

                    this.state.User_issues.map(m =>
                        <View style={{paddingTop:10}}>
                            <Text key={m.id}>
                                {console.log("m", m.Date.toDate().getDate())}
                              
                                <Text style={{ fontWeight: "bold", fontSize: 20 }}></Text>
                                <Text>

                                </Text>

                                <Text  style={{ fontSize: wp('4.2%'), fontWeight: "bold", color: "black" }}>Issue: {m.Message} </Text>
                                {m.Reply  === "" ? <Text>{'\n'}</Text>: <Text style={{ fontSize: wp('4.2%'), fontWeight: "bold", color: "black" }} >{'\n'}Admin's Reply:{m.Reply}{'\n'}</Text>}
                                <Text  style={{ fontSize: wp('3.5%'), fontWeight: "bold", color: "black" }}>Time:{m.Date.toDate().getDate()}{"/"}{m.Date.toDate().getMonth() + 1}{"   "}{m.Date.toDate().getHours()}{":"}{m.Date.toDate().getMinutes()} </Text>
                                
                            
                            </Text>
                            <Divider style={{ backgroundColor: '#567D46', height: 1 }} />

                        </View>
                    )}
                    </View>:
                  <View style ={{justifyContent: "flex-start", alignItems: "center"}}>
                    <Card width={"96%"}>                                    

                    <Text style={{ fontSize: wp('4.2%'), fontWeight: "bold", color: "black" }}>Report issue to admin</Text>

                    <Text>{'\n'}</Text>
                                                 
                    </Card>
                    </View>
                    
                }
            
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
  