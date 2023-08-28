import {Deta} from 'deta'; // import Deta
const deta = Deta(process.env.DETA);
const db = deta.Base('lensfighter');
export default async(req, res) => {
    const data = req.body;
    await db.put({ value: data.profileId }, data.address);
    res.status(200).json({ text: 'Hello' })
}