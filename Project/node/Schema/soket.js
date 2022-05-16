const { Server } = require("socket.io");
const io = new Server({ cors: {
    origin: "http://localhost:3000",
  }});
  

  let OnlineUsers =[];


  io.on("connection", (socket) => {
    // ...
    socket.on("disconnect", () => {
      // ...
      console.log(socket.id);
        console.log("left");
        RemoveOnlineUser(socket.id)
      });


      socket.on('addUser',(userID)=>{
          addOnlineUser(socket.id,userID);
          console.log(OnlineUsers);


      })

      socket.on('postLiked',({postId,postOwnerId})=>{
 
        console.log("id",getSocketIdOfuser(postOwnerId));
      io.to(getSocketIdOfuser(postOwnerId)).emit('getNoto',"likedt post")
      
      })
  });
  
  
  io.listen(4000)


  //helper functions 

  function addOnlineUser(SoketId, UserId){
    if(!OnlineUsers.some(user=>user.UserId===UserId))
       OnlineUsers.push({SoketId, UserId});
  }

  function RemoveOnlineUser(SoketId){
    OnlineUsers= OnlineUsers.filter((i)=>i.SoketId==SoketId);
    console.log(OnlineUsers);
  }

  function getSocketIdOfuser(userId) {
   let user =  OnlineUsers.find(u=>u.UserId== userId);
     if(user)
     return user.SoketId;
     else
     return -1;
  }