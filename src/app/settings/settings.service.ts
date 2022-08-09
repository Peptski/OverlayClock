import { EventEmitter, Injectable } from '@angular/core';
import { Settings } from './settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  public settings: Settings = {
    hr: 0,
    min: 15,
    sec: 0,
    fontSize: 6,
    fontColor: '#d1d5db',
    fontWeight: 700,
    bgColor: '#111827',
  };

  settingsState = new EventEmitter<boolean>();
  settingsUpdated = new EventEmitter<Settings>();
  modeState = new EventEmitter<boolean>();

  openSettings() {
    this.settingsState.emit(true);
  }

  clearValue() {
    this.settings.hr = 0;
    this.settings.min = 0;
    this.settings.sec = 0;
    this.settingsUpdated.emit(this.settings);
  }

  tick(value: number): boolean {
    let time =
      this.settings.hr * 3600 + this.settings.min * 60 + this.settings.sec;
    time += value;
    if (time === -1) return false;

    this.settings.sec = time % 60;
    this.settings.min = ((time - (time % 60)) % 3600) / 60;
    this.settings.hr = (time - (time % 3600)) / 360;
    this.settingsUpdated.emit(this.settings);

    return true;
  }
}
