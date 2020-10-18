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
  constructor(private router: Router, public utilService: UtilService) { }
    ngOnInit(): void {
      if (!localStorage.getItem('info-registro')) {
        this.router.navigateByUrl('/estadisticas');
      } else {
        this.router.navigateByUrl('cuestionario');
      }
    }
}
