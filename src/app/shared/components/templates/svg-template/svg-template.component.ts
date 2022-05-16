import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-template',
  templateUrl: './svg-template.component.svg',
  styleUrls: ['./svg-template.component.scss']
})
export class SvgTemplateComponent {

  @Input() color: string;
  @Input() width: string;
  @Input() height: string;

}
