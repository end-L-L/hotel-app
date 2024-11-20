import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../partials/navbar/navbar.component";

// Router
import { Router} from '@angular/router';

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
    NavbarComponent
  ],
  templateUrl: './staff-page.component.html',
  styleUrl: './staff-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffPageComponent implements OnInit {
  
  public name_user: string = '';

  constructor(
    private facadeService: FacadeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.name_user = this.facadeService.getUsername();
  }

  options = [
    { name: 'Habitaciones', icon: 'assets/icons/hotel-habitaciones.png', link: '/' },
    { name: 'Reservas', icon: 'assets/icons/hotel-reserva.png', link: '/' },
    { name: 'Añadir Reserva', icon: 'assets/icons/hotel-añadir-reserva.png', link: '/' },
    { name: 'Ajustes', icon: 'assets/icons/hotel-ajustes.png', link: '/' },
  ];

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
