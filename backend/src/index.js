const express = require("express");
const cors = require("cors");
require("dotenv/config");

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const app = express();

app.listen(PORT, () => console.log("Connected on port:", PORT));
