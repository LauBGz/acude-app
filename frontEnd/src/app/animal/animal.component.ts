import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService} from '../service/animal.service'

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent {

    id: string = "";

    constructor(private _rute: ActivatedRoute, public _animalService: AnimalService) { 
        this._rute.params.subscribe( params =>{
            this.id = params['id'];
        })
        _animalService.loadAnAnimal(this.id)
    }

}
