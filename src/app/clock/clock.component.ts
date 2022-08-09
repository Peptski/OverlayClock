import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../settings/settings.service';
import { Settings } from '../settings/settings.model';
import { Subscription } from 'rxjs';
import { TwodigitPipe } from '../twodigit.pipe';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule, TwodigitPipe],
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
})
export class ClockComponent implements OnInit, OnDestroy {
  settings: Settings;
  running = false;
  settingsUpdate: Subscription;

  constructor(private settingsService: SettingsService) {
    this.settings = this.settingsService.settings;
    this.settingsUpdate = this.settingsService.settingsUpdated.subscribe(
      (settings) => (this.settings = settings)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.settingsUpdate.unsubscribe();
  }

  toggleMode() {
    this.running = !this.running;
  }

  toggleSettings() {
    this.settingsService.openSettings();
  }
}
