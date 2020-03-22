import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../service/animal.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    constructor(public _animalService: AnimalService) { }

    ngOnInit(): void {
        
    }

    textoBusqueda: string ="";
    searchBody: object = {}
    id: number;
    keywords: string [] = [];
    


    addKeyword(){
        this.keywords.push(this.textoBusqueda);
        this.textoBusqueda ="";
    }

    deleteKeyword(id){
        this.keywords.splice(id, 1);
    }

    OnInput() {
        this.searchBody = {"keyWords": this.keywords};
        this._animalService.filterByKeywords(this.searchBody);
    }

    onKeyPress(event: any) {
        if(event.keyCode === 13) {
            this.addKeyword();
            
        }
        };

    addUserKeywords(keywords, id){
        this._animalService.updateKeywords({"keyWords": this.keywords}, id)
    }
}
