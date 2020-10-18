import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { Observable } from 'rxjs';
import { Participantes } from '../models/participantes';

@Injectable({
  providedIn: 'root'
})
export class ParticipantesService {

  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  obtenerTodosLosParticipantes(): Observable<Participantes[]> {
    return this.http.get<Participantes[]>(this.appConfig.APP_ENDPOINT + 'participantes');
  }
  obtenerTodosLosParticipantesPorInstitucion(institucion: string): Observable<Participantes[]> {
    return this.http.get<Participantes[]>(
      this.appConfig.APP_ENDPOINT
      + 'participantes-institucion?institucion=' + institucion);
  }
}
