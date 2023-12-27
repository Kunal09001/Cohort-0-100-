const jwt = require("jsonwebtoken");
const {secretpassword} = require("../jwt")

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const verifiedUser = await jwt.verify(token,secretpassword);
    if(!verifiedUser){
        res.status(404).json({
            message : "You are unauthorized to access this page"
        })
        return;
    }
    next();
}

module.exports = adminMiddleware;