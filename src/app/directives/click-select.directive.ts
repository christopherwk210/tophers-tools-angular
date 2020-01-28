import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickSelect]'
})
export class ClickSelectDirective {
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const e = (event.target as HTMLInputElement);
    if (e.select) e.select();
  }

  constructor() { }
}
