import getAllfeedback from '../../../lib/db-admin'
export default async (req, res) => {
    const siteId = req.query.site;
    const feedback = await getAllfeedback(siteId);
    res.status(200).send({feedback})
};
