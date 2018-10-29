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
  // .then((snapshot) => {
  // console.log('Uploaded a file');
  // })
  
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
  db.ref(`houses/${houseId}/likes`).push({
    userId
  }).then(
    db.ref(`users/${userId}/opinions/likes`).push({
      houseId
    })
  )
}

export const getLikes = (houseId, callback) => {
  db.ref(`houses/${houseId}/likes`).on('value', callback);
}

export const addHate = (houseId, userId) => {
  db.ref(`houses/${houseId}/hates`).push({
    userId
  })
}

export const getOpinion = (houseId, userId, callback) => {
  // let opinion = null
  // db.ref(`users/${userId}/opinions/likes`).on('value', snapshot => {
  //   opinion = snapshot.val()
  // }).then(() => db.ref(`users/${userId}/opinions/hates`).on('value', snapshot => {
  //   opinion = [opinion, snapshot.val()]
  // }))
  // return callback(opinion)
  //
}

export const getHates = (houseId, callback) => {
  db.ref(`houses/${houseId}/hates`).on('value', callback);
}

export const getCards = (callback) => {
  db.ref('houses').on('value', callback);
}

export const getImgUrl = (image, callback) => {
  storage.ref(image).getDownloadURL().then(url => callback(url))
}

export const onceGetUserInfos = (user) =>
  db.ref(`users/${user.uid}`).once('value');