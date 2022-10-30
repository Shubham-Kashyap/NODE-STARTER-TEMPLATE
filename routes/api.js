const url = require('url');
const usercontroller = require('../controllers/api/usercontroller');
const { auth } = require('../middleware/auth');
const { validateRequest, validate3,validate, checkValidate,validateRegisterUser } = require('../utils/validate');

const Router = require('express').Router();

/**
 * ------------------------------------------------------------------------
 * Unprotected routes
 * ------------------------------------------------------------------------
 */
Router.all('*' , (req, res , next) => {
    // const a = re
    Router.post('/signup', validateRequest('signup'),usercontroller.signup);
    Router.post('/login',validateRequest('login'),usercontroller.login);
   
    next();
});

/** 
 * -------------------------------------------------------------------------
 * Protected routes 
 * -------------------------------------------------------------------------
 */
Router.all('*'),auth, (req,res,next ) => {
    Router.post("/fetch-profile", usercontroller.fetchProfile);
    next();
};



module.exports = Router;