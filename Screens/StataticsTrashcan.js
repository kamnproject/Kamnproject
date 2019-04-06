import React from "react";
import { StyleSheet, Text, View, ScrollView,Button,Alert,TouchableOpacity } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  createMaterialTopTabNavigator,
  BottomTabBar,
  createDrawerNavigator
} from "react-navigation";
import {
  Header,
  ListItem,
  Divider,
  Avatar,
  Badge,
  Icon,
  withBadge, SearchBar
} from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import firebase from "firebase";
import { Table, Row, Rows } from 'react-native-table-component';
import db from "../db.js";
import _ from "lodash";
import { Dimensions } from 'react-native'
import { captureScreen } from "react-native-view-shot";
import { uploadImageAsync } from '../ImageUtils.js'
import ProgressCircle from 'react-native-progress-circle'
const screenWidth = Dimensions.get('window').width
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'

const chartConfig = {
  backgroundColor: 'white',
      backgroundGradientFrom: '#567D46',
      backgroundGradientTo: '#567D46',
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 0
      }
}
const chartConfig2 = {
  backgroundColor: 'white',
  backgroundGradientFrom: '#567D46',
  backgroundGradientTo: '#567D46',
  color:  (opacity = 10) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 1, // optional, default 3,

}
export default class Statatics extends React.Component {
  state={
    CollectedTrashcans:[],
    tableData:[],
    imageURI :null,
    month:[0,0,0,0,0,0],
    Trashcan_Issues:[],
    Trashcan_Issuesmonth:[0,0,0,0,0,0],
    flag:false
  }
  takeScreenShot=async()=>{
    //handler to take screnshot
    Alert.alert("Screenshot Take. Now click Save to add to your Gallery")
    captureScreen({
      //either png or jpg or webm (Android). Defaults to png
      format: "jpg",
      //quality 0.0 - 1.0 (default). (only available on lossy formats like jpg)
      quality: 0.8
    })
    .then(
      uri=> this.setState({ imageURI : uri,flag:true }),
      error => console.error("Oops, Something Went Wrong", error)
      
    );
    
  }
  uri=""
  upload=async()=>{
    const result=await uploadImageAsync("screenshotsbyadmin",this.state.imageURI,Math.random()*10000000)
    this.setState({flag:false})
    await db.collection('AdminScreenshots').doc().set({ url:result,category:"trashcan" })
    Alert.alert("Image Saved")
    console.log("URL",result)
    
  }
  componentWillMount=async ()=>{
   
    this.CollectedTrashcans()
    this.TrashCanIssues()
   
  }
  CollectedTrashcans=async()=>{
    await db.collection("CollectedTrashcans").onSnapshot(async querySnapshot =>  {
      let CollectedTrashcans = [];
      
      querySnapshot.forEach(doc => {
        CollectedTrashcans.push({ id: doc.id, ...doc.data() });

      });
      
      this.setState({ CollectedTrashcans: CollectedTrashcans });
      this.month=[0,0,0,0,0,0]
      await this.permonth(CollectedTrashcans)
      console.log("CollectedTrashcans", this.state.CollectedTrashcans.length);
    });


  }

  TrashCanIssues=async()=>{
    await db.collection("Trashcan_Issues").onSnapshot(async querySnapshot =>  {
      let Trashcan_Issues = [];
      
      querySnapshot.forEach(doc => {
        Trashcan_Issues.push({ id: doc.id, ...doc.data() });

      });
      
      this.setState({ Trashcan_Issues: Trashcan_Issues });
      this.Trashcan_Issuesmonth=[0,0,0,0,0,0]
      await this.Trashcan_Issuespermonth(Trashcan_Issues)
      console.log("CollectedTrashcans", this.state.Trashcan_Issues.length);
    });


  }
  Trashcan_Issuespermonth=(Trashcan_Issues)=>{
    Trashcan_Issues.map((x,i)=>
    this.sortitbymonthTrashcan_Issues(x)
)



  }
  Trashcan_Issuesmonth=[0,0,0,0,0,0]
  sortitbymonthTrashcan_Issues=(item)=>{
    date=""+item.Date_time.toDate().toString()
    if(date.includes("Jan")){
      this.Trashcan_Issuesmonth[0]++
    }
    else if(date.includes("Feb")){
      this.Trashcan_Issuesmonth[1]++
    }
    else if(date.includes("Mar")){
      this.Trashcan_Issuesmonth[2]++
      console.log("March Count",this.Trashcan_Issuesmonth[2])
    }
    else if(date.includes("Apr")){
      this.Trashcan_Issuesmonth[3]++
      //console.log("March Count",this.month[2])
    }
    else if(date.includes("May")){
      this.Trashcan_Issuesmonth[4]++
      //console.log("March Count",this.month[2])
    }
    else if(date.includes("Jun")){
      this.Trashcan_Issuesmonth[5]++
      //console.log("March Count",this.month[2])
    }
    else{
     // console.log("Areadate",date,x)
    }
    this.setState({Trashcan_Issuesmonth:this.Trashcan_Issuesmonth})


  }
  permonth=(CollectedTrashcans)=>{
    console.log("Hello")
    CollectedTrashcans.map((x,i)=>
      this.sortitbymonth(x)
  )


  }
  month=[0,0,0,0,0,0]
  sortitbymonth=(item)=>{
    
    date=""+item.Date_time.toDate().toString()
    if(date.includes("Jan")){
      this.month[0]++
    }
    else if(date.includes("Feb")){
      this.month[1]++
    }
    else if(date.includes("Mar")){
      this.month[2]++
      console.log("March Count",this.month[2])
    }
    else if(date.includes("Apr")){
      this.month[3]++
      //console.log("March Count",this.month[2])
    }
    else if(date.includes("May")){
      this.month[4]++
      //console.log("March Count",this.month[2])
    }
    else if(date.includes("Jun")){
      this.month[5]++
      //console.log("March Count",this.month[2])
    }
    else{
     // console.log("Areadate",date,x)
    }
    this.setState({month:this.month})
  }
  render() {
    
    return (
      <View style={styles.container}>
        <View style={{flexDirection:"row",justifyContent:"space-between",margin:5}}>
        <TouchableOpacity
                         style={{flexDirection:"column",alignItems: 'center',justifyContent:"center",
                         backgroundColor: '#DDDDDD',
                         padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",width:wp("40%"),height:wp("10%"),
                       }}
                       onPress={this.takeScreenShot}
                       >
                       <Text style={{ fontSize: wp('4.5%'),textAlign:"center", fontWeight: "bold",color:"white" }} >Take Screenshot</Text>
                       </TouchableOpacity>
                       <Text>{""}</Text>
                       {this.state.flag&&
                      <TouchableOpacity
                      style={{flexDirection:"column",alignItems: 'center',justifyContent:"center",width:wp("40%"),height:wp("10%"),
                      backgroundColor: '#DDDDDD',
                      padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                    }}
                    onPress={this.upload}
                    >
                    <Text style={{ fontSize: wp('4.5%'),textAlign:"center", fontWeight: "bold",color:"white" }} >Save to Gallery</Text>
                    </TouchableOpacity>
                      }
                       
          </View>
        <ScrollView>
        
          <BarChart
               // style={graphStyle}
                data={ {labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [{
                  data: this.state.Trashcan_Issuesmonth
                }]}}
                width={screenWidth}
                height={220}
                yAxisLabel={''}
                chartConfig={chartConfig2}
              />
              <Text style={{ fontSize: wp('4.5%'),textAlign:"center", fontWeight: "bold",color:"#567D46" }}>Number of TrashCans Issues per month</Text>
              <View style={styles.container2}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']} style={styles.head} textStyle={styles.text}/>
          <Rows data={[this.state.Trashcan_Issuesmonth]} textStyle={styles.text}/>
        </Table>
      </View> 
          
          {/* {this.state.Trashcan_Issues.map((x,i)=><Text>{x.Date_time.toDate().toString()}</Text>)} */}
          {/* {this.state.Trashcan_Issuesmonth.map(x=><Text>{x}</Text>)} */}
          <BarChart
            //style={graphStyle}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [{
                data: this.state.month
              }]
            }}
            width={screenWidth}
            height={220}
            yAxisLabel={''}
            chartConfig={chartConfig2}
          />
          <Text style={{ fontSize: wp('4.5%'),textAlign:"center", fontWeight: "bold",color:"#567D46" }}>Number of TrashCans Collected per month</Text>
             <View style={styles.container2}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']} style={styles.head} textStyle={styles.text}/>
          <Rows data={[this.state.month]} textStyle={styles.text}/>
        </Table>
      </View> 
                          
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container2: { flex: 1, padding: 10, paddingTop: 10, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
