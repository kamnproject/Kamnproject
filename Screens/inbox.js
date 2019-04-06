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
    

    async componentWillMount() {
        // go to db and get all the users
            // console.log("Current admin: ", firebase.auth().currentUser.email)
            // let temp = firebase.auth().currentUser.email
            let Role=this.props.navigation.getParam('Role')
            let areaid=this.props.navigation.getParam('areaid')
            // let areaid="1"
            // let Role="Employee"
             let temp =firebase.auth().currentUser.email
             //let temp ="amanager@manger.com"
        this.tem = temp
            
            console.log("Current temp: ", temp)
  
        if(Role=== "Admin"){
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
        else if(Role=="Manager"){
            db.collection("User").where("Area_id","==",areaid).where("Role","==","Employee").onSnapshot(querySnapshot => {

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
        else{
            
            db.collection(`User/${this.tem}/User_issues`).orderBy("Date").onSnapshot(querySnapshot => {
                this.User_issue = []
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
      placement="center"
  leftComponent={<Ionicons name="ios-arrow-round-back" size={30} color="white"onPress={() => this.props.navigation.goBack()}/>}
  centerComponent={{ text: 'Inbox', style: { color: '#fff',fontSize:25 } }}
  //rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('Profile')}/>}
/>
                <View>
                
                    {/* <Text style={{ fontWeight: "bold", fontSize: 17 }}> {this.tem} </Text> */}
                </View>
                
                
                <View>
               
                <SearchBar
                     placeholder="Filter by Name"
                     lightTheme round
                     onChangeText={this.updateSearch}
                     value={this.state.search}
                     containerStyle={height=5}
                     //showLoading={true}
                 /> 
                  {

this.state.User_issues.map(m =>
    m.Message!==""&&
    <View key={m.id} style={{}}>
    
        <View key={m.id}>
            {console.log("m", m.Date.toDate().getDate())}
          
            <Text style={{ fontWeight: "bold", fontSize: 20 }}></Text>
            <Text>

            </Text>
            {this.props.navigation.getParam('Role')!="Employee"&&<Text style={{ fontWeight: "bold", color: "black" }}>From {m.username}: </Text>}
            <Text  style={{ fontWeight: "bold", color: "black" }}>Issue: {m.Message} </Text>
            
            
               {(m.Reply===""&&this.props.navigation.getParam('Role')=="Employee")&&<Text>No Reply Yet</Text>}
            {m.Reply!==""&&<Text style={{ fontWeight: "bold", color: "black" }} >Reply:{m.Reply}</Text>}
            <Text  style={{  fontWeight: "bold", color: "black" }}>Time:{m.Date.toDate().getDate()}{"/"}{m.Date.toDate().getMonth() + 1}{"   "}{m.Date.toDate().getHours()}{":"}{m.Date.toDate().getMinutes()} </Text>

               {(m.Reply===""&&this.props.navigation.getParam('Role')!="Employee")&&
               <View style={{width: 50,flex:0.2, padding:5}}>
                         
                    <TouchableOpacity
                     style={styles.button}
               onPress={()=>this.props.navigation.navigate('inboxD', {message:m })}> 
               <Text  style={{  color: "white" }} >Reply</Text>
               </TouchableOpacity>
            </View>}

            {/* {(m.Reply  === ""&&this.props.navigation.getParam('Role')=="Employee") ? <Text>{'\n'}</Text>: <Text style={{ fontWeight: "bold", color: "black" }} >{'\n'}Admin's Reply:{m.Reply}{'\n'}</Text>}
            {(m.Reply == ! " " &&this.props.navigation.getParam('Role')!="Employee") &&
                            <View style={{width: 50,flex:0.2, paddingTop:10}}>
                         
                    <TouchableOpacity
                     style={styles.button}
               onPress={()=>this.props.navigation.navigate('inboxD', {message:m })}> 
               <Text  style={{  color: "white" }} >Reply</Text>
               </TouchableOpacity>
                 </View>
                    } */}
            
        
        </View>
        <Divider style={{ backgroundColor: '#567D46', height: 1 }} />

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
  