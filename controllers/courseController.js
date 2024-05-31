const mongoose = require("mongoose");
const Course = require("../models/course.js");

const addNewCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const course = await Course.find({});
    console.log("course", course);
    const courseName = course.map((el) => el.name);
    console.log("courseName", courseName);
    res.status(200).json(courseName);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCourseRoadMap = async (req, res) => {
  try {
    const courseData = await Course.find({ name: req.params.courseName });
    console.log("courseData", courseData);
    const courseChart = courseData.map((el) => el.structure);

    res.status(200).json(courseChart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addNewCourse, getAllCourses, getCourseRoadMap };
