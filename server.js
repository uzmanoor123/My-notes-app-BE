var express = require("express");
const app = express();
app.use(express.json());
const Joi = require("joi");


app.get("/api/notes", (req, res) => {
  res.send(notes)
});

const notes = [
  {
    id: 1,
    title: "this is title",
    description: "this is description",
  },
  {
    id: 2,
    title: "this is notes title",
    description: "this is notes description",
  },
];
app.post("/api/notes", (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(3).max(500),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res
      .status(400)
      .send(
        "Title and Description is required and should be minimum 3 character required",
      );
    return;
  }
  const note = {
    id: notes.length + 1,
    title: req.body.title,
    description: req.body.description,
  };
  notes.push(note);
  res.send(note);
});

app.get("/api/notes/:id", (req, res) => {
  const noteId = notes.find(n => n.id === parseInt(req.params.id));
  if (!noteId) {
    res.status(404).send("The note with the given id is not found");
    return;
  }
  res.send(noteId);
});
app.put('/api/notes/:id', (req,res)=>{
    const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) {
    res.status(404).send("The selected note is not found");
    return;
  }
    const schema = Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(3).max(500),
  });
    const result = schema.validate(req.body);
  if (result.error) {
    res
      .status(400)
      .send(
        "Title and Description is required and should be minimum 3 character required",
      );
    return;
  }
  note.title= req.body.title;
  note.description= req.body.description;
  res.send(note);
})
app.delete('/api/notes/:id', (req,res)=>{
  const note = notes.find(n => n.id===parseInt(req.params.id));
  if(!note){
    res.status(404).send("The selected note is note found")
    return;
  }
  const index = notes.indexOf(note)
  notes.splice(index, 1)
  res.send(note);
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is running on port  ${port}`);
});
