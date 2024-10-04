import express from "express"
import { getAll, getSingle } from "../controllers/contacts.controller.js"


const router = express.Router()

router.get("/api/users/all", getAll)
router.get('/api/users/:id', getSingle);

export default router;