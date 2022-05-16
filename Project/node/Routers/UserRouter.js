const {addUser,getUsers,getUser,updateUser,logIn,searchUser} = require('../Controller/UserControl')

console.log(addUser)
const express = require('express')
const UserRouter = express.Router()
UserRouter.get('/',getUsers);
UserRouter.get('/search',searchUser);
UserRouter.get('/LogIn',logIn);
UserRouter.get('/:id',getUser);
UserRouter.post('/',addUser);
UserRouter.patch('/:id',updateUser);

module.exports = UserRouter;