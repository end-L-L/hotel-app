import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  showDashboard: boolean = true;
  currentRoute: string | undefined;

  constructor(
    private facadeService: FacadeService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.name_user = this.facadeService.getUsername();

    this.showDashboard = this.router.url === '/hotel';
    
    console.log(this.router.config);
    this.currentRoute = this.router.url;
    console.log('Ruta actual:', this.currentRoute);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showDashboard = event.url === '/hotel';
      }
    });
  }

  options = [
    { name: 'Habitaciones', icon: 'assets/icons/hotel-habitaciones.png', link: '/hotel/rooms' },
    { name: 'Tipo de Habitaciones', icon: 'assets/icons/hotel-tipo.png', link: '/' },
    { name: 'Reservas', icon: 'assets/icons/hotel-reserva.png', link: '/' },
    { name: 'Añadir Reserva', icon: 'assets/icons/hotel-añadir-reserva.png', link: '/' },
    { name: 'Gestión de Clientes', icon: 'assets/icons/hotel-clientes.png', link: '/' },
    { name: 'Gestión de Empleados', icon: 'assets/icons/hotel-empleados.png', link: '/' },
    { name: 'Estadísticas', icon: 'assets/icons/hotel-stats.png', link: '/' },
    { name: 'Ajustes', icon: 'assets/icons/hotel-ajustes.png', link: '/' },
  ];

  navigateTo(route: string) {
    this.router.navigate([route]);
    console.log(route);
  }

}
