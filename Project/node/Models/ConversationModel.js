const mongoose = require('mongoose')
const ConvSchema = require('../Schema/ConversationSchema')
module.exports =  mongoose.model('Conversation',ConvSchema);