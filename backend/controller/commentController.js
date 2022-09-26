const Project = require("../models/projectModel.js");
const User = require("../models/userModel.js");
const Comment = require("../models/commentModel.js");
const ErrorHandler = require("../utils/errorHandler.js");


exports.addNewComment = async(req, res, next) => {
    try {
        const project = await Project.findById(req.params.projectId);
        const commenter = await User.findById(req.user.id);
        const {comment} = req.body;

        const newComment = await Comment.create({
            projectId:req.params.projectId,
            userId:req.user.id,
            comment,

        })

        project.comments.push(newComment._id);
        await project.save();

        res.status(200).json({
            success:true,
            message:"Comment posted"
        })
    } catch (error) {
        next(error);
    }
}

exports.addReplies = async(req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        const {newReply} = req.body;
        comment.replies.push({
            reply:newReply,
            userId:req.user.id,
        })

        await comment.save();

        res.status(200).json({
            success:true,
            message:"Reply added to the thread"
        })
    } catch (error) {
        next(error)
    }
}


exports.showCommentsForAProject = async(req, res, next) => {
    try {
        //get the project id
        const comments = await Comment.find({projectId:req.params.projectId});
        res.status(200).json({
            success:true,
            comments
        })
    } catch (error) {
        next(error);
    }
}



//delete an entire comment
exports.deleteComment = async(req, res, next) => {
    try {
        //get the commentId
        const comment = await Comment.findById(req.params.commentId);
        if (comment.userId !== req.user.id){
            return next(new ErrorHandler(`User not authorized to delete this comment`));
        }
        if (!comment){
            return next(new ErrorHandler(`Comment does not exist with id: ${req.params.commentId}`));

        }

        await comment.remove();

        res.status(200).json({
            success:true,
            message:"Comment deleted successfully"
        })
    } catch (error) {
        next(error);
    }
}

//delete a reply
exports.deleteReply = async(req, res, next) => {
    try {
        
        const replyID = req.params.replyId;
        const comment = await Comment.findById(req.params.commentId);
        if (!comment){
            return next(new ErrorHandler(`Comment does not exist with id: ${req.params.commentId}`));
        }  
        //not working
        const doesReplyExist = false;
        comment.replies = comment.replies.filter((reply, ind)=>{
            if (reply.id === replyID){
                doesReplyExist = true;
                if(reply.userId !== req.user.id){
                    return next(new ErrorHandler(`User not authorized to delete this reply`));
                }
                return false
            }
            return true
        })

        //check if the reply actually existed if it did not then we have to send an error
        if (!doesReplyExist){
            return next(new ErrorHandler(`Reply with the id ${replyID} does not exist`));
        }
        await comment.save();
        res.status(200).json({
            success:true,
            comment
        })

    } catch (error) {
        next(error)
    }
}
 
//edit a comment
exports.editComment = async(req, res, next) => {
    try {

        if (req.user.id !== req.params.commentUserId){
            return next(new ErrorHandler(`User not authorized to edit this comment`))
        }
        const {editedComment} = req.body;
        const updatedComment = {
            comment:editedComment,
            edited:true
        }
        

        const comment = await Comment.findByIdAndUpdate(req.params.commentId, updatedComment, {
            new:true,
            runValidators:true,
            useFindAndModify:false,
        })
       
        res.status(200).json({
            success:true,
            comment
        });

    } catch (error) {
        next(error);
    }
}

//edit a reply
exports.editReply = async(req, res, next) => {
    try {
        //i need the commentId and the replyId and the userId for the reply
        const comment = await Comment.findById(req.params.commentId);
        const {editedReply} = req.body;
        if (req.user.id !== req.params.replyUserId){
            return next(new ErrorHandler(`User is not authorized to edit this reply`))
        }
        comment.replies = comment.replies.map((reply, ind)=>{
            if (reply.id === req.params.replyId){
                reply.reply = editedReply;
                reply.repliedAt = Date.now();
                reply.edited = true;
                
            }
            return reply
        })
        await comment.save();
        res.status(200).json({
            success:true,
            comment
        });

    } catch (error) {
        next(error);
    }
}