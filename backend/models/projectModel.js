const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    creatorID:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:[true, "Please enter project's name"],
    },
    description:{
        type:String,
        required:[true, "Please enter a proper project description"],
    },
    createdAt:{
        type:Date,
        default:Date.now()
        //there wont be default value for the createdAt
        //users can customize themselves
    },
    links:[
       {
        name:{
            type:String,
            required:true,
        },
        url:{
           type:String,
           required:true, 
        }
       }
    ],

    likes:[
        {
            type:String// store the user id 
        }
    ],
    comments:[
        {
            commentId:{
                type:String
            }
        }
    ],
    
    // images:[
    //     {
    //         public_id:{
    //             type:String,
    //             required:true,
    //         },
    //         url:{
    //             type:String,
    //             required:true,
    //         }
    //     },
    // ],
    techStack:[
        {
            type:String,
            required:true,
        }
    ],
})


module.exports = mongoose.model("Project", projectSchema);