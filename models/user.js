// I followed the mozilla developer documentation for using mongoose
// URL: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	accountDate: {
		type: Date,
		default: Date.now,
		required: true,
	},
	enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

const User = mongoose.model("User", userSchema);
