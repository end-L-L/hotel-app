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

  // Habitaciones
  
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

  // Reservaciones
  
  public getCostoReservacion(data: any): Observable <any>{
    return this.http.post<any>(`${environment.API_URL}/api/v1/hotel/costo-reservacion`,data, httpOptions);
  }

  public postReservacion(data: any): Observable <any>{
    return this.http.post<any>(`${environment.API_URL}/api/v1/hotel/reservacion`,data, httpOptions);
  }

  public deleteReservacion(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/api/v1/hotel/eliminar-reservacion/${id}`);
  }
  
  public getReservaciones (): Observable <any>{
    return this.http.get<any>(`${environment.API_URL}/api/v1/hotel/resumen-reservaciones`, httpOptions);
  }

  // Configuraciones

  public getPrecios (): Observable <any>{
    return this.http.get<any>(`${environment.API_URL}/api/v1/hotel/app-precio-habitacion`, httpOptions);
  }

  public updatePrecio(data: any): Observable <any>{
    return this.http.put<any>(`${environment.API_URL}/api/v1/hotel/app-precio-habitacion`,data, httpOptions);
  }

  public getDescuentoUsual (): Observable <any>{
    return this.http.get<any>(`${environment.API_URL}/api/v1/hotel/app-descuento-usual`, httpOptions);
  }

  public updateDescuentoUsual(data: any): Observable <any>{
    return this.http.put<any>(`${environment.API_URL}/api/v1/hotel/app-descuento-usual`,data, httpOptions);
  }

  public getGanancias (data: any): Observable <any>{
    return this.http.post<any>(`${environment.API_URL}/api/v1/hotel/app-ganancias-mes`, data, httpOptions);
  }
}
