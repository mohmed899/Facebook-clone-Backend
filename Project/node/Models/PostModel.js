const mongoose = require('mongoose')
const PostSchema = require('../Schema/PostSchema')
module.exports =  mongoose.model('Post',PostSchema);