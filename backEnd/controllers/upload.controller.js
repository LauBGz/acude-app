const multer = require('multer');
const cloudinary =  require ('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const animal = require('../models/animal.model');

//Read cloudinary config info
const absoluteRoute = path.join(__dirname.replace('controllers', ''),'/config/lockupAnimal.json');
const cloudConfigInfo = fs.readFileSync(absoluteRoute);
const cloudConfig = JSON.parse(cloudConfigInfo); 

//Upload picture
exports.uploadImage = (req, res) => {
    //Parameter of the animal associated to the image
    const id = req.params.id;
    
    {
        const storageConfig = multer.diskStorage(
            {
                destination: './uploads'
            }
        );
    
        const uploadImage = multer({"storage": storageConfig}).single('animalImage');
    
        uploadImage(req, res, (error) => {
            if(error) throw error;
            //Upload image to Cloudinary
            cloudinary.config({
                "cloud_name": cloudConfig["name"],
                "api_key": cloudConfig["key"],
                "api_secret": cloudConfig["secret"]
            });

            const filePath = req.file.path;
            
            const fileRandonName = Date.now();
    
            cloudinary.uploader.upload(
                filePath,
                {
                    public_id: `animals/${fileRandonName}`
                },
                (error, image) =>{
                    if (error) throw error;
                    fs.unlink(path.join(__dirname.replace('controllers', ''), filePath), error => {
                        if (error) throw error

                        const urlImage = image.url;

                        const data = {
                            "imageUrl": urlImage,
                        }

                        animal.findByIdAndUpdate(
                            id,
                            {
                                $set: data
                            },
                            (error, result) => {
                                if (error) throw error;
                                res.redirect("http://localhost:4200/#/success")
                            }
                        )
                    });
                }
            );
        })
    }
};