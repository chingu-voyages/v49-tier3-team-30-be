const express = require("express");
const Course = require("../models/course.js");

// import route-handler callback functions
const courseController = require("../controllers/courseController");

const router = express.Router();

//      /course

router.post("/", courseController.addNewCourse);
router.get("/", courseController.getAllCourses);
router.get("/:courseName", courseController.getCourseRoadMap);

module.exports = router;
