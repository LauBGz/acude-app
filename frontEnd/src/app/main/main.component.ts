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

    categories: string [] = [
    'ANFIBIOS',
    'ANÉLIDOS',
    'ARTRÓPODOS',
    'AVES',
    'CNIDARIOS',
    'EQUINODERMOS',
    'MAMÍFEROS',
    'MOLUSCOS',
    'NEMÁTODOS',
    'PECES',
    'PLATELMINTOS',
    'PORÍFEROS',
    'REPTILES',
    ]

    textSearch: string ="";
    searchBody: object = {}
    id: number;
    keywords: string [] = [];
    msgSuccess: boolean =  false;
    filteredByCategory: object [] = [];

    addKeyword(){
        this.keywords.push(this.textSearch);
        this.textSearch ="";
    }

    deleteKeyword(id){
        this.keywords.splice(id, 1);
    }

    filterByKeyword() {
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
        return this.msgSuccess === true;
    }

    deleteKeywords(){
        while(this.keywords.length > 0) {
            this.keywords.pop();
        }
        
        this._animalService.allAnimals = [];
        this._animalService.loadAllAnimals();
    }

    // filterByCategory(category, event){
    //     for (let i = 0; i < this._animalService.allAnimals.length; i++) {
    //         if(this._animalService.allAnimals[i]["category"] === category){
    //             console.log(this._animalService.allAnimals[i])
    //             this.filteredByCategory.push(this._animalService.allAnimals[i])
    //         }
    //     }
    //     this._animalService.allAnimals = this.filteredByCategory;
    //     this.filteredByCategory = [];
    // }

    onCheckboxChange(category, event) {
        if(event.target.checked) {
            for (let i = 0; i < this._animalService.allAnimals.length; i++) {
                if(this._animalService.allAnimals[i]["category"] === category){
                    console.log(this._animalService.allAnimals[i])
                    this.filteredByCategory.push(this._animalService.allAnimals[i])
                }
            }
            this._animalService.allAnimals = this.filteredByCategory;
            this.filteredByCategory = [];
        } else {
            this._animalService.allAnimals = [];
            this._animalService.loadAllAnimals();
        // for(let i=0 ; i < this._animalService.allAnimals.length+1; i++) {
        //   if(this.filteredByCategory[i] === this._animalService.allAnimals[i]) {
        //     this.filteredByCategory.splice(i,1);
        //  }
    //    }
     }
    
   }
   

}
