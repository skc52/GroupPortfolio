const mongoose = require("mongoose");
const project = require("./projectModel");
const commentSchema = new mongoose.Schema({
    projectId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
    ,
    comment:{
        type:String,
        required:true,
    },
    commentedAt:{
        type:Date,
        default:Date.now(),
    },
    edited:{
        type:Boolean,
        default:false
    },
    replies:[
        {
            userId:{
                type:String,
            },
            reply:{
                type:String
            },
            repliedAt:{
                type:Date,
                default:Date.now()
            },
            edited:{
                type:Boolean,
                default:false
            }
        }
    ]
})


module.exports = mongoose.model("Comment", commentSchema);