// I followed the mozilla developer documentation for using mongoose
// URL: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lessonSchema = new Schema({
	parentCourse: { type: Schema.Types.ObjectId, ref: "Course" },
	name: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
	},
	urls: [
		{
			type: String,
		},
	],
	accountDate: {
		type: Date,
		default: Date.now,
		required: true,
	},
});

const Lesson = mongoose.model("Lesson", lessonSchema);
