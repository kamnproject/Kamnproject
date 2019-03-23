import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import { createMaterialTopTabNavigator, BottomTabBar, createDrawerNavigator } from 'react-navigation';
import { Header } from 'react-native-elements';
import MapView from 'react-native-maps';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Foundation from '@expo/vector-icons/Foundation';
import firebase from 'firebase'
import db from '../db.js'
//import console = require('console');

export default class Map extends React.Component {
  // state={
  //   points : [
      
  //     {coordinate :{longitude: 51.515969,latitude: 25.298560}},
  //     {coordinate :{longitude: 51.516560,latitude: 25.297891}},
  //     {coordinate :{longitude: 51.516966,latitude: 25.297263}},
  //     {coordinate :{longitude: 51.514187,latitude: 25.299114}},
    
  // ],
  // area:{},
  // lat:"",
  // long:"",
  // location:"",
  // region : {
  //   latitude:null,
  //   longitude:null,
  //   latitudeDelta: 0.004,
  //   longitudeDelta: 0.004
  // },
  // trashlist:[]
  // }
  region = {
    latitude: 25.298514,
    longitude: 51.514855,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003
  
  }
  state={
    points : [
      
      {coordinate :{longitude: 51.515969,latitude: 25.298560}},
      {coordinate :{longitude: 51.516560,latitude: 25.297891}},
      {coordinate :{longitude: 51.516966,latitude: 25.297263}},
      {coordinate :{longitude: 51.514187,latitude: 25.299114}},
    
  ],
  icon:"md-contacts"
  }
area_ids=""
  componentWillMount=async ()=>{
    //go to db and get all the users
    //let email = firebase.auth().currentUser.email
    let email = "khalid@khalid.com"
    area_ids=""
    
    await db.collection("User").doc(email).get().then(function(doc){
      if (doc.exists) {
        
        console.log("Document data id:", doc.data().Area_id);
        area_ids=doc.data().Area_id
        console.log("don't know----!", area_ids);

        
        
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  })
    await db.collection("Area").doc(area_ids).get().then(function(doc){
      if (doc.exists) {
        
        console.log("Document data:", doc.data().Location._lat);
        area= doc.data()
        console.log("Nofdfsdf!",area);

        
        
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    
    
    
    
    })
    let regiontemp={
      latitude: area.Location._lat,
    longitude: area.Location._long,
    latitudeDelta: 0.004,
    longitudeDelta: 0.004
    }
    this.setState({lat:area.Location._lat,long:area.Location._long})
    this.setState({region:regiontemp})
    console.log("state!",this.state.lat);
    
    db.collection("TrashCan").onSnapshot(querySnapshot => {
      let list = []
      querySnapshot.forEach(doc => {
        list.push({
          id:doc.id,...doc.data()
        })
      })
      this.setState({trashlist:list})
    })
  
    
  }
  
  render() {
    return (
      <View style={styles.container}>
       
         <MapView style={{flex:1}} loadingEnabled={true} showsMyLocationButton={true} showsUserLocation={true} initialRegion = {this.region} style={styles2.map} customMapStyle={mystyle} >
{this.state.points.map((point,x)=><MapView.Marker  description={"Fill: "+point.Fill_percentage+"%"} title={"Status: "+point.Status}  key ={x} coordinate={point.coordinate} >

</MapView.Marker> 
)}

    </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
const styles2 = StyleSheet.create({
  map:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top:0,
    bottom:0,
    left:0,
    right:0
  }
})
const mystyle = [
  
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]
