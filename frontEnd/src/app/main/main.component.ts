import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public _http: HttpClient) { }

  animals: Object;   

  ngOnInit(): void {
    this._http.get("http://localhost:3000/getAllAnimals")
    .subscribe((responseAPI) => { 
      this.animals = responseAPI;
      console.log(this.animals[0]);
    });
  }

}
