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
  return feedback;
}
export async function getAllSites() {
  const snapshot = await firebase.collection('sites').get();
  const sites = [];
  snapshot.forEach((site) => {
    sites.push({ id: site.id, ...site.data() });
  });
  return sites;
}
export async function getUserSites(uid) {
  const snapshot = await firebase.collection('sites').where('userId','==',uid).get();
  const sites = [];
  snapshot.forEach((site) => {
    sites.push({ id: site.id, ...site.data() });
  });
  return sites;
}
