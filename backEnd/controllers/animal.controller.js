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
      
        animal.find({ name: rq.name },
            (error, result) => {
                if (error) throw error;
             
                if(result.length === 0){
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
            
                    const newAnimal = new animal(data);
                    newAnimal.save((error) =>{
                        if(error) throw error;
                        res.send({"Message": "Animal guardado.",
                        "_id": data._id
                        });
                    })  
                } else{
                    res.send({"Message": "El animal ya existe en la base de datos."})
                }
            }
        );
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
                $push: data
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
        let userSearch;

        for(let i = 0; i < rq.keyWords.length; i++) {
            userSearch = rq.keyWords[i].toLowerCase();
            userSearch = userSearch.replace(/[áàãäâ]/,"a");
            userSearch = userSearch.replace(/[éèëê]/,"e");
            userSearch = userSearch.replace(/[íìïî]/,"i");
            userSearch = userSearch.replace(/[óòõöô]/,"o");
            userSearch = userSearch.replace(/[úùüû]/,"u")
        }

        //Search for all animals with any of the keywords
        animal.find({ keyWords: { "$in" : userSearch } },
            (error, result) => {
                if (error) throw error;

                let orderedResults = [];

                //For all the results
                for (let i = 0; i < result.length; i++){
                    let ocurrences = 0;
                    const allAnimalKeywords = result[i]["keyWords"];

                    //Check all animal keywords
                    for (let j = 0; j < userSearch.length; j++) {

                        //If animal keywords includes any of the user search words
                        //ocurrences increase and the new ordered results array is updated
                        //with the matching degree number and the animal.
                        if(allAnimalKeywords.includes(userSearch[j])){
                            ocurrences++;  
                        }
                    }
                    let match = ocurrences/allAnimalKeywords.length*100;
                    orderedResults.push({"match": match, "array": result[i]}); 
                }
                //Sort the array ordered results by matching degree number
                orderedResults.sort((a, b) => (a.match < b.match) ? 1 : -1)
                res.send({orderedResults});          
            }
        );  
    }
}

//Filter by category
exports.filterByCategory = (req, res) => {
    
    const animalCategory = "AVES";

    animal.find({ category: { "$all" : animalCategory } },
        (error, result) => {
            if (error) throw error;
            res.send({result});      
    })
};
