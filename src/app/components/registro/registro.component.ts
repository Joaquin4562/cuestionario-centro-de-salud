import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { EscolaridadesService } from '../../services/escolaridades.service';
import { forkJoin } from 'rxjs';
import { Escolaridades } from '../../models/escolaridad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  escolaridades: Escolaridades[] = [];
  formRegistro: FormGroup;
  constructor(
    private registroService: RegistroService,
    private escolaridadesService: EscolaridadesService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {
      this.formRegistro = this.formBuilder.group({
        nombre:                ['', [Validators.required]],
        correo:                ['', [Validators.required, Validators.email]],
        institucion:           ['', [Validators.required]],
        id_grados_estudios:    ['', [Validators.required]],
        funcion_que_desempena: ['', [Validators.required]],
      });
    }

  ngOnInit(): void {
    forkJoin({
      escolaridades: this.escolaridadesService.getEscolaridades()
    }).subscribe( data => {
      this.escolaridades = data.escolaridades;
      console.log(data.escolaridades);
    });
  }
  registrarParticipante() {
    console.log(this.formRegistro.value);
    // this.router.navigateByUrl('/cuestionario');
    this.registroService.registrarParticipante(this.formRegistro.value).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Registrado'
        });
        localStorage.setItem('info', JSON.stringify(this.formRegistro.value));
        this.router.navigateByUrl('/cuestionario');
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar participante'
        });
        console.log(err);
      }
    );
  }

}
