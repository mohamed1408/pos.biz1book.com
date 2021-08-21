import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as moment from "moment";


@Component({
  selector: 'app-option-report',
  templateUrl: './option-report.component.html',
  styleUrls: ['./option-report.component.css']
})
export class OptionReportComponent implements OnInit {
  CompanyId: number;
  stores: any;
  key = 'Name';
  showloading = true;
  category: any;
  parentcategory: any = [];
  alwaysShowCalendars: boolean;
  ParentCatId = 0;
  sourceId = 0;
  prd: string = "All"
  storeId: any;
  product: any;
  term;
  sortfield: any;
  all: string = "All";
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  selected: any = { startDate: moment(), endDate: moment() };
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];
  optiongroups: any = [];
  options: any = [];
  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }
  data: any;
  optionGroupId: number = 0;
  optionId: number = 0;
  payload = { optionGroupId: 0, optionId: 0, productId: 0, storeId: 0, sourceId: 0, fromDate: moment().format('YYYY-MM-DD'), todate: moment().format('YYYY-MM-DD'), companyId: 0 }
  constructor(private Auth: AuthService) {
    this.alwaysShowCalendars = true;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.payload.companyId = this.CompanyId
  }
  report = [];
  // @optionGroupId INT = 0,
  //@optionId INT = 0,
  // @productId INT = 0,
  // @storeId INT = 0,
  // @sourceId INT = 0,
  // @fromDate date = null,
  // @todate date = null

  ngOnInit() {
    this.GetStores();
    this.Getcategory();
    this.GetOptionsGroups()
    this.getOptions();
    this.GetProduct();
    // this.payload.fromDate = moment().format('YYYY-MM-DD');
    // console.log(this.payload, moment(new Date()).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'))
  }
  GetOptionsGroups() {
    this.Auth.get_optiongrp(this.CompanyId).subscribe(data => {
      console.log(data)
      this.optiongroups = data;
    })
  }
  getOptions() {
    this.Auth.getOptions(this.CompanyId).subscribe(data => {
      console.log(data)
      this.options = data;
    })
  }
  filterOptions() {
    return this.payload.optionGroupId == 0 ? this.options : this.options.filter(x => x.OptionGroupId == this.payload.optionGroupId);
  }
  GetStores() {
    this.Auth.GetStoreName(this.CompanyId).subscribe(data => {
      this.stores = data;
      var obj = { Id: 0, Name: "All", ParentStoreId: null, ParentStore: null, IsMainStore: false }
      this.stores.push(obj);
      console.log(this.stores);
    });
  }
  Getcategory() {
    this.Auth.getcat(this.CompanyId).subscribe(data => {
      this.category = data;
      console.log(this.category)
      //  var obj = { Id: 0, Description: "All", ParentCategoryId: null }
      //  this.category.push(obj);
      let i = 0;
      this.category.forEach(element => {
        if (element.ParentCategoryId == null) {
          this.parentcategory[i] = element;
          i++;
        }
      });
      console.log(this.parentcategory)
    })
  }
  selectLocation(store) {
    console.log(store)
    this.payload.storeId = store.Id
  }
  selectProduct(product) {
    console.log(product)
    this.payload.productId = product.Id
  }
  date(date) {
    console.log(date)
    if (date.startDate && date.endDate) {
      this.payload.fromDate = moment(date.startDate).format('YYYY-MM-DD')
      this.payload.todate = moment(date.endDate).format('YYYY-MM-DD')
    }
  }
  GetProduct() {
    this.Auth.getoptionproduct(this.CompanyId).subscribe(data => {
      this.product = data["productOptionGroups"];
      var obj = { Id: 0, Name: "All", Description: "All", ParentCategoryId: null }
      this.product.push(obj);
      console.log(this.product)
    })
  }
  TotalSales = 0;
  TotalQuantity = 0;
  Submit() {
    console.log(this.payload)
    this.Auth.optionreport(this.payload).subscribe(data => {
      console.log(data);
      var response: any = data;
      this.report = response.report
      this.TotalSales = 0;
      this.report.forEach(element => {
        this.TotalSales = this.TotalSales + element.Amount;


      });
      this.TotalQuantity = 0;
      this.report.forEach(element => {
        this.TotalQuantity = this.TotalQuantity + element.Qty;
      });
    })
  }
  selectEvent(e) {
    this.storeId = e.Id;
  }
  // sortsettings(field) {
  //   if(this.sortfield == field) {
  //     this.x = this.x*-1;
  //     this.y = this.y*-1;
  //   } else {
  //     this.sortfield = field;
  //     this.x = -1;
  //     this.y = 1;
  //   }
  // }
  focusAutocomplete() {
    var xPathResult = document.evaluate('//*[@id="maindiv"]/app-root/app-option-report/div/div/div[2]/div/section/div/div[1]/ng-autocomplete/div/div[1]/input', document, null, null, null);
    var element = null
    if (xPathResult) {
      element = xPathResult.iterateNext();
    }
    element.focus();
  }

  focusedAutocomplete() {
    var xPathResult = document.evaluate('//*[@id="maindiv"]/app-root/app-option-report/div/div/div[2]/div/section/div/div[6]/ng-autocomplete/div/div[1]/input', document, null, null, null);
    var element = null
    if (xPathResult) {
      element = xPathResult.iterateNext();
    }
    element.focus();
  }

}
