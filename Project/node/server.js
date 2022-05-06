

const mongoose = require('mongoose');
(function RunMongoServer() {
    try {
          mongoose.connect('mongodb://localhost:27017/Social');
          console.log("connected")        
    } catch (error) {
        console.log(error)
    }
    
})()


