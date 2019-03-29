import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

export default class Home extends React.Component {
  state = {
    image:require('../assets/back.jpg'),
    daily_Target:[],
    daily_toachieve:0,
    daily_achieved:0,
    dailyperctange:0,
   
  }
tem =""
  componentWillMount() {

   // go to db and get one the user daily targets
    db.collection("User").doc("a@a.com").collection("Daily_targets")
    .onSnapshot(querySnapshot => {
      let daily_Target = []
      querySnapshot.forEach(doc => {
        daily_Target.push({ id: doc.id, ...doc.data() })
      })
      this.setState({ daily_Target })
      console.log("Current dailytarget: ", this.state.daily_Target.length)
    
    let daily_toachieve=0
    let daily_achieved=0

      daily_Target.map(m =>
        (
          daily_toachieve=parseInt(m.Target_todo),
          daily_achieved=parseInt(m.Target_achieved)
        )
      )
      let dailyperctange= (daily_toachieve/daily_achieved)*10
      this.setState({daily_toachieve,daily_achieved,dailyperctange})
    })
    //let temp = firebase.auth().currentUser.email
    //let temp="khalid@khalid.com"
    let temp="admin@admin.com"
        this.tem = temp
  }
  render() {
    // const currentuser=firebase.auth().currentUser.email
    const currentuser="1admin@admin.com"
    return (
      
      <View style={styles.container}>
       {this.tem!=="admin@admin.com"?
       <View>
         <Header
              backgroundColor="#567D46"
              placement="center"
          leftComponent={<Entypo name="mail" color="white" size={30} onPress={() => this.props.navigation.navigate('Inbox')}/>}
          centerComponent={{ text: 'Home', style: { color: '#fff',fontSize:25 } }}
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
                              percent={this.state.dailyperctange}
                              radius={wp('13%')}
                              borderWidth={12}
                              color="#3399FF"
                              shadowColor="#999"
                              bgColor="#fff"
                          >
                              <Text style={{ fontSize:wp('4.5%'), fontWeight: "bold" }}>{this.state.daily_achieved+"/"+this.state.daily_toachieve}</Text>
                          </ProgressCircle>
                    <Text style={{ fontSize: wp('4.5%'),textAlign:"center", fontWeight: "bold",color:"#567D46" }}>Weekly</Text>

                      </View>
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
                    <Text style={{ fontSize: wp('4.5%'),textAlign:"center", fontWeight: "bold",color:"#567D46" }}>Monthly</Text>
                      </View>
                      
                  </View>
                  <View style={{alignContent:"center",justifyContent:"center",flexDirection:"row",paddingVertical:50}}>
            <Text  style={{fontSize: hp('6%'), fontWeight:"bold",color:"#567D46"}}>
              Welcome
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
                         onPress={() => this.props.navigation.navigate('Inventory')}
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       <AntDesign name="layout" borderColor="blue" color="white" size={wp('5.5%')}/>
                       <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> Inventory List </Text>
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
                         onPress={() => this.props.navigation.navigate('Profile')}
                       >
                       <View style={{alignItems: 'center',justifyContent:"center"}}>
                       <MaterialIcons name="feedback" borderColor="blue" color="white" size={wp('5.5%')}/>
                       <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> Daily Feedback </Text>
                       </View>
                       </TouchableOpacity>

                       </View>
                  </ImageBackground>
                   </View>
      </View>: 
      // The Admin Home page
      <View>
      <Header
           backgroundColor="#567D46"
           placement="center"
       leftComponent={<Entypo name="mail" color="white" size={30} onPress={() => this.props.navigation.navigate('Inbox')}/>}
       centerComponent={{ text: 'Home', style: { color: '#fff',fontSize:25 } }}
       rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('NotificationMain')}/>}
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
                      onPress={() => this.props.navigation.navigate('Area')}
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
                      onPress={() => this.props.navigation.navigate('Ranking')}
                    >
                    <View style={{alignItems: 'center',justifyContent:"center"}}>
                    <AntDesign name="layout" borderColor="blue" color="white" size={wp('5.5%')}/>
                    <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> Employee Ranking and List </Text>
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
                      onPress={() => this.props.navigation.navigate('Profile')}
                    >
                    <View style={{alignItems: 'center',justifyContent:"center"}}>
                    <MaterialIcons name="history" borderColor="blue" color="white" size={wp('5.5%')}/>
                    <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> Feedback History </Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{flexDirection:"column",width:wp("22%"),
                      height:wp("22%") ,alignItems: 'center',justifyContent:"center",
                      backgroundColor: '#DDDDDD',
                      padding: 1,borderRadius:15,backgroundColor:"#567D46",borderColor:"white",borderWidth:2,borderStyle:"solid"
                    }}
                      onPress={() => this.props.navigation.navigate('Profile')}
                    >
                    <View style={{alignItems: 'center',justifyContent:"center"}}>
                    <MaterialCommunityIcons name="target" borderColor="blue" color="white" size={wp('5.5%')}/>
                    <Text style={{ fontSize: wp('3.5%'), fontWeight: "bold" ,color:"white",textAlign:"center"}}> Daily Target History </Text>
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
                     onPress={() => this.props.navigation.navigate('Profile')}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"black",
    flexDirection:"column"
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
