const Mongo = require('mongoose')
module.exports = new  Mongo.Schema(
    {
      
      ConvName:"String",
      OwnerID:"String",
      OtherID:"String",
      img:"string",
      Members:[String]

    })