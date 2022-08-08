import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClockComponent } from './clock/clock.component';

@Component({
  imports: [RouterModule, ClockComponent],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'OverlayClock';
}
