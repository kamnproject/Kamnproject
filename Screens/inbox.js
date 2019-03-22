import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView , TouchableOpacity} from 'react-native';
import { Header, Overlay } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import firebase, { firestore } from 'firebase'
import db from '../db.js'
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import { FlatList, ListItem, Divider,Badge, } from 'react-native-elements'
export default class inbox extends React.Component {
    state = {
        issues: [],
        User_issues: [],
        name: "",
        message: "",
        reply:"",
        flagr: false,
        flag: false,
        flag1: false,
        namee:[]

    }

    users = []
    User_issue = []
    tem = ""
    
//    {firebase.auth().currentUser.email === "admin@admin.com"?dfgedf:null}
    componentWillMount() {
        // go to db and get all the users
       
        db.collection("User").onSnapshot(querySnapshot => {

            this.users = []

            querySnapshot.forEach(doc => {

                this.users.push({
                    id: doc.id, ...doc.data()
                })

            })
            this.setState({ users: this.users })

            console.log("Current users: ",
                this.users)
            console.log("Current admin: ", firebase.auth().currentUser.email)
            let temp = firebase.auth().currentUser.email
        this.tem = temp
            
            console.log("Current temp: ", temp)
     
            // {
            //     this.state.users.map((item, i)=>{
            //         console.log("Current issuee: ", item.id)
             
            //     })
            //   }
            
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

                console.log("Current messages: ",
                    this.User_issue.length)

            })
        })
    }</div>:
            console.log("normaluser: ",this.tem)
            db.collection(`User/${this.tem}/User_issues`).orderBy("Date").onSnapshot(querySnapshot => {

                querySnapshot.forEach(doc => {
                    this.User_issue.push({
                        id: doc.id, ...doc.data()
                    })
                })
                this.setState({ User_issues: this.User_issue })

                console.log("Current messages: ",
                    this.User_issue.length)

            })
            
        })
    }
     reply = (m) =>{
       
      db.collection(`User/${m.username}/User_issues`).doc(m.id).update({ Reply: this.state.reply })
        this.setState({ flagr: false });
        this.componentWillMount()
    }
    report = async () => {
        if(this.tem !== "admin@admin.com")
        {
            db.collection(`User/${this.tem}/User_issues`).doc().set({ Date: new Date(), Message: this.state.message, Reply: "" })
        }
       
    }
    onclick = () => {
        this.setState({ flag: true });
    }
    clickr = () => {
        this.setState({ flagr: true });
    }
    render() {

        return (
            
            <View>
                <Header
      backgroundColor="#660000"
      placement="left"
  leftComponent={<MaterialCommunityIcons  name="inbox" size={30} color="white"/>}
  centerComponent={{ text: 'Inbox', style: { color: '#fff',fontSize:25 } }}
  rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('Profile')}/>}
/>
                <View style={{ paddingTop: 5 }}>
                
                    <Text style={{ fontWeight: "bold", fontSize: 17 }}> {this.tem} </Text>
                </View>
                {this.tem === "admin@admin.com" ?
                <View>
                <ScrollView>
                 {
                    this.state.User_issues.map(m=>
                         <View >
                          {m.Message ==! " "?
                          null:
                          <View>
                        <View style={{flex:1, flexDirection:"row"}} >
                            <View style={{flex:0.8}}>                           
                            <Text style={{ fontSize: 16 }} key={m.id}>
                           
                                 {/* {console.log("m", m.Date.toDate().getDate())} */}

                                <Text style={{ fontWeight: "bold" }}>From {m.username}: {'\n'}</Text>
                                {/* <Text style={{ fontWeight: "bold" }}>Issue: {m.Message} </Text> */}
                                {/* {m.Message  == !" " ? <Text>{'\n'} </Text>: <Text style={{ fontWeight: "bold" }} >{'\n'}Issue:{m.Message}{'\n'}</Text>} */}
                                {m.Reply  == !" " ? <Text>{'\n'} </Text>: <Text style={{ fontWeight: "bold" }} >{'\n'}Admin's Reply:{m.Reply}{'\n'}</Text>}
                                
                                <Text>Time: {m.Date.toDate().getDate()}{"-"}{m.Date.toDate().getMonth() + 1}{"  :"}{m.Date.toDate().getHours()}{":"}{m.Date.toDate().getMinutes()}</Text>
                                </Text>

                                </View>
                                {m.Reply == ! " " ? 
                            <View style={{width: 20,flex:0.2, paddingTop:10}}>
                            {/* <Button
                            
                        onPress={this.clickr}
                        title="Reply"
                        color="brown"
                        size="small"

                    /> */}
                    <TouchableOpacity
                     style={styles.button}
               onPress={()=>this.props.navigation.navigate('inboxD', {message:m })}> 
               <Text  style={{color:"white"}} >Reply</Text>
               </TouchableOpacity>
                 </View>
                    :null}                   
                    </View>
                    <Divider style={{ backgroundColor: "brown", height: 2 }} />
                    </View>
                        }
                        
                        </View>
                       
                        
                    )} 
                    
            </ScrollView>    
                </View>
                //Not an admin
                : 
                <View>
                    <View style= {{width:"38%"}}>
                    <Button
                    
                   
                    onPress={()=>this.props.navigation.navigate('createissue', {usere:this.tem})} 
                    icon={
                        <Octicons
                          name="report"
                        //   size={1}
                        size={10}
                          color="white"
                        />
                      }
         
                title="Report an issue"
                color="brown"

            />
            </View>
                    <ScrollView>
                {

                    this.state.User_issues.map(m =>
                        <View style={{paddingTop:10}}>
                            <Text key={m.id}>
                                {console.log("m", m.Date.toDate().getDate())}
                              
                                <Text style={{ fontWeight: "bold", fontSize: 20 }}></Text>
                                <Text>

                                </Text>

                                <Text  style={{ fontWeight: "bold", fontSize: 20 }}>Issue: {m.Message} </Text>
                                {m.Reply == ! " " ? '\n' : <Text  style={{ fontWeight: "bold", fontSize: 20 }}>{'\n'}Admin's Reply: {m.Reply}{'\n'}</Text>}
                                <Text  style={{ fontSize: 14 }}>Time:{m.Date.toDate().getDate()}{"/"}{m.Date.toDate().getMonth() + 1}{"   "}{m.Date.toDate().getHours()}{":"}{m.Date.toDate().getMinutes()} </Text>
                                
                                {/* ("MM/dd/yyyy hh:mm tt") */}
                                {/* <Text>Time: {m.Date.Timestamp.toDate()}</Text>  */}
                            </Text>
                            <Divider style={{ backgroundColor: "brown", height: 1 }} />





                        </View>
                    )}
            </ScrollView>
            
            {/* {this.state.flag ?
                <View>
                    <TextInput
                        style={{ height: 100 }}
                        placeholder="Type here.."
                        onChangeText={(message) => this.setState({ message })}
                    />
                    <Button
                        onPress={this.report}
                        title="Send"
                        color="brown"

                    />
                </View>
                : null} */}
                </View>
                }
                
                


            </View>
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
      backgroundColor: 'brown',
      color:"white"
    },
    countContainer: {
      alignItems: 'center',
      padding: 10
    },
    countText: {
      color: '#FF00FF'
    }
  })
  