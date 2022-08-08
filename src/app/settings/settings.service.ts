import { Injectable } from '@angular/core';
import { Settings } from './settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  public settings: Settings = {
    hr: 0,
    min: 0,
    sec: 0,
    fontSize: 3,
    fontColor: '#ccc',
    fontWeight: 700,
    bgColor: '#222',
  };
}
