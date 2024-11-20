import { Component} from '@angular/core';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { FacadeService } from '../../services/facade.service';

declare var $: any; // jquery

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  public username: string = "";
  public password: string = "";
  public type: String = "password";
  public errors:any = {}
  
  constructor(
    private router: Router,
    private facadeService: FacadeService
  ) {}

  login(){
    
    this.errors = [];

    this.errors = this.facadeService.validarLogin(this.username, this.password);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    this.facadeService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log("response", response);
        this.facadeService.saveUserData(response);
        return this.router.navigate(['/hotel']);
      },
      error: (error) => {
        alert("No se pudo iniciar sesión");
        console.log("error", error);
      }
    })
    return;
  }

  public showPassword(){
    if(this.type == "password"){
      $("#show-password").addClass("show-password");
      $("#show-password").attr("data-password", true);
      this.type = "text";
    }else if(this.type == "text"){
      $("#show-password").removeClass("show-password");
      $("#show-password").attr("data-password", false);
      this.type = "password";
    }
  }
}
