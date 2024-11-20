import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/auth/services/facade.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit{

  public token:string = "";
  public role:string = "";

  public constructor(
    private facadeService: FacadeService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.token = this.facadeService.getSessionToken();
    this.role = this.facadeService.getUserGroup();
  }

  public logout(){
    this.facadeService.logout().subscribe({
      next: () => {
        this.facadeService.destroyUser();
        localStorage.removeItem('token');
        this.router.navigate(["/"]);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
