const  mongoose= require('mongoose');

const trustSchema= new mongoose.Schema({
    trust_title:{
        type:String,
        require:true
    },
    trust_Description:{
        type:String,
        requie:true
    }
});
module.exports=mongoose.model('trust',trustSchema);