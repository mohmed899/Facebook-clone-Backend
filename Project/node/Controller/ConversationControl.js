const ConvModel = require('../Models/ConversationModel')
const Error = require('../helper/ErrorHandler')
module.exports = {
    getConversation: async (req, res, next) => {
       
        try {
               const {UserId}= req.params;
               const ConvS = await ConvModel.find({ $or:[{OwnerID:UserId}, {OtherID:UserId}]}).exec();
               res.send(ConvS)
        } catch (error) {
            const err = Error(500, 'SERVER_ERROR', error.message, []);
            next(err);
        }
    },
    getConversationById: async (req, res, next) => {
       
        try {
               const {Id}= req.params;
               const Conv = await ConvModel.find({_id:Id}).exec();
               res.send(Conv)
        } catch (error) {
            const err = Error(500, 'SERVER_ERROR', error.message, []);
            next(err);
        }
    },
    addCoversation: async (req, res, next) => {
        try {
            //check if there is old conversation before create new one 
            let {OwnerID,OtherID}= req.body;
            oldConv= await ConvModel.find({ $or:[{OwnerID,OtherID} ,{OwnerID:OtherID,OtherID:OwnerID}]}).exec();
            if(oldConv.length==0){

                let conv = await ConvModel.create(req.body)
                res.send(conv);
            }
            else
            res.send(oldConv);

        } catch (error) {
            const err = Error(500, 'SERVER_ERROR', error.message, []);
            next(err);
        }
    }
}