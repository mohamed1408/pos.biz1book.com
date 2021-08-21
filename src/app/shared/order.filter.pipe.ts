//our root app component
import { Component, NgModule, Pipe, PipeTransform } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

@Pipe({
  name: "filter1"
})
export class FilterPipe implements PipeTransform {
  transform(items: Array<any>, filter1: { [key: string]: any }): Array<any> {
    return items.filter(item => {
      let notMatchingField = Object.keys(filter1).find(
        key => item[key] !== filter1[key]
      );

      return !notMatchingField; // true if matches all fields
    });
  }
}

@Pipe({
  name: "CategoryFilter"
})
export class CategoryPipe implements PipeTransform {
  transform(items: any, filter: any, isAnd: Boolean, CategoryId: any): any {
    if (filter && Array.isArray(items)) {
      let filterKeys = Object.keys(filter);
      if (CategoryId == 0) {
        return items;
      } else {
        if (isAnd) {
          return items.filter(item =>
            filterKeys.reduce(
              (memo, keyName) =>
                (memo &&
                  new RegExp(filter[keyName], "gi").test(item[keyName])) ||
                filter[keyName] === "",
              true
            )
          );
        } else {
          return items.filter(item => {
            return filterKeys.some(keyName => {
              console.log(keyName);
              return (
                new RegExp(filter[keyName], "gi").test(item[keyName]) ||
                filter[keyName] === ""
              );
            });
          });
        }
      }
    } else {
      return items;
    }
  }
}

// @Pipe({
//   name: "TableFilter"
// })
// export class TablePipe implements PipeTransform {
//   transform(
//     items: Array<any>,
//     filter: { [key: string]: any },
//     categoryFilterID
//   ): Array<any> {
//     return items.filter(item => {
//       let notMatchingField = Object.keys(filter).find(
//         key => item[key] !== filter[key]
//       );

//       if (categoryFilterID > 0) {
//         return !notMatchingField; // true if matches all fields
//       } else {
//         return true;
//       }
//     });
//   }
// }
