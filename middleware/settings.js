const SettingModel = require('../models/setting');
const trustModule=require('../models/trust')

const setGlobalSettings = async (req, res, next) => {
  try {
    const settings1 = await SettingModel.findOne();
    // Put it in res.locals so all views have access
    res.locals.settings1 = settings1 || {};
    next();
  } catch (error) {
    next(error);
  }
};
 

const trusts = async (req, res, next) => {
  try {
    const trust = await trustModule.findOne();
    // Put it in res.locals so all views have access
    res.locals.trust = trust || {};
    next();
  } catch (error) {
    next(error);
  }
};


module.exports = {
  trusts,
  setGlobalSettings
};
