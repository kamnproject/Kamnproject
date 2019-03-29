import React from "react";
import { StyleSheet, Text, View, ScrollView,Button,Alert } from "react-native";
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


export default class Statatics extends React.Component {
  state={
    Inventory_History:[],
    tableData:[],
    imageURI :null
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
      uri=> this.setState({ imageURI : uri }),
      error => console.error("Oops, Something Went Wrong", error)
      
    );
    
  }
  uri=""
  upload=async()=>{
    const result=await uploadImageAsync("screenshotsbyadmin",this.state.imageURI,Math.random()*10000000)
    await db.collection('AdminScreenshots').doc().set({ url:result,category:"trashcan" })
    Alert.alert("Image Saved")
    console.log("URL",result)
    
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
  container2: { flex: 1, padding: 10, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
