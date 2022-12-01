const router = require("express").Router();

const path = require("path");

// Home route
// http://localhost:PORT/
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
// Notes route
// http://localhost:PORT/notes
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;
