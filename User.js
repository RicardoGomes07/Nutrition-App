const bcrypt = require('bcryptjs');
const userModel = require('./models/userModel');
const jsonwebtokn = require('jsonwebtoken');

async function registerUser(req, res) {
  let user = req.body; // Informações sobre o usuário no body

  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(user.password, salt, async (err, hashedPassword) => {
        if (!err) {
          user.password = hashedPassword;
          try {
            let doc = await userModel.create(user);
            res.status(201).send({ message: "User Registered" });
          } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Some Problem" });
          }
        }
      });
    }
  });
}

async function LoginUser(req,res){
    let userdata = req.body;
    try
    {
        const user = await userModel.findOne({email: userdata.email})
        if(user !== null)
        {
            bcrypt.compare(userdata.password, user.password,(err, sucess)=>{
                if(sucess==true){
                    jsonwebtokn.sign({email: userdata.email}, "Nutritionapp", (err,token)=>{
                        if(!err)
                        {
                            res.send({message: "Login Sucess", token:token});
                        }
                    })
                }
                else
                {
                    res.status(403).send({message: "Incorret Password"})
                }
            });
        }
        else
        {
            res.status(404).send({message: "User not found"})
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message:"Some Problem"})
    }

}

module.exports = {registerUser, LoginUser};