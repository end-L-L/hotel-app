import { Injectable } from '@angular/core';
import { ValidatorService } from './extensions/validator.service';
import { ErrorsService } from './extensions/errors.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(
    private validatorService: ValidatorService,
    private errorsService: ErrorsService
  ) { }

  public validarLogin(username: String, password: String){
    var data = {
      "username": username,
      "password": password
    }
    
    let error: any = [];

    if(!this.validatorService.required(data["username"])){
      error["username"] = this.errorsService.required;
    } else if (!this.validatorService.email(data['username'])) {
      error['username'] = this.errorsService.email;
    }
    
    if(!this.validatorService.required(data["password"])){
      error["password"] = this.errorsService.required;
    }

    return error;
  }
}
