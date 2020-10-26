import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { EstadisticasService } from '../../services/estadisticas.service';
import { ParticipantesService } from '../../services/participantes.service';
import { forkJoin } from 'rxjs';
import { Participantes } from '../../models/participantes';
import { ExportToCsv } from 'export-to-csv';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  instituciones: [];
  institucionActual = 'IMSS';
  participantes: Participantes[];
  participantesInstitucion: Participantes[];
  aprovadosGralTotal = 0;
  reprovadosGralTotal = 0;
  aprovadosInstitucion = 0;
  reprovadosInstitucion = 0;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartColors: Color[] = [
    { backgroundColor: '#217F00' },
    { backgroundColor: '#30B701' }
  ];
  barChartLabelsGeneral: Label[];
  barChartDataGeneral: ChartDataSets[] =  [
    { data: [0, 0, 0], label: 'Aprobados' },
    { data: [0, 0, 0], label: 'Reprobados' }
  ];
  barChartLabelsInstitucion: Label[] = ['Aprobados', 'Reprobados'];
  barChartDataInstitucion: ChartDataSets[] = [
    { data: [0, 0, 0], label: 'Total' }
  ];

  constructor(
    private estadisticasService: EstadisticasService,
    private participantesServices: ParticipantesService,
    private utilService: UtilService,
  ) { }

  ngOnInit(): void {
    this.utilService._loading = true;
    forkJoin({
      participantes: this.participantesServices.obtenerTodosLosParticipantes(),
      participanteInstitucion: this.participantesServices.obtenerTodosLosParticipantesPorInstitucion(this.institucionActual),
      instituciones: this.estadisticasService.obtenerInstituciones(),
      aprovadosgral: this.estadisticasService.obtenerAprovadosGenerales(),
      reprovadosGral: this.estadisticasService.obtenerReprovadosGenerales(),
      aprovadosInstitucion: this.estadisticasService.obtenerAprovadosInstitucion(this.institucionActual),
      reprovadosInstitucion: this.estadisticasService.obtenerReprovadosInstitucion(this.institucionActual)
    }).subscribe ( data => {
      this.participantes = data.participantes,
      this.instituciones = data.instituciones;
      this.participantesInstitucion = data.participanteInstitucion;
      this.barChartLabelsGeneral = this.instituciones;
      this.barChartDataGeneral =  [
        { data: data.aprovadosgral, label: 'Aprobados' },
        { data: data.reprovadosGral, label: 'Reprobados' }
      ];
      data.aprovadosgral.forEach((element: number) => {
        this.aprovadosGralTotal += element;
      });
      data.reprovadosGral.forEach((element: number) => {
        this.reprovadosGralTotal += element;
      });
      this.barChartDataInstitucion = [
        { data: [ Number(data.aprovadosInstitucion), Number(data.reprovadosInstitucion), 0], label: 'Total' }
      ];
      this.reprovadosInstitucion = Number(data.reprovadosInstitucion);
      this.aprovadosInstitucion = Number(data.aprovadosInstitucion);
    }, err => console.log(err)).add ( () => this.utilService._loading = false);
  }

  onChangeInstitucion(value: string) {
    this.institucionActual = value;
    this.utilService._loading = true;
    forkJoin({
      participanteInstitucion: this.participantesServices.obtenerTodosLosParticipantesPorInstitucion(this.institucionActual),
      aprovadosInstitucion: this.estadisticasService.obtenerAprovadosInstitucion(this.institucionActual),
      reprovadosInstitucion: this.estadisticasService.obtenerReprovadosInstitucion(this.institucionActual)
    }).subscribe( data => {
      console.log(data);
      this.participantesInstitucion = data.participanteInstitucion;
      this.barChartDataInstitucion = [
        { data: [ Number(data.aprovadosInstitucion), Number(data.reprovadosInstitucion), 0], label: 'Total' }
      ];
      this.reprovadosInstitucion = Number(data.reprovadosInstitucion);
      this.aprovadosInstitucion = Number(data.aprovadosInstitucion);
    }, err => console.log(err)).add(() => this.utilService._loading = false);
  }

  descargarGenerales() {
    const options = {
      fieldSeparator: ',',
      filename: 'Datos generales',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Datos generales',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(this.participantes);
  }
  descargarInstitucion() {
    const options = {
      fieldSeparator: ',',
      filename: 'Datos de la institución',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Datos de la institución',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(this.participantesInstitucion);
  }
}
