const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({origin: "*"}))
const Joi = require("joi");

app.get("/", (req, res) => {
  res.send("backend running");
});

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
    {
    id: 3,
    title: "this is notes title",
    description: "this is notes description",
  },
];
app.post("/api/notes", (req, res) => {
  // const schema = Joi.object({
  //   title: Joi.string().required(),
  //   description: Joi.string().required(),
  // });
  // const result = schema.validate(req.body);
  // console.log(result.error.details);
  // if (result.error) {
  //   res
  //     .status(400)
  //     .send(
  //       "Title and Description is required",
  //     );
  //   return;
  // }
  const note = {
    id: notes.length + 1,
    title: req.body.title,
    description: req.body.description,
    createdAt: Date.now(),
    updatedAt: null,
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
//     const schema = Joi.object({
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//   });
//     const result = schema.validate(req.body);
//     console.log(result);

// if (result.error) {
//   console.log(result.error.details);
//   return res.status(400).send(result.error.details[0].message);
// }
  note.title= req.body.title;
  note.description= req.body.description;
   note.updatedAt = Date.now();
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
