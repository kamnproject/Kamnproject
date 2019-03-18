import React from 'react';
import { StyleSheet, Text, View,Button, Alert } from 'react-native';
import { Header,Overlay,Input } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home'
import { ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase'
import db from '../db.js'
export default class LoginScreen extends React.Component {
    re = /^[a-zA-z]+$/
    state={
        image:require('../assets/main.jpg'),
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30,color:"white" }}>Login</Text>
        <Text>{""}</Text>
        <Input
        leftIcon={
          <AntDesign
            name='user'
            size={20}
            color='grey'
          />
        }
        containerStyle={this.re.test(this.state.username)? styles.block:styles.block2}
        placeholder='username'
        value={this.state.username}
        onChangeText={(username)=>this.setState({username})}
        //errorMessage={this.re.test(this.state.firstname)?null: this.state.firsterror}
        
      />
      <Text>{""}</Text>
      <Input
       leftIcon={
        <AntDesign
          name='lock'
          size={20}
          color='grey'
        />
      } 
        placeholder='password'
        containerStyle={this.re.test(this.state.password)? styles.block:styles.block2}
        onChangeText={(password)=>this.setState({password})}
        value={this.state.password}
        secureTextEntry={true}
      />
      <Text>{""}</Text>
        <Button
          onPress={this.Login}
          title="Login"
          color="#660000"
        />
         <Text style={{ fontSize:15,color:"white" }}>{"Don't have Account?"}</Text>
         <Text>{""}</Text>
         <Button
          onPress={() => this.props.navigation.navigate('Register')}
          title="Sign up"
          color="#660000"
        />
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
    
    backgroundColor: '#fff',
    width:180,
    borderWidth:1,
    borderColor:"red",
    borderRadius:10,
    
  }
});


  
