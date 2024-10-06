import express from 'express'
import { getAll, getSingle, createContact, updateContact, deleteContact } from '../controllers/contacts.controller.js'


const router = express.Router()

router.get('/api/users/all', getAll)

router.get('/api/users/:id', getSingle);

router.post("/contacts", createContact);

router.put("/contacts/:id", updateContact);

router.delete("/contacts/:id", deleteContact);


export default router;