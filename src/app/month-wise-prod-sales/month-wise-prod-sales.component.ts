import { Component, OnInit, NgModule, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import * as moment from "moment";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-month-wise-prod-sales',
  templateUrl: './month-wise-prod-sales.component.html',
  styleUrls: ['./month-wise-prod-sales.component.css']
})
export class MonthWiseProdSalesComponent implements OnInit {
  CompanyId: number;
  alwaysShowCalendars: boolean;
  startdate: any;
  enddate: any;
  sourceId = 0;
  stores: any;
  errorMsg: string = '';
  status: number;
  storeId:any;
  key7 = 'Name';
  monthrpt:any;
  str: string = "All";
  Interval =0;
  StartTime:any;
  EndTime:any;
  mytime: Date = new Date();
  sortfield: any;
  x: number;
  y: number;
  product: any;
  showloading = true;
  categ: any;
   prd: string = "All"
  key2 = 'Name';
categoryId =0;
productId =0;
term;
Groupby:string;
key;
all;
sortsettings;
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
myControl;
ProdNStore;
CatNStore;
ParCatNStore;
  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }


  constructor( private Auth: AuthService, private modalService: NgbModal)
   {
    this.alwaysShowCalendars = true;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;

    }

  ngOnInit()
   {
    this.GetStore();
this.getCategory();
    this.startdate = moment().format('YYYY-MM-DD')
    this.enddate = moment().format('YYYY-MM-DD')
this.GetProduct();
this.All();
  }

  date(e) {
    console.log(e)
    if (e.startDate != null && e.endDate != null) {
      this.startdate = e.startDate.format('YYYY-MM-DD')
      this.enddate = e.endDate.format('YYYY-MM-DD')
    }
  }
  selectEvent(e) {
    this.storeId = e.Id;
  }

  selectedEvent(ed) {
    this.productId = ed.Id;
  }

  GetStore() {
    this.Auth.GetStoreName(this.CompanyId).subscribe(data => {
      this.stores = data;
      var obj = { Id: 0, Name: "All", ParentStoreId: null, ParentStore: null, IsMainStore: false }
      this.stores.push(obj);
      console.log(this.stores);
      this.showloading = false
    })
  }

  getCategory() {
    this.Auth.getcat(this.CompanyId).subscribe(data => {
      this.categ = data;
      console.log(this.categ);
    })
  }

  GetProduct() {
    this.Auth.getcatprd(this.CompanyId).subscribe(data => {
      this.product = data;
      var obj = { Id: 0, Name: "All", ParentCategoryId: null }
      this.product.push(obj);
    })
  }


  Submit(text)
  {
    this.Groupby =text;
    if (this.startdate.hasOwnProperty("month")) {
      this.startdate.month = this.startdate.month - 1;
      this.enddate.month = this.enddate.month - 1;
    }
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    console.log(this.storeId,frmdate,todate,this.sourceId,this.categoryId,this.productId);
    this.Auth.MonthSalesRpt(this.storeId, frmdate, todate,this.sourceId,this.Groupby, this.CompanyId,this.categoryId,this.productId).subscribe(data => {
      this.monthrpt = data;
      console.log(this.monthrpt);
    });
  }
  All()
  {
    this.Groupby ='ProdNStore';
    if (this.startdate.hasOwnProperty("month")) {
      this.startdate.month = this.startdate.month - 1;
      this.enddate.month = this.enddate.month - 1;
    }
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    console.log(this.storeId,frmdate,todate,this.sourceId,this.categoryId,this.productId);
    this.Auth.MonthSalesRpt(this.storeId, frmdate, todate,this.sourceId,this.Groupby, this.CompanyId,this.categoryId,this.productId).subscribe(data => {
      this.monthrpt = data;
      console.log(this.monthrpt);
      this.showloading = false
    });

  }
  focusAutocomplete() {
    var xPathResult = document.evaluate('//*[@id="maindiv"]/app-root/app-month-wise-prod-sales/div/div/div[2]/div[1]/ng-autocomplete/div/div[1]/input', document, null, null, null);
    var element = null
    if (xPathResult) {
      element = xPathResult.iterateNext();
    }
    element.focus();
  }
  focusedAutocomplete(){
    var xPathResult = document.evaluate('//*[@id="maindiv"]/app-root/app-month-wise-prod-sales/div/div/div[2]/div[4]/ng-autocomplete/div/div[1]/input', document, null, null, null);
    var element = null
    if (xPathResult) {
      element = xPathResult.iterateNext();
    }
    element.focus();
  }
  
  }
