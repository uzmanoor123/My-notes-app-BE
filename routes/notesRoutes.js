const express = require("express");
const router = express.Router();

const { getAllNotes,addNotes,getNotesById, updateNotes, deleteNotes }= require("../controllers/notesController")
const authMiddleware = require("../middleware/authMiddleware")
router.get('/', authMiddleware, getAllNotes);
router.post('/', authMiddleware,  addNotes);
router.get('/:id', authMiddleware,  getNotesById)
router.put('/:id', authMiddleware,  updateNotes);
router.delete('/:id', authMiddleware,  deleteNotes)

module.exports = router;