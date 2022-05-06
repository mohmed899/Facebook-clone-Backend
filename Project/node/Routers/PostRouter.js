const express = require('express')
const PostRouter = express.Router();
const {AddPost,GetAllPosts} =require('../Controller/PostControl')
const multer = require('multer')





const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './p')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.png')
    }
  })
  
  const upload = multer({ storage: storage }).single('photo')



//ToDO mw for validation 
PostRouter.post('/',upload,AddPost);
PostRouter.get('/',GetAllPosts);






module.exports = PostRouter;

