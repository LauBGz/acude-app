import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../service/animal.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public _animal : AnimalService) { }

  ngOnInit(): void {
    
  }

  textoBusqueda: string ="";
  searchBody: object = {}
  id: number;
  keywords: string [] = [];

  submitData(form){
    form.reset();
    console.log(this.textoBusqueda)
  }
  
  addKeyword(){
    this.keywords.push(this.textoBusqueda);
    console.log(this.keywords)
    console.log(this.textoBusqueda)
  }

  deleteKeyword(id){
    this.keywords.splice(id, 1);
  }

  OnInput() {
    this.searchBody = {"keyWords": this.keywords};
    this._animal.filterByKeywords(this.searchBody);
  }

  onKeyPress(event: any) {
    if(event.keyCode == 13) {
        this.addKeyword();
        this.textoBusqueda = "";
      }
    };
}
