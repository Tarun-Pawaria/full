const  mongoose= require('mongoose');

const settingSchema= new mongoose.Schema({
    website_title:{
        type:String,
        require:true
    },
    website_logo:{
        type:String
    }, 
    footer_description:{
        type:String,
        requie:true
    }
});
module.exports=mongoose.model('Setting',settingSchema);