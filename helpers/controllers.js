// const fs = require("fs");
// const util = require("util");

// // const readFromFile = util.promisify(fs.readFile);

// // const getNote = (req, res) => {
// //   db = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
// //   // res.sendFile(path.join(__dirname, "../public/index.html"));
// //   //read db.json THEN return that db.json
// //   // fs.readFileSync("../db/db.json", "utf-8");
// //   res.json(db);
// // };

// const getNote = async (req, res) => {
//   try {
//     const response = await fs.readFileSync("./db/db.json", "utf-8");
//     console.log(response);
//     res.json(JSON.parse(response));
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };
// // const writeToFile = ("../db/db.json", notes);
// // const writeToFile = (destination, content) =>
// //   fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => (err ? console.error(err) : console.info(`\nData written to ${destination}`)));

// // const writeToFile =

// module.exports = { getNote };
