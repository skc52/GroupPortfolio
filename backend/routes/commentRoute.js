const express = require("express");
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth")
const router = express.Router();
const {addNewComment, addReplies, deleteComment, deleteReply, showCommentsForAProject, editComment, editReply} = require("../controller/commentController");


router.route("/comment/add/:projectId").post(isAuthenticatedUser, addNewComment);
router.route("/comment/add/reply/:commentId").put(isAuthenticatedUser, addReplies);
router.route("/comment/show/:projectId").get(isAuthenticatedUser, showCommentsForAProject);
router.route("/comment/delete/:commentId").delete(isAuthenticatedUser, deleteComment);
router.route("/comment/reply/delete/:commentId/:replyId").put(isAuthenticatedUser, deleteReply);
router.route("/comment/edit/:commentId/:commentUserId").put(isAuthenticatedUser, editComment);
router.route("/comment/reply/edit/:commentId/:replyId/:replyUserId").put(isAuthenticatedUser, editReply);

module.exports  = router;