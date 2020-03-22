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

    submitted: boolean = false;
  

      formData: object = {}
      keywordsArray: string []= [];

      addKeywordForm(keyword){
        this.keywordsArray.push(keyword);
      }

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
