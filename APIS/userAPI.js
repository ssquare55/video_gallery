//create mini exp app
const express = require("express")
const userApiObj = express.Router()
const expressAsyncHandler = require('express-async-handler')
const multerObj = require("./middlewares/addimage")
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const ObjectId = require("mongodb").ObjectId
require("dotenv").config()

//body parser middleware
userApiObj.use(express.json())

let userCollection;
//get userCollection obj
userApiObj.use((req, res, next) => {
    userCollection = req.app.get("userCollection")
    next();
})

userApiObj.post("/register", multerObj.single('photo'), expressAsyncHandler(async (req, res) => {
    console.log("new user", req.body.userObj);
    const newUser = JSON.parse(req.body.userObj)

    //add img cdn link to newuser
    newUser.image = req.file.path
    console.log("new user", newUser);

    let user = await userCollection.findOne({ username: newUser.username })
    console.log("user", user)
    if (user === null) {
        //use await as hashing the pass is also async
        let hashedPassword = await bcryptjs.hash(newUser.password, 6)
        newUser.password = hashedPassword
        await userCollection.insertOne(newUser)
        res.send({ message: "success" })
    }
    else {
        res.send({ message: "user already exists" })
    }
}))

//user login
userApiObj.post('/login', expressAsyncHandler(async (req, res) => {
    //get user cred
    let userCredentialsObj = req.body
    console.log('user cred', userCredentialsObj)
    //find user by username
    let user = await userCollection.findOne({ username: userCredentialsObj.username })
    console.log('user fetched details', user)
    //if user is not there 
    if (user === undefined || user === null) {
        res.send({ message: "Invalid username" })
    }
    else {
        //compare password
        let status = await bcryptjs.compare(userCredentialsObj.password, user.password)
        console.log('usercred pass', userCredentialsObj.password)
        console.log('user pass', user.password)
        console.log('status', status)
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


userApiObj.put("/editfromuser", expressAsyncHandler(async (req, res) => {
    console.log("editfromuser req.body", req.body)
    let user = req.body;
    let id = user._id;
    delete user._id
    await userCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: user }
    );
    res.send({ message: "success" });
}))








module.exports = userApiObj