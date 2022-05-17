import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookLoaderComponent } from './components/book-loader/book-loader.component';
import { SvgTemplateComponent } from './components/templates/svg-template/svg-template.component';
import { OrderByPipe } from '../feature-models/books/services/pipes/order-by.pipe';



@NgModule({
  declarations: [BookLoaderComponent, OrderByPipe],
  imports: [
    CommonModule
  ],
  exports: [BookLoaderComponent, OrderByPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
