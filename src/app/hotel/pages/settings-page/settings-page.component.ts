import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent implements OnInit{

  public defaultConfig:any={};
  public prestamoConfig:any={};
  public retrasoConfig:any={};
  public extravioConfig:any={};

  public precioConfig:any={};
  public infoHabitaciones:any[]= [];

  public descuentoConfig:any = {}
  public infoDescuento:any = {};
  public descuento:number | undefined;

  public gananciasConfig:any = {};
  public ganancias_mes:number | undefined;
  public ganancias_anio:number | undefined;
  public infoGanancias:any = {};

  estados:any[]= [
    {value: '1', viewValue: 'Si'},
    {value: '2', viewValue: 'No'}
  ];


  constructor(
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtenerPrecios();
    this.obtenerDescuentos();
  }

  public obtenerPrecios(){
    this.hotelService.getPrecios().subscribe({
      next: (response)=>{
        this.infoHabitaciones = response;
        this.loadDataPrecios(this.infoHabitaciones);
      },
      error: (error)=>{
        alert("¡Error!: Lista no Obtenida");
      }
    });
  }

  public updatePrecio(){
    this.hotelService.updatePrecio(this.precioConfig).subscribe({
      next: (response)=>{
        console.log(response);
        this.obtenerPrecios();
      },
      error: (error)=>{
        alert("¡Error!: Precio no Actualizado");
      }
    });
  }

  public obtenerDescuentos(){
    this.hotelService.getDescuentoUsual().subscribe({
      next: (response)=>{
        this.infoDescuento = response;
        this.loadDataDescuentos(this.infoDescuento);
      },
      error: (error)=>{
        alert("¡Error!: Información no Obtenida");
      }
    });
  }

  public updateDescuento(){
    this.descuentoConfig={
      tipo_cliente: 'H',
      descuento: this.descuento
    }

    this.hotelService.updateDescuentoUsual(this.descuentoConfig).subscribe({
      next: (response)=>{
        this.obtenerDescuentos();
      },
      error: (error)=>{
        alert("¡Error!: Descuento no Actualizado");
      }
    });
  }

  public mesGanancias(){
    this.gananciasConfig.mes = Number(this.ganancias_mes) ?? 0;
    this.gananciasConfig.anio = Number(this.ganancias_anio) ?? 0;

    this.hotelService.getGanancias(this.gananciasConfig).subscribe({
      next: (response)=>{
        this.infoGanancias = response;
        this.loadDataGanancias(this.infoGanancias);
      },
      error: (error)=>{
        alert("¡Error!: Ganancias no Obtenidas");
      }
    });
  }

  public loadDataPrecios(data: any){
    this.infoHabitaciones = data;
    this.cdr.detectChanges();
  }

  public loadDataDescuentos(data: any){
    this.infoDescuento = data;
    this.cdr.detectChanges();
  }

  public loadDataGanancias(data: any){
    this.infoGanancias = data;
    this.cdr.detectChanges();
  }
}