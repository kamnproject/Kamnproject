import React from 'react';
import { StyleSheet, Text, View,Image,Button,TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import { createMaterialTopTabNavigator, BottomTabBar, createDrawerNavigator } from 'react-navigation';
import { Header,Card,ListItem,Badge,Divider } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import db from '../db'

export default class Detail extends React.Component {
    state={
      list:[],
        yellow_can:"https://firebasestorage.googleapis.com/v0/b/kamn-e4270.appspot.com/o/images%2Fyellow_can.jpg?alt=media&token=9fbee99d-d095-4797-9295-b9d15fb09021",
    green_can:"https://firebasestorage.googleapis.com/v0/b/kamn-e4270.appspot.com/o/images%2Fgreen_can.jpg?alt=media&token=192b23c3-1fdb-49e8-94e6-8f05018b4151",
    red_can:"https://firebasestorage.googleapis.com/v0/b/kamn-e4270.appspot.com/o/images%2Fred_can.jpg?alt=media&token=d5361926-7dc4-439b-bc3a-45a8a71d4839"
    }
    componentWillMount=()=>{
      db.collection("CollectedTrashcans").onSnapshot(querySnapshot => {
        let list = []
        querySnapshot.forEach(doc => {
          list.push({
            id:doc.id,...doc.data()
          })
        })
        this.setState({list:list})
      })
    }
  render() {
    const {navigation}= this.props;
    // const battery = navigation.getParam('battery')
    //  const fill = navigation.getParam('fill')
     const trash = navigation.getParam('trashes')
     const location = trash.Location
     const day = trash.Lasttime_empty.toDate().getYear()
     
     //dt = new Date(day*1000)
    // const fill = navigation.getParam('fill')
    // const fill = navigation.getParam('fill')
    // const fill = navigation.getParam('fill')
    // const fill = navigation.getParam('fill')
    // const fill = navigation.getParam('fill')
    return (
      <View style={styles.container}>
        <View style={{flexDirection:"row"}}> 
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <MaterialCommunityIcons
                  name="keyboard-backspace"
                  color="black"
                  size={30}
                  onPress={() => this.props.navigation.goBack()}
                />
            </TouchableOpacity>
          </View>
         
        <Text style={{textAlign:"center",fontSize:25,fontWeight:"bold",marginLeft:70}}>Trash Can Details</Text>
       
       </View>
          <View style={{flexDirection:"row",justifyContent:"space-between",margin:5,borderWidth:1,borderStyle:"dotted",borderColor:"black"}}>
          
          <View style={{marginLeft:5}}>
         
          <Text style={{marginBottom: 10}}>
           <Text style={{fontWeight:"bold",fontSize:16}}>Battery: </Text> <Text>{trash.Battery_percentage+" %"}</Text>
          </Text>
          <Text style={{marginBottom: 10}}>
           <Text style={{fontWeight:"bold",fontSize:16}}>Fill: </Text> <Text>{trash.Fill_percentage+" %"}</Text>
          </Text>
          <Text style={{marginBottom: 10}}>
           <Text style={{fontWeight:"bold",fontSize:16}}>Status: </Text> <Text>{trash.Status+" %"}</Text>
          </Text>
           <Text style={{marginBottom: 10}}>
           <Text style={{fontWeight:"bold",fontSize:16}}>Latitude: </Text> <Text>{location._lat}</Text>
          </Text>
          <Text style={{marginBottom: 10}}>
           <Text style={{fontWeight:"bold",fontSize:16}}>Longitude: </Text> <Text>{location._long}</Text>
          </Text>
          <Text style={{marginBottom: 10}}>
           <Text style={{fontWeight:"bold",fontSize:16}}>Temperature: </Text> <Text>{trash.Temperature}</Text>
          </Text>
          <Text style={{marginBottom: 10}}>
           <Text style={{fontWeight:"bold",fontSize:16}}>Day: </Text> <Text>{day}</Text>
          </Text>
         
          </View>
          
          <View>
          <Image
          style={{ height:150,width:120,marginRight:10,marginVertical:10,}}
          source={trash.Fill_percentage>30 & trash.Fill_percentage<60 ?{uri:this.state.yellow_can}:trash.Fill_percentage>60?{uri:this.state.red_can}:{uri:this.state.green_can}}
        />
          </View>
          </View>
          <Button title={"Create Issue"}></Button>
          <ScrollView>
            {this.state.list.map((l,i)=><View key={i}>{l.Trashcan_id==trash.id && 
            <TouchableOpacity>
            
               
       <ListItem
     
     leftAvatar={
     <View>
       <Image
          style={{width: 66, height: 58}}
          source={trash.Fill_percentage>30 & trash.Fill_percentage<60 ?{uri:this.state.yellow_can}:trash.Fill_percentage>60?{uri:this.state.red_can}:{uri:this.state.green_can}}
        />
    </View>}
     rightAvatar={<Badge  status={trash.Fill_percentage>30 & trash.Fill_percentage<60 ?"warning":trash.Fill_percentage>60?"error":"success" }/>}
     title={<Text style={{textAlign:"left",fontWeight:"bold"}}>{"Collected by:  "+l.Employee_id}</Text>}
     subtitle={<Text style={{textAlign:"left"}}>{"Time of full: "+"06:00 PM"}</Text>}
    // <Text style={{textAlign:"left"}}>{"Date: "+"23 March 2019"}</Text> <Text style={{textAlign:"left"}}>{"Time: "+"06:50 PM"}</Text>}
     
   />
   <Divider style={{ backgroundColor: 'brown',height:1 }} />
   </TouchableOpacity>}</View>)}
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   
    backgroundColor: '#fff',
  
  },
});
