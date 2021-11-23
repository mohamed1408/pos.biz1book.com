import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit {
  companyId: number
  storeId: number
  saleProductId: number
  beforenow: any
  afternow: any

  constructor() { }

  ngOnInit() {
    // this.a
  }

}
