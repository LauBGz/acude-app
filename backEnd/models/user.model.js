//Imports
const mongoose = require('mongoose');

const types = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    "_id": {
        require: true,
        type: types.ObjectId
    },
    "username": {   
        require: true,
        type: types.String
    },
    "email":{
        require: true,
        type: types.String
    },
    "password":{
        require: true,
        type: types.String
    }
})

module.exports = mongoose.model("user", userSchema);