import React  from 'react';
import { StyleSheet, Text, View,TextInput, Button,TouchableOpacity, } from 'react-native';
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
        reply:"",
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
        this.issue = navigation.getParam("message","default")
    
        this.setState({ idd: this.issue.id })
        this.setState({ name: this.issue.username })
        }  
       
        reply = () =>{
            db.collection(`User/${this.state.name}/User_issues`).doc(this.state.idd).update({ Reply: this.state.reply })
            this.props.navigation.navigate('inbox')       
        }
  render() {
    
    return (
<View style ={{justifyContent: "flex-start", alignItems: "center",}}>
<Header
      backgroundColor="#660000"
      placement="left"
  leftComponent={<Ionicons name="ios-arrow-round-back" size={30} color="white"onPress={() => this.props.navigation.goBack()}/>}
  centerComponent={{ text: 'Reply', style: { color: '#fff',fontSize:25 } }}
  rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('Profile')}/>}
/>
<Card width={"96%"} >

<View style={{ justifyContent: "space-between",flexDirection:"row", paddingBottom:10}} >
<View >
<Text style={{ fontWeight: "bold",fontSize: 14 }}>From: {this.issue.username} </Text>
</View>
<View style={{ justifyContent: "space-between"}}>
<TouchableOpacity
          style={styles.button}
            onPress={() => this.props.navigation.navigate("UserProfile",{username:this.issue.username})}
           
          >
          <View >
           <Text  style={{fontWeight: "bold",color:"white"}}> View profile </Text>
           </View>
           </TouchableOpacity>
</View>
        </View>
<Text style={{ fontWeight: "bold",fontSize: 18 }}>Issue: {this.issue.Message} </Text>
<Text style={{ fontWeight: "bold",fontSize: 17,paddingTop: 4 }}>Reply here:  </Text>

                  
                     <Input
                         numberOfLines= {4}
                        containerStyle={{borderWidth: 1, borderColor:"black", width:'98%'}}
                        onChangeText={(reply) => this.setState({ reply })}
                        multiline={true}
                    /> 
               
                <View style= {{width:60, paddingTop: 10}}>
                    <Button
                        onPress={this.reply}
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
      padding: 3,
      color:"white",

    },
    countContainer: {
      alignItems: 'center',
      padding: 10,
      color:"white"
    },
    countText: {
      color: '#FF00FF'
    }
  })

