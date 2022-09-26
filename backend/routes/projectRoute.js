const express = require("express");
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth");
const router = express.Router();
const {
    addAProject, deleteAProject, getAllProjects, getAProject, updateAProject, getAllFollowedProjects,
    likeProject
    ,filterProject,
    searchProjectByName

} = require("../controller/projectController");

// project routes
router.route("/project/add").post(isAuthenticatedUser,addAProject);
router.route("/project/delete/:id").delete(isAuthenticatedUser, deleteAProject);
router.route("/project/all").get(isAuthenticatedUser, authorizedRoles("admin"),getAllProjects);
router.route("/project/filt").get(isAuthenticatedUser, filterProject);
router.route("/project/search").get(isAuthenticatedUser, searchProjectByName);
router.route("/project/feed").get(isAuthenticatedUser,getAllFollowedProjects);
router.route("/project/:id").get(isAuthenticatedUser, getAProject );
router.route("/project/update/:id").put(isAuthenticatedUser, updateAProject);
router.route("/project/like/:projectId").put(isAuthenticatedUser, likeProject);
module.exports = router;

