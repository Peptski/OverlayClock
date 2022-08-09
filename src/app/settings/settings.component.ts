import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './settings.service';
import { Settings } from './settings.model';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidTimeDirective } from '../directives/valid-time.directive';
import { validFontSizeDirective } from '../directives/valid-font-size.directive';
import { validFontWeightDirective } from '../directives/valid-font-weight.directive';
import { validColorDirective } from '../directives/valid-color-directive';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ValidTimeDirective,
    validFontSizeDirective,
    validFontWeightDirective,
    validColorDirective,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ transform: 'translateX(20%)' }),
        animate('100ms', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('100ms', style({ transform: 'translateX(20%)' })),
      ]),
    ]),
  ],
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
        const canvas = document.querySelector('canvas')!;
        const ctx = canvas.getContext('2d')!;
        ctx.font = `${this.currentSettings.fontWeight} ${
          this.currentSettings.fontSize / 2
        }rem Inter`;
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

    this.settingsService.stopClock.emit(true);
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

  openPiP() {
    const video = document.querySelector('video')!;
    const canvas = document.querySelector('canvas')!;

    const ctx = canvas.getContext('2d')!;
    ctx.textAlign = 'center';
    ctx.font = `${this.currentSettings.fontWeight} ${
      this.currentSettings.fontSize / 2
    }rem Inter`;
    ctx.fillStyle = this.currentSettings.bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = this.currentSettings.fontColor;

    setInterval(() => {
      const hr = this.currentSettings.hr.toString();
      const min = this.currentSettings.min.toString();
      const sec = this.currentSettings.sec.toString();

      ctx.fillStyle = this.currentSettings.bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = this.currentSettings.fontColor;
      ctx.fillText(
        `${hr.length == 1 ? '0' + hr : '' + hr}:${
          min.length == 1 ? '0' + min : '' + min
        }:${sec.length == 1 ? '0' + sec : '' + sec}`,
        canvas.width / 2,
        canvas.height / 1.7
      );
    }, 25);

    let vidStrm = canvas.captureStream(30);

    video.srcObject = vidStrm;

    setTimeout(() => {
      video.requestPictureInPicture();
    }, 50);
  }
}
