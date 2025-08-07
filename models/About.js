 const  mongoose= require('mongoose');
 
 const teamSchema= new mongoose.Schema({
     Membar_Name:{
         type:String,
         require:true
     },
     Membar_image:{
         type:String
     },
     Membar_post:{
         type:String,
         requie:true
     }
 });
 module.exports=mongoose.model('team',teamSchema);