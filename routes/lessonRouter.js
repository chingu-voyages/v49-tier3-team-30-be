const express = require("express");
const router = express.Router();

// import route-handler callback functions
const lessonController = require("../controllers/lessonController");

// example router handler for https://localhost:3000/user/
// reponds with id param if set

router.post("/create", lessonController.createLesson);

module.exports = router;
