import { EventEmitter, Injectable } from '@angular/core';
import { Settings } from './settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  public settings: Settings = {
    hr: 3,
    min: 2,
    sec: 1,
    fontSize: 3,
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
