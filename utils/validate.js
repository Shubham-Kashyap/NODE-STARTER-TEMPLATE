const { check, validationResult } = require('express-validator');
const { models } = require('../config/db');
const { compareHash } = require('../services/crypto');
const { errorResponse } = require('./response');


const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return errorResponse(res, errors.array()[0].msg);
    } else {
        next();
    }

}

const validateRules = (method) => {
    // console.log(method)
    switch (method) {
        case 'signup': {
            console.log("======== signup ==========")
           return [
                check('fullname')
                    .notEmpty().withMessage('fullname field is required').bail(),
                check('email')
                    .notEmpty().withMessage('Email field is required').bail()
                    .exists().withMessage("Email should not be empty").bail()
                    .isEmail().withMessage("Email sholud be a valid email").bail()
                    .custom(async (value) => {
                        const data = await models.User.findOne({ where: { email: value } });
                        if (data) {
                            return Promise.reject('Email already in use');
                        }
                    }).bail(),
                check('phone_no')
                    .isNumeric().withMessage("Phone number must be numeric").bail()
                    .custom(async (value) => {
                        const data = await models.User.findOne({ where: { phone_no: value } });
                        if (data) {
                            return Promise.reject('Phone number is already in use');
                        }
                    }).bail(),
                check('password')
                    .notEmpty().withMessage('Password field is required').bail()
                    .exists().withMessage("Password should not be empty").bail(),
            ];
           
            return rules;
        }
        case 'login': {
            console.log("===== login ======")
           return [
                check('email')
                    .notEmpty().withMessage('Email field is required').bail()
                    .exists().withMessage("Emial should not be empty").bail()
                    .custom(async (value) => {
                        const data = await models.User.findOne({ where: { email: value } });
                        if (!data) {
                            return Promise.reject('User not found');
                        }
                    }).bail(),
                check('password')
                    .notEmpty().withMessage('Password field is required').bail()
                    .exists().withMessage("Password should not be empty").bail(),
                check('password').custom(async (value, { req }) => {
                    const user = await models.User.findOne({ where: { email: req.body.email } });
                    const is_valid = await compareHash(req.body.password, user?.password);
                    if (!is_valid) {
                        return Promise.reject('Incorrect password');
                    }
                }),
            ]
            
            return rules;
        }
        case 'fetch-profile' : {
            console.log("============ fetch profile ===============")
            return [    
            ]
        }
        default: {
            console.log("===== default rule ======");
            return [];
        }
    }
}




module.exports = {
    validateRequest: (method) => [
        validateRules(method),
        validateResult
    ],
}