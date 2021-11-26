import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { DragService } from 'src/app/service/drag.service';

@Directive({
  selector: '[bizDropTarget]'
})
export class BizDropTargetDirective {
  constructor(private dragService: DragService) {
  }

  @Input()
  set bizDropTarget(options: DropTargetOptions) {
    if (options) {
      this.options = options;
    }
  }

  @Output('bizDrop') drop = new EventEmitter();

  private options: DropTargetOptions = {};

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    const { zone = 'zone' } = this.options;

    if (this.dragService.accepts(zone)) {
      event.preventDefault();
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    const data = JSON.parse(event.dataTransfer.getData('Text'));

    this.drop.next(data);
  }
}
export interface DropTargetOptions {
  zone?: string;
}