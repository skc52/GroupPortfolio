const express = require("express");
const { getAllUsers, registerUser, loginUser, logoutUser , changePassword, forgotPassword, resetPassword} = require("../controller/userController");
const {isAuthenticatedUser} = require("../middleware/auth")
const router = express.Router();

router.route("/users").get(getAllUsers);
router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").get(isAuthenticatedUser, logoutUser);
router.route("/changePassword").put(isAuthenticatedUser, changePassword);
router.route("/password/forgot").post(isAuthenticatedUser, forgotPassword);
router.route("/password/reset/:token").put(isAuthenticatedUser, resetPassword);
module.exports  = router;