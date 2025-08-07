const moongoose =require('mongoose');

const homemodel=require('../models/Home')

//const {validationResult} = require('express-validator');

// const categoryModel =require('../models/Category');
// const newsModel =require('../models/News');
// const userModel =require('../models/User');
// const CommentModel =require('../models/Comment');

const index = async (req, res, next) => {
  try {
    const recentProjects = await homemodel.find().limit(6).sort({ _id: -1 }); // limit optional
    res.render('index', { recentProjects }); // Pass data to your view
  } catch (error) {
    next(error);
  }
};

const aboutus= async(req,res)=>{
    res.render('aboutus')
}
const contact= async(req,res)=>{
    res.render('contact')
}
const services= async(req,res)=>{
    res.render('services')
}
const projects= async(req,res)=>{
    try {
    const recentProjects = await homemodel.find(); 
    res.render('projects', { recentProjects }); // Pass data to your view
  } catch (error) {
    next(error);
  }
   
}

// const express = require('express');
// const router = express.Router();
const nodemailer = require('nodemailer');

const sendmail= async(req,res)=>{

  const { name, _replyto, phone, message } = req.body;

  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or "SendGrid", "Outlook", or use `host` & `port` if self-hosted
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${_replyto}>`,
      to: process.env.RECEIVER_EMAIL, // site owner's email
      subject: 'New Contact Form Submission',
      html: `
        <h3>New Message from Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${_replyto}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
     
    res.redirect('/contact?success=true'); // or render a thank you page
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('An error occurred while sending your message.');
  }
};


// module.exports = router;











module.exports={
    index,
    services,
    contact,
    aboutus,
    projects,
    sendmail
}

