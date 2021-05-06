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

    categories: string [] = [
        'ANFIBIO',
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
        ]
        
    animals: any;
    anAnimal: Object; 
    allAnimals: Object [] = [];
    messageForm: string;
    idAnimal: string;
    filteredAnimals: Object [] = [];
    showCheck: boolean;
    registeredAnimal: string;
    alreadyRegistered: boolean = false;
  

    loadAllAnimals() {
        this._http.get(this.baseUrl+"getAllAnimals")
        .subscribe((responseAPI) => { 
            this.animals = responseAPI;
            //For all the results, filter only the ones ready to be published
            this.animals.forEach(element => {
                if(element["animalFileStatus"] !== "Pending"){
                    this.allAnimals.push(element);
                }
            });
            //Update keywords option for users is not available until the search is done
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
                if(this.animals[i]["animal"]["animalFileStatus"] !== "Pending"){
                    this.filteredAnimals.push(this.animals[i]["animal"]);
                }
            }
            //Update keywords option is now available   
            this.showCheck = true;
            this.allAnimals = this.filteredAnimals;
            //Clear array for next search
            this.filteredAnimals = [];
        });
    }

    addNewAnimal(data){
        this._http.post(this.baseUrl+"addAnimal", data)
        .subscribe((responseAPI) => {
            this.messageForm = responseAPI["Message"];
            this.idAnimal = responseAPI["_id"];       
            //If animal doesn't exist change variable to show different message
            if(this.idAnimal === undefined){
                this.alreadyRegistered = true;
            }
        })  
    }

    uploadImage(data){
        this._http.post(this.baseUrl+"uploadImage/"+this.idAnimal, data)
        .subscribe((responseAPI) => {
            console.log(responseAPI) //TODO remove
        })  
    }

    updateKeywords(keywords, id){
        this._http.put(this.baseUrl+"updateKeywords/"+id, keywords)
        .subscribe((responseAPI) => {
            console.log(responseAPI) //TODO remove
        })  
    }

    checkAnimalName(data){   
        this._http.post(this.baseUrl+"checkName", data)
        .subscribe((responseAPI) => {
            //Check the name of the animal first at form and give feedback
            if(responseAPI["Error"]){
                this.registeredAnimal = responseAPI["Error"];
            } else {
                this.registeredAnimal = responseAPI["Success"];
            }
        })  
    }
}

