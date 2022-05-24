const { Server } = require("socket.io");
const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  }
});


let OnlineUsers = [];
module.exports =OnlineUsers;

io.on("connection", (socket) => {
  // ...
  socket.on("disconnect", () => {
    // ...
   // console.log(socket.id);
    //console.log("left");
    RemoveOnlineUser(socket.id)
  });


  socket.on('addUser', (userID) => {
    addOnlineUser(socket.id, userID);
    console.clear()
    console.log("user connected");
    console.log(OnlineUsers);
    

  })

  socket.on('postLiked', ({ postId, postOwnerId ,img,Name}) => {

    io.to(getSocketIdOfuser(postOwnerId)).emit('getNoto', img, Name )

  })

  socket.on('addMsg', (resverID, msg ) => {
  
    io.to(getSocketIdOfuser(resverID)).emit('NewMsg', msg)

  })
});


io.listen(4000)


//helper functions 

function addOnlineUser(SoketId, UserId) {
  if (OnlineUsers.some(user => user.UserId === UserId))
        OnlineUsers = OnlineUsers.map((i) => {
      if (i.UserId === UserId)
        return { SoketId, UserId }
      return i;
          })
  else
    OnlineUsers.push({ SoketId, UserId });
}

function RemoveOnlineUser(SoketId) {
  OnlineUsers = OnlineUsers.filter((i) => i.SoketId != SoketId);
  //console.log(OnlineUsers);
}

function getSocketIdOfuser(userId) {
  let user = OnlineUsers.find(u => u.UserId == userId);
  if (user)
    return user.SoketId;
  else
    return -1;
}