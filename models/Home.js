const  mongoose= require('mongoose');

const projectSchema= new mongoose.Schema({
    Project_title:{
        type:String,
        require:true
    },
    project_image:{
        type:String
    },
    project_description:{
        type:String,
        requie:true
    }
});
module.exports=mongoose.model('project',projectSchema);