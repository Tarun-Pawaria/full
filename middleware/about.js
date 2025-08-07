const aboutModule = require('../models/About');
const certificateModule=require('../models/certificateModule')
const wearemodule=require('../models/wearemodule')


const setMembers = async (req, res, next) => {
  try {
    const aboutMembers = await aboutModule.find(); // Fetch all team members
    res.locals.aboutMembers = aboutMembers || [];  // Make it available to all views
    next();
  } catch (error) {
    next(error);
  }
};
const setcertificate= async(req,res,next)=>{ 
  try {
    const aboutcertificate = await certificateModule.findOne(); // Fetch all team members
    res.locals.aboutcertificate = aboutcertificate || {};  // Make it available to all views
    next();
  } catch (error) {
    next(error);
  }
   

}
const setweare= async(req,res,next)=>{
  try {
    const aboutweare = await wearemodule.findOne(); // Fetch all team members
    res.locals.aboutweare = aboutweare || [];  // Make it available to all views
    next();
  } catch (error) {
    next(error);
  }

}

module.exports = {
  setMembers,
setcertificate,
setweare
};
