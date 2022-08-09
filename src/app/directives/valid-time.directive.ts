import { Directive } from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[validTime]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ValidTimeDirective, multi: true },
  ],
})
export class ValidTimeDirective implements Validator {
  validate(control: FormControl): ValidationErrors | null {
    if (control.value < 0 || control.value > 60) {
      return { invalidTimeValue: true };
    }
    return null;
  }
}
