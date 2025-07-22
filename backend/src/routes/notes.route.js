import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { getNote , setNotes , getNotes , updateNote , deleteNote , generateNoteFromChat} from "../controllers/notes.controller.js";

const router = express.Router();


router.post('/createNote', protectRoute ,setNotes);
router.get('/getNote/:id', protectRoute ,getNote);
router.get('/getNotes',protectRoute, getNotes);
router.put('/updateNote/:id',protectRoute,updateNote)
router.delete('/delete/:id',protectRoute,deleteNote)
router.post('/generate-from-chat/:userId', protectRoute,generateNoteFromChat);


export default router;