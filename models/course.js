// I followed the mozilla developer documentation for using mongoose
// URL: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	courseLessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
});

const Course = mongoose.model("Course", courseSchema);
