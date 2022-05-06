const express = require('express')
const app = express()
const port = 3001
const server = require('./server');
const userRouter = require('./Routers/UserRouter')
const PostRouter = require('./Routers/PostRouter')
const MessageRouter = require('./Routers/MessageRouter')
const ConversationRouter = require('./Routers/ConversationRouter')
const cros= require('cors')
app.use(express.json()) // pares json 
app.use(cros())   // for local host call 
app.use(express.static('p'))
app.use('/users',userRouter);
app.use('/posts',PostRouter);
app.use('/messages',MessageRouter);
app.use('/conversations',ConversationRouter);


app.use((err, req, res, next)=> {
  //if(res.status >= 500) //write to error.log file
  //send emails to dev team
  //
  res.status(err.status || 500).send({
      code: err.code || 'SERVER_ERR',
      message: err.message || 'something went wrong',
      details: err.details || []
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})