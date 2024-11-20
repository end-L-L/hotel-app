import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../../partials/navbar/navbar.component";

// Router
import { Router} from '@angular/router';

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
    NavbarComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPageComponent {

  public name_user: string = '';
  
  constructor(
    private router: Router
  ) { }

  options = [
    { name: 'Habitaciones', icon: 'assets/icons/hotel-habitaciones.png', link: '/' },
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
  }

}
