import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

    baseUrl = environment.apiURL;

    constructor(public _http: HttpClient) {
        this.loadAllAnimals();
    }

    animals: any;
    anAnimal: Object; 
    allAnimals: any; 
    messageForm: string;
    idAnimal: string;
    filteredAnimals: Object [] = [];

    loadAllAnimals() {
        this._http.get(this.baseUrl+"getAllAnimals")
        .subscribe((responseAPI) => { 
          this.animals = responseAPI;
         
          for (let i = 0; i < this.animals.length; i++) {
              if(this.animals[i]["animalFileStatus"] === "Pending"){
                console.log(this.animals[i]);
                this.animals.splice(i, 1);
              }
          }

          this.allAnimals = this.animals;

          console.log(this.allAnimals)
         
        });
    }

    loadAnAnimal(id) {
        this._http.get(this.baseUrl+"getAnAnimal/"+id)
        .subscribe((responseAPI) => { 
          this.anAnimal = responseAPI;
        });
    }

    filterByKeywords(keywords) {
        this.filteredAnimals = [];
        this._http.post(this.baseUrl+"filterByKeywords", keywords)
        .subscribe((responseAPI) => { 

        this.animals = responseAPI["orderedResults"];

        for (let i = 0; i < this.animals.length; i++) {
            if(this.animals[i]["animalFileStatus"] === "Pending"){
                this.animals.splice(i, 1);
            }
        }

        for (let i = 0; i < this.animals.length; i++) {
           this.filteredAnimals.push(this.animals[i]["array"]);
        }

        this.animals = this.filteredAnimals;
         
        console.log(this.animals)
        });
    }

    addNewAnimal(data){
        this._http.post(this.baseUrl+"addAnimal", data)
        .subscribe((responseAPI) => {
            console.log(responseAPI) 
            this.messageForm = responseAPI["Message"];
            this.idAnimal = responseAPI["_id"];
        })  
    }

    uploadImage(data){
        this._http.post(this.baseUrl+"uploadImage/"+this.idAnimal, data)
        .subscribe((responseAPI) => {
            console.log(responseAPI) 
        })  
    }

    updateKeywords(keywords, id){
        this._http.put(this.baseUrl+"updateKeywords/"+id, keywords)
        .subscribe((responseAPI) => {
            console.log(responseAPI) 
        })  
    }

 
}

