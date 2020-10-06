import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

const ruta: Routes = [
  {
    path: 'registro',
    component: RegistroComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(ruta)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
