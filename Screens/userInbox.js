// import React from 'react';
// import { StyleSheet, Text, View, TextInput, Button, ScrollView , TouchableOpacity} from 'react-native';
// import { Header, Overlay,SearchBar,Card } from 'react-native-elements';
// import Entypo from '@expo/vector-icons/Entypo';
// import firebase, { firestore } from 'firebase'
// import db from '../db.js'
// import Ionicons from '@expo/vector-icons/Ionicons';
// import Octicons from '@expo/vector-icons/Octicons';
// import Icon from 'react-native-vector-icons/FontAwesome'
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import Foundation from '@expo/vector-icons/Foundation';
// import { FlatList, ListItem, Divider,Badge, } from 'react-native-elements'
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import _ from "lodash";
// var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// export default class Userinbox extends React.Component {
//     state = {
//         issues: [],
//         User_issues: [],
//         name: "",
//         message: "",
//         reply:"",
//         namee:[],
//         search:"",
//         filtereddata:[]

//     }
//     users = []
//     User_issue = []
//     tem = ""
//     constructor(args) {
//         super(args);
        
//         // Assign unique IDs to the emails
//         const emails = this.props.emails;
//         let id = 0;
//         for (const email of emails) {
//             email.id = id++;
//         }
        
//         this.state = {
//             selectedEmailId: 0,
//             currentSection: 'inbox',
//             emails
//         };
//     }
    
//     openEmail(id) {
//         const emails = this.state.emails;
//         const index = emails.findIndex(x => x.id === id);
//         emails[index].read = 'true';
//         this.setState({
//             selectedEmailId: id,
//             emails
//         });
//     }
    
//     deleteMessage(id) {
//         // Mark the message as 'deleted'
//         const emails = this.state.emails;
//         const index = emails.findIndex(x => x.id === id);
//         emails[index].tag = 'deleted';
        
//         // Select the next message in the list
//         let selectedEmailId = '';
//         for (const email of emails) {
//             if (email.tag === this.state.currentSection) {
//                 selectedEmailId = email.id;
//                 break;
//             }
//         }
        
//         this.setState({
//             emails,
//             selectedEmailId
//         });
//     }
    
//     setSidebarSection(section) {
//         let selectedEmailId = this.state.selectedEmailId;
//         if (section !== this.state.currentSection) {
//             selectedEmailId = '';
//         }
        
//         this.setState({
//             currentSection: section,
//             selectedEmailId
//         });
//     }
    
//     render() {
//         const currentEmail = this.state.emails.find(x => x.id === this.state.selectedEmailId);
//         return (
//             <div>
//                 <Sidebar
//                     emails={this.props.emails}
//                     setSidebarSection={(section) => { this.setSidebarSection(section); }} />
//                 <div className="inbox-container">
//                     <EmailList
//                         emails={this.state.emails.filter(x => x.tag === this.state.currentSection)}
//                         onEmailSelected={(id) => { this.openEmail(id); }}
//                         selectedEmailId={this.state.selectedEmailId}
//                         currentSection={this.state.currentSection} />
//                     <EmailDetails
//                         email={currentEmail}
//                         onDelete={(id) => { this.deleteMessage(id); }} />
//                 </div>
//             </div>
//         )
//     }
// }

// /* Sidebar */
// const Sidebar = ({ emails, setSidebarSection }) => {
//     var unreadCount = emails.reduce(
//         function(previous, msg) {
//             if (msg.read !== "true" ) {
//                 return previous + 1;
//             }
//             else {
//                 return previous;
//             }
//         }.bind(this), 0);

//     var deletedCount = emails.reduce(
//         function(previous, msg) {
//             if (msg.tag === "deleted") {
//                 return previous + 1;
//             }
//             else {
//                 return previous;
//             }
//         }.bind(this), 0);

//     return (
//         <div id="sidebar">
//             <div className="sidebar__compose">
//                 <a href="#" className="btn compose">
//                     Compose <span className="fa fa-pencil"></span>
//                 </a>
//             </div>
//             <ul className="sidebar__inboxes">
//                 <li onClick={() => { setSidebarSection('inbox'); }}><a>
//                     <span className="fa fa-inbox"></span> Inbox
//                     <span className="item-count">{unreadCount}</span></a></li>
//                 <li onClick={() => { setSidebarSection('sent'); }}><a>
//                     <span className="fa fa-paper-plane"></span> Sent
//                     <span className="item-count">0</span></a></li>
//                 <li onClick={() => { setSidebarSection('drafts'); }}><a>
//                     <span className="fa fa-pencil-square-o"></span> Drafts
//                     <span className="item-count">0</span>
//                     </a></li>
//                 <li onClick={() => { setSidebarSection('deleted'); }}><a>
//                     <span className="fa fa-trash-o"></span> Trash
//                     <span className="item-count">{deletedCount}</span>
//                     </a></li>
//             </ul>
//         </div>
//     );
// };

// /* Email classes */
// const EmailListItem = ({ email, onEmailClicked, selected }) => {
//     let classes = "email-item";
//     if (selected) {
//         classes += " selected"
//     }
        
//     return (
//         <div onClick={() => { onEmailClicked(email.id); }} className={classes}>
//             <div className="email-item__unread-dot" data-read={email.read}></div>
//             <div className="email-item__subject truncate">{email.subject}</div>
//             <div className="email-item__details">
//                 <span className="email-item__from truncate">{email.from}</span>
//                 <span className="email-item__time truncate">{getPrettyDate(email.time)}</span>
//             </div>
//         </div>
//     );
// }

// const EmailDetails = ({ email, onDelete }) => {
//     if (!email) {
//         return (
//             <div className="email-content empty"></div>
//         );
//     }
    
//     const date =" `${getPrettyDate(email.time)} · ${getPrettyTime(email.time)}`";
    
//     const getDeleteButton = () => {
//         if (email.tag !== 'deleted') {
//             return <span onClick={() => { onDelete(email.id); }} className="delete-btn fa fa-trash-o"></span>;
//         }
//         return undefined;
//     }

//     return (
//         <div className="email-content">
//             <div className="email-content__header">
//                 <h3 className="email-content__subject">{email.subject}</h3>
//                 {getDeleteButton()}
//                 <div className="email-content__time">{date}</div>
//                 <div className="email-content__from">{email.from}</div>
//             </div>
//             <div className="email-content__message">{email.message}</div>
//         </div>
//     );
// };

// /* EmailList contains a list of Email components */
// const EmailList = ({ emails, onEmailSelected, selectedEmailId }) => {
//     if (emails.length === 0) {
//         return (
//             <div className="email-list empty">
//                 Nothing to see here, great job!
//             </div>
//         );
//     }
    
//     return (
//         <div className="email-list">
//             {
//                 emails.map(email => {
//                     return (
//                         <EmailListItem
//                             onEmailClicked={(id) => { onEmailSelected(id); }}
//                             email={email}
//                             selected={selectedEmailId === email.id} />
//                     );
//                 })
//             }
//         </div>
//     );
// };

// // Render
// $.ajax({url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/311743/dummy-emails.json',
//     type: 'GET',
//     success: function(result) {
//         React.render(<App emails={result} />, document.getElementById('inbox'));
//     }
// }); 


// // Helper methods
// const getPrettyDate = (date) => {
//     date = date.split(' ')[0];
//     const newDate = date.split('-');
//     const month = months[0];
//     return "`${month} ${newDate[2]} ${newDate[0]}`";
// }

// // Remove the seconds from the time
// const getPrettyTime = (date) => {
//     const time = date.split(' ')[1].split(':');
//     return "${time[0]}:${time[1]}";
// }
    
// // //    {firebase.auth().currentUser.email === "admin@admin.com"?dfgedf:null}
// // //     componentWillMount() {
// // //         // go to db and get all the users
       
// // //         db.collection("User").onSnapshot(querySnapshot => {

// // //             this.users = []

// // //             querySnapshot.forEach(doc => {

// // //                 this.users.push({
// // //                     id: doc.id, ...doc.data()
// // //                 })

// // //             })
// // //             this.setState({ users: this.users })

// // //             console.log("Current users: ",
// // //                 this.users)
// // //             // console.log("Current admin: ", firebase.auth().currentUser.email)
// // //             // let temp = firebase.auth().currentUser.email
// // //              let temp ="admin@admin.com"
// // //             // let temp ="a@a.com"
// // //         this.tem = temp
            
// // //             console.log("Current temp: ", temp)
            
// // //             this.tem=== "admin@admin.com"? <div>
// // //             {
// // //                 this.state.users.map((item, i)=>{
// // //             db.collection(`User/${item.id}/User_issues`).orderBy("Date").onSnapshot(querySnapshot => {
// // //                 console.log("Current jadhjasdfhas: ",this.tem)

// // //                 querySnapshot.forEach(doc => {
// // //                     this.User_issue.push({
// // //                         id: doc.id, ...doc.data(),
// // //                         username:item.id
                        

// // //                     })

// // //                 })
// // //                 this.setState({ User_issues: this.User_issue })
// // //                 this.setState({ filtereddata: this.User_issue })

// // //                 console.log("Current messages: ",
// // //                     this.User_issue.length)

// // //             })
// // //         })
// // //     }</div>:
// // //    // notadmin
// // //             console.log("normaluser: ",this.tem)
// // //             db.collection(`User/${this.tem}/User_issues`).orderBy("Date").onSnapshot(querySnapshot => {

// // //                 querySnapshot.forEach(doc => {
// // //                     this.User_issue.push({
// // //                         id: doc.id, ...doc.data(),
// // //                         name: doc.name
// // //                     })
// // //                 })
// // //                 this.setState({ User_issues: this.User_issue })
// // // this.User_issue=[]
// // //                 console.log("Current messages: ",
// // //                     this.User_issue.length)

// // //             })
            
// // //         })
// // //     }
// // //     contains =(user, search)=>{
// // //         let result = false
// // //         if (user.username.includes(search)){
// // //             result=true
// // //         }
// // //        return result
        
// // //     }
// // //     updateSearch = (search) => {
        
// // //            const data= _.filter(this.state.User_issues, user=>{
    
// // //             return this.contains(user,search)
// // //            }
// // //             ) 
// // //         this.setState({ search:search, filtereddata:data  });    
// // //       };
// // //     render() {
// // //         return (
// // //             <ScrollView>
// // //             <View>
// // //                 <Header
// // //       backgroundColor='#567D46'
// // //       placement="left"
// // //   leftComponent={<MaterialCommunityIcons  name="inbox" size={30} color="white"/>}
// // //   centerComponent={{ text: 'Inbox', style: { color: '#fff',fontSize:25 } }}
// // //   rightComponent={<Ionicons name="ios-notifications" color="white" size={30} onPress={() => this.props.navigation.navigate('Profile')}/>}
// // // />
// // //                 <View>
                
// // //                     {/* <Text style={{ fontWeight: "bold", fontSize: 17 }}> {this.tem} </Text> */}
// // //                 </View>
// // //                 {this.tem === "admin@admin.com" ?
                
// // //                 <View>
               
// // //                 <SearchBar
// // //                      placeholder="Filter by Name"
// // //                      lightTheme round
// // //                      onChangeText={this.updateSearch}
// // //                      value={this.state.search}
// // //                      containerStyle={height=5}
// // //                      showLoading={true}
// // //                  /> 
// // //                  <TouchableOpacity
// // //                      style={styles.button}
// // //                onPress={()=>this.props.navigation.navigate('InboxHistory')}> 
// // //                <Text  style={{ fontSize: wp('3.5%'), fontWeight: "bold", color: "white" }} >View Inbox History</Text>
// // //                </TouchableOpacity>
// // //                  {
                    
// // //                     this.state.filtereddata.map(m=>
// // //                          <View >
// // //                           {m.Reply !== ""?
// // //                           null:
// // //                           <View>
// // //                         <View style={{flex:1, flexDirection:"row"}} >
// // //                             <View style={{flex:0.8}}>                           
// // //                             <Text style={{ fontSize: 16 }} key={m.id}>

// // //                                 <Text style={{ fontSize: wp('4.2%'), fontWeight: "bold", color: "black" }}>From {m.username}: {'\n'}</Text>
// // //                                <Text style={{ fontSize: wp('4.2%'), fontWeight: "bold", color: "black" }}>Issue: {m.Message} </Text> 
// // //                                 {/* {m.Message  == !" " ? <Text>{'\n'} </Text>: <Text style={{ fontWeight: "bold" }} >{'\n'}Issue:{m.Message}{'\n'}</Text>} */}
// // //                                 {m.Reply  === "" ? <Text>{'\n'}</Text>: <Text style={{ fontSize: wp('4.2%'), fontWeight: "bold", color: "black" }} >{'\n'}Admin's Reply:{m.Reply}{'\n'}</Text>}
                                
// // //                                 <Text style={{ fontSize: wp('3.2%'), fontWeight: "bold", color: "black" }}>Time: {m.Date.toDate().getDate()}{"-"}{m.Date.toDate().getMonth() + 1}{"  :"}{m.Date.toDate().getHours()}{":"}{m.Date.toDate().getMinutes()}</Text>
// // //                                 </Text>

// // //                                 </View>
// // //                                 {m.Reply == ! " " ? 
// // //                             <View style={{width: 20,flex:0.2, paddingTop:10}}>
                         
// // //                     <TouchableOpacity
// // //                      style={styles.button}
// // //                onPress={()=>this.props.navigation.navigate('inboxD', {message:m })}> 
// // //                <Text  style={{ fontSize: wp('3.5%'), color: "white" }} >Reply</Text>
// // //                </TouchableOpacity>
// // //                  </View>
// // //                     :null}                   
// // //                     </View>
// // //                     <Divider style={{ backgroundColor: '#567D46', height: 2 }} />
// // //                     </View>
// // //                         }
                        
// // //                         </View>
                       
                        
// // //                     )} 
 
// // //                 </View>
          
// // //                 //Not an admin
// // //                 : 
// // //                 <View style ={{ paddingTop: 10 }}>
// // //                  {/* <View style= {{width:"25%",height: "6%"}}> */}

// // //                     <TouchableOpacity
// // //                      style={{alignItems: 'center',
// // //                      backgroundColor: '#567D46',
// // //                      color:"white",
                     
// // //                      width:"25%",height: "6%"
// // //                    }}
// // //                onPress={()=>this.props.navigation.navigate('createissue', {usere:this.tem})} >
// // //                <Text  style={{ fontSize: wp('3.5%'), fontWeight: "bold", color: "white"}} >Report an Issue</Text>
// // //                </TouchableOpacity>
           
// // //             {/* </View> */}
// // //                         {this.state.User_issues.length !=0?<View>
// // //                 {

// // //                     this.state.User_issues.map(m =>
// // //                         <View style={{paddingTop:10}}>
// // //                             <Text key={m.id}>
// // //                                 {console.log("m", m.Date.toDate().getDate())}
                              
// // //                                 <Text style={{ fontWeight: "bold", fontSize: 20 }}></Text>
// // //                                 <Text>

// // //                                 </Text>

// // //                                 <Text  style={{ fontSize: wp('4.2%'), fontWeight: "bold", color: "black" }}>Issue: {m.Message} </Text>
// // //                                 {m.Reply  === "" ? <Text>{'\n'}</Text>: <Text style={{ fontSize: wp('4.2%'), fontWeight: "bold", color: "black" }} >{'\n'}Admin's Reply:{m.Reply}{'\n'}</Text>}
// // //                                 <Text  style={{ fontSize: wp('3.5%'), fontWeight: "bold", color: "black" }}>Time:{m.Date.toDate().getDate()}{"/"}{m.Date.toDate().getMonth() + 1}{"   "}{m.Date.toDate().getHours()}{":"}{m.Date.toDate().getMinutes()} </Text>
                                
                            
// // //                             </Text>
// // //                             <Divider style={{ backgroundColor: '#567D46', height: 1 }} />

// // //                         </View>
// // //                     )}
// // //                     </View>:
// // //                   <View style ={{justifyContent: "flex-start", alignItems: "center"}}>
// // //                     <Card width={"96%"}>                                    

// // //                     <Text style={{ fontSize: wp('4.2%'), fontWeight: "bold", color: "black" }}>Report issue to admin</Text>

// // //                     <Text>{'\n'}</Text>
                                                 
// // //                     </Card>
// // //                     </View>
                    
// // //                 }
            
// // //                 </View>
// // //                 }
                
                


// // //             </View>
// // //             </ScrollView>
// // //         );
// // //     }
// // // }


// // // const styles = StyleSheet.create({
// // //     container: {
// // //       flex: 1,
// // //       justifyContent: 'center',
// // //       paddingHorizontal: 10
// // //     },
// // //     button: {
// // //       alignItems: 'center',
// // //       backgroundColor: '#567D46',
// // //       color:"white",
    
// // //     },
// // //     countContainer: {
// // //       alignItems: 'center',
// // //       padding: 10
// // //     },
// // //     countText: {
// // //       color: '#FF00FF'
// // //     }
// // //   })
  