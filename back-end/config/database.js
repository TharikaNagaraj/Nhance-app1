const mongoose = require("mongoose")

const configureDatabase = () => 
{
    mongoose.connect("mongodb://localhost:27017/app1")
        .then(() => 
        {
            console.log("connected to DB")
        })
        .catch((err) => 
        {
            console.log("error connecting to database")
        })
}
module.exports = configureDatabase