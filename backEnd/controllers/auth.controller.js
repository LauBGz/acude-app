const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../models/user.model');


//Read config info
const absoluteRoute = path.join(__dirname.replace('controllers', ''),'/config/lockupUser.json');
const userConfigInfo = fs.readFileSync(absoluteRoute);
const userConfig = JSON.parse(userConfigInfo);

//Create connection
mongoose.connect(userConfig["mongo_login"], {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


exports.login = (req, res) => {
    //1.Encontrar al usuario por su nombre
    user.find({ $or: [ {"username": req.body.username}, {"email": req.body.email} ]},
        (error, user) => {
            if (error) throw error;

            if (user.length === 0) {
                res.send({"error": "Usuario no existe."});
            }
        //2.Comprobar contraseña
            bcrypt.compare(
                req.body.password,
                user[0]["password"],
                (error, coincidence) => {
                    if (error) throw error;
                    //3. Si es corrrecta poner token
                    if(coincidence){
                        jwt.sign(
                            {"username": user[0]["username"]},
                                userConfig["jwt_clave"],
                                (error, token) => {
                                    if (error) throw error;
                                    res.cookie("stamp", token);
                                    res.send({"message":"Bienvenido/a!", "token": token});
                            }
                        )
                    } else {
                        res.send({"error":"Contraseña incorrecta"})
                    }
                }
            )
        }
    )
}