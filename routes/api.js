const usercontroller = require('../controllers/api/usercontroller');
const { auth } = require('../middleware/auth');
const { validateRequest } = require('../utils/validate');

const Router = require('express').Router();

Router.all("*", (req, res, next) => {


    const method = req.originalUrl.split('/').pop();
    Router.all('*', validateRequest(method), (req, res) => {
        /** auth routes start */
        Router.post('/signup', usercontroller.signup);
        Router.post('/login', usercontroller.login);
        /** auth routes end */

        Router.post('/fetch-profile', auth, usercontroller.fetchProfile);



        next();
    });
    next();
})



module.exports = Router;