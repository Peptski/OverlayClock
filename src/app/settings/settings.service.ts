import { EventEmitter, Injectable } from '@angular/core';
import { Settings } from './settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  public settings: Settings = {
    hr: 3,
    min: 2,
    sec: 1,
    fontSize: 3,
    fontColor: '#ccc',
    fontWeight: 700,
    bgColor: '#222',
  };

  settingsState = new EventEmitter<boolean>();
  settingsUpdated = new EventEmitter<Settings>();

  openSettings() {
    this.settingsState.emit(true);
  }
}
