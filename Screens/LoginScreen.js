import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { Header,Overlay,Input } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home'
import { ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAvoidingView} from 'react-native';
export default class LoginScreen extends React.Component {
    re = /^[a-zA-z]+$/
    state={
        image:require('../assets/main.jpg'),
        username:"",
        password:""
    }
    loginOrRegister = async () => {
      let avatar = "default.png"
      try {
  
        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        // upload this.state.avatar called this.state.email to firebase storage
        if (this.state.avatar) {
          avatar = this.state.email
          await uploadImageAsync("avatars", this.state.avatar, this.state.email)
        }
  
        console.log("avatar upload: ", avatar)
        const name = this.state.name || this.state.email
        await db.collection('users').doc(this.state.email).set({ name, avatar, online: true })
      } catch (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode)
        console.log(errorMessage)
        if (errorCode == "auth/email-already-in-use") {
          try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)

            if (this.state.avatar) {
              avatar = this.state.email
              await uploadImageAsync("avatars", this.state.avatar, this.state.email)
              await db.collection('users').doc(this.state.email).update({ avatar })
            }
            await db.collection('users').doc(this.state.email).update({ online: true })
            
            if(this.state.name) {
              await db.collection('users').doc(this.state.email).update({ name: this.state.name })
            }
            console.log("avatar upload: ", result)
          } catch (error) {
  
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorMessage)
          }
        }
      }
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
          onPress={() => this.props.navigation.navigate('Home')}
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


  
