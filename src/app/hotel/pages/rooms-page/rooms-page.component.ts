import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

// services
import { FacadeService } from 'src/app/auth/services/facade.service';
import { HotelService } from '../../services/hotel.service';
import { environment } from '@env/environment'

@Component({
  selector: 'app-rooms-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginator
  ],
  templateUrl: './rooms-page.component.html',
  styleUrl: './rooms-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsPageComponent implements OnInit {
  
  public mainUrl = environment.API_URL;
  currentRoute: string | undefined;
  
  public token:string = "";
  public listaHabitaciones: any [] = [];
  public role: string = "";
  public dataColumns:string[] | undefined;

  displayedColumns: string[] = [];
  dataSourceHabitacion = new MatTableDataSource<DatosHabitacion>(this.listaHabitaciones as DatosHabitacion[]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSourceHabitacion.paginator = this.paginator;
  }

  constructor(
    private router: Router,
    private facadeService: FacadeService,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    this.token = this.facadeService.getSessionToken();

    if(this.token == ""){
      this.router.navigate(['']);
    }else{
      this.role = this.facadeService.getUserGroup();
      this.obtenerHabitaciones();
      this.initPaginator();
      this.mostrarColumnas();
    }
  }

  public obtenerHabitaciones(){
    this.hotelService.getHabitaciones().subscribe({
      next: (response)=>{
        console.log(response);
        this.listaHabitaciones = response;
        console.log(this.listaHabitaciones);

        if(this.listaHabitaciones.length > 0){
          this.dataSourceHabitacion = new MatTableDataSource<DatosHabitacion>(this.listaHabitaciones as DatosHabitacion[]);
        }
      },
      error: (error)=>{
        alert("¡Error!: Lista no Obtenida");
      }
    });
  }

  public goEditar(id: number){
    this.router.navigate(['rooms/edit/'+id]);
  }

  public goEliminar(id: number){
    this.router.navigate(['rooms/delete/'+id]);
  }

  // Función Para Mostrar Columnas
  public mostrarColumnas(){
    if(this.role == "administrador"){
      this.displayedColumns = ['id', 'imagen', 'número', 'tipo', 'precio', 'disponible', 'editar', 'eliminar'];
    }else if(this.role == "recepcionista"){
      this.displayedColumns = ['id', 'imagen', 'número', 'tipo', 'precio', 'disponible'];
    }
  }
  

  // Paginador
  public initPaginator(){
    setTimeout(() => {
      this.dataSourceHabitacion.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
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

export interface DatosHabitacion {
  id: number;
  numero: number;
  tipo: string;
  precio: number;
  disponible: boolean;
  imagen: string;
}