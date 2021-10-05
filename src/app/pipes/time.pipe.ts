import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
@Pipe({
  name: 'slidertime'
})
export class TimePipe implements PipeTransform {

  transform(minutes: number, args?: any): any {
    console.log(minutes)

    return moment().startOf('day').add(minutes, 'minutes').format('hh:mm A');
  }

}
