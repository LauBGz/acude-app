import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../service/animal.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    constructor(public _animalService: AnimalService) {    }

    ngOnInit(): void {       
    
    }

    textSearch: string ="";
    searchBody: object = {}
    id: number;
    keywords: string [] = [];
    msgSuccess: string;
    filteredByCategory: object [] = [];
    inferior: number = 0;
    superior: number = 9;
   
    addKeyword(){
        this.keywords.push(this.textSearch);
        this.textSearch = "";
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
        //Only show success message in the animal whose ID was updated
        this._animalService.allAnimals.forEach(element => {
            if(element["_id"] === id){
               this.msgSuccess = element["_id"];
            }
        });
    }

    deleteKeywords(){
        while(this.keywords.length > 0) {
            this.keywords.pop();
        }
        //Clear search results
        this._animalService.allAnimals = [];
        //Clear msgSuccess in case is showing something
        this.msgSuccess = "";
        //Load all animals again
        this._animalService.loadAllAnimals();
    }

    //Filter
    onCheckboxChange(category, event) {
        if(event.target.checked) {
            //When a checkbox is checked, add animals whose category matches
            for (let i = 0; i < this._animalService.allAnimals.length; i++) {
                if(this._animalService.allAnimals[i]["category"] === category){
                    this.filteredByCategory.push(this._animalService.allAnimals[i])
                }
            }
            this._animalService.allAnimals = this.filteredByCategory;
            //Clear filtered results
            this.filteredByCategory = [];
        } else {
            //When a checkbox is unchecked, clear filtered results
            this._animalService.allAnimals = [];
            //If there are keywords in the search, go back to the search results
            if(this.keywords.length > 0){
                this.filterByKeyword();
            //Otherwise load all animals
            } else {
                this._animalService.loadAllAnimals();
            }
        }
    }
    
    //Pagination
    next(){   
        this.inferior = this.inferior + 9;
        this.superior = this.superior + 9;
    }

    previous(){
        this.inferior = this.inferior - 9;
        this.superior = this.superior - 9;
    }
}
