const express = require("express");
const router = express.Router();
const {validateToken} = require("../middlewares/AuthMiddlewares")

// import route-handler callback functions
const userController = require("../controllers/userController");

// example middleware logging router params if exists on every request
// const logUserParams = (req, res, next) => {
// 	if (req.params) {
// 		//console.log(req.params);
// 	}
// 	next();
// };

// router.use(logUserParams);

// example router handler for https://localhost:3000/user/
// reponds with id param if set


router.get("/", userController.userTest);
router.post('/signup', userController.signUp);
router.post('/login', userController.login);

router.get("/login", validateToken, userController.userAuthStatus)
router.get("/logout", userController.logout)


//routes with the dynamic params should be the last

router.get("/:userId", userController.userTest);






module.exports = router;
