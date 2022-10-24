const { body, check, validationResult } = require('express-validator');
const { models } = require('../config/db');
const { errorResponse } = require('./response');


const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return errorResponse(res, errors.array()[0].msg)
        // return res.status(422).send({
        //     status: false,
        //     message: errors.array()[0].msg,
        //     response: []
        // })
    }
    next();
}

const validateRules = (method) => {
    // console.log(method)
    switch (method) {
        case 'signup': {
            console.log('signup case hit')
            return [
                check('fullname', 'fullname field is required').notEmpty().bail(),
                check('email')
                    .notEmpty().withMessage('Email field is required').bail()
                    .exists().withMessage("Emial should not be empty").bail()
                    .isEmail().withMessage("Email sholud be a valid email").bail(),
                // check('email')
                //     .custom(async (value) => {
                //         const data = await models.user.findOne({ email: value });
                //         if (data) {
                //             return Promise.reject('Email already in use');
                //         }
                //     }).bail(),
                check('phone_no').isNumeric().withMessage("Phone number must be numeric").bail()
            ]
        }
        case 'login': {
            check('email')
                .notEmpty().withMessage("Email field is required")
        }

        default: {
            return [];
        }
    }
}




module.exports = {
    validateRequest: (method) => [
        validateRules(method),
        validateResult
    ]
}