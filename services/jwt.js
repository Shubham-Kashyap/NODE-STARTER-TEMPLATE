const jwt = require('jsonwebtoken');
const { User } = require('../config/db');
const env = require('dotenv').config();



class Auth {
    /**
     * -----------------------------------------------------
     * generate token 
     * -----------------------------------------------------
     * a new jwt token
     */
    generateToken = async (id) => {
        const token = jwt.sign({ id: id }, process.env.AUTH_TOKEN, { expiresIn: "24h" });
        const data = await User.update({ personal_access_token: token }, {
            where: {
                _id: id
            }
        });
        return token;
    }
    /**
    * -----------------------------------------------------
    * verify token 
    * -----------------------------------------------------
    * verifies the the generated token
    */
    verifyToken = async (token) => {

        let decoded = jwt.verify(token, process.env.AUTH_TOKEN);
        return decoded;
    }
}

const obj = new Auth();

exports.generateToken = obj.generateToken;
exports.verifyToken = obj.verifyToken;