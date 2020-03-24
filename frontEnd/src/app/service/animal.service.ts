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
    allAnimals: Object [] = [];
    messageForm: string;
    idAnimal: string;
    filteredAnimals: Object [] = [];
    showCheck: boolean;

    loadAllAnimals() {
        this._http.get(this.baseUrl+"getAllAnimals")
        .subscribe((responseAPI) => { 
            this.animals = responseAPI;
            //For all the results filter only the ones ready to be published
            for (let i = 0; i < this.animals.length; i++) {
                if(this.animals[i]["animalFileStatus"] !== "Pending"){
                    this.allAnimals.push(this.animals[i]);
                }
            }
            //Update keywords option is not available until the search is done
            this.showCheck = false;      
        });
    }

    loadAnAnimal(id) {
        this._http.get(this.baseUrl+"getAnAnimal/"+id)
            .subscribe((responseAPI) => { 
            this.anAnimal = responseAPI;
        });
    }

    filterByKeywords(keywords) {        
        this._http.post(this.baseUrl+"filterByKeywords", keywords)
        .subscribe((responseAPI) => { 
            this.animals = responseAPI["orderedResults"];
            //For all the results filtered show only the ones ready to be published
            for (let i = 0; i < this.animals.length; i++) {
                if(this.animals[i]["array"]["animalFileStatus"] !== "Pending"){
                    this.filteredAnimals.push(this.animals[i]["array"]);
                }
            }
            //Update keywords option is now available   
            this.showCheck = true;
            this.allAnimals = this.filteredAnimals;
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

