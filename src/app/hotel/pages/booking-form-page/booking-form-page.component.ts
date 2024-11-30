import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { HotelService } from '../../services/hotel.service';

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

  constructor(
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.minDate = new Date();
  }
  
  minDate = new Date();
  infoCliente: any = {};
  opcion: string = 'habitual';
  respuesta: any = {};
  tipoInformacion: string = ''; // 'costo' | 'reserva'
  pago: string | undefined;

  estados:any[]= [
    {value: '1', viewValue: 'Si'},
    {value: '2', viewValue: 'No'}
  ];


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
    this.tipoInformacion = 'costo';
    
    if(this.opcion === 'esporadico') {
      this.infoCliente.cliente = 0;
    }

    this.hotelService.getCostoReservacion(this.infoCliente).subscribe({
      next: (response) => {
        this.loadData(response);
      },
      error: (error) => {
        alert(error.error.detail);
      }
    });    
  }
  
  registrarReserva() {
    
    let valor : boolean = false;
    
    if(this.pago == '1'){
      this.infoCliente.pagado = true;
    } else {
      this.infoCliente.pagado = false;
    }
    
    this.tipoInformacion = 'reserva';
    this.hotelService.postReservacion(this.infoCliente).subscribe({
      next: (response) => {
        this.loadData(response);
        alert('Reservación Registrada');
      },
      error: (error) => {
        alert(error.error.error);
      }
    });
  }

  eliminarReserva() {
    this.hotelService.deleteReservacion(this.infoCliente.habitacion).subscribe({
      next: (response) => {
        alert('Reservación Eliminada');
      },
      error: (error) => {
        alert(error.error.error);
      }
    });
  }

  public loadData(data: any){
    this.respuesta = data;
    this.cdr.detectChanges();
  }
}


