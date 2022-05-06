const Mongo = require('mongoose')
module.exports = new  Mongo.Schema(
    {
        senderId:"String",
        receiverId :"String",
        text:"String",
        convId:"String"
    }, { timestamps: true })