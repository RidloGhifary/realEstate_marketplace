const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");

const PORT = process.env.PORT;
const app = express();

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Database connected"))
  .catch(() => console.log("Database error"));

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log("Connected on port:", PORT));
