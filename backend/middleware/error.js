const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    console.log("deibce")
    //wrong MongoDB ID error
    if (err.name ==="CastError"){
        const message = `Resource not found. Invalid:${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //Mongo duplicate key error
    if(err.code === 11000){
        console.log("Hello");
        const message = `Duplicate ${Object.keys(err.keyValue)} entered` ;
        err = new ErrorHandler(message, err.statusCode);
    }

    //Wrong JWT error
    if(err.name === "JsonWebTokenError") {
        const message = `JSON web token is invalid, Try Again`;
        err = new ErrorHandler(message, err.statusCode);
    }

    //JWT expired error
    if(err.name === "TokenExpiredError") {
        const message = "JSON web token is expired, Try Again";
        err = new ErrorHandler(message, err.statusCode);
    }


    res.status(err.statusCode).json({
        success:false,
        error:err.message,
    })
}

/*
    the job of the error middleware is to customize some error properties and
    send the json response
    this is why we donot send any json response in catch part
    because whenever the program encounters an eroor this middleware comes into play
*/