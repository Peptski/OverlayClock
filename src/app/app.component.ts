import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClockComponent } from './clock/clock.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from './settings/settings.service';

@Component({
  imports: [RouterModule, ClockComponent, SettingsComponent],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'OverlayClock';
}
