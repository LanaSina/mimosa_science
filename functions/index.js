const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();


exports.getUserInfo = functions.https.onCall((uid) => {
    admin.auth().getUser(uid)
        .then(userRecord => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully fetched user data:', userRecord.toJSON());
            return userRecord.toJSON().displayName;
        })
        .catch(error => {
            console.log('Error fetching user data:', error);
            return error;
        })
});