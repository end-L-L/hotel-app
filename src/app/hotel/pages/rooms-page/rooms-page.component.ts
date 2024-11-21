import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FacadeService } from 'src/app/auth/services/facade.service';
import { HotelService } from '../../services/hotel.service';

import { environment } from '@env/environment'

@Component({
  selector: 'app-rooms-page',
  standalone: true,
  imports: [],
  templateUrl: './rooms-page.component.html',
  styleUrl: './rooms-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsPageComponent implements OnInit {
  
  public mainUrl = environment.API_URL;
  public token:string = "";
  // public listaHabitaciones: any [] = [];
  public listaHabitaciones: any = {};

  currentRoute: string | undefined;
  
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
      this.obtenerHabitaciones();
    }
  }

  public obtenerHabitaciones(){
    this.hotelService.getHabitaciones().subscribe({
      next: (response)=>{
        console.log(response);
        this.listaHabitaciones = response;
        console.log(this.listaHabitaciones);
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
}
