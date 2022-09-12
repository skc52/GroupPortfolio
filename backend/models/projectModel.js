const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter your name"],

    },
    description:{
        type:String,
        required:[true, "Please enter a proper project description"],
    },
    
    createdAt:{
        type:Date,
        //there wont be default value for the createdAt
        //users can customize themselves
    },
   
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        },
    ],
    techStack:[
        {
            type:String,
            required:true,
        }
    ],
})


module.exports = mongoose.model("Project", projectSchema);