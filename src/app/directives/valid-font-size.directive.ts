import { Directive } from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[validFontSize]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: validFontSizeDirective,
      multi: true,
    },
  ],
})
export class validFontSizeDirective implements Validator {
  validate(control: FormControl): ValidationErrors | null {
    if (control.value < 0 || control.value > 8) {
      return { invalidFontSize: true };
    }
    return null;
  }
}
