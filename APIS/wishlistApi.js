//create mini exp app
const express = require("express")
const wishlistApiObj = express.Router()
const expressAsyncHandler = require('express-async-handler')
const multerObj = require("./middlewares/addimage")
require("dotenv").config()

wishlistApiObj.use(express.json())

let wishlistCollection;
//get userCollection obj
wishlistApiObj.use((req, res, next) => {
    wishlistCollection = req.app.get("wishlistCollection")
    next();
})

wishlistApiObj.get("/getwishlist/:email", expressAsyncHandler(async (req, res) => {
    console.log("getwishlist", req.params.email)
    let content = await wishlistCollection.findOne({ email: req.params.email })
    console.log("yhi ha asli content", content.wishlist)
    res.send({ message: "success", payload: content.wishlist })
}))

wishlistApiObj.post("/addtowishlist", expressAsyncHandler(async (req, res) => {
    console.log("req.body", req.body)
    let { email, id } = req.body;
    console.log("email id", email, id)
    let oldContent = await wishlistCollection.findOne({ email: email });
    console.log("oldcontent", oldContent)
    if (oldContent) {
        await wishlistCollection.updateOne(
            { email: email },
            { $addToSet: { wishlist: id } }
        );
        res.send({ message: "success", payload: id });
    } else {
        await wishlistCollection.insertOne({
            email: email,
            wishlist: [id],
        });
        res.send({ message: "success", payload: id });
    }
}))

wishlistApiObj.put("/deletefromwishlist", expressAsyncHandler(async (req, res) => {
    console.log("deletefromwishlist req.body", req.body)
    let { email, id } = req.body;
    console.log("deletefromwishlist email id", email, id)
    let oldContent = await wishlistCollection.findOne({ email: email });
    console.log("deletefromwishlist oldcontent", oldContent)
    if (oldContent) {
        await wishlistCollection.updateOne(
            { email: email },
            { $pull: { wishlist: id } }
        );
    }
    res.send({ message: "success" });
}))




module.exports = wishlistApiObj