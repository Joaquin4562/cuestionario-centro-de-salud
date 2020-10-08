import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import { Routes, Router } from '@angular/router';
import { EncuestaService } from '../../services/encuesta.service';
import { LocalData } from '../../models/localData';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  formCuestionario: FormGroup;
  localData: LocalData;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private encuestaService: EncuestaService
    ) {
    this.localData = JSON.parse(localStorage.getItem('info'));
    this.formCuestionario = this.formBuilder.group({
      respuesta1:  ['', [Validators.required]],
      respuesta2:  ['', [Validators.required]],
      respuesta3:  ['', [Validators.required]],
      respuesta4:  ['', [Validators.required]],
      respuesta5:  ['', [Validators.required]],
      respuesta7:  ['', [Validators.required]],
      respuesta6:  ['', [Validators.required]],
      respuesta8:  ['', [Validators.required]],
      respuesta9:  ['', [Validators.required]],
      respuesta10: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  verificarPuntos() {
    let puntos = 0;
    const valores = Object.values(this.formCuestionario.value);
    valores.forEach((value, _ ) => {
      if (value === '1') {
        puntos++;
      }
    });
    this.encuestaService.enviarConstancia(this.localData.nombre, puntos, this.localData.correo, this.localData.id_participantes)
      .subscribe( _ => {
        Swal.fire({
          title: 'Cuestionario Finalizado',
          text: 'Favor de revisar tu correo electronico',
          icon: 'success'
        });
        localStorage.removeItem('info');
        this.router.navigateByUrl('/');
      }, err => {
        Swal.fire({
          title: 'Ocurrio un error',
          icon: 'error'
        });
        console.log(err);
      });
  }
}
