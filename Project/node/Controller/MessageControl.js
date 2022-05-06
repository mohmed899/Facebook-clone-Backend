const messModel = require('../Models/MessageModel')
const Error = require('../helper/ErrorHandler')
module.exports = {
    getMessages: async (req, res, next) => {
        const { convId } = req.params;
        try {
            const messages = await messModel.find({ convId: convId }).exec()
            res.send(messages);
        } catch (error) {
            const err = Error(500, 'SERVER_ERROR', error.message, []);
            next(err);
        }
    },
    addMessage: async (req, res, next) => {
        try {
            const {
                senderId,
                receiverId,
                text,
                convId, } = req.body
          let msg= await  messModel.create(req.body);
          res.send(msg);
        } catch (error) {
            const err = Error(500, 'SERVER_ERROR', error.message, []);
            next(err);
        }
    }
}