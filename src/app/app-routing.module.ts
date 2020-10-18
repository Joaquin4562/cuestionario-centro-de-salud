import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { LoginComponent } from './components/login/login.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'estadisticas',
    component: EstadisticasComponent
  },
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
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
