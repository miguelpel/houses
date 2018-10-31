import { db, storage } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    id,
    username,
    email,
  })
  .then(() => {
    console.log("data saved")
  })
  .catch((e) => {
    console.log(e)
  });
  

export const doCreateHouse = (userId, username, address, pocode, description, picture, publicationdate, likes, hates) => {

  const file = picture
  const fileName = file.name;
  const timestamp = Number(new Date());
  const storageRef = storage.ref(timestamp.toString() + fileName);

  const image = storageRef.fullPath
  
  storageRef.put(file)
  .then((snapshot) => {
  console.log('Uploaded a file');
  })
  
  return db.ref(`houses`).push().set({
    userId,
    username,
    address,
    pocode,
    description,
    image,
    publicationdate,
    likes,
    hates
  }).then(() => {
    console.log("house data saved")
  }).catch((e) => {
    console.log(e)
  })
}

export const addLike = (houseId, userId) => {
  let updates = {};
  updates[`houses/${houseId}/opinions/${userId}`] = "like";
  updates[`users/${userId}/opinions/${houseId}`] = "like";

  db.ref().update(updates);
}

export const removeOpinion = (houseId, userId) => {
  db.ref(`houses/${houseId}/opinions/${userId}`).remove();
  db.ref(`users/${userId}/opinions/${houseId}`).remove();
}

export const addHate = (houseId, userId) => {
  let updates = {};
  updates[`houses/${houseId}/opinions/${userId}`] = "hate";
  updates[`users/${userId}/opinions/${houseId}`] = "hate";

  db.ref().update(updates);
}

export const getCards = (callback) => {
  db.ref('houses').on('value', callback);
}

export const getImgUrl = (imgName, callback) => {
  const storageRef = storage.ref(imgName);
  storageRef.getDownloadURL().then(url => callback(url))
}

export const getCard = (houseId, callback) => {
  db.ref(`houses/${houseId}`).on('value', callback);
}

export const onceGetUserInfos = (user) =>
  db.ref(`users/${user.uid}`).once('value');