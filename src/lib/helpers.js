const bcrypt = require('bcryptjs');

const helpers = {};
//hasheo la password
helpers.encryptPassword = async (password) =>{
   const salt = await bcrypt.genSalt(5);
   const hash = await bcrypt.hash(password , salt);
   return hash;
};

//macheo la password guardada en al base de dato y comparo con la del usuario

helpers.matchPassword = async (password, savedPassword) =>{
    try {
        return await bcrypt.compare(password , savedPassword);
    } catch (error) {
        console.log(error);
    }

}



module.exports = helpers