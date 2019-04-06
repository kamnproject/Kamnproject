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
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import firebase from "firebase";
import db from "../db.js";
import _ from "lodash";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class InventoryRequest extends React.Component {
  state = {
    users: [],
    Requestlist:[],
    Inventory:[],
    lessinventory:[]
  
  };
  Role=""
  areaid=""
  async componentWillMount() {
    const querySnapshot = await db.collection("User").doc(firebase.auth().currentUser.email).get();
    //const querySnapshot = await db.collection("User").doc("a@a.com").get();
     //const querySnapshot = await db.collection("User").doc("admin@admin.com").get();
    
    this.Role = querySnapshot.data().Role
    this.areaid= querySnapshot.data().Area_id
    if(this.Role!="Admin"){

      db.collection("User").onSnapshot(querySnapshot =>   { 
        querySnapshot.forEach(doc => {
          if(doc.id==this.currentuser){
            oneuser=doc.data().Area_id
          }
  
        }
      );
      db.collection("Inventory").where("Area_id","==",this.areaid).onSnapshot(querySnapshot => {
        let users = [];
        querySnapshot.forEach(doc => {
          users.push({ id: doc.id, ...doc.data() });
        });

        this.setState({ users: users });
        console.log("users", this.state.users.length);
      });

      }
    
    );

    }
    else{
      
     this.LessInventorycount()
      this.ListInventoryHistory()
      }

    }
    
    LessInventorycount=async ()=>{

      let lessinventory = [];
      db.collection("Inventory").where("Quantity","<",10).onSnapshot(querySnapshot => {
        
        querySnapshot.forEach(doc => {
          lessinventory.push({ id: doc.id, ...doc.data() });
        });

        this.setState({ lessinventory: lessinventory });
        console.log("lessinventory", this.state.lessinventory.length);
      });
      console.log("Area_id", lessinventory);
    }
    lessinventorylistloop = (item,i) => {

      return (
        <ListItem // key={i}
          title={item.Item_name}
          subtitle={
            "Current Quantity: " +
            item.Quantity +
            "\n"+
            "Area: "+item.Area_id

            
          }
          titleStyle={{ textAlign: "left" }}
          subtitleStyle={{ textAlign: "left" }}
          leftAvatar={
              <Avatar
              rounded
              title={i+1+""}
              size="medium"
              placeholderStyle={backgroundColor="red"}
            />
  
          }
          rightAvatar={

          <TouchableOpacity
        style={{width:wp("30%"),
        height:wp("10%"),float:"right",backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",borderRadius:10,alignItems: 'center',justifyContent:"center"
      }}
      onPress={()=>this.addinventory(item)}
        
      >
      <View style={{alignItems: 'center',justifyContent:"center"}}>
      {/* <AntDesign name="profile" borderColor="blue" color="white" size={wp('5.5%')}/> */}
      <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}>Supply</Text>
      
      </View>
      </TouchableOpacity>
          
          }
  
        />
      );
    };
    addinventory=async (item)=>{
      
      let temp=[]
  
      await db.collection('Inventory').doc(item.id).update({Quantity:20})
      Alert.alert("Added")
      this.LessInventorycount()
    }
  
    // go to db and get one the user daily targets
   

  

 ListInventoryHistory=async()=>{
  db.collection("Inventory_History").where("Type","==","Requesting").onSnapshot(querySnapshot =>   { 
    let Requestlist = [];
    querySnapshot.forEach(doc => {
        Requestlist.push({ id: doc.id, ...doc.data() });
    });
    this.setState({ Requestlist: Requestlist });
});
console.log("Lenght", this.state.Requestlist.length);
db.collection("Inventory").onSnapshot(querySnapshot => {
  let Inventory = [];
  querySnapshot.forEach(doc => {
    Inventory.push({ id: doc.id, ...doc.data() });
  });

  this.setState({ Inventory: Inventory });
  console.log("Inventory", this.state.Inventory.length);
})

 }

  listloop = (item,i) => {

    return (
      <ListItem // key={i}
        title={item.Item_name}
        subtitle={
          "Quantity: " +
          item.Quantity 
          
        }
        titleStyle={{ textAlign: "left" }}
        subtitleStyle={{ textAlign: "left" }}
        leftAvatar={
            <Avatar
            rounded
            title={i+1+""}
            size="medium"
            placeholderStyle={backgroundColor="red"}
          />

        }
        rightAvatar={
  
        <TouchableOpacity
        style={{width:wp("30%"),
        height:wp("10%"),float:"right",backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",borderRadius:10,alignItems: 'center',justifyContent:"center"
      }}
      onPress={() => this.props.navigation.navigate("Requestform",{item:item})}
        
      >
      <View style={{alignItems: 'center',justifyContent:"center"}}>
      {/* <AntDesign name="profile" borderColor="blue" color="white" size={wp('5.5%')}/> */}
      <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}>Request</Text>
      
      </View>
      </TouchableOpacity>
        }

      />
    );
  };

  adminlistloop = (item,i) => {
    let name=""
    this.state.Inventory.map(x=>x.id===item.Inventory_id?name=x.Item_name:null)
    let areaid=""
    this.state.Inventory.map(x=>(x.id===item.Inventory_id)?areaid=x.Area_id:"")
    return (
      <ListItem // key={i}
        title={"Name: "+name}
        subtitle={
          "Requested By: " +
          item.Employee_id
          +"\n" 
          +"Date_Time:"+
          item.Date_time+
          "\n" +
          "Area_id: "+areaid
         +
          "\n" +
          "Purpose:"+
          item.Purpose +
          "\n" +
          "Quantity Requested:"+item.Quantity
          
        }
        titleStyle={{ textAlign: "left" }}
        subtitleStyle={{ textAlign: "left" }}
       
        rightAvatar={
        <TouchableOpacity
                         style={{width:wp("20%"),
                         height:wp("10%"),float:"right",backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",borderRadius:10,alignItems: 'center',justifyContent:"center"
                       }}
                       onPress={() => this.handleRequest(item)}
                         
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       {/* <AntDesign name="profile" borderColor="blue" color="white" size={wp('5.5%')}/> */}
                       <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> Supply</Text>
                       
                       </View>
                       </TouchableOpacity>
        }

      />
      
    );
  };

  handleRequest=async (item)=>{
    let changeditem= item
    changeditem.Type="Supplied"
    await db.collection('Inventory_History').doc(item.id).set({Date_time:changeditem.Date_time,
      Employee_id:changeditem.Employee_id,Inventory_id:changeditem.Inventory_id,Purpose:changeditem.Purpose,
      Quantity:changeditem.Quantity,Type:changeditem.Type})
    
    let temp=[]

    this.state.Inventory.map(x=>x.id===item.Inventory_id?(temp=x):null)
    temp.Quantity= parseInt(temp.Quantity)+parseInt(item.Quantity)
    await db.collection('Inventory').doc(temp.id).set({
      Area_id:temp.Area_id,Item_id:temp.Item_id,Item_name:temp.Item_name,Quantity:temp.Quantity})

      this.ListInventoryHistory()
    }
  

  render() {
    return (
      
      <View style={styles.container}>
        {/* <Text>Ranking</Text> */}

        {this.Role=="Manager"&&
        <View>
        <View style={{flexDirection:"row",paddingLeft:20}}>
         <Text style={{ fontSize: 18, fontWeight: "bold",textAlign:"center"  }}>Inventory Request </Text>

         </View>
          {this.state.users.map((item, i) => (
            <View key={i}>
              {this.listloop(item,i)}
              <Divider style={{ backgroundColor: "black", height: 1 }} />
            </View>
          ))}
          </View>
          
        }
         {this.Role=="Employee"?
         <View style={{flexDirection:"row",paddingLeft:20}}>
         <Text style={{ fontSize: 18, fontWeight: "bold",textAlign:"center"  }}>All the Requests are made by your area Manager. Pls Contact him. </Text>

         </View>


        :this.Role=="Admin"&&<View>
<View style={{flexDirection:"row-reverse"}}>
                       <TouchableOpacity
                         style={{width:wp("30%"),
                         height:wp("10%"),float:"right",backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid",borderRadius:10,alignItems: 'center',justifyContent:"center"
                       }}
                       onPress={()=>this.props.navigation.navigate("SuppliedHistory")}
                         
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       {/* <AntDesign name="profile" borderColor="blue" color="white" size={wp('5.5%')}/> */}
                       <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> Supplied Items History</Text>
                       
                       </View>
                       </TouchableOpacity>
</View>

          <View style={{height:"50%",borderColor:"#567D46",borderWidth:2,borderRadius:15,borderStyle:"solid",margin:2}}>
        <ScrollView >
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
         <Text style={{ fontSize: 18, fontWeight: "bold",textAlign:"center"  }}>Requested By Employees   </Text>
          
         </View>
   
          {this.state.Requestlist.length>0?
          this.state.Requestlist.map((item, i) =>(
            <View key={i}>
              {this.adminlistloop(item,i)}
              <Divider style={{ backgroundColor: "black", height: 1 }} />
            </View>
          )):<Text>No Requests For You</Text>}
          </ScrollView>
          </View>
          <View style={{height:"50%",borderColor:"#567D46",borderWidth:2,borderRadius:15,borderStyle:"solid",margin:2}}>
          <ScrollView >
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
         <Text style={{ fontSize: 18, fontWeight: "bold",textAlign:"center"  }}>Inventory Below 10 in count   </Text>
          
         </View>
            {this.state.lessinventory.length>0?
              this.state.lessinventory.map((item, i) =>(
                <View key={i}>
                  {this.lessinventorylistloop(item,i)}
                  <Divider style={{ backgroundColor: "black", height: 1 }} />
                </View>
              )):<Text>No Items less than 10</Text>}
            </ScrollView>
            </View>
        </View>
        }
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
