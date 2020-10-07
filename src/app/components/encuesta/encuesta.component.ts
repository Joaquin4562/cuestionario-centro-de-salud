import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  formCuestionario: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.formCuestionario = this.formBuilder.group({
      respuesta1: [''],
      respuesta2: [''],
      respuesta3: [''],
      respuesta4: [''],
      respuesta5: [''],
      respuesta6: [''],
      respuesta8: [''],
      respuesta9: [''],
      respuesta10: [''],
    });
  }

  ngOnInit(): void {
  }

}
