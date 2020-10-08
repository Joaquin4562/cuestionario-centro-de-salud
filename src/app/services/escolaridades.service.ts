import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app.config';
import { Observable } from 'rxjs';
import { Escolaridades } from '../models/escolaridad';

@Injectable({
  providedIn: 'root'
})
export class EscolaridadesService {

  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  getEscolaridades(): Observable<Escolaridades[]> {
    return this.http.get<Escolaridades[]>(this.appConfig.APP_ENDPOINT + 'escolaridades');
  }
}
