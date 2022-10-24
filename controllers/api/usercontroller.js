const { models } = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/response");


class UserController {


    signup = async (req, res) => {
        try {

            return successResponse(res, "signup successfull");
        } catch (error) {
            return errorResponse(res, error.message);
        }
    }



    login = (req, res) => {
        try {

            return successResponse(res, "login successfull");
        } catch (error) {
            return errorResponse(res, error.message);
        }
    }
}

module.exports = new UserController();