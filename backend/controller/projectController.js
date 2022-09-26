const Project = require("../models/projectModel.js");
const User = require("../models/userModel.js");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorHandler.js");

//Add a project
exports.addAProject = async (req, res, next) => {
    try {

        const user = await User.findById(req.user.id);

        const {name, description, createdAt, techStack, links } = req.body;

        const creatorID = req.user.id;
        const project = await Project.create({
            name, description, createdAt, techStack, links, creatorID
        })

        user.projects.push(project.id);
        await user.save();
        res.status(200).json({
            success:true,
            project
        })

    } catch (error) {
        next(error);
    }
}
//Delete a project
exports.deleteAProject = async(req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if(!project){
            return next(new ErrorHandler(`Project does not exist with id: ${req.params.id}`));
        }
        if(req.user._id != project.creatorID){
            return next(new ErrorHandler("User not authorized to delete other's project"));
        }

        await project.remove();
        res.status(200).json({
            success:true,
            message:"Project deleted successfully!"
        });

    } catch (error) {
        next(error);
    }
}

//Get all projects
exports.getAllProjects = async (req, res, next) => {
    try {
        const allProjects = await Project.find();
        if(!allProjects){
            return next(new ErrorHandler(`No Projects to show`));
        }
        res.status(200).json({
            success:true,
            allProjects,
        })
    } catch (error) {
        next(error);
    }
}

//Get all projects from the people you follow
exports.getAllFollowedProjects = async(req, res, next) => {
    try {
        const currentUser = await User.findById(req.user.id);
        const allProjects = await Project.find();
        
        //filter the projects based on your following list
        const allFollowedProjects = allProjects.filter((project, ind)=>{
            return currentUser.following.includes(project.creatorID);
        })
        res.status(200).json({
            success:true,
            allFollowedProjects
        })
    } catch (error) {
        next(error)
    }
}

//Get a project
exports.getAProject = async(req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if(!project){
            return next(new ErrorHandler(`Project does not exist with id: ${req.params.id}`));
        }

        res.status(200).json({
            success:true,
            project,
        })

    } catch (error) {
        next(error);
    }
}


//Update a project
exports.updateAProject = async(req, res, next) => {
    try {
        const updatedData = {
            name:req.body.name,
            description:req.body.description,
            links:req.body.links,
            techStack:req.body.techStack,
            createdAt:req.body.createdAt,
        }
        let project = await Project.findById(req.params.id);
        if(req.user._id != project.creatorID){
            return next(new ErrorHandler("User not authorized to update other's project"));
        }
       
        project = await Project.findByIdAndUpdate(req.params.id, updatedData, {
            new:true,
            runValidators:true,
            useFindAndModify:false,
        })
        
        res.status(200).json({
            success:true,
            project
        });
    } catch (error) {
        next(error);
    }
}


//like a project
exports.likeProject = async(req, res, next)=>{
    try {
        //get the projectId
        //get the project
        //get the user id
        //add the user id to the project's like array
        const project = await Project.findById(req.params.projectId);
        // if already likes then unlike
        if (project.likes.includes(req.user.id)){
            project.likes = project.likes.filter((id, ind)=>{
                return id!== req.user.id;
            })
        }
        else{
            project.likes.push(req.user.id);
        }

        await project.save();
        res.status(200).json({
            success:true
        })

    } catch (error) {
        next(error);
    }
}


// searchByName
exports.searchProjectByName = async(req, res, next) => {
    try {
        const {projectName} = req.query;
        const nameSearch = new RegExp(projectName, 'i');
        const projects = await Project.find(
           {nameSearch}
        )
        res.status(200).json({
            success:true,
            projects
        })
    } catch (error) {
        next(error)
    }
}


// filterByTechStack
exports.filterProject = async(req, res, next) => {
   
    try {
        // console.log("here");
        // LISTEN : I probably will have to include the techStack as string in req.query
        const {techStack} = req.body;
        
        const projects = await Project.find(
           {techStack:{$in:techStack}}
        )
        res.status(200).json({
            success:true,
            projects
        })
    } catch (error) {
        next(error);
    }
}






