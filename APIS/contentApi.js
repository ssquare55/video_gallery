//create a route
const express = require("express")
const contentApiObj = express.Router()
const expressAsyncHandler = require("express-async-handler")
const multerObj = require("./middlewares/addimage")
const ObjectId = require("mongodb").ObjectId

//body parser middleware
contentApiObj.use(express.json())

let contentCollection;
contentApiObj.use((req, res, next) => {
    contentCollection = req.app.get("contentCollection");
    next();
})


//add content
contentApiObj.post("/addcontent", multerObj.array('poster', 2), expressAsyncHandler(async (req, res) => {
    //get contentobj
    console.log("addcontent")
    console.log(req)
    console.log(req.body.contentObj)
    const contentObj = JSON.parse(req.body.contentObj)
    // contentObj.image = req.file.path;

    var imageUrlList = [];

    for (var i = 0; i < req.files.length; i++) {
        var localFilePath = req.files[i].path;
        imageUrlList.push(localFilePath);
    }

    contentObj.image = [...imageUrlList];

    // contentObj.image1 = req.file.path;
    // console.log(contentObj)
    // //save to content collection 
    await contentCollection.insertOne(contentObj)
    // //send res
    res.send({ message: "new content created" })

}))

contentApiObj.get("/getcontent", expressAsyncHandler(async (req, res) => {
    console.log("getcontent")
    let content = await contentCollection.find().toArray()
    res.send({ message: "success", payload: content })
}))

contentApiObj.put("/deletefromcontent", expressAsyncHandler(async (req, res) => {
    console.log("deletefromcontent req.body", req.body)
    let { id } = req.body;
    console.log("deletefromcontent id", id)
    await contentCollection.deleteOne(
        { _id: ObjectId(id) },
    );
    res.send({ message: "success" });
}))

contentApiObj.put("/editfromcontent", expressAsyncHandler(async (req, res) => {
    console.log("editfromcontent req.body", req.body)
    let content = req.body;
    let id = content._id;
    delete content._id
    await contentCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: content }
    );
    res.send({ message: "success" });
}))




module.exports = contentApiObj;