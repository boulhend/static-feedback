// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth } from '../../lib/firebase-admin';
import { getUserSites } from '../../lib/db-admin';
export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    console.log(uid);
    const sites = await getUserSites(uid);
    res.status(200).json({ sites });
  } catch (error) {
    res.status(500).json({ error });
  }
};
