//Imports
const express = require('express');
const bodyParser = require('body-parser');
const helmet =  require('helmet');

const animalController =  require('./controllers/animal.controller');
const uploadController =  require('./controllers/upload.controller');
const { check, validationResult } = require('express-validator');

//Server
const server = express();

//Middlewares
server.use(express.static('web'))
server.use(bodyParser.json());
server.use(helmet())

//Endpoints
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
],
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

//Listen server
server.listen(3000, () => {
    console.log("Escuchando en puerto 3000.");
});
