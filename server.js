const express = require("express");
const api = require("./routes/api");
const html = require("./routes/html");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// http://localhost:PORT/
app.use("/", html);
// http://localhost:PORT/api
app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

module.exports = app;
