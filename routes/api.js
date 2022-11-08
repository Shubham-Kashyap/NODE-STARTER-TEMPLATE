const url = require('url');
const usercontroller = require('../controllers/api/usercontroller');
const { auth } = require('../middleware/auth');
const { validateRequest } = require('../utils/validate');

const Router = require('express').Router();


Router.all('*', (req, res, next) => {


    /**
     * -------------------------------------------------------------------------
     * Unprotected routes 
     * -------------------------------------------------------------------------
     */

    /** @auth_routes start */
    Router.post('/signup', validateRequest('signup'), usercontroller.signup);
    Router.post('/login', validateRequest('login'), usercontroller.login);
    /** @auth_routes end */



    /**
     * -------------------------------------------------------------------------
     * Protected routes 
     * -------------------------------------------------------------------------
     */
    Router.all('*', auth, () => {
        Router.post('/fetch-profile', usercontroller.fetchProfile);

    })
    next();
});





module.exports = Router;