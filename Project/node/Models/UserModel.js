const mongoos  = require('mongoose')
const schema = require('../Schema/UserSchema')
module.exports = mongoos.model('users',schema);