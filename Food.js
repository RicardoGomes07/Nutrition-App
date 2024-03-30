const bcrypt = require('bcryptjs');
const foodModel = require('./models/foodModel');
const jsonwebtokn = require('jsonwebtoken');

async function fetchfoods(req,res){
    try
    {
        let foods = await foodModel.find()
        res.send(foods)
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: "Some problem getting the info"})
    }
}

async function foodsByName(req,res){
    try
    {
        let foods = await foodModel.find({name:{$regex: req.params.name, $options: 'i'}})
        if(foods.length != 0){
            res.send(foods)
        }else{
            res.status(404).send({message: "Food not Found"})
        }
        
    }
    catch(err){
        console.log(err)
        res.status(500).send({message: "Some problem getting the food"})
    }

}


function verifyToken(req,res,next){
    if(req.headers.authorization !== undefined){
        let token = req.headers.authorization.split(" ")[1];
        jsonwebtokn.verify(token, "Nutritionapp", (err,data)=>{
            if(!err){
                next();
            }else{
                res.status(403).send({message: "Invalid Token"})
            }
        })
    }else{
        res.send({message: "Please send a Token"})
    }
}

module.exports = {fetchfoods, verifyToken, foodsByName};