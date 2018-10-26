import { db } from './firebase';

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
  
// Auto increment the Id of the house. Use Array
export const doCreateHouse = (id, address, pocode, description, picture, publicationdate) =>
  db.ref(`users/${id}/houses`).set({
    address,
    pocode,
    description,
    picture,
    publicationdate
})
.then(() => {
  console.log("data saved")
})
.catch((e) => {
  console.log(e)
});

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const onceGetUserInfos = (user) =>
  db.ref(`users/${user.uid}`).once('value');

// Other Entity APIs ...