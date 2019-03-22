import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
// import fetch from 'node-fetch'

admin.initializeApp(functions.config().firebase)

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const addMessage = functions.https.onCall(async (data, context) => {
//     const message = data.message
//     const email = context.auth.token.email || null
//     console.log("Success!!!!", message)

//     const sayUser = async () =>
//         await admin.firestore().collection("messages").add({ username: email, message, time: new Date() })

//     const sayBot = async (message) => {
//         await sayUser()
//         return await admin.firestore().collection("messages").add({ username: "Bot.png", message, time: new Date() })
//     }

//     if (message === "!help") {
//         return await sayBot("Commands are !hi, !users, and !weather <city>")
//     } else if (message === "!hi") {
//         return await sayBot("Hi to " + email)
//     } else if (message === "!users") {
//         const querySnapshot = await admin.firestore().collection("messages").get()
//         const users = new Array()
//         querySnapshot.forEach(doc => {
//             const username = doc.data().username
//             if (!users.includes(username)) {
//                 users.push(username)
//             }
//         })
//         return await sayBot(users.join(", "))
//     } else if (message.startsWith("!weather ")) {
//         const city = message.slice(9)
//         console.log(city)
//         // https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22
//         // do a fetch or request, await the json result, make a message
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b6907d289e10d714a6e88b30761fae22`)
//         const json = await response.json()
//         console.log(json)
//         const description = json.weather[0].main
//         const temp = json.main.temp - 273.15
//         return await sayBot(`Currently ${description} and ${temp} degrees`)
//     }
//     return await sayUser()
// })
// await admin.firestore().collection("chat").add({Message:message,Username:email,Time:new
//     Date()})

export const createTarget = functions.https.onRequest(async (req, res) => {
    // find all images (users with captions)
    let user =
    new Array();
   await admin.firestore().collection("User").onSnapshot(querySnapshot => {

        querySnapshot.forEach(doc => {

            user.push({
                id: doc.id, ...doc.data()
            })

        })
      })
    var myDate = new Date();
    let formatedTime=myDate.toJSON();
    {
        user.map((item, i)=>{
            
        admin.firestore().collection(`User/${item.id}/User_issues`).doc(formatedTime).set({Target_achieved:0,Target_todo:20})
        })}

    res.status(200).send();
})
