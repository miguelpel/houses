Test-project
------------

This project is written in React, and was boothstrapped using create-react-app.

The Baas is from Firebase, using Realtime Database for data storage, and Storage for the pictures storage.

The running prototype can be found [here](https://infallible-montalcini-855b90.netlify.com/)

To run the project locally, be sure to have Node.js and npm installed.
After cloning, and inside the `houses` folder, type in CLI:

```shell
npm install
```

then, type:

```shell
npm start
```

A local server will start at `http://localhost:3000`.

Here below is a picture of the structure of the Database.
Each **Like** and **Hate** are stored in both the house's **opinions** with a reference to the user, and the user's **opinions** with a reference to the house. This allows further development, like querying for all the houses a user likes.

![alt text](https://firebasestorage.googleapis.com/v0/b/virtualhouses-dev.appspot.com/o/dbStructure.png?alt=media&token=ab5443fa-596f-47cf-886b-9cd1ca79bb6b "Database Structure")



