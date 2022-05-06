const bcrypt = require('bcrypt');
module.exports.HashPassword = async(pass)=>{
    // const salt = bcrypt.genSaltSync(10)
     const hased= await bcrypt.hash(pass,10)
     return hased;
     
}

module.exports.comparePassword = async (password, hash) => {
    const isCorrectPassword = await bcrypt.compare(password, hash);
    return isCorrectPassword;
}