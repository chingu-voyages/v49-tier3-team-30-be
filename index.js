require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");


// connecting to Mongoose server
const MONGO_URI = process.env.MONGO_URI || "";
async function main() {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("[SERVER]: Database is connected");
		app.listen(port, () => {
			console.log(`App listening on port ${port}`);
		});
	} catch (err) {
		console.log("[ERROR]: Database is not connected");
		console.error(err);
	}
}

// CORS to connect with client side
const corsOptions = {
	origin: process.env.CLIENT_SIDE,
	credentials: true}

;

// loading router modules
const userRouter = require("./routes/userRouter");
const lessonRouter = require("./routes/lessonRouter");
const courseRouter = require("./routes/courseRouter");

// express middleware to parse requests with JSON payloads
app.use(express.json());
app.use(cors());


//Routers

app.use("/user", userRouter);
app.use("/lesson", lessonRouter);
app.use("/course", courseRouter);



app.get("/", (req, res) => {
  res.json({ body: "Hello, world!" });
})

main();
