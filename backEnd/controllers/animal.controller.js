//Imports
const animal = require('../models/animal.model');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const bodyController = require('./body.controller');

//Create connection
mongoose.connect("mongodb://localhost:27017/animal", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Add animal
exports.addAnimal = (req, res) => {
    //Inputs validation
    const errors = validationResult(req) 

    if (errors.isEmpty()){
        //Middleware to control all the inputs has content
        bodyController.checkBody(res, req.body, [
            "name", 
            "keyWords", 
            "diet",
            "reproduction", 
            "habit",
            "habitat",
            "category",
            "conservationStatus"
        ]);

        const rq = req.body;

        const data = {
            "_id": mongoose.Types.ObjectId(),
            "name": rq.name,
            "keyWords": rq.keyWords,
            "diet": rq.diet,
            "reproduction":rq.reproduction,
            "habit": rq.habit,
            "imageUrl": rq.imageUrl,
            "habitat": rq.habitat,
            "category": rq.category,
            "conservationStatus": rq.conservationStatus
        }
    
        const newAnimal =  new animal(data);
        newAnimal.save((error) =>{
            if(error) throw error;
            res.send({"Message": "Animal guardado.",
            "_id": data._id
            });
        })

    }
};

//Get all animals
exports.getAllAnimals = (req, res) => {
    animal.find((error, animals) => {
        if (error) throw error;
        res.send(animals)
    })
};

//Get an animal
exports.getAnAnimal = (req, res) => {
    const id = req.params.id;
  
    animal.findById(id, (error, pets) => {
        if (error) throw error;
        res.send(pets)
    })
};

//Delete an animal
exports.deleteAnAnimal =  (req, res) => {
    const id = req.params.id;

    animal.findByIdAndDelete(id, (error, result) => {
        res.send({"message": "Animal borrado del registro."});
    })
}

//Update keywords
exports.updateKeywords = (req, res) => {
    //Inputs validation
    const errors = validationResult(req) 

    if (errors.isEmpty()){
        //Middleware to control keywords exist
        bodyController.checkBody(res, req.body, ["keyWords"]);

        const id = req.params.id;

        const rq = req.body;
    
        const data = {
            "keyWords": rq.keyWords,
        }
    
        animal.findByIdAndUpdate(
            id,
            {
                $set: data
            },
            (error, result) => {
                if (error) throw error;
                res.send({"message": "Palabras clave actualizadas."});
            }
        );
    }
}

//Filter by keywords
exports.filterByKeywords = (req, res) => {
    //Inputs validation
    const errors = validationResult(req) 

    if (errors.isEmpty()){
        //Middleware to control keywords exist
        bodyController.checkBody(res, req.body, ["keyWords"]);

        const rq = req.body;

        animal.find({ keyWords: { $all: rq.keyWords }  },
            (error, result) => {
                if (error) throw error;

                res.send({result});
            }
        );
    }
}
