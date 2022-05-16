const userModel = require('../Models/UserModel')
const { HashPassword, comparePassword } = require('../helper/security');
const UserModel = require('../Models/UserModel');
const Error = require('../helper/ErrorHandler');
module.exports = {
  addUser: async (req, res, next) => {
    console.log(req.body)
    let { fName, lName, age, email, password } = req.body;
    try {
      const ExestUser = await UserModel.find({ email: email }).exec();
      if (ExestUser.length != 0) {
        next(Error(404, "invalid data", "user already exist "));
        return;
      }
      const hashedPass = await HashPassword(password)
      let user = await userModel.create({ fName, lName, age, email, password: hashedPass })
      res.send(user);
    } catch (error) {
      const err = Error(500, "server Error", error.message);
      next(err)
    }
  },
  getUsers: async (req, res) => {

    let { isSearchMode, isFriend } = req.query
    if (isSearchMode) {
      let { searshString } = req.body
      users = await UserModel.find({ "fName": { $regex: `/^${searshString}/i` } }).exec()
    }
    else if (isFriend === 'true') {
      let { UserId } = req.query;
      let userFriends = userModel.find({ _id: UserId }, 'firends', async (e, d) => {
        if (d[0].firends.length === 0)
          res.send([])
        else {

          const records = await userModel.find().where('_id').in(d[0].firends).exec();
          res.send(records)
        }

      });
    }
    else {
      let { UserId } = req.query;
      //UserId ='62735cfb7b48781ee0d1c368'
      let userFriends = userModel.find({ _id: UserId }, 'firends', async (e, d) => {
        const records = await userModel.find().where('_id').nin([...d[0].firends,UserId]).exec();
        res.send(records)
      });
      // let userFriends = await userModel.find({ _id: UserId }, 'firends').exec();
    }
    //  const users = await userModel.find({});

  },

  getUser: async (req, res, next) => {
    const { id } = req.params;
    try {
      let user = await userModel.findById(id);

      if (user)
        res.send(user);
      else {
        next(Error(404, "user not found", "not found "));
        return;
      }
    } catch (error) {
      res.send(error.message)
    }
  },
  logIn: async (req, res, next) => {
    const { email, password } = req.query;
    const user = await userModel.findOne({ email }).exec();
    if (!user) {
      next(Error(403, "invalid data", "wrong mail  "));
      return;
    }
    isValidPass = await comparePassword(password, user.password)
    if (!isValidPass) {
      next(Error(403, "invalid data", "wrong  pass "));
      return;
    }
    res.send(user);
  },
  updateUser: async (req, res, next) => {
    const { friendId } = req.body;
    const { id } = req.params;
    const doc = await userModel.findById(id);
    if (doc) {
      let NumberOfFriends = doc.firends.push(friendId);
      await doc.save();
      res.send({ NumberOfFriends })
    }
    else {
      res.send("no such user ");
    }

  },

  searchUser:async (req, res , next)=>{

    let {searchText} = req.query
    let regx;
    if(searchText=="")
    {
     res.send([])
     return
    }
    try {
      regx = RegExp(`^${searchText}`,'i');
    } catch (error) {
      res.send([])
      return
    }
      users = await UserModel.find({ "fName": { $regex:regx } }).exec()
     res.send(users)
  }
}