import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  required(input:any){
    return (input != undefined && input != null && input != "" && input.toString().trim().length > 0);
  }
  
  email(input:any){
    var regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return input.match(regEx); // Invalid format
  }
}
