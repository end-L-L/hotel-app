import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  
  public generic: string;
  public required: string;
  public numeric: string;
  public betweenDate: string;
  public email: string;
  
  constructor() {
    this.generic = 'Tipo de Dato no Válido';
    this.required = 'Campo Requerido';
    this.numeric = 'Solo Valores Numéricos';
    this.betweenDate = 'Fecha Inválida';
    this.email = 'Formato Incorrecto';
  }
}
