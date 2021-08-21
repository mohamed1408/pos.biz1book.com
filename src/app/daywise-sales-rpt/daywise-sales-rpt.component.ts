import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import * as moment from "moment";
import { FormControl } from '@angular/forms';
import { dangertoast } from 'src/assets/dist/js/toast-data';
import { LoaderService } from '../service/loader.service';

declare function setHeightWidth(): any;
@Component({
  selector: 'app-daywise-sales-rpt',
  templateUrl: './daywise-sales-rpt.component.html',
  styleUrls: ['./daywise-sales-rpt.component.css']
})
export class DaywiseSalesRptComponent implements OnInit {
  @ViewChild('auto', { static: true }) auto;
  daywisesalesrpt: any;
  CompanyId: number;
  StoreId: number;
  show: boolean = true;
  startdate: any;
  enddate: any;
  stores: any;
  key = 'Name';
  storeId: any;
  sourceId =0;
  myControl = new FormControl();
  all: string = "All";
  TotalSales = 0;
  TotalPayments = 0;
  alwaysShowCalendars: boolean;
  term;
  showloading = true;
  p;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  selected: any = {startDate: moment(), endDate: moment()};
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }
  errorMsg: string = '';
  status: number;
  sortfield: any;
  x: number;
  y: number;
  constructor(private Auth: AuthService,public loaderService: LoaderService) {
    this.alwaysShowCalendars = true;
    // var userinfo = localStorage.getItem("userinfo");
    // var userinfoObj = JSON.parse(userinfo);
    // this.CompanyId = userinfoObj[0].CompanyId;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;

  }

  ngOnInit() {
    this.loaderService.show();
    setHeightWidth();
    this.GetStore();
    var date = new Date();
    // this.startdate = {"year":date.getFullYear(),"month":date.getMonth()+1,"day":date.getDate()};
    // this.enddate = {"year":date.getFullYear(),"month":date.getMonth()+1,"day":date.getDate()};
    this.All();
    this.startdate = moment().format('YYYY-MM-DD')
    this.enddate = moment().format('YYYY-MM-DD')
  }
  Submit() {
    this.show = true;
    if (this.startdate.hasOwnProperty("month")) {
      this.startdate.month = this.startdate.month - 1;
      this.enddate.month = this.enddate.month - 1;
    }
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    console.log(this.storeId);
    this.Auth.GetSalesRpt(this.storeId, frmdate, todate, this.CompanyId,this.sourceId).subscribe(data => {
      this.daywisesalesrpt = data;
      console.log(this.daywisesalesrpt);
      this.TotalPayments = 0;
      this.TotalSales = 0;
      for (let i = 0; i < this.daywisesalesrpt.Order.length; i++) {
        this.daywisesalesrpt.Order[i].OrderedDate = moment(this.daywisesalesrpt.Order[i].OrderedDate).format('ll');
        this.TotalPayments = this.TotalPayments + this.daywisesalesrpt.Order[i].TotalPayments;
        this.TotalSales = this.TotalSales + this.daywisesalesrpt.Order[i].TotalSales;
      }
      this.TotalSales = +(this.TotalSales.toFixed(2))
      this.TotalPayments = +(this.TotalPayments.toFixed(2))
      console.log(this.startdate);
      console.log(this.enddate);
      var response: any = data
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }
    })
  }
  selectEvent(e) {
    this.storeId = e.Id;
  }

  All() {
    var frmdate = moment().format("YYYY-MM-DD  00:00:00");
    var todate = moment().format("YYYY-MM-DD  23:59:59");
    this.Auth.GetSalesRpt(this.storeId, frmdate, todate, this.CompanyId,this.sourceId).subscribe(data => {
      this.daywisesalesrpt = data;
      console.log(this.daywisesalesrpt);
      this.TotalPayments = 0;
      this.TotalSales = 0;
      for (let i = 0; i < this.daywisesalesrpt.Order.length; i++) {
        this.daywisesalesrpt.Order[i].OrderedDate = moment(this.daywisesalesrpt.Order[i].OrderedDate).format('ll');
        this.TotalPayments = this.TotalPayments + this.daywisesalesrpt.Order[i].TotalPayments;
        this.TotalSales = this.TotalSales + this.daywisesalesrpt.Order[i].TotalSales;
      }
      this.TotalSales = +(this.TotalSales.toFixed(2))
      this.TotalPayments = +(this.TotalPayments.toFixed(2))
      // this.loaderService.hide();
      this.showloading = false;

    })
  }
  sortsettings(field) {
    if(this.sortfield == field) {
      this.x = this.x*-1;
      this.y = this.y*-1;
    } else {
      this.sortfield = field;
      this.x = -1;
      this.y = 1;
    }
  }

  get sortData() {
    return this.daywisesalesrpt.Order.sort((a, b) => {
    if (a[this.sortfield] < b[this.sortfield]) return this.x;
    else if (a[this.sortfield] > b[this.sortfield]) return this.y;
    else return 0;
  });
  }


  GetStore() {
    this.Auth.GetStoreName(this.CompanyId).subscribe(data => {
      this.stores = data;
      var obj = { Id: 0, Name: "All", ParentStoreId: null, ParentStore: null, IsMainStore: false }
      this.stores.push(obj);
      console.log(this.stores);
      var response: any = data
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }
    })
  }
  date(e) {
    this.startdate = e.startDate.format('YYYY-MM-DD')
    this.enddate = e.endDate.format('YYYY-MM-DD')
  }
  focusAutocomplete() {
    var xPathResult = document.evaluate('//*[@id="maindiv"]/app-root/app-daywise-sales-rpt/div/div/div[2]/div/section/div[1]/div[1]/div/ng-autocomplete/div/div[1]/input', document, null, null, null);
    var element = null
    if (xPathResult) {
      element = xPathResult.iterateNext();
    }
    element.focus();
  }

}