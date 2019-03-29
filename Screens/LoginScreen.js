import React from 'react';
import { StyleSheet, Text, View,Button, Alert,Image,TouchableOpacity } from 'react-native';
import { Header,Overlay,Input } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home'
import { ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import db from '../db.js'
export default class LoginScreen extends React.Component {
    re = /^[a-zA-z]+$/
    state={
        image:require('../assets/images/b1.jpg'),
        username:"",
        password:""
    }
    Login = async ()=> {
        try { 

        await firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)

        await db.collection('User').doc(this.state.username).update({online:true})
        this.props.navigation.navigate('Home')
        }

        catch (error) {
          Alert.alert("Invaild Username or Pasword")
        // Handle Errors here.
        var errorCode =error.code;

        var errorMessage =error.message;

        console.log(errorCode)

        console.log(errorMessage)

        // ...

        }// ...

        }
   

  render() {

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ImageBackground source={this.state.image} style={{width: '100%', height: '100%'}}>
    <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{flex:0.5,width:wp("100%"), alignItems: 'center', justifyContent: 'center'}}>
    <Image source={require('../assets/Logo.png')} style={{width:100,height:100}}/>
    <Text style={{color:"yellow", fontSize:wp("3%"),fontWeight:"bold",fontStyle:"italic" }}>LOSE THE MOP AND W'LL CLEAN THE SLOP</Text>
        </View>
        <View style={{flex:0.6,width:wp("100%"), alignItems: 'center'}}>
        {
          /* <Text style={{ fontSize: 30,color:"white",fontWeight:"bold" }}>Login</Text> */}
        <Text>{""}</Text>
        <Input
        leftIcon={
          <AntDesign
            name='user'
            size={20}
            color='#567D46'
          />
        }
        containerStyle={this.re.test(this.state.username)? styles.block:styles.block2}
        placeholder='username'
        value={this.state.username}
        onChangeText={(username)=>this.setState({username})}
        //errorMessage={this.re.test(this.state.firstname)?null: this.state.firsterror}
        placeholderTextColor="#567D46"
      />
      <Text>{""}</Text>
      <Input
       leftIcon={
        <AntDesign
          name='lock'
          size={20}
          color='#567D46'
        />
      } 
        placeholder='password'
        containerStyle={this.re.test(this.state.password)? styles.block:styles.block2}
        onChangeText={(password)=>this.setState({password})}
        value={this.state.password}
        secureTextEntry={true}
        placeholderTextColor="#567D46"
      />
      <Text>{""}</Text>
      <TouchableOpacity
                         style={{flexDirection:"column",alignItems: 'center',justifyContent:"center",
                         backgroundColor: '#DDDDDD',
                         padding: 1,width:wp("80%"),height:wp("10%"),borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",
                       }}
                       onPress={this.Login}
                       >
                       <Text style={{ fontSize: wp('4.5%'),textAlign:"center", fontWeight: "bold",color:"white",fontStyle:"italic" }} >Login</Text>
                       </TouchableOpacity>
        {/* <Button
          onPress={this.Login}
          title="Login"
          color="#660000"
        /> */}

      </View>
      </View>
  </ImageBackground>
  </KeyboardAvoidingView>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  block: {
    
    backgroundColor: '#fff',
    width:180,
    
    borderWidth:1,
    borderColor:"black",
    borderRadius:10,
    
  },
  block2: {
    
    backgroundColor: 'white',
    width:"80%",
    borderWidth:1,
    borderColor:"#567D46",
    borderRadius:15,
    
    
  }
});


  
