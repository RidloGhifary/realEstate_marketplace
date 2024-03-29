const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require("dotenv/config");

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const estateRouter = require("./routes/listEstateRoute");

const PORT = process.env.PORT || 5100;
const app = express();

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database got some issues =>", error));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/estate", estateRouter);

app.get("/hello", (req, res) => {
  res.send({ message: "hello world" });
});

app.listen(PORT, () => console.log("Connected on port:", PORT));
