import firebase from './firebase';
import 'firebase/firestore';
const firestore = firebase.firestore();
export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}
export function createSite(data) {
  const site=firestore.collection('sites').doc();
  site.set(data)
  return site;
}
export function createFeedback(feedback) {
  return firestore.collection('feedback').add(feedback);
}
export async function deleteFeedback(feedbackId){
  await firestore.collection('feedback').doc(feedbackId).delete();
}
