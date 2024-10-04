import MongoDB from "../db/mongo.js"
import { ObjectId } from "mongodb";

export const getAll = async (_, res) => {
    const _db = MongoDB.getDb()
    const users = await _db.collection('contacts').find();
    users.toArray().then((list) => {
        res.send({
        
        statusCode: 200,
        data: {
            users: list
        },
        message: "Usuarios obtenidos con éxito"
    })
    })
}

export const getSingle = async (req, res) => {
    try {
        const userID = new ObjectId(req.params.id);
        const _db = MongoDB.getDb();
        const result = await _db.collection('contacts').findOne({ _id: userID });

        if (!result) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the contact.' });
    }
};


