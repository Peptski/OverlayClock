import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './settings.service';
import { Settings } from './settings.model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  @ViewChild('form', { static: true })
  settingsForm!: NgForm;
  settings: Settings;

  constructor(private settingsService: SettingsService) {
    this.settings = this.settingsService.settings;
  }

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.settings);
      this.settingsForm.setValue(this.settings);
    });
  }

  onSubmit(form: NgForm) {
    this.settingsService.settings = new Settings(
      form.value.hr,
      form.value.min,
      form.value.sec,
      form.value.fontSize,
      form.value.fontColor,
      form.value.fontWeight,
      form.value.bgColor
    );
  }
}
