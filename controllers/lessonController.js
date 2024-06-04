const mongoose = require("mongoose");

const Lesson = require("../models/lesson");

const createLesson = async (req, res) => {
	console.log(req.body);
	const { name, desc, urls } = req.body;
	if (!name) {
		return res.status(400).json({ message: "Course name required" });
	}
	const newLesson = new Lesson({ name, desc, urls });
	try {
		await newLesson.save();
		res.status(200).json(newLesson);
	} catch (err) {
		console.error(err);
	}

	
};

const getLessonDetails = async (req, res) => {
	try {
		const lessonDetails = await Lesson.find({ _id: req.params.id });
	  console.log("lessonDetails", lessonDetails);
  
	  res.status(200).json(lessonDetails);
	} catch (err) {
	  res.status(500).json({ message: err.message });
	}
  };


  module.exports = { getLessonDetails, createLesson };
