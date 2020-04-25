//Imports
const express = require('express');
const bodyParser = require('body-parser');
const helmet =  require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const animalController =  require('./controllers/animal.controller');
const uploadController =  require('./controllers/upload.controller');
const userController = require('./controllers/user.controller');
const authController = require('./controllers/auth.controller');
const isLoggedIn = require('./controllers/isLoggedIn.controller');
const { check, validationResult } = require('express-validator');

//Server
const server = express();

//Middlewares
server.use(cors());
server.use(bodyParser.json());
server.use(cookieParser())
server.use(helmet());
server.use(express.static("web"));

//Endpoints animal
server.post('/addAnimal', [   
    check([
    'name', 
    'diet', 
    'reproduction', 
    'habit', 
    'habitat', 
    'category', 
    'conservationStatus']).isString().escape().trim(),
    check('keyWords.*').isString().escape().trim(),
], isLoggedIn,
animalController.addAnimal);
server.get('/getAnAnimal/:id', animalController.getAnAnimal);
server.get('/getAllAnimals', animalController.getAllAnimals);
server.delete('/deleteAnAnimal/:id',animalController.deleteAnAnimal);
server.put('/updateKeywords/:id', [   
    check('keyWords.*').isString().escape().trim(),
],
animalController.updateKeywords);
server.post('/uploadImage/:id', uploadController.uploadImage);
server.post('/filterByKeywords', [   
    check('keyWords.*').isString().escape().trim(),
], animalController.filterByKeywords);
server.post('/checkName', [
    check('name').isString().escape().trim()
], animalController.checkName);

//Endpoints user
server.post('/createUser', userController.createUser);
server.post('/login', authController.login);
server.get('/getUser/:id', isLoggedIn, userController.getUser);
server.delete('/deleteUser/:id', isLoggedIn, userController.deleteUser);
server.put('/updateUser/:id', isLoggedIn, userController.updateUser);

//Listen server
server.listen(3000, () => {
    console.log("Escuchando en puerto 3000.");
});
