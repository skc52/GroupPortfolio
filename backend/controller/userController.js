


const User = require("../models/userModel.js");
const Project = require("../models/projectModel.js");

const cloudinary = require("cloudinary");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const ErrorHandler = require("../utils/errorHandler.js");
const sendToken = require("../utils/sendToken.js");
const sendEmail = require("../utils/sendEmail.js");
// Registers a User
exports.registerUser = async(req, res, next) => {
    try {
        //firstly, upload the avatar to cloduinary
        // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        //     folder: "portfolio_avatar",
        //     width:150,
        //     crop:"scale",
        // })
        //we will be fetching name, email, and password from the request body
        const {name, email, password} = req.body;

        //now its time to create the user
        const user = await User.create(
            {
                name, email, password,
                // avatar:{
                //     public_id:myCloud.public_id,
                //     url:myCloud.secure_url,
                // }

            }
        );
        sendToken(user, 201, res);
        

    } catch (error) {
        // console.log(error);
        next(error);
    }
}



// Log In User
exports.loginUser = async(req, res, next) => {
    const {email, password} = req.body;

    try {
        // const existingUser = await User.findOne({email}).select("+password");
        const existingUser = await User.findOne({email}, 'password');
        //remember that in userSchema we defined password to be select equals false
        //here we need to include +password show that we can get its value
        if(!existingUser) return next(new ErrorHandler("User does not exist", 404));
      
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return next(new ErrorHandler("Invalid credentials", 401));

        sendToken(existingUser, 200, res)
    } catch (error) {
        next(error);
    }
}


// Log User out
exports.logoutUser = async(req, res, next) =>{

    //set the token as null and you are logged out
    res.cookie("token", null, {
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged Out",
    })


}

//Change password
exports.changePassword = async(req, res, next)=>{
    try {
        const user = await User.findById(req.user.id).select("+password");
        const isPasswordMatched = await user.comparePassword(req.body.prevPassword);
        if (!isPasswordMatched){
            return next(new ErrorHandler("Password is Incorrect!", 400));
        }

        if (req.body.newPassword !== req.body.confirmNewPassword){
            return next(new ErrorHandler("Passwords do not match", 400));
        }

        user.password = req.body.newPassword;
        await user.save();

        sendToken(user, 200, res);

    } catch (error) {
        next(error)
    }
}

//Forgot Password
exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({email:req.body.email});
    if (!user){
        return next(new ErrorHandler("User not found", 404));
    }

    // Get reset password token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Click on the link below to reset your password \n ${resetPasswordUrl}\n\n
    If you have not requested this email then please ignore it.
    `
    try {
        await sendEmail({
            email:user.email,
            subject : "Password Reset Token",
            message
        });

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        })
    } catch (error) {
        //Set the resetToken and expiry to undefined
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message, 500));
    }
}

//Reset Password
exports.resetPassword = async(req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt : Date.now()}
    })

    if (!user){
        return next (new ErrorHandler("Reset password token is invalid or has been expired", 400));
    }

    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();  

    sendToken(user, 200, res);

}

//Send Activate email link
exports.sendActivateLink = async(req, res, next) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if (!user){
            return next(new ErrorHandler("User not found", 404));
        }
    
        //if the account is already activated
        if (!user.isActivated){
            // Get reset password token
            const activateToken = user.getActivateToken();
            await user.save({validateBeforeSave:false});
            const activateEmailUrl = `${req.protocol}://${req.get("host")}/api/v1/account/activate/${activateToken}`;
            const message = `Click on the link below to activate your account \n ${activateEmailUrl}\n\n`
            try {
                await sendEmail({
                    email:user.email,
                    subject : "Account Activation Token",
                    message
                });
        
                res.status(200).json({
                    success:true,
                    message:`Email sent to ${user.email} successfully`,
                })
            } catch (error) {
                //Set the activateToken and expiry to undefined
                user.activateToken = undefined;
                user.activateExpire = undefined;
                await user.save({validateBeforeSave:false});
                return next(new ErrorHandler(error.message, 500));
            }
        }
        else{
            res.status(200).json({
                success:true,
                message:"User is already activated."
            })
        }
    } catch (error) {
        next(error);
    }
   
}

// Activate email
exports.activateAccount = async(req, res, next) => {
   try {
        
        const activateToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
        const user = await User.findOne({
            activateToken,
            activateExpire:{$gt : Date.now()}
        })

        if (!user){
            return next (new ErrorHandler("Activation token is invalid or has been expired", 400));
        }

        user.isActivated = true;
        user.activateToken = undefined;
        user.activateExpire = undefined;

        await user.save();
        sendToken(user, 200, res);
   } catch (error) {
        next(error);
   }
    
}

// update user profile
exports.updateProfile = async(req, res, next) => {
    try {
        const newUserData = {
            name:req.body.name,
            email:req.body.email,
        };

        //lets add cloudinary later
        const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        });
    
        res.status(200).json({
            success:true,
            user
        });
    } catch (error) {
        next(error);
    }
}

//add project to the list
exports.addProjects = async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        //copy projects id and add it to 
        const projectID = req.body.projectID;
        const project = await Project.findById(projectID);

        if (project.creatorID != req.user.id){
            return next(new ErrorHandler("You cannot add this project since it is not yours", 400));
        }
        // TODO: make sure that this is a string
        user.projects.push(projectID);
        await user.save();

        res.status(200).json({
            success:true,
            message:"Project added successfully!",
        })


    } catch (error) {
        next(error);
    }
}

//delete project from the list
exports.deleteProject = async(req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        //copy projects id and add it to 
        const projectID = req.body.projectID;

        user.projects.filter((project, ind)=>{
            return project._id != projectID;
        })
        await user.save();

        res.status(200).json({
            success:true,
            message:"Project deleted successfully!"
        })

    } catch (error) {
        next(error);
    }
}

// filtering and searching




// get all users
exports.getAllUsers = async (req, res, next) =>{
    const allUsers = await User.find();

    res.status(200).json({
        success:true,
        allUsers,
    })
}

//get a single user
exports.getAUser = async(req, res, next)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user){
            return next(new ErrorHandler(`User with id : ${req.params.id} does not exist`));
        }
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        next(error);
    }
}


//Update the role of a user
exports.updateUserRole = async(req, res, next) => {
    try {
        const newUserData = {
            role:req.body.role
        }
    
        //we will add cloudinary later

        const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        });
    
        res.status(200).json({
            success:true,
            message:`User's role changed to ${req.body.role}`
        });
    } catch (error) {
        next(error);
    }
}

// delete a user
exports.deleteUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
        }

        // TODO: we will remove cloudinary 

        await user.remove();
        res.status(200).json({
            success:true,
            message:"User deleted successfully!"
        });
    } catch (error) {
        next(error);
    }
}


exports.sendFollowRequest = async(req, res, next) => {
    try {
        const user2 = await User.findById(req.params.user2id);
        
        //check if user1 follows user2
        //if yes then send an error message
        if (user2.followers.includes(req.user.id)){
            res.status(200).json({
                success:false,
                message:`You already follow ${user2.name}`
            })
        }
        //if no
        //then check if user1 has already sent the follow request
        else{
            if (user2.followRequests.includes(req.user.id)){
                res.status(200).json({
                    success:false,
                    message:`You already sent follow request to ${user2.name}`
                })
            }
            else{
                user2.followRequests.push(req.user.id);
                await user2.save();
                res.status(200).json({
                    success:true,
                    message:`You sent follow request to ${user2.name}`,
                })
            }
        }
    } catch (error) {
        next(error);
    }
}


exports.acceptFollowRequest = async(req, res, next) => {
    try {
        const user2 = await User.findById(req.params.user2id);
        const user1 = await User.findById(req.user.id);
        //check if user2 follows user1
        if (user1.followers.includes(req.params.user2id)){
            res.status(200).json({
                success:false,
                message: `${user2.name} already follows you`
            })
        }

        else{
            if (user1.followRequests.includes(req.params.user2id)){
                user1.followers.push(req.params.user2id);
                user2.following.push(req.user.id);
                //delete the follow request
                user1.followRequests = user1.followRequests.filter((id, ind)=>{
                    return id !== req.params.user2id;
                })

                await user1.save();
                await user2.save();

                res.status(200).json({
                    success:true,
                    message:`${user2.name} now follows you`,
                })
            }

            else{
                res.status(200).json({
                    success:false,
                    message:`There is no follow request from ${user2.name}`
                })
            }
        }
    } catch (error) {
        next(error);
    }
}


exports.unfollow = async(req, res, next) => {
    try {
        //you are user1
        //you want to unfollow user2
        //remove user2 from user1 following list
        //remove user1 from user2 followers list
        const user1 = await User.findById(req.user.id);
        const user2 = await User.findById(req.params.user2id);

        //check if user1 follows user2
        if (user1.following.includes(req.params.user2id)){
            //remove
            user1.following = user1.following.filter((id, ind)=>{
                return id !== req.params.user2id;
            })
            user2.followers = user2.followers.filter((id, ind)=>{
                return id !== req.user.id;
            })

            await user1.save();
            await user2.save();
            res.status(200).json({
                success:true,
                message:`You unfollowed ${user2.name}`
            })
        }
        else{
            res.status(200).json({
                success:false,
                message:`You don't follow ${user2.name}`
            })
        }
    } catch (error) {
        next(error);
    }
}


exports.removeFollowing = async(req, res, next) => {
    try {
        //user1 removes user2 from his followers list
        //user2 following list automatically gets updated
        const user1 = await User.findById(req.user.id);
        const user2 = await User.findById(req.params.user2id);

        if (user1.followers.includes(req.params.user2id)){
            user1.followers = user1.followers.filter((id, ind)=>{
                return id!== req.params.user2id;
            })
            user2.following = user2.following.filter((id, ind)=>{
                return id!== req.user.id;
            })
            await user1.save();
            await user2.save();
            res.status(200).json({
                success:true,
                message:`You removed ${user2.name} from your following`
            })

        }
        else{
            res.status(200).json({
                success:false,
                message:`${user2.name} does not follow you`
            })
        }

    } catch (error) {
        next(error)
    }
}


// give the number of followers

// give the number of following


// TODO: update the location of the user

// TODO : add/update work experience


