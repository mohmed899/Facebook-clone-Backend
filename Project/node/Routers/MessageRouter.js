const {getMessages,addMessage} = require('../Controller/MessageControl')
const express = require('express')
const MesssageRouter = express.Router()
MesssageRouter.get('/:convId',getMessages);
MesssageRouter.post('/',addMessage);


module.exports = MesssageRouter;