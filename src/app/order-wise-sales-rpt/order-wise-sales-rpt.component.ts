import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl } from '@angular/forms';
import * as moment from "moment";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dangertoast } from 'src/assets/dist/js/toast-data';
import { HashLocationStrategy } from '@angular/common';
import { LoaderService } from '../service/loader.service';

declare function setHeightWidth(): any;
@Component({
  selector: 'app-order-wise-sales-rpt',
  templateUrl: './order-wise-sales-rpt.component.html',
  styleUrls: ['./order-wise-sales-rpt.component.css']
})
export class OrderWiseSalesRptComponent implements OnInit {
  orderwiserpt: any;
  show: boolean = true;
  CompanyId: number;
  StoreId: number;
  startdate: any;
  enddate: any;
  stores: any;
  key = 'Name';
  storeId: any;
  myControl = new FormControl();
  all: string = "All";
  selected: any;
  alwaysShowCalendars: boolean;
  TotalSales = 0;
  TotalPayments = 0;
  term;
  p;
  showloading = true;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }
  errorMsg: string = '';
  status: number;
  cgst: any;
  sgst: any;
  receipt = [];
  subtotal: any;
  total: any;
  charge: any;
  ordcharges: any;
  discount: number;
  sourceId = 0;
  sortfield: any;
  x: number;
  y: number;
  pricetot = 0;
  constructor(private Auth: AuthService, private modalService: NgbModal, public loaderService: LoaderService
  ) {
    this.alwaysShowCalendars = true;
    // var userinfo = localStorage.getItem("userinfo");
    // var userinfoObj = JSON.parse(userinfo);
    // this.CompanyId = userinfoObj[0].CompanyId;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;
  }

  ngOnInit() {
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
    // this.loaderService.show();

    this.show = true;
    if (this.startdate.hasOwnProperty("month")) {
      this.startdate.month = this.startdate.month - 1;
      this.enddate.month = this.enddate.month - 1;
    }
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");

    this.Auth.GetSalesRpt1(this.storeId, frmdate, todate, this.CompanyId, this.sourceId).subscribe(data => {
      this.orderwiserpt = data;
      console.log(this.orderwiserpt)
      this.TotalPayments = 0;
      this.TotalSales = 0;
      for (let i = 0; i < this.orderwiserpt.Order.length; i++) {
        console.log(this.orderwiserpt.Order[i].ItemJson)
        this.orderwiserpt.Order[i].OrderedDate = moment(this.orderwiserpt.Order[i].OrderedDate).format('LLL');
        this.TotalPayments = this.TotalPayments + this.orderwiserpt.Order[i].PaidAmount;
        this.TotalSales = this.TotalSales + this.orderwiserpt.Order[i].BillAmount;
      }
      this.TotalSales = +(this.TotalSales.toFixed(2))
      this.TotalPayments = +(this.TotalPayments.toFixed(2))
      var response: any = data
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }
      // this.loaderService.hide();
    })
  }
  selectEvent(e) {
    this.storeId = e.Id;

  }
  itemdetails(modal, itemjson, ChargeJson) {
    this.receipt = [];
    this.sgst = 0;
    this.cgst = 0;
    this.subtotal = 0;
    if (itemjson) {

      var itemarray = JSON.parse(itemjson)
      console.log(itemarray)
      itemarray.forEach(item => {
        item.OptionGroup.forEach(optgrp => {
          optgrp.Option.forEach(opt => {
            item.Price = item.Price + opt.Price
            item.Product = item.Product + '/' + opt.Name
          });
        });
        item.Price = item.Price * item.Quantity - item.DiscAmount
        this.receipt.push(item);
        this.cgst = this.cgst + item.Tax1
        this.sgst = this.sgst + item.Tax2
        // console.log(this.subtotal)
        this.subtotal = this.subtotal + item.Price
        // });
      });
      this.total = this.subtotal + this.sgst + this.cgst;
      console.log(chargejson)
      var chargejson = JSON.parse(ChargeJson);
      if (chargejson)
        chargejson.forEach(charge => {
          this.total = this.total + charge.ChargeValue
        });
    }

    this.openDetailpopup(modal)
  }
  filter1(Id) {
    var orderitem = this.orderwiserpt.order1.filter(x => x.OrderId == Id)
    console.log(orderitem);
    this.receipt = [];
    this.sgst = 0;
    this.cgst = 0;
    this.subtotal = 0;
    this.pricetot = 0;
    this.discount = this.orderwiserpt.Order.filter(x => x.Id == Id)[0].DiscAmount
    orderitem.forEach(element => {
      this.pricetot = element.Price * element.Quantity;
      this.cgst = this.cgst + element.Tax1 * this.pricetot / 100;
      this.sgst = this.sgst + element.Tax2 * this.pricetot / 100;
      this.subtotal = this.pricetot + this.subtotal;
      this.receipt.push(element)
      this.total = this.subtotal + this.sgst + this.cgst;
      console.log(this.receipt);
      var orderitem1 = this.orderwiserpt.order3.filter(x => x.OrderId == Id)
      this.ordcharges = orderitem1;
      console.log(orderitem1);
      this.ordcharges.forEach(element => {
        this.total = this.total + element.ChargeAmount;
      });
      this.total = (this.total - this.discount).toFixed(0);
    });
  }
  All() {
    this.loaderService.show();

    var frmdate = moment().format("YYYY-MM-DD  00:00:00");
    var todate = moment().format("YYYY-MM-DD  23:59:59");
    this.Auth.GetSalesRpt1(this.storeId, frmdate, todate, this.CompanyId, this.sourceId).subscribe(data => {
      this.orderwiserpt = data;
      console.log(this.orderwiserpt)
      this.TotalPayments = 0;
      this.TotalSales = 0;
      for (let i = 0; i < this.orderwiserpt.Order.length; i++) {
        this.orderwiserpt.Order[i].OrderedDate = moment(this.orderwiserpt.Order[i].OrderedDate).format('LLL');
        // this.orderwiserpt.Order[i].ItemJson = JSON.parse(this.orderwiserpt.Order[i].ItemJson);
        // this.orderwiserpt.Order[i].ChargeJson = JSON.parse(this.orderwiserpt.Order[i].ChargeJson);

        this.TotalPayments = this.TotalPayments + this.orderwiserpt.Order[i].PaidAmount;
        this.TotalSales = this.TotalSales + this.orderwiserpt.Order[i].BillAmount;
      }
      this.TotalSales = +(this.TotalSales.toFixed(2))
      this.TotalPayments = +(this.TotalPayments.toFixed(2))
      console.log(this.orderwiserpt.Order)
      // this.loaderService.hide();
      this.showloading = false;
    })
  }
  strMatch(string, substring) {
    return string.toLowerCase().includes(substring)
  }
  filter(order) {
    const term = this.term.toLowerCase()
    if (term == '') return true
    var ismatching = false
    Object.keys(order).forEach(key => {
      if (typeof (order[key]) == 'string') this.strMatch(order[key], term) ? ismatching = true : null
      if (typeof (order[key]) == 'number') this.strMatch(order[key].toString(), term) ? ismatching = true : null
    })
    return ismatching
  }
  calculate() {
    this.TotalSales = 0
    this.TotalPayments = 0
    this.orderwiserpt.Order.filter(x => this.filter(x)).forEach(order => {
      this.TotalSales += order.BillAmount
      this.TotalPayments += order.PaidAmount
    });
    // console.log(this.term, this.orderwiserpt.Order.filter(x => this.filter(x)).length)
  }
  GetStore() {
    this.Auth.GetStoreName3(this.CompanyId).subscribe(data => {
      this.stores = data;
      console.log(this.stores);
      var obj = { Id: 0, Name: "All", ParentStoreId: null, ParentStore: null, IsMainStore: false }
      this.stores.push(obj);
      var response: any = data
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }

    })
  }

  sortsettings(field) {
    if (this.sortfield == field) {
      this.x = this.x * -1;
      this.y = this.y * -1;
    } else {
      this.sortfield = field;
      this.x = -1;
      this.y = 1;
    }
  }

  get sortData() {
    if (this.orderwiserpt) {
      return this.orderwiserpt.Order.sort((a, b) => {
        if (a[this.sortfield] < b[this.sortfield]) return this.x;
        else if (a[this.sortfield] > b[this.sortfield]) return this.y;
        else return 0;
      });
    } else {
      return []
    }
  }

  date(e) {
    // console.log(e);
    if (e && e.startDate && e.endDate) {
      this.startdate = e.startDate.format('YYYY-MM-DD')
      this.enddate = e.endDate.format('YYYY-MM-DD')
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
  focusAutocomplete() {
    var xPathResult = document.evaluate('//*[@id="maindiv"]/app-root/app-order-wise-sales-rpt/div/div/div[2]/div/section/div[1]/div[1]/ng-autocomplete/div/div[1]/input', document, null, null, null);
    var element = null
    if (xPathResult) {
      element = xPathResult.iterateNext();
    }
    element.focus();
  }


}