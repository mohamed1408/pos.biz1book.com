import * as moment from "moment";
import { AuthService } from '../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dangertoast } from 'src/assets/dist/js/toast-data';
import { FormControl } from '@angular/forms';
declare function setHeightWidth(): any;

@Component({
  selector: 'app-cancel-ord-report',
  templateUrl: './cancel-ord-report.component.html',
  styleUrls: ['./cancel-ord-report.component.css']
})
export class CancelOrdReportComponent implements OnInit {
  term;
  p;
  errorMsg: string = '';
  CompanyId: number;
  alwaysShowCalendars: boolean;
  startdate: any;
  enddate: any;
  sourceId = 0;
  stores: any;
  storeId = 0;
  key = 'Name';
  Ordrpt: any;
  showloading = true;
  myControl = new FormControl();
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

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }
  sortfield: any;
  x: number;
  y: number;
  trxord: any;
  cgst: any;
  sgst: any;
  receipt = [];
  subtotal: any;
  total: any;
  charge: any;
  ordcharges: any;
  discount: number;
  filtprd: any;
  show: boolean = true;
  TotalSales = 0;
  TotalPayments = 0;

  constructor(private Auth: AuthService, private modalService: NgbModal) {
    this.alwaysShowCalendars = true;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
  }

  ngOnInit() {
    setHeightWidth();
    var date = new Date();
    this.GetStore();
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
    console.log(this.storeId)
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    console.log(frmdate, todate, this.CompanyId, this.sourceId, this.storeId)
    this.Auth.GetOrdRpt(frmdate, todate, this.CompanyId, this.sourceId, this.storeId).subscribe(data => {
      this.Ordrpt = data;
      console.log(this.Ordrpt);
      this.TotalPayments = 0;
      this.TotalSales = 0;
      for (let i = 0; i < this.Ordrpt.Order.length; i++) {
        this.Ordrpt.Order[i].OrderedDate = moment(this.Ordrpt.Order[i].OrderedDate).format('ll');
        this.TotalPayments = this.TotalPayments + this.Ordrpt.Order[i].PaidAmount;
        this.TotalSales = this.TotalSales + this.Ordrpt.Order[i].BillAmount;
      }
      this.TotalSales = +(this.TotalSales.toFixed(2))
      this.TotalPayments = +(this.TotalPayments.toFixed(2))
    })
  }
  temporder
  selectOrder(order) {
    console.log(order)
    this.temporder = JSON.parse(order.OrderJson)
    console.log(this.temporder)
    this.temporder.Name = order.Name
    this.temporder.OrderStatusId = -1
    this.temporder.OrderId = order.Id
    this.temporder.InvoiceNo = order.InvoiceNo
    this.temporder.CancelReason = order.CancelReason
    this.temporder.BillAmount = order.BillAmount
    this.temporder.PaidAmount = order.PaidAmount
  }
  All() {
    console.log(this.storeId)
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    console.log(frmdate, todate, this.CompanyId, this.sourceId, this.storeId)
    this.Auth.GetOrdRpt(frmdate, todate, this.CompanyId, this.sourceId, this.storeId).subscribe(data => {
      this.Ordrpt = data;
      console.log(this.Ordrpt);
      this.TotalPayments = 0;
      this.TotalSales = 0;
      for (let i = 0; i < this.Ordrpt.Order.length; i++) {
        this.Ordrpt.Order[i].OrderedDate = moment(this.Ordrpt.Order[i].OrderedDate).format('ll');
        this.TotalPayments = this.TotalPayments + this.Ordrpt.Order[i].PaidAmount;
        this.TotalSales = this.TotalSales + this.Ordrpt.Order[i].BillAmount;
      }
      this.TotalSales = +(this.TotalSales.toFixed(2))
      this.TotalPayments = +(this.TotalPayments.toFixed(2))
      this.showloading = false
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
    return this.Ordrpt.Order.sort((a, b) => {
      if (a[this.sortfield] < b[this.sortfield]) return this.x;
      else if (a[this.sortfield] > b[this.sortfield]) return this.y;
      else return 0;
    });
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

  GetStore() {
    this.Auth.GetStoreName1(this.CompanyId).subscribe(data => {
      this.stores = data;
      var obj = { Id: 0, Name: "All", ParentStoreId: null, ParentStore: null, IsMainStore: false }
      this.stores.push(obj);
      var response: any = data
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }
    })
  }

  openDetailpopup(contentdetail, Id) {
    console.log(Id)
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    console.log(this.CompanyId, frmdate, todate, this.sourceId, this.storeId)
    this.Auth.GetSalesRpt1(this.storeId, frmdate, todate, this.CompanyId, this.sourceId).subscribe(data => {
      this.trxord = data;
      console.log(this.trxord)

      var orderitem = this.trxord.order1.filter(x => x.OrderId == Id)
      console.log(orderitem)
      this.filtprd = orderitem;
      this.receipt = [];
      this.sgst = 0;
      this.cgst = 0;
      this.subtotal = 0;
      this.total = 0;
      orderitem.forEach(element => {
        this.cgst = this.cgst + element.Tax1 * element.Price / 100;
        this.sgst = this.sgst + element.Tax2 * element.Price / 100;
        this.subtotal = element.Price + this.subtotal;
        this.receipt.push(element);
        this.total = this.subtotal + this.sgst + this.cgst;
        console.log(this.receipt)
      })
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

    });
  }
  save() {
    if (this.temporder.InvoiceNo.includes('Z') || this.temporder.InvoiceNo.includes('S')) {
      this.Auth.updateuporder(this.temporder.OrderId, this.temporder).subscribe(data => {
        this.temporder = null
        this.All()
      })
    } else {
      this.Auth.updateorder({ OrderJson: JSON.stringify(this.temporder) }).subscribe(data => {
        this.temporder = null
        this.All()
      })
    }
  }
  focusAutocomplete() {
    var xPathResult = document.evaluate('//*[@id="maindiv"]/app-root/app-cancel-ord-report/div/div/div[2]/div/section/div[1]/div[1]/ng-autocomplete/div/div[1]/input', document, null, null, null);
    var element = null
    if (xPathResult) {
      element = xPathResult.iterateNext();
    }
    element.focus();
  }



}
