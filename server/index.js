const express = require("express");
const db = require("./database");
require("dotenv").config();
const inventoryRoutes = require("./routes/inventory");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "pos",
// });

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql connected...");
});

const app = express();
const PORT = process.env.POR || 4040;

app.use(express.json());
app.use("/inv", inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
