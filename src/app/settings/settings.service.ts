import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Settings } from './settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  public _settings: Settings = {
    hr: 0,
    min: 0,
    sec: 0,
    fontSize: 5,
    fontColor: '#c1c7d1',
    fontWeight: 700,
    bgColor: '#14171c',
  };

  settingsState = new Subject<boolean>();
  settingsUpdated = new Subject<Settings>();
  modeState = new Subject<boolean>();
  stopClock = new Subject<boolean>();

  get settings(): Settings {
    return { ...this._settings };
  }

  setSettings(settings: Settings) {
    this._settings = settings;
    this.settingsUpdated.next(this.settings);
  }

  openSettings() {
    this.settingsState.next(true);
  }

  clearValue() {
    this._settings.hr = 0;
    this._settings.min = 0;
    this._settings.sec = 0;
    this.settingsUpdated.next(this.settings);
  }

  tick(value: number): boolean {
    let time =
      this._settings.hr * 3600 + this._settings.min * 60 + this._settings.sec;
    time += value;
    if (time === -1) return false;

    this._settings.sec = time % 60;
    this._settings.min = ((time - (time % 60)) % 3600) / 60;
    this._settings.hr = (time - (time % 3600)) / 3600;
    this.settingsUpdated.next(this.settings);

    return true;
  }

  resetSettings() {
    this._settings = {
      hr: 0,
      min: 0,
      sec: 0,
      fontSize: 5,
      fontColor: '#c1c7d1',
      fontWeight: 700,
      bgColor: '#14171c',
    };
    this.settingsUpdated.next(this.settings);
    this.settingsState.next(true);
  }
}
