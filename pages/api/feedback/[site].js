import getAllfeedback from '../../../lib/db-admin'
export default async (req, res) => {
    const siteId = req.query.site;
    const allFeedback = await getAllfeedback(siteId);
    res.status(200).send({allFeedback})
};
