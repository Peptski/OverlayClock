import { EventEmitter, Injectable } from '@angular/core';
import { Settings } from './settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  public _settings: Settings = {
    hr: 0,
    min: 0,
    sec: 0,
    fontSize: 5,
    fontColor: '#d1d5db',
    fontWeight: 700,
    bgColor: '#111827',
  };

  settingsState = new EventEmitter<boolean>();
  settingsUpdated = new EventEmitter<Settings>();
  modeState = new EventEmitter<boolean>();
  stopClock = new EventEmitter<boolean>();

  get settings(): Settings {
    return { ...this._settings };
  }

  setSettings(settings: Settings) {
    this._settings = settings;
    this.settingsUpdated.emit(this.settings);
  }

  openSettings() {
    this.settingsState.emit(true);
  }

  clearValue() {
    this._settings.hr = 0;
    this._settings.min = 0;
    this._settings.sec = 0;
    this.settingsUpdated.emit(this.settings);
  }

  tick(value: number): boolean {
    let time =
      this._settings.hr * 3600 + this._settings.min * 60 + this._settings.sec;
    time += value;
    if (time === -1) return false;

    this._settings.sec = time % 60;
    this._settings.min = ((time - (time % 60)) % 3600) / 60;
    this._settings.hr = (time - (time % 3600)) / 3600;
    this.settingsUpdated.emit(this.settings);

    return true;
  }

  resetSettings() {
    this._settings = {
      hr: 0,
      min: 0,
      sec: 0,
      fontSize: 5,
      fontColor: '#d1d5db',
      fontWeight: 700,
      bgColor: '#111827',
    };
    this.settingsUpdated.emit(this.settings);
    this.settingsState.emit(true);
  }
}
