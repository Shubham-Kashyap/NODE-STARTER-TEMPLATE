const usercontroller = require('../controllers/api/usercontroller');
const { validateRequest } = require('../utils/validate');

const Router = require('express').Router();

Router.all("*", (req, res, next) => {


    const method = req.originalUrl.split('/').pop();
    Router.all('*', validateRequest(method), (req, res) => {
        Router.post('/signup', usercontroller.signup);
        next();
    });
    next();
})



module.exports = Router;