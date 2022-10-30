const { User } = require('../config/db');
const { verifyToken } = require('../services/jwt');
const { errorResponse } = require('../utils/response');

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        switch (token) {
            case undefined: {
                throw new Error("Unauthorized access ");
            }
            default: {
                console.log(token);
                var decoded = await verifyToken(token?.split(' ').pop());
                console.log("decoded == ",decoded)
                req.user = await User.findOne({ where: { _id: decoded.id } });
            }
        }
        next();


    }
    catch (error) {
        return errorResponse(res, error.message);
    }

}


exports.auth = authenticateToken;