import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../partials/navbar/navbar.component";

// Router
import { Router, RouterOutlet, RouterLink, NavigationEnd} from '@angular/router';

// Facade Service
import { FacadeService } from '../../../auth/services/facade.service';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

const MaterialModules = [
  MatCardModule,
  MatIconModule
];

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    MaterialModules,
    NavbarComponent,
    RouterOutlet,
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPageComponent implements OnInit {

  public name_user: string = '';
  public showDashboard: boolean = true;
  public token:string = "";
  public role: string = "";

  options = [
    { name: 'Habitaciones', icon: 'assets/icons/hotel-habitaciones.png', link: '/hotel/rooms' },
    { name: 'Tipos de Habitación', icon: 'assets/icons/hotel-tipo.png', link: '/hotel/roomTypes' },
    { name: 'Reservas', icon: 'assets/icons/hotel-reserva.png', link: '/hotel/bookings' },
    { name: 'Gestionar Reserva', icon: 'assets/icons/hotel-añadir-reserva.png', link: '/hotel/booking-form' },
    //{ name: 'Gestión de Clientes', icon: 'assets/icons/hotel-clientes.png', link: '/hotel' },
    //{ name: 'Gestión de Empleados', icon: 'assets/icons/hotel-empleados.png', link: '/hotel' },
    { name: 'Ajustes', icon: 'assets/icons/hotel-ajustes.png', link: '/hotel/settings' },
  ];

  constructor(
    private facadeService: FacadeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.token = this.facadeService.getSessionToken();

    if (this.token === '') {
      this.router.navigate(['']);
    } else {
      this.role = this.facadeService.getUserGroup();
      this.name_user = this.facadeService.getUsername();

      this.updateShowDashboard(this.router.url);

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateShowDashboard(event.url);
        }
      });
    }
  }

  updateShowDashboard(url: string): void {
    this.showDashboard = url === '/hotel';
    this.cdr.markForCheck(); // Asegura que se detecten los cambios
  }

  // trackByOption(index: number, option: any): any {
  //   return option.link;
  // }

  navigateTo(route: string) {
    this.router.navigate([route]);
    console.log(route);
  }
}
