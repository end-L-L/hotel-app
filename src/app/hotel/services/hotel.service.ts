import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { FacadeService } from 'src/app/auth/services/facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(
    private http: HttpClient,
    private facadeService: FacadeService
  ) { }

  // public getHabitaciones (): Observable <any>{
  //   var token = this.facadeService.getSessionToken();
  //   var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
  //   return this.http.get<any>(`${environment.API_URL}/api/v1/hotel/lista-habitaciones`, {headers:headers});
  // }

  public getHabitaciones (): Observable <any>{
    return this.http.get<any>(`${environment.API_URL}/api/v1/hotel/lista-habitaciones`, httpOptions);
  }

  public getTiposHabitaciones (): Observable <any>{
    return this.http.get<any>(`${environment.API_URL}/api/v1/hotel/tipo-habitacion`, httpOptions);
  }
}
