const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const user =  require('../models/user.model');
const bcrypt = require('bcrypt');
const authController = require('../controllers/auth.controller');

//Read config info
const absoluteRoute = path.join(__dirname.replace('controllers', ''),'/config/lockupUser.json');
const userConfigInfo = fs.readFileSync(absoluteRoute);
const userConfig = JSON.parse(userConfigInfo);

//Create connection
mongoose.connect(userConfig["mongo_login"], {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

exports.createUser = (req, res) =>{
    user.find({ $or: [ {"username": req.body.username}, {"email": req.body.email} ]}, (error, result) =>{
        if (error) throw error;

        if (result.length !== 0) {
            res.send({"error": "Usuario ya existe."});
        } else {
            bcrypt.hash(
                req.body.password,
                14,
                (error, hash) => {
                    if (error) throw error;

                    const data = {
                        "_id": mongoose.Types.ObjectId(),
                        "username": req.body.username,
                        "email": req.body.email,
                        "password": hash,
                    }

                    const newUser = new user(data);
                    newUser.save((error, result) => {
                        if (error) throw error;
                        res.send({"message": "Usuario guardado.", "_id": result._id});
                    });
                }
            )
        }
    });
}
  

exports.getUser = (req, res) => {
    const id =  req.params.id;

    user.findById(id, (error, result) => {
        if (result === undefined){
            res.send({"message": "Usuario no existe."});
        } else {
            res.send(result); 
        }
    });
}

exports.updateUser = (req, res) => {
    const id =  req.params.id;

    user.findById(id, (error, result) => {
        if (result === undefined){
            res.send({"message": "Usuario no existe."});
        } else {
            bcrypt.hash(
                req.body.password,
                14,
                (error, hash) => {
                    if (error) throw error;
        
                    const data = {
                        "username": req.body.username,
                        "email": req.body.email,
                        "password": hash,
                    }
                
                    user.findOneAndUpdate(
                        req.body._id,
                        {
                            $set: data
                        },
                        (error, result) => {
                            if (error) throw error;
        
                            res.send({"message": "Usuario actualizado."});
                        }
                    ); 
                }
            )
        }
    });
}

exports.deleteUser =  (req, res) => {
    const id = req.params.id;
    
    user.findById(id, (error, result) => {
        if (error) throw error;
        //Check first if the user exists before finding and deleting
        if (result === null){
            res.send({"message": "Usuario no existe."});
        } else {
            user.findOneAndDelete(id, (error, result) => {
                res.send({"message": "Usuario eliminado."});
            })
        }
    });    
}