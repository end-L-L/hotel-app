import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';

const ANGULAR_MATERIAL = [
  FormsModule,
  MatFormField,
  MatLabel,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatDatepickerModule,
  MatCardModule,
  MatRadioModule,
]

@Component({
  selector: 'app-booking-form-page',
  standalone: true,
  imports: [
    ANGULAR_MATERIAL
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './booking-form-page.component.html',
  styleUrl: './booking-form-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingFormPageComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {
    this.minDate = new Date();
  }
  
  minDate = new Date();
  infoCliente: any = {};
  opcion: string = 'habitual';
  fecha_entrada: string = '';


  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    // fechas en formato MM/DD/YYYY
    const startDate = dateRangeStart.value;
    const endDate = dateRangeEnd.value;
  
    // auxiliar para cambiar el formato
    const formatToDjangoDate = (date: string): string => {
      const [month, day, year] = date.split('/'); // Divide el MM/DD/YYYY
      return `${year}-${month}-${day}`; // Reordena como YYYY/MM/DD
    };
  
    // conversión
    const djangoStartDate = formatToDjangoDate(startDate);
    const djangoEndDate = formatToDjangoDate(endDate);
  
    // asignación
    this.infoCliente.fecha_entrada = djangoStartDate;
    this.infoCliente.fecha_salida = djangoEndDate;
  }

  calcularPrecio() {
    console.log('Calculando precio...');
  }
  
  registrarReserva() {
    console.log('Reserva registrada', this.infoCliente);
  }

  eliminarReserva() {}
}


