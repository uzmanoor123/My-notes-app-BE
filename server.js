const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
const notesRoutes = require('./routes/notesRoutes')
app.use('/api/notes', notesRoutes)

const userRoutes = require('./routes/userRoutes')
app.use('/api/auth', userRoutes)

app.get("/", (req, res) => {
  res.send("backend running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app is running on port  ${port}`);
});
