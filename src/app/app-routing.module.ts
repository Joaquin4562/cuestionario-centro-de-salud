import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registro', component: RegistroComponent
  },
  {
    path: 'cuestionario', component: EncuestaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
