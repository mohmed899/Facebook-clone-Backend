const ConvModel = require('../Models/ConversationModel')
const Error = require('../helper/ErrorHandler')
module.exports = {
    getConversation: async (req, res, next) => {
       
        try {
               const {UserId}= req.params;
               const ConvS = await ConvModel.find({OwnerID:UserId}).exec();
               res.send(ConvS)
        } catch (error) {
            const err = Error(500, 'SERVER_ERROR', error.message, []);
            next(err);
        }
    },
    addCoversation: async (req, res, next) => {
        try {
           let conv = await ConvModel.create(req.body)
           res.send(conv);
        } catch (error) {
            const err = Error(500, 'SERVER_ERROR', error.message, []);
            next(err);
        }
    }
}