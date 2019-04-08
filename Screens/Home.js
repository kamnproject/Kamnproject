import React from 'react';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import { Header } from 'react-native-elements';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Profile from './Profile'
import firebase from 'firebase'
import db from '../db.js'
import ProgressCircle from 'react-native-progress-circle'
import { TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import MainService from "../MainService";
import AnimatedLoader from 'react-native-animated-loader';
export default class Home extends React.Component {
constructor(){
  super();
  MainService.load(v=>this.setState({loaded:true}))
}
  state = {
    image:require('../assets/back.jpg'),
    daily_Target:[],
    daily_toachieve:0,
    daily_achieved:0,
    dailyperctange:0,
    monthly_toachieve:0,
    monthly_achieved:0,
    monthlyperctange:0,
   loaded:false
  }
tem ="a@a.com"
daily_target=[]
user=""
managerareaid=""
countemploee=[]
countstaff=0
countraash=[]
counttrashcan=0
name=""
  async componentWillMount() {

    areaid=0

      const querySnapshot = await db.collection("User").doc(firebase.auth().currentUser.email).get();
    //const querySnapshot = await db.collection("User").doc("a@a.com").get();
     //const querySnapshot = await db.collection("User").doc("admin@admin.com").get();

    
    this.user = querySnapshot.data().Role
    this.managerareaid= querySnapshot.data().Area_id
    this.name = querySnapshot.data().name
    console.log("Areaid"+this.user)

  this.countemploee= await db.collection('User').where("Area_id","==",this.managerareaid).get()  
  this.countraash= await db.collection('TrashCan').where("Area_id","==",this.managerareaid).get()
 
  await this.countraash.forEach(doc=> this.counttrashcan+=1)
  await this.countemploee.forEach(doc=> this.countstaff+=1)
     //console.log("Count of employees"+ this.countstaff)

     
    
   // go to db and get one the user daily targets
   db.collection("User").doc(firebase.auth().currentUser.email).collection("Daily_targets")
    .onSnapshot(querySnapshot => {
      let daily_Target = []
      querySnapshot.forEach(doc => {
        daily_Target.push({ id: doc.id, ...doc.data() })
      })
      this.setState({ daily_Target })
      this.daily_target=daily_Target
      console.log("Current dailytarget: ", this.state.daily_Target.length)
      this.dailytargetcal(daily_Target)
      this.monthlytarget(daily_Target)
   
    })



  }
  dailytargetcal=(daily_Target)=>{
    let daily_toachieve=0
    let daily_achieved=0
      let today= new Date().toDateString()
      console.log("today"+today)
      daily_Target.map(m =>
        m.id==today&&
        (
          console.log("Date",m.id),
          daily_toachieve=parseInt(m.Target_todo),
          daily_achieved=parseInt(m.Target_achieved)
        )
      )
      let dailyperctange= (daily_toachieve/daily_achieved)*10
      this.setState({daily_toachieve,daily_achieved,dailyperctange})

  }

  monthlytarget=(daily_Target)=>{

    let splitdate = new Date().toDateString().split(" ")
    let monthly_toachieve=0
    let monthly_achieved=0
    console.log("month"+splitdate[1])
    let month=splitdate[1]
        daily_Target.map((x,i)=>
        x.id.includes(month)&&
        (
          console.log("Date2",x.id),
          monthly_toachieve+=parseInt(x.Target_todo),
          monthly_achieved+=parseInt(x.Target_achieved)
        )
      
      
      )
      let monthlyperctange=(150/monthly_achieved)*10
      this.setState({monthly_toachieve,monthly_achieved,monthlyperctange})
      

  }
  render() {
    // const currentuser=firebase.auth().currentUser.email
    const currentuser="1admin@admin.com"

    return (
      
      <View style={styles.container}>
      {this.state.loaded?
      <View>
      
       {this.user==="Employee"&&
       <View>
         <Header
              backgroundColor="#567D46"
              placement="center"
          leftComponent={<Entypo name="mail" color="white" size={30} onPress={() => this.props.navigation.navigate('Inbox',{"areaid":this.managerareaid,"Role":this.user})}/>}
          centerComponent={{ text: 'Home', style: { color: '#fff',fontSize:25 }}}
          rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('NotificationMain')}/>}
        />
          <View style={{flexDirection:"row"}}>
          <ImageBackground source={this.state.image} style={{ height: hp('100%'),width:wp('100%')}}>
          <View style={{alignContent:"center",justifyContent:"center",flexDirection:"column",paddingTop:50}}>
           

                <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                    <View>
                          <ProgressCircle
                              percent={this.state.dailyperctange}
                              radius={wp('13%')}
                              borderWidth={12}
                              color="#3399FF"
                              shadowColor="#999"
                              bgColor="#fff"
                          >
                              <Text style={{ fontSize: wp('4.5%'), fontWeight: "bold" }}>{this.state.daily_achieved+"/"+this.state.daily_toachieve}</Text>
                          </ProgressCircle>
                    <Text style={{ fontSize: wp('4.5%'),textAlign:"center" ,fontWeight: "bold",color:"#567D46" }}>Daily</Text>

                      </View>
       
                      <View>
                          <ProgressCircle
                              percent={this.state.monthlyperctange}
                              radius={wp('13%')}
                              borderWidth={12}
                              color="#3399FF"
                              shadowColor="#999"
                              bgColor="#fff"
                          >
                              <Text style={{ fontSize: wp('4.5%'), fontWeight: "bold" }}>{this.state.monthly_achieved+"/"+"150"}</Text>
                          </ProgressCircle>
                    <Text style={{ fontSize: wp('4.5%'),textAlign:"center", fontWeight: "bold",color:"#567D46" }}>Monthly</Text>
                      </View>
                      
                  </View>
                  <View style={{alignContent:"center",justifyContent:"center",flexDirection:"row",paddingVertical:50}}>
            <Text  style={{fontSize: hp('6%'), fontWeight:"bold",color:"#567D46"}}>
             {"Welcome "+this.name}
              </Text>
           </View>
                  </View>
                  {/* The icons below */}
                  
                  <View style={{flexDirection:"row",justifyContent:"space-evenly",paddingBottom:hp("5%")}}>
                      

                       <TouchableOpacity
                         style={{flexDirection:"column",width:wp("22%"),
                         height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                         backgroundColor: '#DDDDDD',
                         padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                       }}
                         onPress={() => this.props.navigation.navigate('Ranking')}
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       <AntDesign name="profile" borderColor="blue" color="white" size={wp('5.5%')}/>
                       <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white"}}> Ranking </Text>
                       </View>
                       </TouchableOpacity>
     
                       <TouchableOpacity
                         style={{flexDirection:"column",width:wp("22%"),
                         height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                         backgroundColor: '#DDDDDD',
                         padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                       }}
                         onPress={() => this.props.navigation.navigate('EOM')}
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       <Entypo name="medal" borderColor="green" color="white" size={wp('5.5%')}/>
                       <Text style={{ fontSize: wp('4.5%'), fontWeight: "bold" ,color:"white"}}> EOM </Text>
                       </View>
                       </TouchableOpacity>

                       <TouchableOpacity
                         style={{flexDirection:"column",width:wp("22%"),
                         height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                         backgroundColor: '#DDDDDD',
                         padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                       }}
                       onPress={()=>this.props.navigation.navigate('createissue', {usere:this.tem})}
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       <AntDesign name="layout" borderColor="blue" color="white" size={wp('5.5%')}/>
                       <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> Contact Manager </Text>
                       </View>
                       </TouchableOpacity>

                  </View>
                  <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                      

                       <TouchableOpacity
                         style={{flexDirection:"column",width:wp("22%"),
                         height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                         backgroundColor: '#DDDDDD',
                         padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                       }}
                         onPress={() => this.props.navigation.navigate('Area')}
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       <Entypo name="shareable" borderColor="blue" color="white" size={wp('5.5%')}/>
                       <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white"}}> Area </Text>
                       </View>
                       </TouchableOpacity>

                       <TouchableOpacity
                         style={{flexDirection:"column",width:wp("22%"),
                         height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                         backgroundColor: '#DDDDDD',
                         padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                       }}
                         onPress={() => this.props.navigation.navigate('Feedback')}
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       <MaterialIcons name="feedback" borderColor="blue" color="white" size={wp('5.5%')}/>
                       <Text  style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> Daily Feedback </Text>
                       </View>
                       </TouchableOpacity>

                       </View>
                  </ImageBackground>
                   </View>
                      </View>} 
      {/* // The Admin Home page */}
      {
        this.user==="Admin"&&
      
      <View>
      <Header
           backgroundColor="#567D46"
           placement="center"
       leftComponent={<Entypo name="mail" color="white" size={30} onPress={() => this.props.navigation.navigate('Inbox',{"areaid":this.managerareaid,"Role":this.user})}/>}
       centerComponent={{ text: 'Home', style: { color: '#fff',fontSize:25 } }}
       rightComponent={<Entypo name="trash" borderColor="blue" color="white" size={wp('5.5%') }onPress={() => this.props.navigation.navigate('AdminTrashCanIssues')}/>}
     />

       <View style={{flexDirection:"row"}}>
       <ImageBackground source={this.state.image} style={{ height: hp('100%'),width:wp('100%')}}>
       <View style={{alignContent:"center",justifyContent:"center",flexDirection:"column"}}>
        <View style={{alignContent:"center",justifyContent:"center",flexDirection:"row",paddingTop:hp("10%")}}>
         <Text  style={{fontSize: hp('6%'), fontWeight: "bold",color:"#567D46"}}>
           Welcome Admin
           </Text>
          </View>

               
               </View>
               {/* The icons below */}
               
               <View style={{flexDirection:"row",justifyContent:"space-evenly", paddingTop:hp("10%")}}>
                   

                    <TouchableOpacity
                      style={{flexDirection:"column",width:wp("22%"),
                      height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                      backgroundColor: '#DDDDDD',
                      padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                    }}
                      onPress={() => this.props.navigation.navigate('AdminStatatics')}
                    >
                    <View style={{alignItems: 'center',justifyContent:"center"}}>
                    <AntDesign name="profile" borderColor="blue" color="white" size={wp('5.5%')}/>
                    <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white"}}> Statistics </Text>
                    </View>
                    </TouchableOpacity>
  
                    <TouchableOpacity
                      style={{flexDirection:"column",width:wp("22%"),
                      height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                      backgroundColor: '#DDDDDD',
                      padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                    }}
                      onPress={() => this.props.navigation.navigate('Area',{role:this.user})}
                    >
                    <View style={{alignItems: 'center',justifyContent:"center"}}>
                    <Entypo name="shareable" borderColor="blue" color="white" size={wp('5.5%')}/>
                    <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> List of Areas </Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{flexDirection:"column",width:wp("22%"),
                      height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                      backgroundColor: '#DDDDDD',
                      padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                    }}
                      onPress={() => this.props.navigation.navigate('Ranking',{"role":this.user})}
                    >
                    <View style={{alignItems: 'center',justifyContent:"center"}}>
                    <AntDesign name="layout" borderColor="blue" color="white" size={wp('5.5%')}/>
                    <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}>Ranking</Text>
                    </View>
                    </TouchableOpacity>

               </View>
               <View style={{flexDirection:"row",justifyContent:"space-evenly",paddingTop:hp("5%")}}>
               <TouchableOpacity
                      style={{flexDirection:"column",width:wp("22%"),
                      height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                      backgroundColor: '#DDDDDD',
                      padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                    }}
                      onPress={() => this.props.navigation.navigate('ListofManagers',{"role":this.user,"areaid":this.areaid})}
                    >
                    <View style={{alignItems: 'center',justifyContent:"center"}}>
                    <Ionicons name="md-person-add" borderColor="blue" color="white" size={wp('5.5%')}/>
                    <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}>List of Managers </Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{flexDirection:"column",width:wp("22%"),
                      height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                      backgroundColor: '#DDDDDD',
                      padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                    }}
                      onPress={() => this.props.navigation.navigate('FormScreen',{"role":this.user})}
                    >
                    <View style={{alignItems: 'center',justifyContent:"center"}}>
                    <Ionicons name="md-person-add" borderColor="blue" color="white" size={wp('5.5%')}/>
                    <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}>Notify All</Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{flexDirection:"column",width:wp("22%"),
                      height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                      backgroundColor: '#DDDDDD',
                      padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                    }}
                      onPress={() => this.props.navigation.navigate('Register')}
                    >
                    <View style={{alignItems: 'center',justifyContent:"center"}}>
                    <Ionicons name="md-person-add" borderColor="blue" color="white" size={wp('5.5%')}/>
                    <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}>Create New Employee </Text>
                    </View>
                    </TouchableOpacity>


                </View>
                <View style={{flexDirection:"row",justifyContent:"space-evenly",paddingTop:hp("4%")}}>
                   

                   <TouchableOpacity
                     style={{flexDirection:"column",width:wp("22%"),
                     height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                     backgroundColor: '#DDDDDD',
                     padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                   }}
                     onPress={() => this.props.navigation.navigate('CollectedTrashes')}
                   >
                   <View style={{alignItems: 'center',justifyContent:"center"}}>
                   <Entypo name="trash" borderColor="blue" color="white" size={wp('5.5%')}/>
                   <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> Collected TrashCan History </Text>
                   </View>
                   </TouchableOpacity>

                   <TouchableOpacity
                     style={{flexDirection:"column",width:wp("22%"),
                     height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                     backgroundColor: '#DDDDDD',
                     padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                   }}
                     onPress={() => this.props.navigation.navigate('Inventory')}
                   >
                   <View style={{alignItems: 'center',justifyContent:"center"}}>
                   <MaterialIcons name="feedback" borderColor="blue" color="white" size={wp('5.5%')}/>
                   <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> Inventory Requests </Text>
                   </View>
                   </TouchableOpacity>
                   <TouchableOpacity
                     style={{flexDirection:"column",width:wp("22%"),
                     height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                     backgroundColor: '#DDDDDD',
                     padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                   }}
                     onPress={() => this.props.navigation.navigate('EOM')}
                   >
                   <View style={{alignItems: 'center',justifyContent:"center"}}>
                   <Entypo name="medal" borderColor="green" color="white" size={wp('5.5%')}/>
                   <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> EOM </Text>
                   </View>
                   </TouchableOpacity>

                   </View>
                   
               </ImageBackground>
               </View>
   </View>
    
    
    }
    {
      this.user==="Manager"&&
      <View>
      <Header
           backgroundColor="#567D46"
           placement="center"
       leftComponent={<Entypo name="mail" color="white" size={30} onPress={() => this.props.navigation.navigate('Inbox',{"areaid":this.managerareaid,"Role":this.user})}/>}
       centerComponent={{ text: 'Home', style: { color: '#fff',fontSize:25 } }}
       rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('NotificationMain')}/>}
     />
       <View style={{flexDirection:"row"}}>
       <ImageBackground source={this.state.image} style={{ height: hp('100%'),width:wp('100%')}}>
       <View style={{alignContent:"center",justifyContent:"center",flexDirection:"column",paddingTop:50}}>
        

             <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                 <View>
                       <ProgressCircle
                           percent={100}
                           radius={wp('13%')}
                           borderWidth={12}
                           color="#3399FF"
                           shadowColor="#999"
                           bgColor="#fff"
                       >
                           <Text style={{ fontSize: wp('4.5%'), fontWeight: "bold" }}>{this.counttrashcan}</Text>
                       </ProgressCircle>
                 <Text style={{ fontSize: wp('4.5%'),textAlign:"center" ,fontWeight: "bold",color:"#567D46" }}>No of TrashCans</Text>

                   </View>

                   <View>
                       <ProgressCircle
                           percent={100}
                           radius={wp('13%')}
                           borderWidth={12}
                           color="#3399FF"
                           shadowColor="#999"
                           bgColor="#fff"
                       >
                           <Text style={{ fontSize: wp('4.5%'), fontWeight: "bold" }}>{this.countstaff}</Text>
                       </ProgressCircle>
                 <Text style={{ fontSize: wp('4.5%'),textAlign:"center", fontWeight: "bold",color:"#567D46" }}>No of Employees</Text>
                   </View>
                   
               </View>
               <View style={{alignContent:"center",justifyContent:"center",flexDirection:"row",paddingVertical:50}}>
         <Text  style={{fontSize: hp('6%'), fontWeight:"bold",color:"#567D46",textAlign:"center"}}>
           Welcome Manager
           </Text>
        </View>
               </View>
               {/* The icons below */}
               
               <View style={{flexDirection:"row",justifyContent:"space-evenly",paddingBottom:hp("5%")}}>
                   

                    <TouchableOpacity
                      style={{flexDirection:"column",width:wp("22%"),
                      height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                      backgroundColor: '#DDDDDD',
                      padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                    }}
                      onPress={() =>this.props.navigation.navigate("MyEmployee",{areaid:this.managerareaid,role:this.user})}
                    >
                    <View style={{alignItems: 'center',justifyContent:"center"}}>
                    <AntDesign name="profile" borderColor="blue" color="white" size={wp('5.5%')}/>
                    <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> My Employee </Text>
                    </View>
                    </TouchableOpacity>
  
                    <TouchableOpacity
                      style={{flexDirection:"column",width:wp("22%"),
                      height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                      backgroundColor: '#DDDDDD',
                      padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                    }}
                      onPress={() => this.props.navigation.navigate('EOM')}
                    >
                    <View style={{alignItems: 'center',justifyContent:"center"}}>
                    <Entypo name="medal" borderColor="green" color="white" size={wp('5.5%')}/>
                    <Text style={{ fontSize: wp('4.5%'), fontWeight: "bold" ,color:"white"}}> EOM </Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{flexDirection:"column",width:wp("22%"),
                      height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                      backgroundColor: '#DDDDDD',
                      padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                    }}
                      onPress={() => this.props.navigation.navigate('Inventory')}
                    >
                    <View style={{alignItems: 'center',justifyContent:"center"}}>
                    <AntDesign name="layout" borderColor="blue" color="white" size={wp('5.5%')}/>
                    <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> My Area Inventory List </Text>
                    </View>
                    </TouchableOpacity>

               </View>
               <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                     
               <TouchableOpacity
                      style={{flexDirection:"column",width:wp("22%"),
                      height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                      backgroundColor: '#DDDDDD',
                      padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                    }}
                      onPress={() => this.props.navigation.navigate('TargetUnacheived',{areaid:this.managerareaid})}
                    >
                    <View style={{alignItems: 'center',justifyContent:"center"}}>
                    <Entypo name="medal" borderColor="green" color="white" size={wp('5.5%')}/>
                    <Text style={{ fontSize: wp('4.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> Daily Target </Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{flexDirection:"column",width:wp("22%"),
                      height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                      backgroundColor: '#DDDDDD',
                      padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                    }}
                      onPress={() => this.props.navigation.navigate('ContactAdmin',{"usere":"amanager@manger.com"})}
                    >
                    <View style={{alignItems: 'center',justifyContent:"center"}}>
                    <Entypo name="shareable" borderColor="blue" color="white" size={wp('5.5%')}/>
                    <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> Contact Admin </Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{flexDirection:"column",width:wp("22%"),
                      height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                      backgroundColor: '#DDDDDD',
                      padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                    }}
                      onPress={() => this.props.navigation.navigate('Feedback',{"areaid":this.managerareaid,"Role":this.user})}
                    >
                    <View style={{alignItems: 'center',justifyContent:"center"}}>
                    <MaterialIcons name="feedback" borderColor="blue" color="white" size={wp('5.5%')}/>
                    <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> Feedback </Text>
                    </View>
                    </TouchableOpacity>

                    </View>
               </ImageBackground>
                </View>
                   </View>
    }
    
    </View>:
   <View style={[styles.container, styles.horizontal]}>
   <ActivityIndicator size="large" color="#567D46" />
   </View>
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor:"black",
    flexDirection:"column"
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  container2: {
    flex: 1,
    backgroundColor:"white",
    flexDirection:"column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
