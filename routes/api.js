const router = require("express").Router();
const fs = require("fs");
let db = require("../db/db.json");
const uuid = require("uuid/v1");

router.get("/notes", (req, res) => {
  db = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
  res.json(db);
});

router.post("/notes", (req, res) => {
  const { title, text } = req.body;

  const createNewNote = (title, text) => {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    db.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(db));
    res.json(db);
  };
  return title && text ? createNewNote(title, text) : console.log("error");
});

router.delete("/notes/:id", (req, res) => {
  const id = req.params.id;

  db = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
  const newDB = db.filter((obj) => id !== obj.id);

  fs.writeFileSync("./db/db.json", JSON.stringify(newDB));

  res.send("Test note deleted");
});

module.exports = router;

// const controllers = require("../helpers/controllers"); // Future improvements - modularize read, write functions
// router.get("/notes", controllers.getNote);
