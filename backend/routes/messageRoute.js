const express = require("express");
const {isAuthenticatedUser} = require("../middleware/auth");
const router = express.Router();
const {sendMessage, showConversation, } = require("../controller/messageController");


router.route("/message/:receiverId").post(isAuthenticatedUser, sendMessage);
router.route("/message/:user2Id").get(isAuthenticatedUser, showConversation);


module.exports = router;