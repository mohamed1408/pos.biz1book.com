import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { idbService } from "../service/idb.service";
import { Router } from "@angular/router";
import { LocsService } from '../service/locs.service';
// import { echartsConfig } from '../../assets/dist/js/dashboard-chart'
import * as moment from "moment";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EChartOption } from "echarts";
import { ɵELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { dangertoast } from 'src/assets/dist/js/toast-data';
declare function setHeightWidth(): any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  CompanyId: number;
  StoreId: number;
  fromDate = 0;
  frmdate: any = moment().format("YYYY-MM-DD");
  todate: any = moment().format("YYYY-MM-DD");
  toDate = 0;
  resData: any;
  all: string = "All";
  public dash: any;
  stores: any;
  summaries: any;
  key = 'Name';
  term;
  p;
  startdate: any;
  enddate: any;
  alwaysShowCalendars: boolean;
  Sales: number;
  Expense: number;
  totpay: number;
  // selected:any;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];
  selected: { startDate: moment.Moment, endDate: moment.Moment };
  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }
  TotalSales: any;
  cash: number;
  card: number;
  other: number;
  errorMsg: string = '';


  constructor(
    private Auth: AuthService,
    private IDB: idbService,
    private router: Router,
    private LOCS: LocsService,
    private modalService: NgbModal
  ) {
    this.alwaysShowCalendars = true;
    if (localStorage.getItem("userinfo") == null) {
      //...
      this.router.navigate([""]);
    } else {
      // var userinfo = localStorage.getItem("userinfo");
      // var userinfoObj = JSON.parse(userinfo);
      // this.CompanyId = 1;
      // this.StoreId = 2;
      var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
      this.CompanyId = logInfo.CompanyId;
      // this.StoreId = logInfo.StoreId;

    }
    this.loadScripts();
  }
  ngOnInit() {
    this.All();
    this.Getsum();
    // this.Auth.getStoreData(this.CompanyId, this.StoreId).subscribe(data => {
    //   console.log(data)
    //   this.IDB.IDBCreateStore(data);
    //   console.log(data);
    // });
    this.GetStore();

    // this.startdate = moment().format('YYYY-MM-DD');
    // this.enddate = moment().format('YYYY-MM-DD');
    // this.Auth.getDashBoard(this.startdate,this.enddate,this.CompanyId,this.StoreId).subscribe(data => {
    //   this.dash = data;
    //   console.log(this.dash);
    // this.IDB.IDBCreateStore(data);
    //   echartsConfig(this.dash);
    setHeightWidth();

    // ...
    // });
    if (this.LOCS.getDataall("currentDate") != moment().format("YYYY-MM-DD")) {
      this.LOCS.setData("KOTNo", 0);
      this.LOCS.setData("currentDate", moment().format("YYYY-MM-DD"));
    }
  }
  ngAfterViewInit() {
    this.All();
  }
  Getsum() {
    this.Auth.getsum(this.CompanyId, this.frmdate, this.todate, this.StoreId).subscribe(sum => {
      this.summaries = sum;
      this.TotalSales = this.summaries.totExpense[0];
      console.log(this.TotalSales)
      this.Sales = this.summaries.totExpense[0].SalesCash + this.summaries.totExpense[0].SalesCard;
      this.Expense = this.summaries.totExpense[0].ExpencesCash + this.summaries.totExpense[0].ExpencesCard;
      this.summaries.cash.forEach(element => {
        // element.ShiftStartTime = moment(element.ShiftStartTime).format("DD/MM/YYYY A hh:mm");
        // element.ShiftEndTime = moment(element.ShiftEndTime).format("DD/MM/YYYY A hh:mm");
        element.profit = element.ClosingBalance - (element.OpeningBalance + element.CashIn - element.CashOut);
        element.expbal = element.OpeningBalance + element.CashIn - element.CashOut;
        if (((new Date(element.ShiftEndTime)).getTime() / 1000) < ((new Date(element.ShiftStartTime)).getTime() / 1000)) {
          element.ShiftEndTime = 'Unclosed';
          element.profit = '-';
          element.expbal = '-';
          element.ShiftStartTime = moment(element.ShiftStartTime).format("DD/MM/YYYY A hh:mm");

        }
        else {
          element.ShiftStartTime = moment(element.ShiftStartTime).format("DD/MM/YYYY A hh:mm");
          element.ShiftEndTime = moment(element.ShiftEndTime).format("DD/MM/YYYY A hh:mm");

        }
      });
      var response: any = sum
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }
    })
  }
  GetStore() {
    this.Auth.GetStoreData(this.CompanyId).subscribe(data => {
      this.stores = data;
      var obj = { Id: 0, Name: "All", ParentStoreId: null, ParentStore: null, IsMainStore: false }
      this.stores.push(obj);
      var response: any = data
      if (response.status = 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }
    });
  }
  date(e) {
    this.startdate = e.startDate.format('YYYY-MM-DD')
    this.enddate = e.endDate.format('YYYY-MM-DD')
  }
  date1(e) {
    this.frmdate = e.startDate.format('YYYY-MM-DD')
    this.todate = e.endDate.format('YYYY-MM-DD')

    this.Getsum();
    this.getdashboard();
  }
  selectEvent(e) {
    this.StoreId = e.Id;
    this.Auth.getDashBoard(this.frmdate, this.todate, this.CompanyId, e.Id).subscribe(data => {
      this.dash = [];
      this.dash = data;
      console.log(this.dash);
      this.Getsum();
      //  echartsConfig(this.dash);
      setHeightWidth();
    });
  }
  getdashboard() {
    this.Auth.getDashBoard(this.frmdate, this.todate, this.CompanyId, this.StoreId).subscribe(data => {
      this.dash = [];
      this.dash = data;
      console.log(this.dash);
      this.Getsum();
      //  echartsConfig(this.dash);
      setHeightWidth();
    });
  }
  All() {
    this.startdate = moment().format('YYYY-MM-DD');
    this.enddate = moment().format('YYYY-MM-DD');
    this.Auth.getDashBoard(this.frmdate, this.todate, this.CompanyId, 0).subscribe(data => {
      this.dash = [];
      this.dash = data;
      console.log(this.dash);
      //  echartsConfig(this.dash);
      setHeightWidth();
    });
  }
  loadScripts() {
    const dynamicScripts = [
      "../../assets/vendors/jquery/dist/jquery.min.js",
      "../../assets/vendors/popper.js/dist/umd/popper.min.js",
      "../../assets/vendors/bootstrap/dist/js/bootstrap.min.js",
      "../../assets/dist/js/jquery.slimscroll.js",
      "../../assets/dist/js/dropdown-bootstrap-extended.js",
      "../../assets/dist/js/feather.min.js",
      "../../assets/vendors/jquery-toggles/toggles.min.js",
      "../../assets/dist/js/toggle-data.js",
      "../../assets/vendors/waypoints/lib/jquery.waypoints.min.js",
      "../../assets/vendors/jquery.counterup/jquery.counterup.min.js",
      "../../assets/vendors/raphael/raphael.min.js",
      "../../assets/vendors/morris.js/morris.min.js",
      "../../assets/vendors/echarts/dist/echarts-en.min.js",
      // "../../assets/vendors/jquery.sparkline/dist/jquery.sparkline.min.js",
      "../../assets/vendors/vectormap/jquery-jvectormap-2.0.3.min.js",
      "../../assets/vendors/vectormap/jquery-jvectormap-world-mill-en.js",
      "../../assets/dist/js/vectormap-data.js",
      "../../assets/vendors/owl.carousel/dist/owl.carousel.min.js",
      "../../assets/vendors/jquery-toast-plugin/dist/jquery.toast.min.js",
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement("script");
      node.src = dynamicScripts[i];
      node.type = "text/javascript";
      node.async = false;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
  }
  openDetailpopup(contentdetail) {
    const modalRef = this.modalService
      .open(contentdetail, {
        ariaLabelledBy: "modal-basic-title",
        centered: true
      })
      .result.then(
        result => {
        },
        reason => {
        }
      );

  }
  Payment(item) {
    console.log(item)
    this.totpay = item.SalesCash + item.SalesCard + item.Other;
    this.cash = item.SalesCash;
    this.card = item.SalesCard;
    this.other = item.Other;
  }

}
export interface DashBoard {
  // totalSales: Array[0];
}
