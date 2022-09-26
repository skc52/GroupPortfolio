const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendToken = require("../utils/sendToken");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter your name"], 
    },
    email:{
        type:String,
        required:[true, "Please enter your Email"],
        unique:true,
        validate:[validator.isEmail, "Please enter valid Email"],
    },
    password:{
        type:String,
        required:[true, "Please enter your password"],
        minLength:[8, "Password should have at least 8 characters"],
        select:false,//when quering password should not be shown
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    projects:[
        {
            type:String,
        }
    ],

    //TODO :  add Location too - using react library we can get the location too

    //TODO : what about work experience - People put in work experience too
    
    followers:[
        {
            type:String,
        }
    ],
    following:[
        {
            type:String,
        }
    ],
    followRequests:[
        {
            type:String,
        }
    ],
    
    // avatar:{
        
    //     public_id:{
    //         type:String,
    //         required:true
    //     },
    //     url:{
    //         type:String,
    //         required:true
    //     },
    // },
    role:{
        type:String,
        default:"user",
    },
   
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    activateToken:String,
    activateExpire:Date,
    isActivated:{
        type:Boolean,
        default:false,
    }

})


//hashing the password before saving the user
// we cannot use this inside arrow function
userSchema.pre("save", async function(next){
    //there will many instances of saving the user
    //but we only want to hash the password when we are
    // either creating the user or changing password
    if (this.isModified("password")){
        this.password = await bcryptjs.hash(this.password, 10);
    }
    next();
})

//compare password 
userSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password, this.password);
}

//JWT token
userSchema.methods.getJWTToken = function(){
    return jwt.sign(
    {
        id:this._id
    }
    ,
    process.env.JWT_SECRET,
    {
        expiresIn:process.env.JWT_EXPIRY,
    }
    )
}

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    // Hashing resetToken and then adding it to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}

userSchema.methods.getActivateToken = function(){
    const activateToken = crypto.randomBytes(20).toString("hex");
    // Hashing activateToken and then adding it to userSchema
    this.activateToken = crypto.createHash("sha256").update(activateToken).digest("hex");
    this.activateExpire = Date.now() + 15*60*1000;
    return activateToken;
}


module.exports = mongoose.model("User", userSchema);