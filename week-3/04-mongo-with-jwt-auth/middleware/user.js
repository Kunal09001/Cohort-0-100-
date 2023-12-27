const jwt = require("jsonwebtoken");
const {secretpassword} = require("../jwt")


function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    //console.log(token);
    const jwtVerified = jwt.verify(token,secretpassword);
    if(!jwtVerified){
        res.status(400).json({
            message : "You are unauthorized to access this webpage"
        })
        return;
    }
    res.locals.username = jwtVerified.username 
    next();
}

module.exports = userMiddleware;