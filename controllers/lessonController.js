const mongoose = require("mongoose");

const Lesson = require("../models/lesson");

exports.createLesson = async (req, res) => {
	console.log(req.body);
	const newUser = new Lesson(req.body);
	try {
		await newUser.save();
	} catch (err) {
		console.error(err);
	}

	res.sendStatus(200);
};
