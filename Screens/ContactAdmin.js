import React  from 'react';
import { StyleSheet, Text, View,TextInput, Button ,TouchableOpacity,Alert} from 'react-native';
import { Header,Overlay,Input,Card } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import firebase, { firestore } from 'firebase'
import Ionicons from '@expo/vector-icons/Ionicons';
import Foundation from '@expo/vector-icons/Foundation';
import db from '../db.js'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class ContactAdmin extends React.Component {
    state = {
        issues: [],
        User_issues:[],
       name:"",
       message:"",
        flag:false,
        flag1:false,
        idd:""
        
      }
      
      users = []
      User_issue =[]
     tem =""
     issue=[]
      componentWillMount() {
     
        const {navigation} = this.props;
        this.issue = firebase.auth().currentUser.email
    
        this.setState({ name: this.issue })
        }  
       
        report = async () => {
            {
                db.collection(`User/${this.state.name}/User_issues`).doc().set({ Date: new Date(), Message: this.state.message, Reply: "" })
                Alert.alert("Your Isssue has been reported.")
                this.props.navigation.navigate('Home')
            }
           
        }
  render() {
    
    return (
<View style ={{justifyContent: "flex-start", alignItems: "center",}}>
<Header
      backgroundColor='#567D46'
      placement="left"
  leftComponent={<Ionicons name="ios-arrow-round-back" size={30} color="white"onPress={() => this.props.navigation.goBack()}/>}
  centerComponent={{ text: 'Issue', style: { color: '#fff',fontSize:25 } }}
  rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('Profile')}/>}
/>
    <Card width={"96%"} >

                  
        <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold", color: "black" }}>From: {this.issue} </Text>
        <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold", color: "black" }}>To: Admin </Text>

        <Text>{'\n'}</Text>
        <Text style={{ fontSize: wp('4.2%'), fontWeight: "bold", color: "black" }}>Issue:  </Text>

                  
                     <Input
                         numberOfLines= {4}
                        containerStyle={{borderWidth: 1, borderColor:"black", width:'98%'}}
                        onChangeText={(message) => this.setState({ message })}
                        multiline={true}
                    /> 
               
               
                <View style= {{width:"15%",height: "16%",paddingTop: "3%"}}>

                <TouchableOpacity
                style={{
                    alignItems: 'center',
                    justifyContent:'center',
                backgroundColor: '#567D46',
                color:"white",
                height:"100%",
                borderRadius:5
                }}
                onPress={this.report} >
                <Text  style={{ fontSize: wp('3.5%'), fontWeight: "bold", color: "white" }} >Send</Text>
                </TouchableOpacity>

                </View>
                
            
      </Card>


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
      padding: 10,
      color:"white",
      borderRadius:5
    },
    countContainer: {
      alignItems: 'center',
      padding: 10
    },
    countText: {
      color: '#FF00FF'
    }
  })

