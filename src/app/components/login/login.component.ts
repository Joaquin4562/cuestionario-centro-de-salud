import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formSignIn: FormGroup;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    ) {
      this.formSignIn = this.formBuilder.group({
        usuario: ['', [Validators.required]],
        contrasena: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
  }
  signInUser() {
    this.loginService.signIn(this.formSignIn.value)
      .subscribe( data => {
        if ( !data.auth ) {
          Swal.fire({
            title: 'Error',
            text: data.error,
            icon: 'error'
          });
        } else {
          console.log(data);
        }
      }, err => console.log(err));
  }
  toRegistro() {
    this.router.navigateByUrl('/registro');
  }
}
