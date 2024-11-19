import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../../partials/navbar/navbar.component";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPageComponent {

}
