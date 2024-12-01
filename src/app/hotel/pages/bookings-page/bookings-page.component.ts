import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { FacadeService } from 'src/app/auth/services/facade.service';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-bookings-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator
  ],
  templateUrl: './bookings-page.component.html',
  styleUrl: './bookings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingsPageComponent implements OnInit {

  public token:string = "";
  public datosReservaciones: any [] = [];
  public role: string = "";
  public dataColumns:string[] | undefined;

  displayedColumns: string[] = [];
  dataSourceDatosReservaciones = new MatTableDataSource<DatosReservacion>(this.datosReservaciones as DatosReservacion[]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSourceDatosReservaciones.paginator = this.paginator;
  }

  constructor(
    private router: Router,
    private facadeService: FacadeService,
    private hotelService: HotelService
  ) { }

  ngOnInit() {
    this.token = this.facadeService.getSessionToken();

    if(this.token == ""){
      this.router.navigate(['']);
    }else{
      this.role = this.facadeService.getUserGroup();
      this.obtenerReservaciones();
      this.initPaginator();
      this.mostrarColumnas();
    }
  }

  obtenerReservaciones(){
    this.hotelService.getReservaciones().subscribe({
      next: (response)=>{
        
        this.datosReservaciones = response;
        if(this.datosReservaciones.length > 0){
          this.dataSourceDatosReservaciones = new MatTableDataSource<DatosReservacion>(this.datosReservaciones as DatosReservacion[]);
        }

      },
      error: (error)=>{
        alert("¡Error!: Lista no Obtenida");
      }
    });
  }

  goEditar(id: number){
    console.log(id);
  }

  goEliminar(id: number){
    console.log(id);
  }

  public mostrarColumnas(){
    if(this.role == "administrador"){
      this.displayedColumns = ['id', 'cliente', 'nombre', 'habitacion', 'fecha_entrada', 'fecha_salida', 'total', 'pagado', 'editar', 'eliminar'];
    }else if(this.role == "recepcionista"){
      this.displayedColumns = ['id', 'cliente', 'nombre', 'habitacion', 'fecha_entrada', 'fecha_salida', 'total', 'pagado'];
    }
  }

  // paginador
  public initPaginator(){
    setTimeout(() => {
      this.dataSourceDatosReservaciones.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = '# de Registros';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
  }
}

export interface DatosReservacion {
  id: number;
  cliente: string;
  nombre: string;
  habitacion: string;
  fecha_entrada: string;
  fecha_salida: string;
  precio: number;
  pagado: boolean;
}