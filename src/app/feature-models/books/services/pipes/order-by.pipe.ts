import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(items: any[], order = '', field: string = ''): any {
    if (!items || order === '' || !order) return items;
    if (items.length <= 1) return items;

    if (!field || field === '') {
      if (order === 'asc') {
        return items.sort();
      } else {
        return items.sort().reverse();
      }
    } else {
      if(order === 'asc'){
        items = items.sort((a,b) => (a[field] - b[field]));
      } else if(order === 'desc'){
        items = items.sort((a,b) => (b[field] - a[field]));
      }
    }

    return items;
  }

}
