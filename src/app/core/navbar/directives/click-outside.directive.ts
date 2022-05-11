import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private elementRef: ElementRef) { }

  @Output('appClickOutside') clickOutside: EventEmitter<any> = new EventEmitter();

  @HostListener('document:click', ['$event.target']) onMouseEnter(
    targetElement: any
  ) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if(!clickedInside){this.clickOutside.emit(null);}
  }
}
