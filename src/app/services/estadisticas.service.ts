import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app.config';
import { Observable } from 'rxjs';
import { Participantes } from '../models/participantes';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  obtenerInstituciones(): Observable<any> {
    return this.http.get(this.appConfig.APP_ENDPOINT + 'instituciones');
  }
  obtenerAprovadosGenerales(): Observable<any> {
    return this.http.get(this.appConfig.APP_ENDPOINT + 'aprovados-general');
  }
  obtenerReprovadosGenerales(): Observable<any> {
    return this.http.get(this.appConfig.APP_ENDPOINT + 'reprovados-general');
  }
  obtenerAprovadosInstitucion(institucion: string) {
    return this.http.get(
      this.appConfig.APP_ENDPOINT
      + 'aprovados-institucion?institucion=' + institucion);
  }
  obtenerReprovadosInstitucion(institucion: string) {
    return this.http.get(
      this.appConfig.APP_ENDPOINT
      + 'reprovados-institucion?institucion=' + institucion);
  }
}
