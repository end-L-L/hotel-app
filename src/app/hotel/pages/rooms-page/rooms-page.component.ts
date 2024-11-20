import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms-page',
  standalone: true,
  imports: [],
  templateUrl: './rooms-page.component.html',
  styleUrl: './rooms-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsPageComponent implements OnInit {
  
  currentRoute: string | undefined;
  constructor(private router: Router) {}

  ngOnInit() {
    // Obtén todas las rutas configuradas
    console.log(this.router.config);
    this.currentRoute = this.router.url;
    console.log('Ruta actual:', this.currentRoute);
  }
}