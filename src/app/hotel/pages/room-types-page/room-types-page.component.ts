import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

// services
import { FacadeService } from 'src/app/auth/services/facade.service';
import { HotelService } from '../../services/hotel.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-room-types-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator
  ],
  templateUrl: './room-types-page.component.html',
  styleUrl: './room-types-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomTypesPageComponent implements OnInit {
  
  public mainUrl = environment.API_URL;
  public token:string = "";
  public tiposHabitaciones: any [] = [];
  public role: string = "";
  public dataColumns:string[] | undefined;

  displayedColumns: string[] = [];
  dataSourceTipoHabitacion = new MatTableDataSource<DatosTipoHabitacion>(this.tiposHabitaciones as DatosTipoHabitacion[]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSourceTipoHabitacion.paginator = this.paginator;
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
    this.hotelService.getTiposHabitaciones().subscribe({
      next: (response)=>{
        
        this.tiposHabitaciones = response;
        if(this.tiposHabitaciones.length > 0){
          this.dataSourceTipoHabitacion = new MatTableDataSource<DatosTipoHabitacion>(this.tiposHabitaciones as DatosTipoHabitacion[]);
        }

      },
      error: (error)=>{
        alert("¡Error!: Lista no Obtenida");
      }
    });
  }

  public goEditar(id: number){
    //this.router.navigate(['rooms/edit/'+id]);
    console.log("Editar: "+id);
  }

  public goEliminar(id: number){
    //this.router.navigate(['rooms/delete/'+id]);
  }

  public mostrarColumnas(){
    if(this.role == "administrador"){
      this.displayedColumns = ['id', 'imagen', 'tipo', 'descripcion', 'editar', 'eliminar'];
    }else if(this.role == "recepcionista"){
      this.displayedColumns = ['id', 'imagen', 'tipo', 'descripcion'];
    }
  }

  // paginador
  public initPaginator(){
    setTimeout(() => {
      this.dataSourceTipoHabitacion.paginator = this.paginator;
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

export interface DatosTipoHabitacion {
  id: number;
  tipo: string;
  descripcion: string;
  imagen: string;
}