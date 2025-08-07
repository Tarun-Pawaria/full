const bottomModule=require('../models/bottom');


const bottom= async(req,res,next)=>{
  try {
    const bottom = await bottomModule.findOne(); // Fetch all team members
    res.locals.bottom = bottom || [];  // Make it available to all views
    next();
  } catch (error) {
    next(error);
  }

}
module.exports={
    bottom
}