const User = require("../models/userModel.js");
const Message = require("../models/messageModel");
const ErrorHandler = require("../utils/errorHandler.js");

exports.sendMessage = async(req, res, next) => {
    try {
        const senderID = req.user.id;
        const receiverID = req.params.receiverId;
        const content = req.body.content;
        const newMessage = await Message.create({
            senderID,
            receiverID,
            content
        });

        res.status(200).json({
            success:true,
            newMessage,
        })

    } catch (error) {
        next(error);
    }
}


exports.showConversation = async(req, res, next) => {
    try {
        const user2 = req.params.user2Id;
        const user1 = req.user.id; //user1 is you
        const messages = await Message.find({
            $or : [
                {
                    "senderID":user1,
                    "receiverID":user2
                }
                ,
                {
                    "senderID":user2,
                    "receiverID":user1
                }

            ]
        })

        res.status(200).json({
            success:true,
            messages
        })

    } catch (error) {
        next(error);
    }
}



