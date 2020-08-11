const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access the Firebase Realtime Database.
// const admin = require('firebase-admin');
// admin.initializeApp();

var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mimosa-97ad6.firebaseio.com"
});


exports.getUserInfo = functions.https.onCall((data, context) => {
    //const uid = data.uid;
    if (!context.auth) return { status: 'error', code: 401, message: 'Not signed in' }

    return admin.auth().getUser(data.uid)
        .then(userRecord => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully fetched user data:', userRecord.toJSON());
            return [
                userRecord.toJSON().displayName,
                userRecord.toJSON().photoUrl
            ];
        })
        .catch(error => {
            console.log('Error fetching user data:', error);
            return error;
        })
});