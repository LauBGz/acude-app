import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

    constructor(public _http: HttpClient) {
        this.loadAllAnimals();
     }

    animals: Object;  
    anAnimal: Object;  

    loadAllAnimals() {
        this._http.get("http://localhost:3000/getAllAnimals")
        .subscribe((responseAPI) => { 
          this.animals = responseAPI;
        });
    }

    loadAnAnimal(id) {
        this._http.get("http://localhost:3000/getAnAnimal/"+id)
        .subscribe((responseAPI) => { 
          this.anAnimal = responseAPI;
        });
    }
    
}
