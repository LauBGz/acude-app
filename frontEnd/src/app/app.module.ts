import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { AnimalComponent } from './animal/animal.component';
import { AnimalService } from './service/animal.service';
import { FormsModule } from '@angular/forms';

const RouterConfig: Routes = [
    {"path": "", "component": MainComponent},
    {"path":"home", "component": MainComponent},
    {"path":"animal/:id", "component": AnimalComponent},
  //{"path":"**", "component": }
  ];  

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    FooterComponent,
    AnimalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(RouterConfig, {useHash: true}),
    HttpClientModule,
    FormsModule
  ],
  providers: [AnimalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
