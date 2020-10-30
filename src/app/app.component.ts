import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cuestionario-salud';
  login = false;
  registro = false;
  constructor(private router: Router, public utilService: UtilService) { }
    ngOnInit(): void {
      if (localStorage.getItem('info-registro')) {
        this.registro = true;
      }
      if (localStorage.getItem('info-login')) {
        this.login = true;
      }
      if (this.login && !this.registro) {
        this.router.navigateByUrl('/estadisticas');
      } else if (!this.login && this.registro) {
        this.router.navigateByUrl('/encuesta');
      }
      if (!this.login && !this.registro) {
        this.login = false;
        this.registro = false;
        this.router.navigateByUrl('/login');
      }
    }

}

