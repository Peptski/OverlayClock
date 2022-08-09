import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
export class AppComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    const settings = localStorage.getItem('settings');
    if (settings) this.settingsService.setSettings(JSON.parse(settings));
  }
}
