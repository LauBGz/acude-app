import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../service/animal.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

    constructor(public _animal : AnimalService) { }

    ngOnInit(): void {
    }

      //donde se guardarán los datos
      formData: object = {}
      variableProxy:  string []= [];

      submitData(form){
        
        console.log(this.formData["keyWords"]);

        this.formData["keyWords"] = ["ave","rapaz", "brillante"];
    
        console.log(this.formData);

        this._animal.addNewAnimal(this.formData);
        alert("Datos enviados!")
      }

      

}
