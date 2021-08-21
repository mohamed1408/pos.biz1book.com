import { Component, OnInit } from '@angular/core';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  static forRoot(): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
    throw new Error("Method not implemented.");
  }

  constructor() { }

  ngOnInit() {
    setHeightWidth();
  }

}
