import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './settings.service';
import { Settings } from './settings.model';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false })
  settingsForm!: NgForm;
  currentSettings: Settings;
  open = false;
  currentMode = false; //false for stopwatch, true for timer

  settingsOpenSub: Subscription;
  settingsUpdateSub: Subscription;

  constructor(private settingsService: SettingsService) {
    this.currentSettings = this.settingsService.settings;

    this.settingsOpenSub = this.settingsService.settingsState.subscribe(
      (state) => {
        this.open = state;
        if (state) {
          setTimeout(() => {
            this.settingsForm.setValue(this.currentSettings);
          });
        }
      }
    );

    this.settingsUpdateSub = this.settingsService.settingsUpdated.subscribe(
      (settings) => {
        this.currentSettings = settings;
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.settingsOpenSub.unsubscribe();
    this.settingsUpdateSub.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.settingsService.settingsUpdated.emit(
        (this.settingsService.settings = new Settings(
          form.value.hr,
          form.value.min,
          form.value.sec,
          form.value.fontSize,
          form.value.fontColor,
          form.value.fontWeight,
          form.value.bgColor
        ))
      );
    }
  }

  toggleState() {
    this.settingsService.settingsState.emit(false);
  }

  toggleMode(mode: boolean) {
    if (mode !== this.currentMode) {
      this.currentMode = mode;
      this.settingsService.modeState.emit(mode);
      document
        .querySelectorAll('.mode')
        .forEach((ele) => ele.classList.toggle('active'));
    }
  }
}
