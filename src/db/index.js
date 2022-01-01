const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAjGNLOdekHrg9i-CC5AIjrvUpDWb-y3HI",
  authDomain: "sportify-32149.firebaseapp.com",
  projectId: "sportify-32149",
  storageBucket: "sportify-32149.appspot.com",
  messagingSenderId: "256385313302",
  appId: "1:256385313302:web:81ad728e39b8a39da5e337",
  measurementId: "G-PZ85HEJ30N",
};
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const setDoc = async (collection, doc, id) => {
  let temp = doc;
  if (doc.address) {
    const address = doc.address;
    doc["country"] = address.country;
    doc["city"] = address.city;
    doc["district"] = address.district;
    delete doc.address;
  }
  if (doc.managerOfficeAddress) {
    const managerOfficeAddress = doc.managerOfficeAddress;
    doc["country"] = managerOfficeAddress.country;
    doc["city"] = managerOfficeAddress.city;
    doc["district"] = managerOfficeAddress.district;
    delete doc.managerOfficeAddress;
  }
  let res;
  if (id) {
    res = await firestore.collection(collection).doc(id);
    const newDoc = res
      .set(doc)
      .then(console.log("Add Success"))
      .catch((err) => {
        console.log(err);
      });
  } else {
    res = await firestore.collection(collection).doc();
    const newDoc = res
      .set(doc)
      .then(console.log("Add Success"))
      .catch((err) => {
        console.log(err);
      });
    const docRef = await res.get();
    let data = docRef.data();
    data["id_fb"] = docRef.id;
    if (data.address) {
      delete data.country;
      delete data.city;
      delete data.district;
      data["address"] = temp.address;
    }
    console.log(data);
    return data;
  }

  return doc;
  //console.log(res);
};
const getDoc = async (collection, id) => {
  const Ref = firestore.collection(collection);
  const doc = await Ref.doc(id).get();
  return doc;
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

  const updated = await Ref.get();

  return updated;
}
async function deleteDocInDatabase(collection, id) {
  try {
    const res = await firestore.collection(collection).doc(id).delete();
  } catch (err) {
    return false;
  }
  return true;
}
module.exports = {
  getDoc: getDoc,
  get: getDocs,
  create: setDoc,
  update: updateDocInDatabase,
  delete: deleteDocInDatabase,
};
