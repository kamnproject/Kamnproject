import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Picker, TouchableOpacity,ScrollView  } from 'react-native';
import { Header, Overlay, Input, Card } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';

import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home'
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ImageBackground } from 'react-native';
import { ImagePicker } from 'expo';
import firebase from 'firebase'
import db from '../db.js'
import { KeyboardAvoidingView } from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
import { uploadImageAsync } from '../ImageUtils.js'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class RegisterScreen extends React.Component {
  re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
  re2 = /^\d{7,7}[0-9]+$/
  re3 = /^[A-Za-z]+$/
 re4= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/
  state = {
    image: require('../assets/main.jpg'),
    fname: "",
    lname: "",
    username: "",
    password: "",
    confirmpassword: "",
    address: "",
    phone: "",
    profile: "",
    avatar: "",
    selectedans: "",
    areas: [1],
    location: [],
    users: []
  }
  area = [1]
  list = [];
  users = []
  componentWillMount = () => {

    db.collection("User").onSnapshot(querySnapshot => {

      this.users = []

      querySnapshot.forEach(doc => {

        this.users.push({
          id: doc.id, ...doc.data()
        })

      })
      this.setState({ users: this.users })

      console.log("Current users: ",
        this.users)
    })

    list = [];
    db.collection(`Area`).onSnapshot(querySnapshot => {

      querySnapshot.forEach(doc => {
        list.push({
          id: doc.id, ...doc.data(),

        });

        if (list.id == this.state.selectedans) {
          console.log("Current locationnnnnnnnnnnnnnnnnn: ");
          this.setState({ location: list.location });
        }

        this.setState({ areas: list });

      });


      console.log("Current areas: ", list.length);
    });
    console.log("Current if for location: ", this.state.selectedans);



  }
 
  checkusername = async () => {
    let status = true
    {
      this.state.users.map((item, i) => {
        if (this.state.username === item.id) {
          status = false
        }
      })
    }

    return status
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
  setlocation = () => {
    list = [];
    db.collection(`Area`).onSnapshot(querySnapshot => {

      querySnapshot.forEach(doc => {
        list.push({
          id: doc.id, ...doc.data(),
          location: doc.data().Location
        });
        console.log("Current locationnnnnnnnnnnnnnnnnn: ", list.id);
        if (list.id == this.state.selectedans) {
          console.log("Current locationnnnnnnnnnnnnnnnnn: ", location);
          this.setState({ location: list.location });
        }

      });
    });
     
  }

  Register = async () => {

    this.setlocation()
    // console.log("location", this.state.location);
    try {
      if (this.state.username){
      if (this.state.password == this.state.confirmpassword) {
      await firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password)
      // upload this.state.avatar called this.state.email to firebase storage
      
      const name = this.state.fname+ " "+ this.state.lname || this.state.username
      //const address =this.state.address 


      //join_date = Date.now()


     

        await db.collection('User').doc(this.state.username).set({ Area_id: this.state.selectedans, Badges_earned: [], Current_location: new firebase.firestore.GeoPoint(latitude = 55.12542, longitude = 21.2555), name, online: false, Phone_no: this.state.phone, Points: 0, Profile_pic: "" ,Work_Status: false})
        await db.collection('User').doc(this.state.username).collection('User_issues').doc().set({ Date: firebase.firestore.Timestamp.fromDate(new Date()), Message: "", Reply: "" })
        this.props.navigation.navigate('Home')
      }
      else {

        Alert.alert("Your passward and confirm passward does not match")
      }

    }
    else {
    Alert.alert("this Email already exist")
    }
    } catch (error) {
      // Handle Errors here. 
      var errorCode = error.code;
      var errorMessage = error.message;
      Alert.alert("this Email already exist")
      // ...
      console.log(errorCode)
      console.log(errorMessage)
    }
  }

  onValueChange = async (value, index) => {

    await this.setState({ selectedans: value })
    console.log("selectedans", this.state.selectedans)

  }


  render() {

    return (

      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView>
        <Header
          backgroundColor='#567D46'
          placement="left"
          leftComponent={<Entypo name="add-user" size={30} color="white" />}
          centerComponent={{ text: 'Create User', style: { color: '#fff', fontSize: 25 } }}
          rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('Profile')} />}
        />
  

          <Text style={{ marginTop: 8, marginLeft: 2, fontSize: wp('4.5%'), fontWeight: "bold", color: "black" }}>Create an Employee Account</Text>


          <Text style={{ marginTop: 5, marginBottom: 2, marginLeft: 2, fontSize: wp('3.5%'), fontWeight: "bold", color: "black" }}> First Name: </Text>
          <Input

            containerStyle={this.re3.test(this.state.fname) ? styles.block : styles.block2}

            value={this.state.fname}
            onChangeText={(fname) => this.setState({ fname })}
          //errorMessage={this.re.test(this.state.firstname)?null: this.state.firsterror}  
          />
          <Text style={{ marginTop: 5, marginBottom: 3, marginLeft: 2, fontSize: wp('3.5%'), fontWeight: "bold", color: "black" }}> Last Name: </Text>
          <Input

            containerStyle={this.re3.test(this.state.lname) ? styles.block : (styles.block2)}

            value={this.state.lname}
            onChangeText={(lname) => this.setState({ lname })}
          //errorMessage={this.re.test(this.state.firstname)?null: this.state.firsterror}  
          />

          <Text style={{ marginTop: 5, marginBottom: 3, marginLeft: 2, fontSize: wp('3.5%'), fontWeight: "bold", color: "black" }}> Email: </Text>
          <Input
            containerStyle={this.re.test(this.state.username) ? styles.block : styles.block2}

            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
          //errorMessage={this.re.test(this.state.firstname)?null: this.state.firsterror}

          />
          <Text style={{ marginTop: 5, marginBottom: 2, marginLeft: 2, fontSize: wp('3.5%'), fontWeight: "bold", color: "black" }}>Password:</Text>
          <Input
            type='password'

            secureTextEntry={true}
            containerStyle={this.re4.test(this.state.password) ?styles.block:styles.block2}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}

          />
           {this.re4.test(this.state.password) ? null:<Text style={{ marginBottom: 2, marginLeft: 2, fontSize: wp('2.4%'), fontWeight: "bold", color: "red" }}>Password must be atleast 4 characters and must include atleast 1 upper case letter and lower case letter, and 1 digit.</Text>} 
          <Text style={{ marginTop: 5, marginBottom: 3, marginLeft: 2, fontSize: wp('3.5%'), fontWeight: "bold", color: "black" }}>Confirm Password:</Text>
          <Input
            type='password'
            secureTextEntry={true}
            containerStyle={this.re4.test(this.state.confirmpassword) ?styles.block:styles.block2}
            onChangeText={(confirmpassword) => this.setState({ confirmpassword })}
            value={this.state.confirmpassword}

          />
          <Text style={{ marginTop: 5, marginBottom: 2, marginLeft: 2, fontSize: wp('3.5%'), fontWeight: "bold", color: "black" }}>Mobile No:</Text>
          <Input
            containerStyle={this.re2.test(this.state.phone) ? styles.block : styles.block2}
            onChangeText={(phone) => this.setState({ phone })}
            value={this.state.phone}
          />
          <Text style={{ marginTop: 5, marginBottom: 2, marginLeft: 2, fontSize: wp('3.5%'), fontWeight: "bold", color: "black" }}>Area: </Text>
          <Picker
            mode="dropdown"
            selectedValue={this.state.selectedans}
            style={{
              backgroundColor: '#ecf0f1',
              marginLeft: 2,
              marginBottom: 7,
              alignSelf: "stretch", borderWidth: 1, borderColor: "#bdc3c7", borderWidth: 0.5, borderRadius: 10,
            }}
            onValueChange={this.onValueChange.bind(this)}>
            <Picker.Item label="Select" value="select" />

            {this.state.areas.map((item, i) =>
              <Picker.Item label={item.Name} value={item.id} key={i} />
            )
            }
          </Picker>


          <Text>{""}</Text>

       
          <TouchableOpacity
    
            style={{alignItems: 'center',justifyContent:"center",
            padding: 1,width:wp("30%"),height:wp("10%"),borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",
          }}
            onPress={this.Register} >
            <Text style={{ fontSize: wp('3.7%'), fontWeight: "bold", color: "white", borderRadius: 10, }} >Create</Text>
          </TouchableOpacity>
        </ScrollView>
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
    marginLeft: 5,
    backgroundColor: '#ecf0f1', borderWidth: 1, borderColor: "black", borderWidth: 0.5, borderRadius: 10, padding: 1, width: '80%'

  },
  block2: {
    marginLeft: 5,
    backgroundColor: '#ecf0f1', borderWidth: 1, borderColor: "red", borderWidth: 0.5, borderRadius: 10, padding: 1, width: '80%'

  }
});



