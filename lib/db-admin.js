import { db as firebase } from './firebase-admin';
export default async function getAllFeedback(siteId, route) {
  let ref = await firebase
    .collection('feedback')
    .where('siteId', '==', siteId)
  if (route) {
    ref = ref.where('route', '==', route);
  }
  const snapshot= await ref.get()
  const feedback = [];
  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });
  const sorted = feedback.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return sorted;
}
export async function getAllActiveFeedback(siteId, route) {
  let ref = await firebase
    .collection('feedback')
    .where('siteId', '==', siteId)
    .where('status', '==', 'active')
  if (route) {
    ref = ref.where('route', '==', route);
  }
  const snapshot = await ref.get();
  const feedback = [];
  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });
  const sorted = feedback.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return sorted;
}
export async function getAllSites() {
  const snapshot = await firebase.collection('sites').get();
  const sites = [];
  snapshot.forEach((site) => {
    sites.push({ id: site.id, ...site.data() });
  });
  return sites.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
export async function getSite(siteId) {
  const snapshot = await firebase.collection('sites').doc(siteId).get();
  const site = await snapshot.data()
  return site;
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
