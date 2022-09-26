const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderID:{
        type:String,
        required:true
    },
    receiverID:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    sentAt:{
        type:Date,
        default:Date.now(),
    },

})

module.exports = mongoose.model("Message", messageSchema);