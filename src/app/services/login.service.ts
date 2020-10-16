import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  signIn(body: any): Observable<any> {
    return this.http.post(this.appConfig.APP_ENDPOINT + 'signin', body);
  }
}
