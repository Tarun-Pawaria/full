const userModel = require('../models/UserModel');
const SettingModel = require('../models/setting');
const {validationResult} = require('express-validator')
const createError= require('../utils/error-message');
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const fs = require('fs');
const path = require('path');



// GET: Login Page
const loginPage = async (req, res) => {
  res.render('admin/login', {
    layout: false,
    errors: 0
  });
};

// POST: Handle Admin Login (You can implement auth here later)
// const adminLogin = async (req, res) => {
//   const settings1 = await SettingModel.findOne();
//   res.render('admin/index', { settings1 });
// }; 
const adminLogin= async(req,res,next)=>{
    const errors = validationResult(req);
    const settings1 = await SettingModel.findOne();
    if(!errors.isEmpty()){
        //return res.status(400).json({errors: errors.array()});
        return res.render('admin/login',{
            layout :false,
            errors :errors.array(),
            settings1
        })
    }
    const {username,password}=req.body
    try{
        const user = await userModel.findOne({username});
       if (!user || !(await bcrypt.compare(password, user.password))) {
  return res.render('admin/login', {
    layout: false,
    errors: [],
    settings1,
    error: 'Invalid username or password'
  });
}



        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return next(createError('Invalid username or password',401));
        }
        const jwtData={id: user._id,fullname: user.fullname, role: user.role}
        const token = jwt.sign(jwtData, process.env.JWT_SECRET,{expiresIn: '1h'})
       res.cookie('token',token,{httpOnly:true,maxAge:60*60*1000});
       res.redirect('/admin/Home')
    }catch(error){
        // console.error(error);
        // res.status(500).send('Internal Server Error');
        next(error);
    }
}

// GET: Logout Admin

const logout= async(req,res)=>{
   res.clearCookie('token');
    res.redirect('/admin/')
}

// GET: Dashboard Page
const dashboard = async (req, res) => {
 
  res.render('admin/home/index');
};

// GET: Settings Page
const settings = async (req, res, next) => {
  try {
    const settings = await SettingModel.findOne();
    const settings1 = settings; // same settings object reused
    res.render('admin/settings', { settings,settings1});
  } catch (error) {
    next(error);
  }
};

// POST: Save Settings

const saveSettings = async (req, res, next) => {
  const { website_title, footer_description } = req.body;
  const newLogo = req.file ? req.file.filename : null;

  try {
    const existingSettings = await SettingModel.findOne();

    let website_logo = existingSettings?.website_logo;

    // If a new logo is uploaded
    if (newLogo) {
      // Delete old logo file if it exists
      if (website_logo) {
        const oldLogoPath = path.join(__dirname, '..', 'public', 'uploads', website_logo);
        if (fs.existsSync(oldLogoPath)) {
          fs.unlinkSync(oldLogoPath);
        }
      }
      // Use new logo
      website_logo = newLogo;
    }

    // Update the settings
    await SettingModel.findOneAndUpdate(
      {},
      { website_title, website_logo, footer_description },
      { new: true, upsert: true }
    );

    res.redirect('/admin/settings');
  } catch (error) {
    next(error);
  }
};

const allUser= async(req,res)=>{ 
    const users = await userModel.find()
    res.render('admin/users/index',{users})
}

const addUserPage= async(req,res)=>{
     res.render('admin/users/create', {errors:0})
}


const addUser = async (req, res, next) => {
  try {
    const { username, fullname, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('admin/users/create', {
        
        errors: errors.array(),
        error: null,              // ✅ Add this to avoid "error is undefined"
        formData: req.body        // ✅ Optional, for persisting input
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.render('admin/users/create', {
      
        error: 'User with this username already exists',
        errors: [],               // ✅ Prevent crash in partial
        formData: req.body
      });
    }

    // Create new user
    await userModel.create({ username, fullname, password});
    res.redirect('/admin/users');
    
  } catch (error) {
    next(error);
  }
};


const deleteUser= async(req,res,next)=>{
     const id = req.params.id
    try{
        const user = await userModel.findByIdAndDelete(id)
        if(!user){
            return next(createError('User not found',404));
        }
        res.json({success:true})
    }catch(error){
        // console.error(error)
        // res.status(500).send('Internal Server Error')
        next(error)
    }
}


module.exports = {
  loginPage,
  adminLogin,
  logout,
  dashboard,
  saveSettings,
  settings,
  allUser,
  addUserPage,
  addUser,
  deleteUser
};
