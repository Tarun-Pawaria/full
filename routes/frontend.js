const express =require('express');
const router =express.Router();
const siteController=require('../controllers/siteController')
const { setMembers, setcertificate,setweare } = require('../middleware/about');
const {bottom}=require('../middleware/bottom')
const {trusts,setGlobalSettings} = require('../middleware/settings');


router.use(trusts);
router.use(setGlobalSettings);

router.use(bottom)
router.use(setMembers);
router.use(setcertificate);
router.use(setweare);


router.get('/', siteController.index);
router.get('/services', siteController.services);
router.get('/aboutus', siteController.aboutus);
router.get('/projects', siteController.projects);
router.get('/contact', siteController.contact);
router.post('/send', siteController.sendmail);


 

module.exports=router; 