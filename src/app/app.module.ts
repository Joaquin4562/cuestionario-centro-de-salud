import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './components/registro/registro.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppConfig } from './config/app.config';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { Navbar2Component } from './components/navbar2/navbar2.component';

const ruta: Routes = [
  {
    path: 'registro',
    component: RegistroComponent
  }, 
  {
    path: 'encuesta',
    component: EncuestaComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    NavbarComponent,
    EncuestaComponent,
    Navbar2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ruta)
  ],
  providers: [
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
