import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appNumericOnlyDirective]',
  standalone: true,
})
export class NumericOnlyDirective {

  constructor() { }

  private regex: RegExp = /^[0-9]*[.,]?[0-9]*$/;

  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const original = input.value;
    const filtered = original.replace(/[^0-9.,]/g, '');

    if (!this.regex.test(filtered)) {
      input.value = filtered;
    }
  }

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    const allowed = /[0-9.,]/;
    if (!allowed.test(event.key)) {
      event.preventDefault();
    }
  }
}
