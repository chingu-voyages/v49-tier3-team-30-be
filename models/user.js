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
		minLength: 6,
		maxLength: 255,
	},
	aboutMe: {
		type: String,
	},

	enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
	
},{timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User