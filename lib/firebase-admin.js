import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email:
        "firebase-adminsdk-1gcmf@fastfeedback-f9abc.iam.gserviceaccount.com",
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      project_id: "fastfeedback-f9abc"
    }),
    databaseURL: "https://fastfeedback-f9abc.firebaseio.com"
  });
}
const auth = admin.auth();
const db = admin.firestore();
export { auth, db };
