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
  settings: Settings;
  state = false;
  settingsSub: Subscription;
  settingsUpdate: Subscription;

  constructor(private settingsService: SettingsService) {
    this.settings = this.settingsService.settings;
    this.settingsSub = this.settingsService.settingsState.subscribe((state) => {
      this.state = state;
      if (state) {
        setTimeout(() => {
          this.settingsForm.setValue(this.settings);
        });
      }
    });
    this.settingsUpdate = this.settingsService.settingsUpdated.subscribe(
      (settings) => {
        this.settings = settings;
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.settingsSub.unsubscribe();
    this.settingsUpdate.unsubscribe();
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
}
