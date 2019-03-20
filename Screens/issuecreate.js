import React  from 'react';
import { StyleSheet, Text, View,TextInput, Button } from 'react-native';
import { Header,Overlay,Input,Card } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import firebase, { firestore } from 'firebase'
import Ionicons from '@expo/vector-icons/Ionicons';
import Foundation from '@expo/vector-icons/Foundation';
import db from '../db.js'


export default class inbox extends React.Component {
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
        this.issue = navigation.getParam("usere","default")
    
        this.setState({ name: this.issue })
        }  
       
        report = async () => {
            {
                db.collection(`User/${this.state.name}/User_issues`).doc().set({ Date: new Date().toString("MM/dd/yyyy hh:mm tt"), Message: this.state.message, Reply: "" })
                this.props.navigation.navigate('inbox')
            }
           
        }
  render() {
    
    return (
<View style ={{justifyContent: "flex-start", alignItems: "center",}}>
<Header
      backgroundColor="#660000"
      placement="left"
  leftComponent={<Ionicons name="ios-arrow-round-back" size={30} color="white"onPress={() => this.props.navigation.navigate('inbox')}/>}
  centerComponent={{ text: 'Issue', style: { color: '#fff',fontSize:25 } }}
  rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('Profile')}/>}
/>
    <Card width={"96%"} >

                  
        <Text style={{ fontWeight: "bold",fontSize: 15 }}>From: {this.issue} </Text>
        <Text style={{ fontWeight: "bold",fontSize: 15 }}>To: admin@admin.com </Text>

        <Text>{'\n'}</Text>
        <Text style={{ fontWeight: "bold",fontSize: 18 }}>Issue:  </Text>

                  
                     <Input
                         numberOfLines= {4}
                        containerStyle={{borderWidth: 1, borderColor:"black", width:'98%'}}
                        onChangeText={(message) => this.setState({ message })}
                        multiline={true}
                    /> 
               
                <View style= {{width:60, paddingTop: 10}}>
                    <Button
                        onPress={this.report}
                        title="Send"
                        color="brown"
                        size="small"
                    />
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
      backgroundColor: 'brown',
      padding: 10,
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

