import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
// import * as moment from 'moment'

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit {
  companyId: number = 0
  storeId: number = 0
  saleProductId: number = 0
  beforenow: any = {}
  afternow: any = {}
  beforenow_wt: any = {}
  afternow_wt: any = {}
  time: string = ''
  raw_time: string = ''
  customDuration: number = 60
  today: string = ''
  yesterday: string = ''
  oneweek: string = ''
  twoweek: string = ''
  customhour: string = ''
  from: string = ''
  to: string = ''

  stores: any = []
  saleproductgroups: any = []

  leftPanelArray = []
  rightPanelArray = []
  leftPanelName = ''
  rightPanelName = ''
  constructor(
    private auth: AuthService
  ) {
    let loginfo = JSON.parse(localStorage.getItem("loginInfo"))
    this.companyId = loginfo.CompanyId
  }

  ngOnInit() {
    this.getStores()
    this.getSaleProducts()
  }
  getStores() {
    this.auth.GetStoreName1(this.companyId).subscribe(data => {
      this.stores = data;
      // let obj = { Id: 0, Name: "All", ParentStoreId: null, ParentStore: null, IsMainStore: false }
      // this.stores.unshift(obj);
    })
  }
  getSaleProducts() {
    this.auth.getSaleProducts(this.companyId).subscribe(data => {
      console.log(data)
      let response: any = data
      this.saleproductgroups = response.products;
      this.saleProductId = this.saleproductgroups[0].Id
      // let obj = { Id: 0, Name: "All" }
      // this.saleproductgroups.unshift(obj)
    });
  }

  submit() {
    if (this.saleProductId == 0) {
      alert("select a sale product group")
      return
    }
    this.auth.getprediction(this.companyId, this.storeId, this.saleProductId, this.customDuration, '', '').subscribe(data => {
      this.time = data["dateinfo"][0]["time"]
      this.today = data["dateinfo"][0]["today"]
      this.yesterday = data["dateinfo"][0]["yesterday"]
      this.oneweek = data["dateinfo"][0]["oneweek"]
      this.twoweek = data["dateinfo"][0]["twoweek"]
      this.customhour = data["dateinfo"][0]["customhour"]
      this.raw_time = data["dateinfo"][0]["raw_time"]

      this.afternow = data["afterNow"][0]
      this.beforenow = data["beforeNow"][0]

      this.leftPanelArray = []
      this.rightPanelArray = []
      this.leftPanelName = ''
      this.rightPanelName = ''
      this.predict()
    })
  }
  today_prediction: number = 0
  yesterday_prediction: number = 0
  oneweek_prediction: number = 0
  twoweek_prediction: number = 0

  iszero(val) {
    if (val == 0) return 1
    else if (val > 0 || val < 0) return val
  }

  predict() {
    let _2week_ratio = this.iszero(this.beforenow.twoweek) / this.iszero(this.afternow.twoweek)
    let _1week_ratio = this.iszero(this.beforenow.oneweek) / this.iszero(this.afternow.oneweek)
    let yesterday_ratio = this.iszero(this.beforenow.yesterday) / this.iszero(this.afternow.yesterday)
    console.log(_2week_ratio, _1week_ratio, yesterday_ratio)
    let average_ratio = (_2week_ratio + _1week_ratio + yesterday_ratio) / 3
    console.log(average_ratio)
    console.log(this.iszero(this.beforenow.today) / average_ratio)
    this.today_prediction = +(this.iszero(this.beforenow.today) / average_ratio).toFixed(0)
    this.twoweek_prediction = +(this.iszero(this.beforenow.today) / _2week_ratio).toFixed(0)
    this.oneweek_prediction = +(this.iszero(this.beforenow.today) / _1week_ratio).toFixed(0)
    this.yesterday_prediction = +(this.iszero(this.beforenow.today) / yesterday_ratio).toFixed(0)
  }

  onDrop(drop_data: any, panel: string) {
    console.log(drop_data)
    this.auth.getpredictionitems(this.companyId, this.storeId, drop_data.date, drop_data.from, drop_data.to, this.saleProductId).subscribe(data => {
      console.log(data)
      if (panel == "left") {
        this.leftPanelArray = data["items"]
        this.leftPanelName = [drop_data.firstName, drop_data.secondName].join(' ')
      } else if (panel == "right") {
        this.rightPanelArray = data["items"]
        this.rightPanelName = [drop_data.firstName, drop_data.secondName].join(' ')
      }
    })
    // alert(`dropped: ${data}`);
  }

  submit_with_time() {
    this.auth.getprediction(this.companyId, this.storeId, this.saleProductId, this.customDuration, this.from, this.to).subscribe(data => {
      this.afternow_wt = data["afterNow"][0]
      this.beforenow_wt = data["beforeNow"][0]

      // this.leftPanelArray = []
      // this.rightPanelArray = []
      // this.leftPanelName = ''
      // this.rightPanelName = ''
      // this.predict()
    })
  }
}
