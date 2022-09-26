const express = require("express");
const { getAllUsers, registerUser,
     loginUser, logoutUser , changePassword,
      forgotPassword, resetPassword,
       sendActivateLink, activateAccount,
        getAUser,
        updateUserRole,
        updateProfile,
        deleteProject,
        deleteUser,
        addProjects,
        sendFollowRequest,
        acceptFollowRequest,
        unfollow
    } = require("../controller/userController");
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth")
const router = express.Router();


//user routes
router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").get(isAuthenticatedUser, logoutUser);
router.route("/changePassword").put(isAuthenticatedUser, changePassword);
router.route("/password/forgot").post(isAuthenticatedUser, forgotPassword);
router.route("/password/reset/:token").put(isAuthenticatedUser, resetPassword);
router.route("/account/sendactivate").post(isAuthenticatedUser, sendActivateLink);
router.route("/account/activate/:token").put(isAuthenticatedUser, activateAccount);
router.route("/addProjects").put(isAuthenticatedUser, addProjects); // TO CHECK
router.route("/deleteProject").delete(isAuthenticatedUser, deleteProject);//TO CHECK
router.route("/account/updateProfile").put(isAuthenticatedUser, updateProfile);
router.route("/connect/sendRequest/:user2id").put(isAuthenticatedUser, sendFollowRequest);
router.route("/connect/accept/:user2id").put(isAuthenticatedUser, acceptFollowRequest);
router.route("/connect/delete/:user2id").put(isAuthenticatedUser, unfollow);
// admin routes
router.route("/user/updateRole/:id").put(isAuthenticatedUser, authorizedRoles("admin"), updateUserRole);
router.route("/user/delete/:id").delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);
router.route("/users").get(isAuthenticatedUser, authorizedRoles("admin"),getAllUsers);
router.route("/user/:id").get(isAuthenticatedUser, authorizedRoles("admin"),getAUser);

module.exports  = router;