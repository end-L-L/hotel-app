import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AdminPageComponent } from "../admin-page/admin-page.component";
import { FacadeService } from '../../../auth/services/facade.service';
import { StaffPageComponent } from "../staff-page/staff-page.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdminPageComponent, StaffPageComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  admin = true;
  role: string = 'administrador';

  constructor(
    private facadeService: FacadeService
  ) { }

  ngOnInit(): void {
    this.role = this.facadeService.getUserGroup();
  }

}
