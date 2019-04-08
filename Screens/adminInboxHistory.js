import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView , TouchableOpacity} from 'react-native';
import { Header, Overlay,SearchBar } from 'react-native-elements';
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
export default class AdminInboxHistroy extends React.Component {
    state = {
        issues: [],
        User_issues: [],
        name: "",
        message: "",
        reply:"",
        flagr: false,
        flag: false,
        flag1: false,
        namee:[],
        search:"",
        filtereddata:[]

    }

    users = []
    User_issue = []
    tem = ""
    user=""
    managerareaid=""
    
//    {firebase.auth().currentUser.email === "admin@admin.com"?dfgedf:null}
    async componentWillMount() {
        // go to db and get all the users
        let temp = firebase.auth().currentUser.email
         this.tem = temp
        
        // go to db and get all the feedback
    //     Role=this.props.navigation.getParam('Role')
    // areaid=this.props.navigation.getParam('areaid')
    const querySnapshot = await db.collection("User").doc(this.tem).get();
    
    this.user = querySnapshot.data().Role
    this.managerareaid= querySnapshot.data().Area_id

        
        console.log("Current temp: ", temp)

        if(this.user=== "Admin"){
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
   
})

        
    }
    else if(this.user=="Manager"){
        db.collection("User").where("Area_id","==",this.managerareaid).where("Role","==","Employee").onSnapshot(querySnapshot => {

            this.users = []
        
            querySnapshot.forEach(doc => {
        
                this.users.push({
                    id: doc.id, ...doc.data()
                })
        
            })
            this.setState({ users: this.users })
        
            console.log("Current users: ",
                this.users)
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
                    console.log("normaluser: ",this.tem)

                })   
                



    }
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
      backgroundColor="#567D46"
      placement="left"
      leftComponent={<Ionicons name="ios-arrow-round-back" size={30} color="white"onPress={() => this.props.navigation.navigate('Inbox')}/>}
  centerComponent={{ text: 'Inbox History', style: { color: '#fff',fontSize:25 } }}
  rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('Profile')}/>}
/>
                <View style={{ paddingTop: 5 }}>
                
                    <Text style={{ fontWeight: "bold", fontSize: 17 }}> {this.tem} </Text>
                </View>
                <View>
                <SearchBar
                     placeholder="Filter by Name"
                     lightTheme round
                     onChangeText={this.updateSearch}
                     value={this.state.search}
                     containerStyle={height=5}
                     showLoading={true}
                 /> 
                 {
                    
                    this.state.filtereddata.map(m=>
                         <View >
                          {m.Reply !== ""&&
                       
                          <View>
                        <View style={{flex:1, flexDirection:"row"}}>
                            <View style={{flex:0.8}}>                           
                            <Text style={{ fontSize: 16 }} key={m.id}>
                           
                                 {/* {console.log("m", m.Date.toDate().getDate())} */}

                                <Text style={{ fontSize: wp('4%'), fontWeight: "bold", color: "black"  }}>From {m.username}: {'\n'}</Text>
                               <Text style={{fontSize: wp('4.2%'), fontWeight: "bold", color: "black" }}>Issue: {m.Message} {'\n'}</Text> 
                                {/* {m.Message  == !" " ? <Text>{'\n'} </Text>: <Text style={{ fontWeight: "bold" }} >{'\n'}Issue:{m.Message}{'\n'}</Text>} */}
                                <Text style={{ fontSize: wp('4.2%'), fontWeight: "bold", color: "black"  }}>Reply:{m.Reply}{'\n'}</Text> 
                                
                                <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold", color: "black"  }}>Time: {m.Date.toDate().getDate()}{"-"}{m.Date.toDate().getMonth() + 1}{"  :"}{m.Date.toDate().getHours()}{":"}{m.Date.toDate().getMinutes()}</Text>
                                </Text>
    

                                </View>
                               
                    </View>
                    <Divider style={{ backgroundColor: '#567D46', height: 2 }} />
                    </View>
                        }
                        
                        </View>
                       
                        
                    )} 
                    
            
                </View>


                
           

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
  