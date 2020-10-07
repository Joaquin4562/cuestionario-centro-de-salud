import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  formCuestionario: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {
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
    const doc = new jsPDF('p', 'in', 'letter');
    let puntos = 0;
    const valores = Object.values(this.formCuestionario.value);
    valores.forEach((value, _ ) => {
      if (value === '1') {
        puntos++;
      }
    });
    if (puntos >= 8) {
      console.log('PASASTE!');
      doc.addImage('./assets/img/constancia.png', 'png', 0, 0, 8.5, 11);
      doc.text(this.formCuestionario.value['nombre'], 50, 50);
      doc.save('constancia.pdf');
      this.router.navigateByUrl('/');
      this.formCuestionario.reset();
      localStorage.removeItem('info');
    } else {
      console.log('REPROBASTE!');
    }
  }
}
