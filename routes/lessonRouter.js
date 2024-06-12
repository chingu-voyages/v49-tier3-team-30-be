const express = require("express");
const router = express.Router();
const {validateToken} = require("../middlewares/AuthMiddlewares")

//  /lesson

// import route-handler callback functions
const lessonController = require("../controllers/lessonController");

// example router handler for https://localhost:3000/user/
// reponds with id param if set

router.post("/create", lessonController.createLesson);
router.put("/checkbox/:id", validateToken, lessonController.handleCheckbox);
router.get("/:id", validateToken, lessonController.getLessonDetails);



module.exports = router;
