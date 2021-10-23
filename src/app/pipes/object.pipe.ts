import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryfilter'
})
export class ObjectPipe implements PipeTransform {

  transform(arr: any, categoryId: number, trigger: boolean): any {
    console.log(categoryId)
    arr = arr.filter(x => x.CategoryId == +categoryId || +categoryId == 0)
    return arr || [];
  }

}
