import { Directive } from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[validColor]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: validColorDirective,
      multi: true,
    },
  ],
})
export class validColorDirective implements Validator {
  validate(control: FormControl): ValidationErrors | null {
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(control.value)) {
      return { invalidColor: true };
    }
    return null;
  }
}
