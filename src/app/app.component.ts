import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cuestionario-salud';
  constructor(private router: Router) { }
    ngOnInit(): void {
      if (!localStorage.getItem('info-registro') || !localStorage.getItem('info-login')) {
        this.router.navigateByUrl('/login');
      } else {
        this.router.navigateByUrl('cuestionario');
      }
    }
}
