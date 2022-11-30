const express = require("express");
const path = require("path");

const notes = require("./public/notes.html");

const PORT = 3001;

const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("public"));

// HTML ROUTES
// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
// get notes route

// API ROUTES
// http://localhost:3001/api/notes  - get
app.get("/api/notes", (req, res) => res.json());
// http://localhost:3001/api/notes  - post

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
