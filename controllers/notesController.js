const Note = require("../models/Notes");

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.id,
    });
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).json({
      error: "internal server error",
    });
  }
};
const addNotes = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "title and description is required" });
    }
    const note = new Note({
      title,
      description,
      userId: req.user.id,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      error: "internal server error",
    });
  }
};

const getNotesById = async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });
  if (!note) {
    return res.status(404).json({
      error: "The selected note id is not found",
    });
  }
  res.status(200).send(note);
};
const updateNotes = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "title and description is required" });
    }
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      {
        title,
        description,
        updatedAt: Date.now(),
      },
      {
        new: true,
      },
    );
    if (!note) {
      return res.status(404).json({
        error: "Notes not found",
      });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
const deleteNotes = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!note) {
      return res.status(404).json({
        error: "note not found",
      });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      error: "internal server error",
    });
  }
};

module.exports = {
  getAllNotes,
  addNotes,
  getNotesById,
  updateNotes,
  deleteNotes,
};
