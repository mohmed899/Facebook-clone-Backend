const Mongo = require('mongoose')
module.exports = new  Mongo.Schema(
    {
        fName:"String",
        lName:"String",
        age:"Number",
        email:"String",
        password:"String",
        img:"String",
        job:"String",
        coverImg:"String",
        firends:[String]
    })