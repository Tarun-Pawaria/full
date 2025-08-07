const express =require('express');
const router =express.Router();
const upload =require('../middleware/multer');
const isValid =require('../middleware/validation');
const isLoggedIn= require('../middleware/isLoggedin');

const homeController=require('../controllers/homeController.js');
const aboutController=require('../controllers/aboutController.js');
const userController =require('../controllers/userController');

//Login logout Routes
router.get('/', userController.loginPage);
router.post('/index',isValid.loginValidation, userController.adminLogin);
router.get('/logout',userController.logout);

//setting page route
router.get('/settings',isLoggedIn, userController.settings);
router.post('/save-settings',isLoggedIn, upload.single('website_logo'), userController.saveSettings);

//home page  route
router.get('/home',isLoggedIn, homeController.allrecentprojects);
router.get('/recent-Project',isLoggedIn,  homeController.addrecentprojectpage);
router.post('/add-recent-Project',isLoggedIn, upload.single('project_image'), homeController.addrecentproject);
router.delete('/delete-recentprojcet/:id',isLoggedIn, homeController.deleterecentproject);


router.get('/trust',isLoggedIn,homeController.trustpage);
router.post('/trust',isLoggedIn,homeController.Addtrust);


router.get('/bottom',isLoggedIn,homeController.bottompage);
router.post('/bottom',isLoggedIn,homeController.Addbottom);



//about page route

router.get('/about',isLoggedIn,aboutController.index);
router.get('/add-team',isLoggedIn,aboutController.addteampage);
router.post('/add-team', upload.single('Membar_image'), aboutController.addMember);
router.delete('/delete-Membar/:id',isLoggedIn,  aboutController.deleteMembar);


router.get('/certificate',isLoggedIn,aboutController.certificate)
router.post('/certificate/',isLoggedIn,aboutController.addcertificate)

router.get('/weare',isLoggedIn,aboutController.wearepage);
router.post('/weare',isLoggedIn,aboutController.Addweare);


//user Route

router.get('/users',isLoggedIn, userController.allUser);
router.get('/add-user',isLoggedIn,  userController.addUserPage);
router.post('/add-user',isLoggedIn,   isValid.UserValidation, userController.addUser);
router.delete('/delete-user/:id',isLoggedIn,  userController.deleteUser);




 

module.exports=router;