const exp = require('express')
const app = exp()
//configure dotenv
//the config() provide all env var in process.env
require("dotenv").config()

const path = require("path")

app.use(exp.static(path.join(__dirname, './build')))

//import APIS objects
const userApiObj = require("./APIS/userApi")
const adminApiObj = require("./APIS/adminApi")
const contentApiObj = require("./APIS/contentApi")
const wishlistApiObj = require("./APIS/wishlistApi")


// use userApiObj when path starts with /users
app.use("/users", userApiObj)
app.use("/admin", adminApiObj)
app.use("/content", contentApiObj)
app.use("/wishlist", wishlistApiObj)


// for unmatched paths wildcard
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'))
})

const mongoClient = require("mongodb").MongoClient;

//get database url 
const dbUrl = process.env.DATABASE_URL

mongoClient.connect(dbUrl, (err, client) => {
    if (err) {
        console.log('err in db connect', err)
    }
    else {
        //get obj of database
        let databaseObject = client.db('finalProject')
        //get obj of Collection
        let userCollection = databaseObject.collection('usercollection')
        let adminCollection = databaseObject.collection('admincollection')
        let favouriteCollection = databaseObject.collection('favouritecollection')
        let contentCollection = databaseObject.collection('contentcollection')
        let wishlistCollection = databaseObject.collection('wishlistcollection')

        //set to app object
        app.set("userCollection", userCollection)
        app.set("adminCollection", adminCollection)
        app.set("favouriteCollection", favouriteCollection)
        app.set("contentCollection", contentCollection)
        app.set("wishlistCollection", wishlistCollection)

        console.log("conected to DB")
    }
})

//error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.send({ message: "Error occured", reason: err.message })
})

//assign port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server listening on port ${PORT}`))