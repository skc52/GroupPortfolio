const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = async (req, res, next) => {
    const {token} = req.cookies;
    if (!token){
        return next(new ErrorHandler("Please login", 401));
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedUser);
    req.user = await User.findById(decodedUser.id);
    next();
}

exports.authorizedRoles = (...roles) =>{  
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
           
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        };
        next();
    }   
}