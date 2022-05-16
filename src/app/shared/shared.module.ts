import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookLoaderComponent } from './components/book-loader/book-loader.component';
import { SvgTemplateComponent } from './components/templates/svg-template/svg-template.component';



@NgModule({
  declarations: [BookLoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [BookLoaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
