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
import { FormComponent } from './form/form.component';
import { AsistenceComponent } from './asistence/asistence.component';
import { ErrorComponent } from './error/error.component';

const RouterConfig: Routes = [
    {"path": "", "component": MainComponent},
    {"path":"home", "component": MainComponent},
    {"path":"animal/:id", "component": AnimalComponent},
    {"path":"addAnimal", "component": FormComponent},
    {"path":"asistence", "component": AsistenceComponent},
    {"path":"**", "component": ErrorComponent}
  ];  

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    FooterComponent,
    AnimalComponent,
    FormComponent,
    AsistenceComponent,
    ErrorComponent
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
