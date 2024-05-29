require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "";


// CORS to connect with client side
const corsOptions = {
  origin: process.env.CLIENT_SIDE,
  credentials: true,
};

// loading router modules
const userRouter = require("./routes/userRouter");

// express middleware to parse requests with JSON payloads
app.use(express.json());
app.use(cors(corsOptions));
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json({ body: "Hello, world!" });
});



// connecting to Mongoose server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("[SERVER]: Database is connected");
    app.listen(3004, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => console.log("[ERROR]: Database is not connected"));

