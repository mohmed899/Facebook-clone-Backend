const PostModel = require('../Models/PostModel');
module.exports = {
    AddPost: async (req, res, next) => {
        try {

            const { body, likes, coments, userId, postDate } = req.body;
            let post = await PostModel.create({ body, img: req.file ? req.file.filename : "", likes, coments, userId, postDate });
            res.send(post);
        } catch (error) {
            res.send(error.message)
        }

    },
    GetAllPosts: async (req, res, next) => {
        try {

            const posts = (await PostModel.find({}).exec()).reverse();
            res.send(posts);
        } catch (error) {
            res.send(error.message)
        }
    },
    UpdatePostLikes: async (req, res, next) => {
        try {
            const { id } = req.params;
            let updatePost = await PostModel.findByIdAndUpdate(id, { likes: req.body.likes }, { returnDocument: 'after' }).exec();
            res.send(updatePost);
        } catch (error) {
            res.send(error.message)
        }
    },
    GetUserPosts:async (req,res,next)=>{
        try {
            const { id } = req.params;
            const posts = (await PostModel.find({userId:id}).exec()).reverse();
            res.send(posts);
        } catch (error) {
            res.send(error.message)
        }
    }
}