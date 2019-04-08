import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Overlay, SearchBar, Card } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import firebase, { firestore } from 'firebase'
import db from '../db.js'
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import { FlatList, ListItem, Divider, Badge, } from 'react-native-elements';
import Inboxadmin from './inboxadmin';
import Inboxemployee from './inboxemployee';
import Inboxmanager from './inboxmanager';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import _ from "lodash";

export default class inbox extends React.Component {
    state = {
        issues: [],
        User_issues: [],
        name: "",
        message: "",
        reply: "",
        namee: [],
        search: "",
        filtereddata: []
        ,user:""
    }

    users = []
    User_issue = []
    tem = ""
    user = ""
    managerareaid = ""

    async componentWillMount() {
        const querySnapshot = await db.collection("User").doc(firebase.auth().currentUser.email).get();
        this.user = querySnapshot.data().Role
        console.log("sadddddddd",this.user)
        this.setState({user:this.user})
        this.managerareaid = querySnapshot.data().Area_id
        console.log("saddddsadasdasdadddd",this.managerareaid)
      
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
    pushtoHistor=()=>{

        this.props.navigation.navigate('InboxHistory')
    }
    pushtoreply=(mssg)=>{

        this.props.navigation.navigate('inboxD',{message:mssg})
    }
    render() {
        return (
            <View>
            <ScrollView>
                <View>
                    <Header
                        backgroundColor='#567D46'
                        placement="center"
                        leftComponent={<Ionicons name="ios-arrow-round-back" size={30} color="white" onPress={() => this.props.navigation.goBack()} />}
                        centerComponent={{ text: 'Inbox', style: { color: '#fff', fontSize: 25 } }}
                    //rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('Profile')}/>}
                    />
                  
                    {this.user === "Admin" &&
                        <View>
                            <Inboxadmin history={this.pushtoHistor} reply={this.pushtoreply}/>
                        </View>

                    }
                    {this.user === "Employee" &&
                        <View>
                            <Inboxemployee />
                        </View>

                    }

                </View>
            </ScrollView>
              {this.state.user == "Manager" &&
              <View>
                  <View style={{ height: "40%", borderColor: "#567D46", borderWidth: 2, borderRadius: 15, borderStyle: "solid", margin: 2 }}>
                    <ScrollView>                           
              <Inboxmanager history={this.pushtoHistor} reply={this.pushtoreply}  />
                  </ScrollView>
                  </View>
                  <View style={{ height: "50%", borderColor: "#567D46", borderWidth: 2, borderRadius: 15, borderStyle: "solid", margin: 2 }}>
                     <ScrollView>              
                     <Inboxemployee />                
                  </ScrollView>
                  </View>
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
        backgroundColor: '#567D46',
        color: "white",

    },
    countContainer: {
        alignItems: 'center',
        padding: 10
    },
    countText: {
        color: '#FF00FF'
    }
})
