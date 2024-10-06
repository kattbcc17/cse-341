import MongoDB from "../db/mongo.js"
import { ObjectId } from "mongodb";

// Get all contacts
export const getAll = async (_, res) => {
    const _db = MongoDB.getDb();
    const users = await _db.collection('contacts').find().toArray(); // Added toArray() here
    res.send({
        statusCode: 200,
        data: {
            users: users
        },
        message: "Usuarios obtenidos con éxito"
    });
};


// Get a single contact by ID
export const getSingle = async (req, res) => {
    const userID = new ObjectId(req.params.id);
    const _db = MongoDB.getDb();
    const result = await _db.collection('contacts').findOne({ _id: userID });

    if (!result) {
        return res.status(404).json({ message: 'Contact not found.' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

export const createContact = async (req, res) => {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
  
    try {
      const _db = MongoDB.getDb();
      const response = await _db.collection('contacts').insertOne(contact);
      if (response.acknowledged) {
        res.status(201).json({ id: response.insertedId });
      } else {
        res.status(500).json({ error: 'Error creating contact' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const updateContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
  
    try {
      const _db = MongoDB.getDb();
      const response = await _db.collection('contacts').replaceOne({ _id: contactId }, updatedContact);
      if (response.modifiedCount > 0) {
        res.status(200).send('Contact updated successfully');
      } else {
        res.status(404).send('Contact not found');
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  export const deleteContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
  
    try {
      const _db = MongoDB.getDb();
      const response = await _db.collection('contacts').deleteOne({ _id: contactId });
      if (response.deletedCount > 0) {
        res.status(200).send('Contact deleted successfully');
      } else {
        res.status(404).send('Contact not found');
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

