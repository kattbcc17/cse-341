import express from 'express'
import { getAll, getSingle, createContact, updateContact, deleteContact } from '../controllers/contacts.controller.js'
import { body, param } from 'express-validator';

const router = express.Router()

// Validation helper for ID
const validateId = [
    param('id').isMongoId().withMessage('Invalid ID format')
];

// Validation for creating and updating contacts
const validateContact = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('favoriteColor').notEmpty().withMessage('Favorite color is required'),
    body('birthday').isDate().withMessage('Birthday must be a valid date')
];


// Get all contacts
router.get('/api/users/all', getAll);

// Get a single contact by ID
router.get('/api/users/:id', validateId, getSingle);

// Create a new contact
router.post("/contacts", validateContact, createContact);

// Update an existing contact
router.put("/contacts/:id", [...validateId, ...validateContact], updateContact);

// Delete a contact
router.delete("/contacts/:id", validateId, deleteContact);


export default router;