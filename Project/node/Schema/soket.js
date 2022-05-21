const { Server } = require("socket.io");
const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  }
});


let OnlineUsers = [];


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

  socket.on('postLiked', ({ postId, postOwnerId }) => {

    console.log("id", getSocketIdOfuser(postOwnerId));
    io.to(getSocketIdOfuser(postOwnerId)).emit('getNoto', "likedt post")

  })

  socket.on('addMsg', (resverID, msg ) => {
  
    console.log("idrrr", resverID);
    console.log("idr", getSocketIdOfuser(resverID));
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