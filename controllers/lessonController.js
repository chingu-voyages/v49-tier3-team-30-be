const mongoose = require("mongoose");

const Lesson = require("../models/lesson");
const User = require("../models/user");

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

    res.status(200).json(lessonDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleCheckbox = async (req, res) => {
  console.log("req.userrr", req.user);
  try {
    const _id = req.params.id;
    const checkboxInfo = await Lesson.findByIdAndUpdate(_id, {
      isCompleted: req.body.isCompleted,
    });

	//Update user's data with the completed lessons array---------------------------

	 
    const currentUser = await User.findById(req.user.userId); //we get req.user.userId info that comes fromv validateToken:   
    if (currentUser) {
      let updatedLessons = currentUser.completedLessons || [];

      if (req.body.isCompleted) {
        // Add the lesson ID if it's not already in the array
        if (!updatedLessons.includes(_id)) {
          updatedLessons.push(_id);
        }
      } else {
        // Remove the lesson ID if it exists in the array
        updatedLessons = updatedLessons.filter((el) => el !== _id);
      }
	  
      // Update the user document with the new completedLessons array
      await User.findByIdAndUpdate(req.user.userId, {
        completedLessons: updatedLessons,
      });

      console.log("User lessons updated successfully");
    } else {
      console.log("User not found");
    }   

    const updatedcheckboxInfo = await Lesson.findById(_id);

    res.status(200).json(updatedcheckboxInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getLessonDetails, createLesson, handleCheckbox };
