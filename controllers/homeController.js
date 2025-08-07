const userModel = require('../models/UserModel');
const homeModel = require('../models/Home');
const {validationResult} = require('express-validator')
const createError= require('../utils/error-message');
const jwt =require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const trustModule=require('../models/trust');
const bottomModule=require('../models/bottom');


const  addrecentprojectpage = async (req, res, next) => {
  try {
    const home = await homeModel.findOne();    
    res.render('admin/home/create', { home});
  } catch (error) {
    next(error);
  }
};


const allrecentprojects = async (req, res, next) => {
  try {
    const projects = await homeModel.find({});
    res.render('admin/home/index', { project: projects }); // make sure your EJS file path matches
  } catch (error) {
    next(error);
  }
};


// const Project1 = require('../models/project'); // Adjust path as needed

const addrecentproject = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('admin/home/create', {
        home: await homeModel.findOne(),
        errors: errors.array()
      });
    }

    const { Project_title, project_description } = req.body;
    const project_image = req.file ? req.file.filename : null;

    const newProject = new homeModel({
      Project_title,
      project_description,
      project_image
    });

    await newProject.save();

    res.redirect('/admin/home'); // Or wherever you want to redirect after success
  } catch (error) {
    next(error);
  }
};




const deleterecentproject = async (req, res, next) => {
  try {
    const project = await homeModel.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Delete image file if it exists
    if (project.project_image) {
      const imagePath = path.join(__dirname, '..', 'public', 'uploads',  project.project_image);
      fs.unlink(imagePath, (err) => {
        if (err && err.code !== 'ENOENT') {
          console.error('Error deleting image:', err);
        }
      });
    }

    // Delete project from database
    await homeModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

const trustpage=async(req,res,next)=>{
   try {
      const trustData = await trustModule.findOne(); // Gets the first certificate
      res.render('admin/trust/index', { trust: trustData }); // adjust view name
    } catch (error) {
      next(error);
    }

}

const Addtrust=async(req, res, next)=>{
  try {
      const {trust_title,trust_Description} = req.body;
  
      if (!trust_title || trust_title.trim() === '') {
        return res.status(400).send('Title field is required.');
      }
      if (!trust_Description || trust_Description.trim() === '') {
        return res.status(400).send('Description field is required.');
      }
  
      await trustModule.findOneAndUpdate(
        {},
        {trust_title:trust_title.trim(),
        trust_Description: trust_Description.trim() },
        { upsert: true, new: true }
      );
  
      res.redirect('/admin/trust');
    } catch (error) {
      next(error);
    }

}

const bottompage=async(req,res,next)=>{
   try {
      const bottomData = await bottomModule.findOne(); // Gets the first certificate
      res.render('admin/bottom/index', { bottom: bottomData }); // adjust view name
    } catch (error) {
      next(error);
    }

}

const Addbottom=async(req, res, next)=>{
  try {
      const {bottom_title,bottom_Description} = req.body;
  
      if (!bottom_title || bottom_title.trim() === '') {
        return res.status(400).send('Title field is required.');
      }
      if (!bottom_Description || bottom_Description.trim() === '') {
        return res.status(400).send('Description field is required.');
      }
  
      await bottomModule.findOneAndUpdate(
        {},
        {bottom_title:bottom_title.trim(),
        bottom_Description: bottom_Description.trim() },
        { upsert: true, new: true }
      );
  
      res.redirect('/admin/bottom');
    } catch (error) {
      next(error);
    }

}


module.exports={
    allrecentprojects,
 addrecentprojectpage,
 addrecentproject,
 deleterecentproject,
 trustpage,
 Addtrust,
 bottompage,
 Addbottom
}