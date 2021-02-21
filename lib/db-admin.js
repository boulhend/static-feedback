import { db as firebase } from './firebase-admin';
export default async function getAllFeedback(siteId) {
  const snapshot = await firebase
    .collection('feedback')
    .where('siteId', '==', siteId)
    .get();
  const feedback = [];
  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });
  const sorted=feedback.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  return sorted
}
export async function getAllSites() {
  const snapshot = await firebase.collection('sites').get();
  const sites = [];
  snapshot.forEach((site) => {
    sites.push({ id: site.id, ...site.data() });
  });
  return sites.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));;
}
export async function getSite(siteId) {
  const snapshot = await firebase.collection('sites').doc(siteId).get();
  const siteName = await snapshot.data().name;
  return siteName;
}
export async function getUserSites(uid) {
  const snapshot = await firebase
    .collection('sites')
    .where('userId', '==', uid)
    .get();
  const sites = [];
  snapshot.forEach((site) => {
    sites.push({ id: site.id, ...site.data() });
  });
  return sites;
}
export async function getUserFeedback(uid) {
  const snapshot = await firebase
    .collection('feedback')
    .where('authorId', '==', uid)
    .get();
  const allFeeedback = [];
  snapshot.forEach((feedback) => {
    allFeeedback.push({ id: feedback.id, ...feedback.data() });
  });
  return allFeeedback;
}
