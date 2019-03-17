import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Profile from './Profile'
import firebase from 'firebase'
import db from '../db.js'

export default class Home extends React.Component {
  state = {
    users: [],
  }

  componentDidMount() {
    // go to db and get all the users
    db.collection("area")
      .onSnapshot(querySnapshot => {
        let users = []
        querySnapshot.forEach(doc => {
          users.push({ id: doc.id, ...doc.data() })
        })
        this.setState({ users })
        console.log("Current users: ", this.state.users.length)
      })
      

  }
  render() {
    return (
      <View style={styles.container}>
         <Header
      backgroundColor="#660000"
      placement="left"
  leftComponent={<Entypo name="circular-graph" color="white" size={30}/>}
  centerComponent={{ text: 'Achievement', style: { color: '#fff',fontSize:25 } }}
  rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('Profile')}/>}
/>
        <Text>Home1</Text>
        {
            this.state.users.map(m =>
              <Text style={{ fontSize: 20 }} key={m.id}>
                
                <Text style={{ fontWeight: "bold" }}>Name : {m.address}</Text>
                <Text> </Text>
                <Text>Area id : {m.areaid}</Text>
              </Text>
            )
          }
        
      </View>
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
});
