import React from "react";
import { StyleSheet, Text, View, ScrollView,Button,Image , Platform,CameraRoll,FileSystem,Alert  } from "react-native";
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
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import firebase from "firebase";
import db from "../db.js";
import _ from "lodash";
import { Table, Row, Rows } from 'react-native-table-component';
import { Dimensions } from 'react-native'
import { captureScreen } from "react-native-view-shot";
import { uploadImageAsync } from '../ImageUtils.js'
const screenWidth = Dimensions.get('window').width
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2 // optional, default 3
}


const data3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    data: [ 20, 45, 28, 80, 99, 43 ]
  }]
}

export default class StataticsInventory extends React.Component {
  state={
    Inventory_History:[],
    tableData:[],
    imageURI :"sd"
  }
  Inventory_History=[]
  tableData= [
   
  ]
  inventort_info=[]
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
      //callback function to get the result URL of the screnshot

      // ,
      uri=> this.setState({ imageURI : uri }),
      
    
      error => console.error("Oops, Something Went Wrong", error)
      
    );
    
  }
  uri=""
  upload=async()=>{
    const result=await uploadImageAsync("screenshotsbyadmin",this.state.imageURI,Math.random()*10000000)
    await db.collection('AdminScreenshots').doc().set({ url:result,category:"inventory" })
    Alert.alert("Image Saved")
    console.log("URL",result)
    
  }
componentDidMount=async ()=>{
  
  //let email = "khalid@khalid.com"
  await db.collection("Inventory_History").where("Type","==","Supplied").onSnapshot(async querySnapshot =>  {
    let Inventory_History = [];
    let inventort_info=[];
    querySnapshot.forEach(doc => {
      Inventory_History.push({ id: doc.id, ...doc.data() });
      inventort_info.push(
        {
          date:doc.data().Date_time,
          inventory_id:doc.data().Inventory_id
        }
      )
    });
    //let list = this.orderlist(users);
    this.Inventory_History=Inventory_History
    this.inventort_info=inventort_info
    //console.log("Inventory Info",this.inventort_info)
    //await this.permonth1()
    this.permont=[0,0,0,0,0,0]
    this.maketable()
    this.inventort_infotest()
    //this.inventort_info=[]
    this.setState({ Inventory_History: Inventory_History });
    //this.setState({ filtereddata: list });
    
    console.log("users", this.state.Inventory_History.length);
  });

  


}
maketable=async()=>{
  
  await db.collection("Area").onSnapshot(querySnapshot => {
    let Area = [];
    
    querySnapshot.forEach(doc => {
      Area.push([doc.id,doc.data().Name,0,0,0,0,0,0] );
    });
    //let list = this.orderlist(users);
    this.tableData=Area
    //this.tableData[0][1]=10
    // this.permont=[0,0,0,0,0,0]
    this.permonth1()
    this.setState({ tableData: Area });
    //this.setState({ filtereddata: list });
    
    console.log("tableData", this.state.tableData.length);
  });
 


}
componentWillUnmount(){
  this.setState({tableData:[]})
}
perareainventorycount=()=>{
  let temp =this.state.tableData
  // temp[0][1]=10
  // temp[0][2]=9
  j=0
  let date=""
  temp.map((x,i)=>
 this.givevalue(x)
 //console.log(x)
   

)
  this.setState({tableData:temp})
}

givevalue=(array)=>{
let array1= array
let id=array1[0]


this.areainfo.map((x,i)=>(
date=""+x.date,
x.area_id==id&&date.includes("Jan")?array[2]++:x.area_id==id&&date.includes("Feb")?array[3]++:x.area_id==id&&date.includes("Mar")?array[4]++:x.area_id==id&&date.includes("Apr")?array[5]++:x.area_id==id&&date.includes("May")?array[6]++:x.area_id==id&&date.includes("Jun")?array[7]++:null
))

}

inventort_infotest=async ()=>{
  //console.log("Inventory Info",this.inventort_info)
  await this.inventort_info.map(async (x,i)=>
  await this.areaissuecount(x)

)


}
areainfo=[]
areaissuecount=async (x)=>{

  await db.collection("Inventory").where(firebase.firestore.FieldPath.documentId(),"==",x.inventory_id).onSnapshot(async querySnapshot => {
    //let Areaid = [];
    querySnapshot.forEach( doc => {
      this.areainfo.push({ 
        area_id: doc.data().Area_id,
        inventory_id:x.inventory_id,
         date:x.date });
    });
   // console.log("Before Area1",this.areainfo)
    this.perareainventorycount()
    
    this.areainfo=[]
    //console.log("After Area1",this.areainfo)
    //this.areaid
    //this.areainfo.sort(area_id)
    
     
    
  }


);
//this.perareainventorycount()
  //console.log("Area",this.areainfo)
  
}

collectedata={
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    data:[0]
  }]
}
permont=[0,0,0,0,0,0]
month=(x)=>{
  date="" +x.Date_time
  //console.log("Inside",date)
if(date.includes("Jan")){
  this.permont[0]++
}
else if(date.includes("Feb")){
  this.permont[1]++
}
else if(date.includes("Mar")){
  this.permont[2]++
  //console.log("March Count",this.permont[2])
}
else if(date.includes("Apr")){
  this.permont[3]++
  //console.log("March Count",this.permont[2])
}
else if(date.includes("May")){
  this.permont[4]++
  //console.log("March Count",this.permont[2])
}
else if(date.includes("Jun")){
  this.permont[5]++
  //console.log("March Count",this.permont[2])
}
else{
 // console.log("Areadate",date,x)
}
//this.Inventory_History=[]
}
permonth1= ()=>{
  
//console.log("perMonth")
   this.Inventory_History.map((x,i)=>
    this.month(x)

)

}

  render() {
    
    return (
      <View style={styles.container}>
      <View>
        <Button title="Take Screenshot" onPress={this.takeScreenShot} />
        <Text>{""}</Text>
        <Button title="Save to Gallery" onPress={this.upload} />
        </View>
        <ScrollView>
       
        <View>
          {/* {
            this.state.Inventory_History.map((x,i)=>
          <Text>asas{x.Date_time.toString()}</Text>
          )
          } */}
  <Text>
    Total Inventory Requests per Month for 6 months 
  </Text>
  {/* {
    this.permont.map((x,i)=><Text>{x}</Text>)
  }
  <Text>GHSAJSHS</Text>
  {this.Inventory_History.map((x,i)=><Text>{x.Purpose}</Text>)} */}
  <LineChart
    data={{
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data:this.permont
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={220}
    yAxisLabel={''}
    xAxisLabel={''}
    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
<View style={styles.container2}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']} style={styles.head} textStyle={styles.text}/>
          <Rows data={[this.permont]} textStyle={styles.text}/>
        </Table>
      </View> 
      <Text>
    Total Inventory Requests per Area per Month
  </Text>
    {/* <BarChart
      //style={graphStyle}
      data={data3}
      width={screenWidth}
      height={220}
      yAxisLabel={''}
      chartConfig={chartConfig}
    /> */}
 <View style={styles.container2}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={['Id','Area ','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']} style={styles.head} textStyle={styles.text}/>
          <Rows data={this.tableData} textStyle={styles.text}/>
        </Table>
      </View>  
  {/* {this.areainfo.map((x,i)=><Text>{x.date}////{x.inventory_id}////{x.area_id}</Text>)}
  <Text style={{fontSize:20}}>Click on Button Below to Take ScreenShot</Text>
  <Text>{this.state.imageURI} </Text> */}
          {/* <Image 
              source={{uri : this.state.imageURI}} 
              style={{width: 200, height: 300, resizeMode: 'contain', marginTop: 5}} /> */}
          
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
  container2: { flex: 1, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 5 }
});
