//create a route
const express = require("express")
const adminApiObj = express.Router()
const expressAsyncHandler = require("express-async-handler")
const multerObj = require("./middlewares/addimage")
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
require("dotenv").config()


//body parser middleware
adminApiObj.use(express.json())

let adminCollection;
adminApiObj.use((req, res, next) => {
    adminCollection = req.app.get("adminCollection");
    next();
})

adminApiObj.post("/register", multerObj.single('photo'), expressAsyncHandler(async (req, res) => {
    console.log("new user", req.body.userObj);
    const newUser = JSON.parse(req.body.userObj)

    //add img cdn link to newuser
    newUser.image = req.file.path

    let user = await adminCollection.findOne({ username: newUser.username })
    if (user === null) {
        //use await as hashing the pass is also async
        let hashedPassword = await bcryptjs.hash(newUser.password, 6)
        newUser.password = hashedPassword
        await adminCollection.insertOne(newUser)
        res.send({ message: "success" })
    }
    else {
        res.send({ message: "user already exists" })
    }
}))










//admin login
adminApiObj.post('/login', expressAsyncHandler(async (req, res) => {
    //get user cred
    let adminCredentialsObj = req.body
    // console.log('user cred',adminCredentialsObj)
    //find user by username
    let user = await adminCollection.findOne({ username: adminCredentialsObj.username })
    console.log('user fecthed details', user)
    //if user is not there 
    if (user === undefined || user === null) {
        res.send({ message: "Invalid username" })
    }
    else {
        //compare password
        let status = await bcryptjs.compare(adminCredentialsObj.password, user.password)
        console.log('usercred pass', adminCredentialsObj.password)
        // console.log('status',status)
        // let status = (adminCredentialsObj.password === user.password)
        console.log(status)
        if (status === false) {
            res.send({ message: "Invalid password" })
        }
        else {
            //create and send token
            let signedToken = await jwt.sign({ username: user.username }, process.env.SECRET)
            //send token in response
            res.send({ message: "success", token: signedToken, user: user })
        }
    }
}))



module.exports = adminApiObj;