import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../settings/settings.service';
import { Settings } from '../settings/settings.model';
import { Subscription } from 'rxjs';
import { TwodigitPipe } from '../pipes/twodigit.pipe';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [CommonModule, TwodigitPipe],
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
})
export class ClockComponent implements OnDestroy {
  currentSettings: Settings;
  currentMode = false;
  running = false;
  interval: any;

  subscriptions: Subscription[] = [];

  constructor(private settingsService: SettingsService) {
    this.currentSettings = this.settingsService.settings;

    this.subscriptions.push(
      this.settingsService.settingsUpdated.subscribe((settings) => {
        this.currentSettings = settings;
      })
    );

    this.subscriptions.push(
      this.settingsService.modeState.subscribe(
        (mode) => (this.currentMode = mode)
      )
    );

    this.subscriptions.push(
      this.settingsService.stopClock.subscribe(() => this.stop())
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  start() {
    this.running = true;
    if (this.running) {
      const val = this.currentMode ? -1 : 1;
      this.interval = setInterval(() => {
        if (!this.settingsService.tick(val)) {
          clearInterval(this.interval);
          this.running = false;
        }
      }, 1000);
    }
  }

  stop() {
    this.running = false;
    if (this.interval) clearInterval(this.interval);
  }

  toggleSettings() {
    this.settingsService.openSettings();
  }

  clearValue() {
    this.settingsService.clearValue();
    this.stop();
  }
}
