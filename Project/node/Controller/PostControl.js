const PostModel = require('../Models/PostModel');
module.exports ={
    AddPost: async(req, res , next)=>{
        try {
            const {filename}=req.file;
            const {body,likes,coments,userId,postDate}=req.body;
            let post =  await PostModel.create({body,img:filename,likes,coments,userId,postDate});
            res.send(post);
        } catch (error) {
            res.send(error.message)
        }
    
    },
    GetAllPosts:async(req,res,next)=>{
        try {
            
            const posts =   await PostModel.find({}).exec();
            res.send(posts);
        } catch (error) {
            res.send(error.message)
        }
    }
}