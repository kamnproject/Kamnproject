import React from 'react';
import { StyleSheet, Text, View ,Image,TouchableHighlight,Button,TouchableOpacity,Dimensions,Alert} from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import MapViewDirections from 'react-native-maps-directions'
import { createMaterialTopTabNavigator, BottomTabBar, createDrawerNavigator } from 'react-navigation';
import { Header } from 'react-native-elements';
import MapView,{Callout} from 'react-native-maps';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Foundation from '@expo/vector-icons/Foundation';
import firebase from 'firebase'
import db from '../db.js'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AntDesign from '@expo/vector-icons/AntDesign';
import geolib from 'geolib'

//import console = require('console');
const { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LONGITUDE = -122.4053769;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8';
export default class Map extends React.Component {
trash=[]
  constructor(props) {
		super(props);

		this.state = {
      trash:[],
      yellow_can:"https://firebasestorage.googleapis.com/v0/b/kamn-e4270.appspot.com/o/images%2Fyellow_can.jpg?alt=media&token=9fbee99d-d095-4797-9295-b9d15fb09021",
    green_can:"https://firebasestorage.googleapis.com/v0/b/kamn-e4270.appspot.com/o/images%2Fgreen_can.jpg?alt=media&token=192b23c3-1fdb-49e8-94e6-8f05018b4151",
    red_can:"https://firebasestorage.googleapis.com/v0/b/kamn-e4270.appspot.com/o/images%2Fred_can.jpg?alt=media&token=d5361926-7dc4-439b-bc3a-45a8a71d4839",
   me:"https://firebasestorage.googleapis.com/v0/b/kamn-e4270.appspot.com/o/images%2Fme.png?alt=media&token=5d03c5f4-6440-49e7-819e-f591ce36cf75",
   you:"https://firebasestorage.googleapis.com/v0/b/kamn-e4270.appspot.com/o/images%2Fyou.png?alt=media&token=0f183f00-2562-440a-bd41-48dd7667b523",
    points : [
      
      {coordinate :{longitude: 51.515969,latitude: 25.298560}},
      {coordinate :{longitude: 51.516560,latitude: 25.297891}},
      {coordinate :{longitude: 51.516966,latitude: 25.297263}},
      {coordinate :{longitude: 51.514187,latitude: 25.299114}},
    
  ],
  coordinates:[
    {latitude: 25.296886,longitude: 51.514729},
    {latitude: 25.29856,longitude: 51.515969}
  ],
  fromCoordinate:{latitude: 25.29936,longitude: 51.514729},
  toCoordinate:{latitude: 25.29936,longitude: 51.514729},
  area:{},
  lat:"",
  long:"",
  location:"",
  region : {
    latitude:null,
    longitude:null,
    latitudeDelta: 0.004,
    longitudeDelta: 0.004
  },
  trashlist:[],
  areaLocation:[],
  users:[]
		};

		this.mapView = null;
  }
  handleDisappear=()=>{
    this.setState({
      toCoordinate:this.state.fromCoordinate })
  }
  onMapPress = (e)=> {

		if (this.state.coordinates.length == 2) {
			this.setState({
				toCoordinate: 
					e.nativeEvent.coordinate
        
      });
      console.log("1st corda:",this.state.coordinates[0])
      console.log("2st corda:",this.state.coordinates[1])
      console.log("lengtha: ",this.state.coordinates.length)
		// } else {
		// 	this.setState({
		// 		coordinates: [
		// 			...this.state.coordinates,
		// 			e.nativeEvent.coordinate,
		// 		],
    //   });
      // console.log("1st cordb:",this.state.coordinates[0])
      // console.log("2st cordb:",this.state.coordinates[1])
      // console.log("lengthb: ",this.state.coordinates.length)
		}
  }
  
  handlePass=(trash)=>{
    console.log("worked")
    //this.setState({trash})
  }
  handleDetails=(trash)=>{
    // console.log(trash.id)
    this.props.navigation.navigate('TrashDetail',{trashes:trash})
  }
  onReady = (result) => {
		this.mapView.fitToCoordinates(result.coordinates, {
			edgePadding: {
				right: (width / 20),
				bottom: (height / 20),
				left: (width / 20),
				top: (height / 20),
			}
		});
  }
  onError = (errorMessage) => {
		Alert.alert(errorMessage);
	}
  // region = {
  //   latitude: 25.298514,
  //   longitude: 51.514855,
  //   latitudeDelta: 0.003,
  //   longitudeDelta: 0.003
  
  // }
  // state={
  //   points : [
      
  //     {coordinate :{longitude: 51.515969,latitude: 25.298560}},
  //     {coordinate :{longitude: 51.516560,latitude: 25.297891}},
  //     {coordinate :{longitude: 51.516966,latitude: 25.297263}},
  //     {coordinate :{longitude: 51.514187,latitude: 25.299114}},
    
  // ],
  // icon:"md-contacts",
  // trashlist=[]
  // }
area_ids=""
email="khalid@khalid.com"
handlePress=(trash)=>{
  console.warn("sdasdas")
  this.props.navigation.navigate('TrashDetail',{trashes:trash})
}
  componentWillMount=async ()=>{
    //go to db and get all the users
    //let email = firebase.auth().currentUser.email
   // let email = "khalid@khalid.com"
    area_ids=""
    
    await db.collection("User").doc(this.email).get().then(function(doc){
      if (doc.exists) {
        
        console.log("User Id is: ", doc.data().Area_id);
        area_ids=doc.data().Area_id
        console.log("Area id another time is: ", area_ids);

        
        
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  })
  
  db.collection("User").onSnapshot(querySnapshot => {
    let users = []
    querySnapshot.forEach(doc => {
      users.push({
        id:doc.id,...doc.data()
      })
    })
    this.setState({users})
    console.log("user: ",users)
    
  })
  
  let location=[]
    await db.collection("Area").doc(area_ids).get().then(function(doc){
      if (doc.exists) {
         location = doc.data().Location
        //this.setState({areaLocation:location})
        console.log("Latitude of the Location", doc.data().Location);
        area= doc.data()
        console.log("area object::!",area);

        
        
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    
    
    })
    this.setState({areaLocation:location})
    
  //   })
  //   // let regiontemp={
  //   //   latitude: area.Location._lat,
  //   // longitude: area.Location._long,
  //   // latitudeDelta: 0.004,
  //   // longitudeDelta: 0.004
  //   // }
  //  // this.setState({lat:area.Location._lat,long:area.Location._long})
  //   //this.setState({region:regiontemp})
  //   console.log("state!",this.state.lat);
  
    await db.collection("TrashCan").onSnapshot(querySnapshot => {
      let list = []
      querySnapshot.forEach(doc => {
        list.push({
          id:doc.id,...doc.data()
        })
      })
      this.setState({trashlist:list})
      console.log("trashes: ",list.length)
    })
  
    
  
}

  
  render() {
    return (
      <View style={styles.container}>
 {console.log("distance: ",geolib.getDistance(this.state.fromCoordinate,this.state.toCoordinate))}

    <MapView style={styles2.map} provider={"google"} region={{latitude:this.state.areaLocation._lat,longitude:this.state.areaLocation._long,latitudeDelta: 0.004,longitudeDelta: 0.004}}>
   
    
    {this.state.trashlist.map((point,x)=> <MapView.Marker onPress={this.onMapPress} description={"Fill: "+point.Fill_percentage+"%"}  title={"Status: "+point.Status}  key ={x} coordinate={{latitude:point.Location._lat,longitude:point.Location._long}} >

<Image
          style={{width:20, height:35}}
          source={point.Fill_percentage>=30 & point.Fill_percentage<60 ?{uri:this.state.yellow_can}:point.Fill_percentage>=60?{uri:this.state.red_can}:{uri:this.state.green_can}}
        />
       
        {/* <MapView.Callout onPress={()=>this.handlePress(point)}>
                <View style={{width:80}}>
                  <Text style={{fontSize: 18}}>
                    {"Fill: "+point.Fill_percentage}
                  </Text>
                  <Text style={{fontSize:13}}>
                    {"Status: "+point.Status}
                  </Text>
                </View>
              </MapView.Callout> */}
</MapView.Marker>
)}    
    {this.state.users.map((point,x)=>
<MapView.Marker
  pinColor={this.email==point.id&&"blue"} 
  description={"Online: "+point.id}  
  title={"name: "+point.name }  
  key ={x} 
  coordinate={{latitude:point.Current_location._lat,longitude:point.Current_location._long}}
>

        
<Image
  style={{width:20, height:35}}
  
  source={this.email===point.id?{uri:this.state.me}:{uri:this.state.you}}
/>

</MapView.Marker> 

)}
    
    
    {/* <MapView.Marker  coordinate={this.state.fromCoordinate}><Image
          style={{width:20, height:35}}
         
          source={{uri:this.state.yellow_can}}
        /></MapView.Marker>
    <MapView.Marker onPress={this.onMapPress} coordinate={{latitude:25.297891,longitude:51.51656}}><Image
          style={{width:20, height:35}}
         
          source={{uri:this.state.red_can}}
        /></MapView.Marker> */}
    <MapViewDirections
      origin={this.state.fromCoordinate}
      destination={this.state.toCoordinate}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={3}
      strokeColor="blue"
    />
    </MapView>
    <Callout>
      <View>
       <Text>This is the map</Text>
      </View>
      <View style={{flexDirection:"column"}}>
      <TouchableOpacity
    style={{width:wp("21%"),
    height:wp("7%") ,
    borderRadius:15,backgroundColor:"#567D46",alignItems: 'center',justifyContent:"center"
}}
    onPress={this.handleDisappear}
    
><View style={{alignItems: 'center',justifyContent:"center",margin:5}}>
                       <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white"}}>Stop Follow </Text>
                       </View></TouchableOpacity>
                       {!this.state.trash&& <TouchableOpacity
    style={{width:wp("21%"),
    height:wp("7%") ,
    borderRadius:15,backgroundColor:"#567D46",alignItems: 'center',justifyContent:"center"
}}
    onPress={()=>this.handleDetails(this.state.trash)}
    
><View style={{alignItems: 'center',justifyContent:"center",margin:5}}>
                       <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white"}}>Details </Text>
                       {/* <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white"}}>{this.state.trash.id} </Text> */}
                       </View></TouchableOpacity>}
                       
      </View>
    </Callout>
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
