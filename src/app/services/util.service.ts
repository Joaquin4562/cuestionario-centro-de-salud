import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }
  public loading = true;

  public set _loading(loading) {
    this.loading = loading;
  }
  public get _loading() {
    return this.loading;
  }
}
