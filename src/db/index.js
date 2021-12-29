const admin = require("firebase-admin");
const firebaseConfig = {
  apiKey: "AIzaSyAjGNLOdekHrg9i-CC5AIjrvUpDWb-y3HI",
  authDomain: "sportify-32149.firebaseapp.com",
  projectId: "sportify-32149",
  storageBucket: "sportify-32149.appspot.com",
  messagingSenderId: "256385313302",
  appId: "1:256385313302:web:81ad728e39b8a39da5e337",
  measurementId: "G-PZ85HEJ30N",
};
admin.initializeApp(firebaseConfig);

const firestore = admin.firestore();

const setDoc = async (collection, doc, id) => {
  const res = await firestore
    .collection(collection)
    .doc(id)
    .set(doc)
    .then(console.log("Add Success"))
    .catch((err) => {
      console.log(err);
    });
};
const getDoc = async (collection, id) => {
  const Ref = firestore.collection(collection);
  const doc = await Ref.doc(id).get();
  return doc.data();
};
const getDocs = async (collection, whereObj, limit) => {
  const Ref = firestore.collection(collection);
  const snapshot = await Ref.where(whereObj.field, whereObj.op, whereObj.val)
    .limit(limit)
    .get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return null;
  }

  let list = [];
  snapshot.forEach((doc) => {
    list.push(doc);
  });
  return list;
};

async function updateDocInDatabase(tableName, id, updatedData) {
  const Ref = firestore.collection(tableName).doc(id);

  const res = await Ref.update(updatedData);
}
module.exports = {
  getDoc: getDoc,
  get: getDocs,
  create: setDoc,
  update: updateDocInDatabase,
};
