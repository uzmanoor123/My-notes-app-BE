const express = require("express");
const router = express.Router();

const { getAllNotes,addNotes,getNotesById, updateNotes, deleteNotes }= require("../controllers/notesController")

router.get('/', getAllNotes);
router.post('/', addNotes);
router.get('/:id', getNotesById)
router.put('/:id', updateNotes);
router.delete('/:id', deleteNotes)

module.exports = router;