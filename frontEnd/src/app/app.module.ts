import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';

const RouterConfig: Routes = [
    {"path": "", "component": MainComponent},
    {"path":"home", "component": MainComponent},
  //{"path":"**", "component": }
  ];  

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(RouterConfig, {useHash: true}),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
