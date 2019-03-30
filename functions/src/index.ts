import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// import fetch from 'node-fetch'

admin.initializeApp(functions.config().firebase)



const nodemailer= require('nodemailer')
const mailTransport=nodemailer.createTransport({
    service: "hotmail",
    auth:{
        user:'khalid.naser7@hotmail.com',
        pass:'6969Cr76363'
    }
})

export const fillTrash = functions.https.onRequest(async (req, res) => {
    // find all images (users with captions)
    const querySnapshot= await admin.firestore().collection("TrashCan").get()
    querySnapshot.forEach(doc=>{
        let level = doc.data().Fill_percentage
        if(level!==100)
        {
            let fill_level = doc.data().Fill_percentage + Math.floor( Math.random() * 20)

            if (fill_level>=100){
                fill_level = 100
                admin.firestore().collection("TrashCan").doc(doc.id).update({Fill_percentage:fill_level,Lasttime_full:admin.firestore.Timestamp.fromDate(new Date())})
                
            }
        
            else if(fill_level>=30 && fill_level<60 ){
                admin.firestore().collection("TrashCan").doc(doc.id).update({Fill_percentage:fill_level,Status:"Half"})
            }
             else if(fill_level>=60)
            {
                admin.firestore().collection("TrashCan").doc(doc.id).update({Fill_percentage:fill_level,Status:"Full"})
            }
             else if(fill_level<30)
            {
                admin.firestore().collection("TrashCan").doc(doc.id).update({Fill_percentage:fill_level,Status:"Good"})
            }
        }
        

        
    })
    res.status(200).send();
})

export const createTarget = functions.https.onRequest(async (req, res) => {

    const querySnapshot = await admin.firestore().collection("User").get()
    const users = []
    querySnapshot.forEach(doc => {
        users.push({
            id: doc.id, ...doc.data()
        })
    })
    var myDate = new Date();
    let formatedTime=myDate.toDateString();
        users.map((item, i) => {

            admin.firestore().collection(`User/${item.id}/Daily_targets`).doc(formatedTime).set({ Target_achieved: 0, Target_todo: 20, date:new Date()})
        })


res.status(200).send();
})
export const createDailyFeedback = functions.https.onRequest(async (req, res) => {

    const querySnapshot = await admin.firestore().collection("User").get()
    const users = []
    querySnapshot.forEach(doc => {
        users.push({
            id: doc.id, ...doc.data()
        })
    })
    var myDate = new Date();
    let formatedTime=myDate.toDateString();
        users.map((item, i) => {

            admin.firestore().collection(`User/${item.id}/Daily_Feedbacks`).doc(formatedTime).set({ Answer: [], Question: ["Do you think you are doing a fine job?","I like working here?","Do you think your colleague are doing there job right?","Do you understand the way the Trash can app works?"], date:new Date()})
        })


res.status(200).send();
})
export const welcomeemail=functions.https.onRequest(async (req, res) => {

    const email="arunblack96@gmail.com"
    const mailOption={
        from:'"My APP"<myapp@gamil.com>',
        bcc:email,
        subject:'Thanks',
        text:'Come check out all the cool features of my App'

    }
    return mailTransport.sendMail(mailOption).then(()=>{
        res.send("Email Sent")
    }).catch(error => {
        res.send(error)
    })

})

