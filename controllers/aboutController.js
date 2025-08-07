const moongoose =require('mongoose');
const aboutModule=require('../models/About');
const path = require('path');
const fs = require('fs');
const certificateModule=require('../models/certificateModule');
const wearemodule=require('../models/wearemodule')


const index =async (req,res,next)=>{
     const about = await aboutModule.find()
        res.render('admin/about/index',{about})
       // res.json({about})
}

const addteampage=async(req,res,next)=>{
    res.render('admin/about/create',{errors:0})
}

const addMember = async (req, res, next) => {
  const { Membar_Name, Membar_post } = req.body;
  const Membar_image = req.file ? req.file.filename : null;

  try {
    const newMember = new aboutModule({
      Membar_Name,
      Membar_post,
      Membar_image
    });

    await newMember.save();

    res.redirect('/admin/about'); // or wherever you want to redirect
  } catch (error) {
    next(error);
  }
};

const createError= require('../utils/error-message');

const deleteMembar = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await  aboutModule.findByIdAndDelete(id);

    if (!user) {
      return next(createError(404, 'User not found'));
    }

    // If user has an image, delete it from the filesystem
    if (user.Membar_image) {
      const imagePath = path.join(__dirname, '..', 'public', 'uploads', user.Membar_image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

// GET certificate page
const certificate = async (req, res, next) => {
  try {
    const certificateData = await certificateModule.findOne();
    res.render('admin/certificate&client/index', { certificates: certificateData });
  } catch (error) {
    next(error);
  }
};

// POST / add/update certificate
const addcertificate = async (req, res, next) => {
  try {
    const { certificate, certificate_title } = req.body;

    if (!certificate || certificate.trim() === '') {
      return res.status(400).send('Certificate description is required.');
    }

    if (!certificate_title || certificate_title.trim() === '') {
      return res.status(400).send('Certificate title is required.');
    }

    await certificateModule.findOneAndUpdate(
      {},
      {
        certificate: certificate.trim(),
        certificate_title: certificate_title.trim()
      },
      {
        upsert: true,
        new: true
      }
    );

    res.redirect('/admin/certificate/');
  } catch (error) {
    next(error);
  }
};



const wearepage=async(req,res,next)=>{
  try {
    const weareData = await wearemodule.findOne(); // Gets the first certificate
    res.render('admin/weare/index', { Description: weareData }); // adjust view name
  } catch (error) {
    next(error);
  }
}

const Addweare=async(req,res,next)=>{
   try {
    const {Description} = req.body;

    if (!Description || Description.trim() === '') {
      return res.status(400).send('we are field is required.');
    }

    await wearemodule.findOneAndUpdate(
      {},
      { Description: Description.trim() },
      { upsert: true, new: true }
    );

    res.redirect('/admin/weare/');
  } catch (error) {
    next(error);
  }
}


module.exports={
    index,
    addteampage,
    addMember,
    deleteMembar,
    certificate,
    addcertificate,
    wearepage,
    Addweare
}