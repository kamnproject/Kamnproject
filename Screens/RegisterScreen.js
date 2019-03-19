import React from 'react';
import { StyleSheet, Text, View,Button, Alert } from 'react-native';
import { Header,Overlay,Input } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home'
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ImageBackground } from 'react-native';
import { ImagePicker } from 'expo';
import firebase from 'firebase'
import db from '../db.js'
import {KeyboardAvoidingView} from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';


export default class RegisterScreen extends React.Component {
    re = /^[a-zA-z]+$/
    state={
        image:require('../assets/main.jpg'),     
        name:"",
        username:"",
        password:"",
        confirmpassword:"",
        address: "",
        phone:"",
        profile:"",
        avatar:"",
    }

    pickAvatar = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        this.setState({ avatar: result.uri });
      }
    };
  
    Register = async () => {
      let profile_pic = "default.png"
      try {
  
        await firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password)
        // upload this.state.avatar called this.state.email to firebase storage
        console.log("avatar upload: ", profile_pic)
        const name = this.state.name || this.state.username
        const phone =this.state.phone 
        //const address =this.state.address 

       
        //join_date = Date.now()

        if (this.state.password==this.state.confirmpassword)
        { 
          await db.collection('User').doc(this.state.username).set({ Area_id:"",Badges_earned:[],Current_location:new firebase.firestore.GeoPoint(latitude= 55.12542, longitude= 21.2555), name, online: true, Phone_no:this.state.phone, Points:0, Profile_pic:"" })
          await db.collection('User').doc(this.state.username).collection('Daily_targets').doc().set({Target_achieved:0,Target_todo:20})
          await db.collection('User').doc(this.state.username).collection('User_issues').doc().set({Date:firebase.firestore.Timestamp.fromDate(new Date()),Message:"",Reply:""})
          this.props.navigation.navigate('Main')
        }
          else {
           
            Alert.alert("Your passward and confirm passward does not match")
        }
      } catch (error) { 
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode)
        console.log(errorMessage)
      }
        
      
    }
  render() {

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>


      <ImageBackground source={this.state.image} style={{width: '100%', height: '100%'}}>
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30,color:"white" }}>Register</Text>
      <Text>{""}</Text>
      <Input
      leftIcon={
        <AntDesign
          name='user'
          size={20}
          color='grey'
        />
      }
      containerStyle={this.re.test(this.state.name)? styles.block:styles.block2}
      placeholder='Name'
      value={this.state.name}
      onChangeText={(name)=>this.setState({name})}
      //errorMessage={this.re.test(this.state.firstname)?null: this.state.firsterror}
      
    />
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
      placeholder='Enter Email'
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
      secureTextEntry={true}
      containerStyle={this.re.test(this.state.password)? styles.block:styles.block2}
      onChangeText={(password)=>this.setState({password})}
      value={this.state.password}
      
    />
    <Text>{""}</Text>
     <Input
     type ='password'
     leftIcon={
      <AntDesign
        name='lock'
        size={20}
        color='grey'
      />
    } 
      placeholder='Confirm Password'
      secureTextEntry={true}
      containerStyle={this.re.test(this.state.confirmpassword)? styles.block:styles.block2}
      onChangeText={(confirmpassword)=>this.setState({confirmpassword})}
      value={this.state.confirmpassword}
      
    />
    {/* <Text>{""}</Text>
     <Input
     leftIcon={
      <AntDesign
        name='home'
        size={20}
        color='grey'
      />
    } 
      placeholder='Address'
      containerStyle={this.re.test(this.state.address)? styles.block:styles.block2}
      onChangeText={(address)=>this.setState({address})}
      value={this.state.address}
      
    /> */}
    <Text>{""}</Text>
     <Input
     leftIcon={
      <AntDesign
        name='phone'
        size={20}
        color='grey'
      />
    } 
      placeholder='phone'
      containerStyle={this.re.test(this.state.phone)? styles.block:styles.block2}
      onChangeText={(phone)=>this.setState({phone})}
      value={this.state.phone}
      
    />
    <Text>{""}</Text>
      <Button
        onPress={this.Register}
        // onPress={() => this.props.navigation.navigate('Home')}
        title="Register"
        color="#660000"
      />
       <Text>{""}</Text>
  <Button onPress={this.pickAvatar} title="Select Profile Picture" color="#660000" />
      
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
  width:200,
  
  borderWidth:1,
  borderColor:"black",
  borderRadius:10,
  
},
block2: {
  
  backgroundColor: '#fff',
  width:200,
  borderWidth:1,
  borderColor:"red",
  borderRadius:10,
  
}
});



