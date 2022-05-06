const express = require('express')
const {addCoversation,getConversation} = require('../Controller/ConversationControl')
const router  = express.Router()
 router.get('/:UserId',getConversation);
 router.post('/',addCoversation);

module.exports = router;