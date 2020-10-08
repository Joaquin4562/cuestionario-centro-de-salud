import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  enviarConstancia(nombre: string, puntos: number, correo: string, idParticipante: string): Observable<any> {
    const body = {
      nombre,
      puntos,
      correo,
      id_participantes: idParticipante
    };
    return this.http.post(this.appConfig.APP_ENDPOINT + 'participantes/enviar/constancia', body);
  }
}
