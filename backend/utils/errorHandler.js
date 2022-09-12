class ErrorHandler extends Error {
    constructor (message, statusCode){
        super(message);
        this.statusCode = statusCode;

        
        //this will not show the class ErrorHandler in the stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;