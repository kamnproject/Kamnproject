import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// import fetch from 'node-fetch'

admin.initializeApp(functions.config().firebase)

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
