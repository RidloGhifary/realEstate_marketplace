const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require("dotenv/config");

const authRouter = require("./routes/authRouter");

const PORT = process.env.PORT;
const app = express();

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database got some issues =>", error));

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log("Connected on port:", PORT));
