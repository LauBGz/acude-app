const jwt = require('jsonwebtoken');
const fs = require('fs');
const path =  require('path');

//Read config info
const absoluteRoute = path.join(__dirname.replace('controllers', ''),'/config/lockupUser.json');
const userConfigInfo = fs.readFileSync(absoluteRoute);
const userConfig = JSON.parse(userConfigInfo);


//Middleware
module.exports = function isLoggedIn(req, res, next) {
    if (req.cookies.stamp){
        jwt.verify(req.cookies.stamp, userConfig["jwt_clave"], (error, decode) => {
            if (error) {
                res.send({"error": error});
            } 
            if (decode !== undefined) {  
                next();
            } else {
                res.send({"error": error});
            }
        });
    } else {
        res.status(401).send("Acceso no autorizado");
    }
}




  



