const Mongo = require('mongoose')
module.exports = new  Mongo.Schema(
    {
        body:"String",
        img:"String",
        likes:"Number",
        coments:"Number",
        userId:"String",
        postDate:"String"
    })