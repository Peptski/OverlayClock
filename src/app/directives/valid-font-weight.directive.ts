import { Directive } from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[validFontWeight]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: validFontWeightDirective,
      multi: true,
    },
  ],
})
export class validFontWeightDirective implements Validator {
  validate(control: FormControl): ValidationErrors | null {
    const allowed = [100, 200, 300, 400, 500, 600, 700, 800, 900];
    if (!allowed.includes(control.value)) {
      return { invalidFontWeight: true };
    }
    return null;
  }
}
