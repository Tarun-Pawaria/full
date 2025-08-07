const  mongoose= require('mongoose');

const bottomSchema= new mongoose.Schema({
    bottom_title:{
        type:String,
        require:true
    },
    bottom_Description:{
        type:String,
        requie:true
    }
}); 
module.exports=mongoose.model('bottom',bottomSchema);