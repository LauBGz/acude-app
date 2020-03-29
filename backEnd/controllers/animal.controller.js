//Imports
const animal = require('../models/animal.model');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const bodyController = require('./body.controller');
const arrayUtils = require('../utils/array.util');

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
        
        //Check if the animal already exists
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
                    "imageUrl": "",
                    "habitat": rq.habitat,
                    "category": rq.category,
                    "conservationStatus": rq.conservationStatus,
                    "animalFileStatus": "Pending"
                    }
            
                    const newAnimal = new animal(data);
                    newAnimal.save((error) =>{
                        if(error) throw error;
                        res.send({"Message": "Datos del animal guardados con éxito.",
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
  
    animal.findById(id, (error, result) => {
        if (error) throw error;
        res.send(result)
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

        let userSearch = [];

        //Utility to normalize user's keywords -to lower case, no accent mark-
        arrayUtils.normalizeArray(rq.keyWords, userSearch);

        animal.findById(id, (error, result) => {
            if (error) throw error;
            //Only add keywords different from existing
            let newKeywords = [];
            for (let i = 0; i < userSearch.length; i++) {
               if(result["keyWords"].indexOf(userSearch[i]) === -1){
                    newKeywords.push(userSearch[i]);
               }
            }
            
            const data = {
                "keyWords": newKeywords,
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
        })
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

        let userSearch = [];
        let ocurrences = 0;
        let orderedResults = [];
        let registeredAnimal;

        //Utility to normalize user's keywords -to lower case, no accent mark-
        arrayUtils.normalizeArray(rq.keyWords, userSearch);

        //Levenshtein distance algorithm
        LevenshteinDistance =  function(a, b){
            if(a.length == 0) return b.length; 
            if(b.length == 0) return a.length; 
    
            var matrix = [];
    
            // increment along the first column of each row
            var i;
            for(i = 0; i <= b.length; i++){
                matrix[i] = [i];
            }
    
            // increment each column in the first row
            var j;
            for(j = 0; j <= a.length; j++){
                matrix[0][j] = j;
            }
    
            // Fill in the rest of the matrix
            for(i = 1; i <= b.length; i++){
                for(j = 1; j <= a.length; j++){
                if(b.charAt(i-1) == a.charAt(j-1)){
                    matrix[i][j] = matrix[i-1][j-1];
                } else {
                    matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                            Math.min(matrix[i][j-1] + 1, // insertion
                                                    matrix[i-1][j] + 1)); // deletion
                }
                }
            }
    
                return matrix[b.length][a.length];
            };

            //Function to apply Levenshtein algorithm to arrays (sum of total ocurrences)
            function getLevenshteinDistance (array1, array2){
                for (let i = 0; i < array1.length; i++) {
                    for (let j = 0; j < array2.length; j++) {
                        ocurrences += LevenshteinDistance(array1[i], array2[j])
                    }
                }
                return ocurrences;
            }

            //Function to check if an animal is already included in the array
            function checkIfRegistered(name){
                registeredAnimal = false;
                for(let j = 0; j < orderedResults.length; j++){
                    if(orderedResults[j]["array"]["name"] === name){
                        registeredAnimal = true;
                    }
                }
                return registeredAnimal;
            }
            
     
        //1. Search first for animals which have all the user's keywords included
        animal.find({ keyWords: { "$all" : userSearch } },
            (error, result) => {
                if (error) throw error;   
                //For all results with all user's keywords in them
                for (let i = 0; i < result.length; i++){
                    //Storage keywords in a variable
                    const allAnimalKeywords = result[i]["keyWords"];
                    //Assign a total value according to the Levenshtein distance algorithm
                    ocurrences = (getLevenshteinDistance(allAnimalKeywords, userSearch));
                    //Add to an array the results with the number of ocurrences associated
                    let match = ocurrences/allAnimalKeywords.length*100;
                    orderedResults.push({"match": match, "array": result[i]}); 
                }
            }
        )
        
        //2. Search then for animals which have any of the user's keywords included
        animal.find({ keyWords: { "$in" : userSearch } },
            (error, result) => {
                if (error) throw error;   
                //For all results with any user's keywords in them                     
                for (let i = 0; i < result.length; i++){
                    //Storage keywords in a variable
                    const allAnimalKeywords = result[i]["keyWords"];
                    //Check if the animals in the results are already included
                    checkIfRegistered(result[i]["name"]);
                    //Only for those not included
                    if(!registeredAnimal){
                        //Assign a total value according to the Levenshtein distance algorithm
                        ocurrences = (getLevenshteinDistance(allAnimalKeywords, userSearch));
                        //Add to an array the results with the number of ocurrences associated
                        let match = ocurrences/allAnimalKeywords.length*100;
                        orderedResults.push({"match": match, "array": result[i]});
                    } 
                };
            //Order the definite array from lower to larger Levenshtein distance
            orderedResults.sort((a, b) => (a.match > b.match) ? 1 : -1)
            //Send the results    
            res.send({orderedResults});     
        }
    )}
}; 

//Check if an animal exists in the database
exports.checkName = (req, res) => {
    //Inputs validation
    const errors = validationResult(req) 
  
    if (errors.isEmpty()){
      
        const rq = req.body;
      
        animal.find({ name: rq.name },
            (error, result) => {
                if (error) throw error;
                
                if(result.length !== 0){
                    res.send({"Error": "El animal ya existe en la base de datos."})
                } else {
                    res.send({"Success": "¡Perfecto! El animal todavía no existe en la base de datos."})
                }
            }
        );
    }
};
