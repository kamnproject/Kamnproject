import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// import fetch from 'node-fetch'

admin.initializeApp(functions.config().firebase);


export const fillTrash = functions.https.onRequest(async (req, res) => {
  // find all images (users with captions)
  const querySnapshot = await admin
    .firestore()
    .collection("TrashCan")
    .get();
  querySnapshot.forEach(doc => {
    let level = doc.data().Fill_percentage;
    if (level !== 100) {
      let fill_level =
        doc.data().Fill_percentage + Math.floor(Math.random() * 20);

      if (fill_level >= 100) {
        fill_level = 100;
        admin
          .firestore()
          .collection("TrashCan")
          .doc(doc.id)
          .update({
            Fill_percentage: fill_level,
            Lasttime_full: admin.firestore.Timestamp.fromDate(new Date())
          });
      } else if (fill_level >= 30 && fill_level < 60) {
        admin
          .firestore()
          .collection("TrashCan")
          .doc(doc.id)
          .update({ Fill_percentage: fill_level, Status: "Half" });
      } else if (fill_level >= 60) {
        admin
          .firestore()
          .collection("TrashCan")
          .doc(doc.id)
          .update({ Fill_percentage: fill_level, Status: "Full" });
      } else if (fill_level < 30) {
        admin
          .firestore()
          .collection("TrashCan")
          .doc(doc.id)
          .update({ Fill_percentage: fill_level, Status: "Good" });
      }
    }
  });
  res.status(200).send();
});
export const ChangeBattery = functions.https.onRequest(async (req, res) => {
  // find all images (users with captions)
  const querySnapshot = await admin
    .firestore()
    .collection("TrashCan")
    .get();
  querySnapshot.forEach(doc => {
    let Battery = doc.data().Battery_percentage - 1;
    admin
      .firestore()
      .collection("TrashCan")
      .doc(doc.id)
      .update({ Battery_percentage: Battery });
    if (Battery < 20) {
      admin
        .firestore()
        .collection("Trashcan_Issues")
        .doc()
        .set({
          Date_time: new Date(),
          Employee_id: "sensor",
          Issue: "The battery level is less than 20%",
          Status: "active",
          Title: "Battery Alert",
          Trashcan_Id: doc.id
        });
    }
  });
  res.status(200).send();
});
export const ChangeTemp = functions.https.onRequest(async (req, res) => {
  // find all images (users with captions)
  const querySnapshot = await admin
    .firestore()
    .collection("TrashCan")
    .get();
  querySnapshot.forEach(doc => {
    let hour = new Date().getHours();
    let Temperature = 0;
    if (hour < 10) {
      Temperature = 26 - Math.floor(Math.random() * 2);
    } else if (hour > 12 && hour < 16) {
      Temperature = 26 + Math.floor(Math.random() * 4);
    } else if (hour > 16) {
      Temperature = 26 - Math.floor(Math.random() * 2);
    }

    admin
      .firestore()
      .collection("TrashCan")
      .doc(doc.id)
      .update({ Temperature: Temperature });
    if (Temperature > 50) {
      admin
        .firestore()
        .collection("Trashcan_Issues")
        .doc()
        .set({
          Date_time: new Date(),
          Employee_id: "sensor",
          Issue: "The Temperature level is more than 50 degree",
          Status: "active",
          Title: "Temperature",
          Trashcan_Id: doc.id
        });
    }
  });
  res.status(200).send();
});
export const EOM = functions.https.onRequest(async (req, res) => {
  // find all images (users with captions)
  const querySnapshot = await admin.firestore().collection("User").orderBy("Points","desc").limit(1).get();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const d = new Date();
  const currentmonth = monthNames[d.getMonth()];
    let email=""   
    let points="" 
    let badges=[]
  querySnapshot.forEach(doc => {
   email=doc.id,
   points=doc.data().Points
   badges=doc.data().Badges_earned
});
badges.push(`EOM ${currentmonth+" "+new Date().getFullYear() }`)
admin.firestore().collection(`User`).doc(email).update({ Badges_earned:badges });
admin.firestore().collection(`EOM`).doc().set({ Achieved_Target: points, Employee_id: email, Month:currentmonth,Year:""+new Date().getFullYear() });
const alluser = await admin.firestore().collection("User").get();
alluser.forEach(doc=>

    admin.firestore().collection(`User`).doc(doc.id).update({ Points:0 })


)



res.status(200).send();
  });
 

export const createTarget = functions.https.onRequest(async (req, res) => {
  const querySnapshot = await admin
    .firestore()
    .collection("User")
    .get();
  const users = [];
  querySnapshot.forEach(doc => {
    users.push({
      id: doc.id,
      ...doc.data()
    });
  });

  var myDate = new Date();
  let formatedTime = myDate.toDateString();
  users.map((item, i) => {
    admin
      .firestore()
      .collection(`User/${item.id}/Daily_targets`)
      .doc(formatedTime)
      .set({ Target_achieved: 0, Target_todo: 20, date: new Date() });
  });

  res.status(200).send();
});
export const CheckDailyTarget = functions.https.onRequest(async (req, res) => {
  const querySnapshot = await admin
    .firestore()
    .collection("User")
    .get();
  const users = [];
  const fedback = [];
  querySnapshot.forEach(doc => {
    users.push({
      id: doc.id,
      ...doc.data()
    });
  });

  var myDate = new Date();
  let formatedTime = myDate.toDateString();
  //const Target_achieved=0

  users.map((item, i) => {
    admin
      .firestore()
      .collection(`User/${item.id}/Daily_Feedbacks`)
      .orderBy("date")
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          fedback.push({
            id: doc.id,
            ...doc.data(),
            username: item.id,
            name: item.name
          });
        });

        let lastone = this.fedback[this.fedback.length - 1].Target_achieved;
        if (lastone < 20) {
          let Target_achieved = 20 - lastone;
          admin
            .firestore()
            .collection(`User/${item.id}/Daily_targets`)
            .doc(formatedTime)
            .update({
              Target_achieved: Target_achieved,
              Target_todo: 20,
              date: new Date()
            });
          admin
            .firestore()
            .collection("notification")
            .doc()
            .set({
              Area_id: "",
              Date_time: new Date(),
              Message: "You havent achieved your yesturday's daily target",
              Type: "For You only",
              title: "Hi" + " " + item.name,
              Employee_id: item.id
            });
        } else {
          admin
            .firestore()
            .collection(`User/${item.id}/Daily_targets`)
            .doc(formatedTime)
            .update({ Target_achieved: 0, Target_todo: 20, date: new Date() });
        }
      });

    res.status(200).send();
  });
});
export const createDailyFeedback = functions.https.onRequest(
  async (req, res) => {
    const querySnapshot = await admin
      .firestore()
      .collection("User")
      .get();
    const users = [];
    querySnapshot.forEach(doc => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });
    var myDate = new Date();
    let formatedTime = myDate.toDateString();
    users.map((item, i) => {
      admin
        .firestore()
        .collection(`User/${item.id}/Daily_Feedbacks`)
        .doc(formatedTime)
        .set({
          Answer: [],
          Question: [
            "Do you think you are doing a fine job?",
            "I like working here?",
            "Do you think your colleague are doing there job right?",
            "Do you understand the way the Trash can app works?"
          ],
          date: new Date()
        });
    });

    res.status(200).send();
  }
);


