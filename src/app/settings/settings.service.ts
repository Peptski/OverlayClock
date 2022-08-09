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

  openSettings() {
    this.settingsState.emit(true);
  }
}
