const mongoose = require("mongoose");

const Lesson = require("../models/lesson");

exports.createLesson = async (req, res) => {
	console.log(req.body);
	const { parentCourse, name, desc, urls } = req.body;
	if (!parentCourse) {
		return res.status(400).json({ message: "Parent course ID required" });
	}
	if (!name) {
		return res.status(400).json({ message: "Course name required" });
	}
	const newLesson = new Lesson({ parentCourse, name, desc, urls });
	try {
		await newLesson.save();
	} catch (err) {
		console.error(err);
	}

	res.sendStatus(200);
};
