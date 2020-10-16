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
  isCollapse = true;
  isCollapseFuncion = true;
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
    });
  }
  onChangeInstitucion(value: string) {
    if (value === 'Otra') {
      this.isCollapse = !this.isCollapse;
    } else {
      this.isCollapse = true;
    }
  }
  onChangeFuncion(value: string) {
    if (value === 'otro') {
      this.isCollapseFuncion = !this.isCollapseFuncion;
    } else {
      this.isCollapseFuncion = true;
    }
  }
  registrarParticipante() {
    console.log(this.formRegistro);
    this.registroService.registrarParticipante(this.formRegistro.value).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Registrado'
        });
        localStorage.setItem('info-registro', JSON.stringify(data));
        this.router.navigateByUrl('/cuestionario');
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar participante',
          text: 'Correo ya registrado'
        });
        console.log(err);
      }
    );
  }

}
