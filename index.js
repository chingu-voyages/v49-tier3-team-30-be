const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

// loading router modules
const userRouter = require("./routes/userRouter");

app.use("/user", userRouter);

// express middleware to parse requests with JSON payloads
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ body: "Hello, world!" });
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
