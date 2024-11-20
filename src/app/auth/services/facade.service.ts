import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ErrorsService } from './extensions/errors.service';
import { ValidatorService } from './extensions/validator.service';

import { environment } from '@env/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// cookies names
const user_id_cookie_name = 'hotel-user_id';
const user_email_cookie_name = 'hotel-user_email';
const session_cookie_name = 'hotel-user_token';
const group_name_cookie_name = 'hotel-user_group-name';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
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

  login(username:String, password:String): Observable<any> {
    var data={
      username: username,
      password: password
    }
    return this.http.post<any>(`${environment.API_URL}/api/v1/login`,data);
  }

  logout(): Observable<any> {
    var headers: any;
    var token = this.getSessionToken();
    headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.API_URL}/api/v1/logout`, {headers: headers});
  }

  // session cookie
  saveUserData(user_data:any){
    var secure = environment.API_URL.indexOf("https")!=-1;

    if(user_data.role == "administrador"){
      console.log("administrador");
      this.cookieService.set(user_id_cookie_name, user_data.id, undefined, undefined, undefined, secure, secure?"None":"Lax");
      this.cookieService.set(user_email_cookie_name, user_data.email, undefined, undefined, undefined, secure, secure?"None":"Lax");  
    }

    if(user_data.role == "recepcionista"){
      this.cookieService.set(user_id_cookie_name, user_data.id, undefined, undefined, undefined, secure, secure?"None":"Lax");
      this.cookieService.set(user_email_cookie_name, user_data.email, undefined, undefined, undefined, secure, secure?"None":"Lax");
    }

    this.cookieService.set(session_cookie_name, user_data.token, undefined, undefined, undefined, secure, secure?"None":"Lax");
    this.cookieService.set(group_name_cookie_name, user_data.role, undefined, undefined, undefined, secure, secure?"None":"Lax");
  }

  getUserGroup(){
    return this.cookieService.get(group_name_cookie_name);
  }

  getSessionToken(){
    return this.cookieService.get(session_cookie_name);
  }

  destroyUser(){
    this.cookieService.deleteAll();
  }
}