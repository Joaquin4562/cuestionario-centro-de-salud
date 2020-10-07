import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { Participantes } from '../models/participantes';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  registrarParticipante(body: Participantes): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT + 'participantes/nuevo', body);
  }
}
