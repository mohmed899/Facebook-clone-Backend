const Mongo = require('mongoose')
module.exports = new  Mongo.Schema(
    {
        senderId:"String",
        senderImg:"String",
        text:"String",
        convId:"String"
    }, { timestamps: true })