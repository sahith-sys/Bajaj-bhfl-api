const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const handler = require('./bhfl');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.json({ message: "Hello from API, BFHL API is running!" });
});

app.post("/bhfl", handler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
