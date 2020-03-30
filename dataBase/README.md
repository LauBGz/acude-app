# Mongoose Schema

```bson
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
```

## Properties list
* [_id](#_id)
* [name](#name)
* [keyWords](#keyWords)
* [diet](#diet)
* [reproduction](#reproduction)
* [habit](#habit)
* [imageUrl](#imageUrl)
* [category](#category)
* [conservationStatus](#conservationStatus)
* [animalFileStatus](#animalFileStatus)

## Properties
* **_id**: automatically generated and unique.
* **name**: name of the animal. It must be unique.
* **keyWords**: array of strings. There is no max lenght.
* **diet**: string of max 150 chars.
* **reproduction**: string of max 150 chars.
* **habit**: string of max 150 chars.
* **imageUrl**: empty string. Once the image is uploaded the url is added to the string.
* **category**: fixed enum of categories. Each animal must match only one of them.
* **conservationStatus**: fixed enum of status. Each animal must match one of them.
* **animalFileStatus**: string to control the animals published. By the default, it is created as "Pending" and it is not showed until the value change to "Published".
