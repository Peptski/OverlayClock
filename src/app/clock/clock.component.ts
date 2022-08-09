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
  currentSettings: Settings;
  currentMode = false; //false stopwatch, true timer
  running = false;
  interval: any;

  settingsUpdateSub: Subscription;
  modeSub: Subscription;

  constructor(private settingsService: SettingsService) {
    this.currentSettings = this.settingsService.settings;

    this.settingsUpdateSub = this.settingsService.settingsUpdated.subscribe(
      (settings) => (this.currentSettings = settings)
    );

    this.modeSub = this.settingsService.modeState.subscribe(
      (mode) => (this.currentMode = mode)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.settingsUpdateSub.unsubscribe();
    this.modeSub.unsubscribe();
  }

  start() {
    this.running = !this.running;
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
    this.running = !this.running;
    clearInterval(this.interval);
  }

  toggleSettings() {
    this.settingsService.openSettings();
  }

  clearValue() {
    this.settingsService.clearValue();
  }
}
