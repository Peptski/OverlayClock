import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twodigit',
  standalone: true,
})
export class TwodigitPipe implements PipeTransform {
  transform(value: number): string {
    return value.toString().length == 1 ? '0' + value : '' + value;
  }
}
