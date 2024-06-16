const express = require("express");
const router = express.Router();
const {validateToken} = require("../middlewares/AuthMiddlewares")

// import route-handler callback functions
const userController = require("../controllers/userController");

router.get("/", userController.userTest);
router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get("/login", validateToken, userController.userAuthStatus) 
router.get("/logout", userController.logout)

//routes with the dynamic params should be the last

router.get("/:userId", userController.userTest);



module.exports = router;
