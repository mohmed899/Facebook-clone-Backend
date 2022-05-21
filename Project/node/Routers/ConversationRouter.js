const express = require('express')
const {addCoversation,getConversation,getConversationById} = require('../Controller/ConversationControl')
const router  = express.Router()
router.get('/:UserId',getConversation);
router.get('/conv/:Id',getConversationById);
 router.post('/',addCoversation);

module.exports = router;