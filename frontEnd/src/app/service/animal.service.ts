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

    animals: Object;  
    anAnimal: Object; 
    allAnimals: any; 
    filteredAnimals: Object [] = [];

    loadAllAnimals() {
        this._http.get(this.baseUrl+"getAllAnimals")
        .subscribe((responseAPI) => { 
          this.animals = responseAPI;
          this.allAnimals = this.animals;
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

        for (let i = 0; i < responseAPI["orderedResults"].length; i++) {
           this.filteredAnimals.push(responseAPI["orderedResults"][i]["array"]);
        }

        this.allAnimals = this.filteredAnimals;
         
        });
    }

    addNewAnimal(data){
        this._http.post(this.baseUrl+"addAnimal", data)
        .subscribe((responseAPI) => { 
        console.log(responseAPI)});
    }
}
