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
      if (!localStorage.getItem('info')) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('cuestionario');
      }
    }
}
