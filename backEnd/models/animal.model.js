//Imports
const mongoose = require('mongoose');

const types = mongoose.Schema.Types;

const animalSchema = new mongoose.Schema({
    "_id": {
        require: true,
        type: types.ObjectId
    },
    "name": {   
        require: true,
        type: types.String
   
    },
    "keyWords": {   
        require: true,
        type: [String]
    },
    "diet": {   
        require: true,
        type: types.String
    },
    "reproduction": {   
        require: true,
        type: types.String
    },
    "habit": {   
        require: true,
        type: types.String
    },
    "imageUrl": {   
        require: true,
        type: types.String
    },
    "habitat": {   
        require: true,
        type: types.String
    },
    "category": { 
        require: true,  
        type: types.String,
        enum : ['ANFIBIO',
                'ANÉLIDO',
                'ARTRÓPODO',
                'AVE',
                'CNIDARIO',
                'EQUINODERMO',
                'MAMÍFERO',
                'MOLUSCO',
                'NEMÁTODO',
                'PEZ',
                'PLATELMINTO',
                'PORÍFERO',
                'REPTIL',
            ],
    },
    "conservationStatus": { 
        require: true,  
        type: types.String,
        enum : ['Vulnerable',
                'En peligro de extinción',
                'Preocupación menor'
            ],
    },
    "animalFileStatus": {
        require: true,  
        type: types.String,
    }
});

module.exports = mongoose.model("animal", animalSchema);