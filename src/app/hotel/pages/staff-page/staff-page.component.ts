import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../partials/navbar/navbar.component";

// Router
import { Router, RouterOutlet, NavigationEnd} from '@angular/router';

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
  selector: 'app-staff-page',
  standalone: true,
  imports: [
    MaterialModules,
    NavbarComponent,
    RouterOutlet,
  ],
  templateUrl: './staff-page.component.html',
  styleUrl: './staff-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffPageComponent implements OnInit {
  
  public name_user: string = '';
  public showDashboard: boolean = true;
  public token:string = "";
  public role: string = "";

  options = [
    { name: 'Habitaciones', icon: 'assets/icons/hotel-habitaciones.png', link: '/hotel/rooms' },
    { name: 'Reservas', icon: 'assets/icons/hotel-reserva.png', link: '/hotel/bookings' },
    { name: 'Gestionar Reserva', icon: 'assets/icons/hotel-añadir-reserva.png', link: '/hotel/booking-form' },
    { name: 'Ajustes', icon: 'assets/icons/hotel-ajustes.png', link: '/hotel/' },
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

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
