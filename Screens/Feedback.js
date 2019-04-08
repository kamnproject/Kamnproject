import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, Picker, Alert, Dialog } from 'react-native';
import { Header, Overlay, Card, SearchBar } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import firebase, { firestore } from 'firebase'
import db from '../db.js'
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';
import { FlatList, ListItem, Divider, Badge, } from 'react-native-elements'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import _ from "lodash";
export default class Feedback extends React.Component {
    state = {
        users: [],
        Question_Answer: [],
        name: "",
        message: "",
        reply: "",
        flagr: false,
        flag: false,
        flag1: false,
        selectedans: [],
        value: "",
        today: "",
        search: "",
        filtereddata: [],
        flag: false
    }

    users = []
    questans = []
    user=""
    managerareaid=""
//     tem = "admin@admin.com"
  tem=""
  
     
    //    {firebase.auth().currentUser.email === "admin@admin.com"?dfgedf:null}
    async componentWillMount() {
         let temp = firebase.auth().currentUser.email
         this.tem = temp
        
        // go to db and get all the feedback
    //     Role=this.props.navigation.getParam('Role')
    // areaid=this.props.navigation.getParam('areaid')
    const querySnapshot = await db.collection("User").doc(this.tem).get();
    
    this.user = querySnapshot.data().Role
    this.managerareaid= querySnapshot.data().Area_id

        this.Todaydate()

        if(this.user=="Manager"){
            db.collection("User").where("Area_id","==",this.managerareaid).where("Role","==","Employee").onSnapshot(querySnapshot => {
            this.users = []
            querySnapshot.forEach(doc => {
                this.users.push({
                    id: doc.id, ...doc.data(),
                })
            })
            this.setState({ users: this.users })
            console.log("Current feedback: ",
                this.users.length)
            console.log("Current admin: ")
  
            

            console.log("Current temp: ")
 
            console.log("todayyyyyyyyyyyyyyyyyyyyyyyy: ",
                            this.state.today)
                       
                        })             
               
                this.state.users.map((item, i) => {
                 this.questans = []
                    db.collection(`User/${item.id}/Daily_Feedbacks`).orderBy("date").onSnapshot(querySnapshot => {
                           
                        console.log("Current jadhjasdfhas: ", this.tem)
                        querySnapshot.forEach(doc => {
                            this.questans.push({
                                id: doc.id, ...doc.data(),
                                username: item.id,
                                name: item.name
                            })
                        })

                        this.setState({ Question_Answer: this.questans })

                            console.log("laaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssssssssssssttttttttttttt: ",
                            this.questans[this.questans.length-1].date)

                    })


                })
            }
                //not admin
                else{
                   
                    db.collection(`User/${this.tem}/Daily_Feedbacks`).orderBy("date").onSnapshot(querySnapshot => {
                        console.log("Current jadhjasdfhas: ", this.tem)
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
                       
                    })
    
                        
                    }

               
       

    }
    contains = (user, search) => {
        let result = false
        if (user.username.includes(search)) {
            result = true
        }
        return result

    }
    updateSearch = (search) => {

        const data = _.filter(this.state.User_issues, user => {

            return this.contains(user, search)
        }
        )
        this.setState({ search: search, filtereddata: data });


    };

    onappear = () => {
        if (this.state.selectedans.length == 4) {
            this.setState({ flag: !this.state.flag })
        }

    }
    onButtonPress = () => {
        Alert.alert("You have Already completed your daily feedback. Thank You")
        this.props.navigation.navigate('Home')
    }
    ansupdate = (m) => {
        console.log(m.id)
        db.collection(`User/${this.tem}/Daily_Feedbacks`).doc(m.id).update({ Answer: this.state.selectedans })
        this.props.navigation.navigate('Home')
    }
    onValueChange = async (value, index) => {

        await this.setState({ selectedans: [...this.state.selectedans, value] })
        console.log("selectedans", this.state.selectedans)

    }
    Todaydate = () => {
        let today = new Date()
        format = today.getDate() + "/" + (today.getMonth() + 1)
        this.setState({ today: format })
    }
    onclick = () => {
        this.setState({ flag: true });
    }
    clickr = () => {
        this.setState({ flagr: true });
    }
    render() {
        console.log("this.state.today", this.state.today)
        return (

            <View>
                <Header
                    backgroundColor='#567D46'
                    placement="center"
                    leftComponent={<Ionicons name="ios-arrow-round-back" size={30} color="white"onPress={() => this.props.navigation.goBack()}/>}
                    centerComponent={{ text: 'Daily Feedback', style: { color: '#fff', fontSize: 25 } }}
                />

                { this.user==="Employee" ?

                    <ScrollView>
                       {  console.log("this.props.navigation.getParam('Role')",this.user)}
                        <View>
                        <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"black"}}>Date: {this.state.today}/2019 </Text>
                           
                            {
                                this.state.Question_Answer.map((m, i) =>
                                    <View >
                                        {this.state.today === m.date.toDate().getDate() + "/" + (m.date.toDate().getMonth() + 1) &&
                                            <View>
                                                {m.Answer.length==0?<View>
                                                {m.Question.map((l, index) =>

                                                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingTop: 12 }} >
                                                        {console.log("index of noor ", index)}
                                                        <View style={{ flex: 0.8 }}>
                                                            <Text style={{ fontSize: wp('4%'), fontWeight: "bold" ,color:"black"}}>Question {index + 1}: {m.Question[index]}: {'\n'}</Text>
                            
                                                        </View>
                                                        <View style={{ width: 110, flex: 0.2 }}>
                                                            <Picker
                                                                mode="dropdown"
                                                                selectedValue={this.state.selectedans[index]}
                                                                style={{ height: 50, width: 95 }}
                                                                onValueChange={this.onValueChange.bind(this)}>
                                                                <Picker.Item label="Select" value="select" />
                                                                <Picker.Item label="Yes" value="yes" />
                                                                <Picker.Item label="No" value="no" />
                                                            </Picker>

                                                        </View>
                                                    </View>
                                                )}
                                                {this.state.selectedans.length == 4? 
                                                <View style={{ width: 90, height: 30, paddingTop: 10 }}>
                                                    <TouchableOpacity
                                                        style={styles.button}
                                                        onPress={() => this.ansupdate(m)}>
                                                        <Text style={{ fontSize: wp('3.5%') ,color:"white"}} >Submit</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                 :null}
                                                </View>  :

                                                    <View>
                                                        {this.onButtonPress()}
                                                    </View>
                                                    }
                                                
                                            </View>
                                        }
                                            
                                    </View>

                                )}
                        </View>
                    </ScrollView>
                    :
                    <ScrollView>
                        <View>
                        <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"black"}}>Date: {this.state.today}/2019 </Text>

                            {
                                this.state.Question_Answer.map((m, i) => <View>
                                             
                                    {this.state.today === m.date.toDate().getDate() + "/" + (m.date.toDate().getMonth() + 1) && m.Answer[0] != null && m.Answer.indexOf("no") != -1&&
                                        <View>
                                          
                                                <View style={{ flex: 1, flexDirection: "row",paddingBottom:"1%" }} >
                                       
                                                    <View style={{ flex: 0.8, textAlign:"center",justifyContent: "center"}}>
                                                        <Text style={{ fontSize: wp('4.5%'), fontWeight: "bold" ,color:"black"}}>{m.username} </Text>
                                                    </View>
                                                    <View style={{ width: "10%", flex: 0.2, paddingTop: "1%" }}>
                                                        <TouchableOpacity
                                                            style={styles.button}
                                                            onPress={() => this.props.navigation.navigate("FeedbackDetails", { feedback: m })}>
                                                            <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}>View Feedback</Text>
                                                        </TouchableOpacity>

                                                        {/* <Text  style={{ fontSize: 14 }}>Time:{Date.now().toDate().getDate()}{"/"}{m.date.toDate().getMonth() + 1}{"   "}{m.date.toDate().getHours()}{":"}{m.date.toDate().getMinutes()} </Text> */}
                                                    </View>
                                                    {/* {m.Message  == !" " ? <Text>{'\n'} </Text>: <Text style={{ fontWeight: "bold" }} >{'\n'}Issue:{m.Message}{'\n'}</Text>} */}
                                                </View>
                                        {/*  */}
                                        <Divider style={{ backgroundColor: '#567D46', height: 2,  }} />
                                        </View>
                                        
                                              
                                            } 
                                           
                                </View>
                                )}


                        </View>
                    </ScrollView>
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
        backgroundColor: '#567D46',
        color: "white", justifyContent: "center",
        borderRadius: 18,
       
    },
    countContainer: {
        alignItems: 'center',
        padding: 10
    },
    countText: {
        color: '#FF00FF'
    }
})
