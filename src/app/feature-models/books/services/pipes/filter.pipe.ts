import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { BookModel } from '../../models/book.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Array < any > , bookCategories: any[], bookAuthor: any[], priceRangeMin: any, priceRangeMax: any): Array < any > {
    return items.filter((book) => 
      this.isPriceInRange(book, priceRangeMin, priceRangeMax) &&
        (bookAuthor.length != 0 ? this.isSameAuthor(book, bookAuthor) : true) &&
        (bookCategories.length != 0 ? this.isSameCategory(book, bookCategories) : true)
    )
  }


  isPriceInRange(book: BookModel, priceRangeMin: number, priceRangeMax: number) {
    return +book.price <= priceRangeMax && +book.price >= priceRangeMin;
  }

  isSameAuthor(book: BookModel, bookAuthors: String[]) {
    for(let bookAuthor of bookAuthors){
      if(bookAuthor === book.author){
        return true;
      }
    }
    return false;
  }
  isSameCategory(book: BookModel, bookCategories: String[]) {
    for(let bookCategory of bookCategories){
      if(bookCategory === book.category){
        return true;
      }
    }
    return false;
  }

}
