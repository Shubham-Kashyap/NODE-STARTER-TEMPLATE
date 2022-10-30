const { models, User } = require("../../config/db");
const { encryptHash, compareHash } = require("../../services/crypto");
const { generateToken } = require("../../services/jwt");
const { successResponse, errorResponse } = require("../../utils/response");
const {sendMail} = require('../../services/mail');
let _request = {};
class UserController {


    signup = async (req, res) => {
        try {
            _request = req.body;
            var data = await User.create({
                name: _request.name,
                email: _request.email,
                phone_no: _request.phone_no,
                DOB: _request.dob,
                age: _request.age,
                role: 'user',
                password: await encryptHash(_request.password),
                location: _request.location,
            });
            const personalAccessToken = await generateToken(data?._id, '24h');
            data.personal_access_token = personalAccessToken;
            console.log(`${req.protocol}://${req.get('host')}`)
            const emailData = {
                email : data?.email,
                name: data?.name,
                link: `${req.protocol}://${req.get('host')}/api/v1/verify/${personalAccessToken}`
            };
            // sendMail(data?.email,emailData );
            return successResponse(res, "signup successfull !", data);
        } catch (error) {
            return errorResponse(res, error.message);
        }
    }
    /**
     * --------------------------------------------------
     * Login 
     * --------------------------------------------------
     */
    login = async (req, res) => {
        try {
            _request = req.body;
            const user = await User.findOne({ where: { email: req.body.email } });
            const personalAccessToken = await generateToken(user?._id, '24h');
            user.personal_access_token = personalAccessToken;
            if (!user) {
                throw new Error("Invalid email")
            }
            return successResponse(res, "login successfull !", user);

        } catch (error) {
            return errorResponse(res, error.message)
        }
    }
    /**
     * --------------------------------------------------
     * fetch profile 
     * --------------------------------------------------
     */
    fetchProfile = async (req, res) => {
        try {
            return successResponse(res, "profile fetched successfully", req?.user);

        } catch (error) {
            return errorResponse(res, error.message)
        }
    }
    /**
     * --------------------------------------------------
     * verify user 
     * --------------------------------------------------
     */
    verifyUser = async (req, res) => {

        try {
            const tokenId = req.params.tokenId;
            const data = await User.findOne({
                where: {
                    personal_access_token: tokenId
                }
            })
            if (!tokenId) {
                return errorResponse(res, "Invalid link")
            }
            if (tokenId && data) {
                await User.update({ is_email_verified: '1' }, {
                    where: {
                        personal_access_token: tokenId
                    }
                });
            }

            return successResponse(res, "Invalid link")
        } catch (error) {
            return errorResponse(res, error.message)
        }
    }
}

module.exports = new UserController();