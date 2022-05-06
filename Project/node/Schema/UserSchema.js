const Mongo = require('mongoose')
module.exports = new  Mongo.Schema(
    {
        fName:"String",
        lName:"String",
        age:"Number",
        email:"String",
        password:"String",
        firends:[String]
    })