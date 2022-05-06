const mongoose = require('mongoose')
const MessageSchema = require('../Schema/MessageSchema')
module.exports =  mongoose.model('Message',MessageSchema);