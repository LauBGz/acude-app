import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../service/animal.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

    constructor(public _animalService : AnimalService) { }

    ngOnInit(): void {
    }

    searchBody: object = {}
    submitted: boolean = false;
    formData: object = {}
    keywordsArray: string []= [];

    
    checkName(){
        this.searchBody = {"name": this.formData['name']};
        this._animalService.checkAnimalName(this.searchBody);
    }

    addKeywordForm(){
        this.keywordsArray.push(this.formData['keyWords']);
        this.formData['keyWords'] = "";
    }

    onKeyPress(event: any) {
        if(event.keyCode === 13) {
            this.addKeywordForm();
            }
    };

    deleteKeyword(id){
        this.keywordsArray.splice(id, 1);
    }

    submitData(form){
        this.formData["keyWords"] = this.keywordsArray;
        this._animalService.addNewAnimal(this.formData);
        form.reset();
        this.keywordsArray = [];
        this.submitted = true;
    }

    submitImage(form){
        this._animalService.uploadImage(this.formData);
    }
    

}
