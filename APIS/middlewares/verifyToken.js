const jwt = require("jsonwebtoken")
require("dotenv").config()

const checkToken = (req, res, next) => {
    //get token
    let token = req.headers.authorization.split(" ")[1]

    //if token is not there
    if (token == 'null') {
        res.send({ message: "Unauthorized request...Please Login to continue..." })
    }
    //if token is there
    else {
        //validate the token 
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            //if token is expired 
            if (err) {
                res.send({ message: "Session expired..relogin to continue" })
            }
            else {
                next();
            }
        })
    }

}

module.exports = checkToken