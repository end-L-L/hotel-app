import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdminPageComponent } from "../admin-page/admin-page.component";
import { FacadeService } from '../../../auth/services/facade.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdminPageComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  admin = true;
  role: string = 'administrador';

  constructor(
    private facadeService: FacadeService
  ) { }

  ngOnInit(): void {
    //this.role = this.facadeService.getUserGroup();
    //console.log("Rol: ", this.rol);
  }

}
