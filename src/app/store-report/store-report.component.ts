import * as moment from "moment";
import { AuthService } from '../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-store-report',
  templateUrl: './store-report.component.html',
  styleUrls: ['./store-report.component.css']
})
export class StoreReportComponent implements OnInit {
  CompanyId: number;
  alwaysShowCalendars: boolean;
  startdate: any;
  enddate: any;
  sourceId = 0;
  storewiserpt: any;
  catstore: any;
  TotalBill = 0;
  TotalPaidAmt = 0;
  Tax = 0;
  TotalDisc = 0;
  TotalPOS = 0;
  TotalSWIGGY = 0;
  TotalZomato = 0;
  term;
  showloading = true;
  TotalProductSale = 0;
  TotalPrdQty = 0;

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
  cat: any;
  categoryId = 0;
  TotalPrdtSale = 0;
  sortfield: any;
  x: number;
  y: number;
  prdstore: any;
  constructor(private Auth: AuthService, private modalService: NgbModal) {
    this.alwaysShowCalendars = true;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
  }

  ngOnInit() {
    this.All();
    // this.startdate = moment().format('YYYY-MM-DD')
    // this.enddate = moment().format('YYYY-MM-DD')
  }

  Submit() {
    if (this.startdate.hasOwnProperty("month")) {
      this.startdate.month = this.startdate.month - 1;
      this.enddate.month = this.enddate.month - 1;
    }
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    console.log(frmdate, todate, this.CompanyId);
    this.Auth.GetStorewiseRpt(frmdate, todate, this.CompanyId).subscribe(data => {
      this.storewiserpt = data;
      console.log(this.storewiserpt);
      this.TotalBill = 0;
      this.TotalPaidAmt = 0;
      this.Tax = 0;
      this.TotalDisc = 0;
      this.TotalPOS = 0;
      this.TotalSWIGGY = 0;
      this.TotalZomato = 0;
      for (let i = 0; i < this.storewiserpt.Order.length; i++) {
        this.TotalBill = this.TotalBill + this.storewiserpt.Order[i].BillAmount;
        this.TotalPaidAmt = this.TotalPaidAmt + this.storewiserpt.Order[i].PaidAmount;
        this.Tax = this.Tax + this.storewiserpt.Order[i].Tax;
        this.TotalDisc = this.TotalDisc + this.storewiserpt.Order[i].DiscAmount;
        this.TotalPOS = this.TotalPOS + this.storewiserpt.Order[i].Pos;
        this.TotalSWIGGY = this.TotalSWIGGY + this.storewiserpt.Order[i].Swiggy;
        this.TotalZomato = this.TotalZomato + this.storewiserpt.Order[i].Zomato;
      }
      this.TotalBill = +(this.TotalBill.toFixed(2))
      this.TotalPaidAmt = +(this.TotalPaidAmt.toFixed(2))
      this.Tax = +(this.Tax.toFixed(2))
      this.TotalDisc = +(this.TotalDisc.toFixed(2))
      this.TotalPOS = +(this.TotalPOS.toFixed(2))
      this.TotalSWIGGY = +(this.TotalSWIGGY.toFixed(2))
      this.TotalZomato = +(this.TotalZomato.toFixed(2))
    });
  }

  date(e) {
    console.log(e)
    if (e.startDate != null && e.endDate != null) {
      this.startdate = e.startDate.format('YYYY-MM-DD')
      this.enddate = e.endDate.format('YYYY-MM-DD')
    }
  }

  All() {
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    this.Auth.GetStorewiseRpt(frmdate, todate, this.CompanyId).subscribe(data => {
      this.storewiserpt = data;
      console.log(this.storewiserpt);
      this.TotalBill = 0;
      this.TotalPaidAmt = 0;
      this.Tax = 0;
      this.TotalDisc = 0;
      this.TotalPOS = 0;
      this.TotalSWIGGY = 0;
      this.TotalZomato = 0;
      for (let i = 0; i < this.storewiserpt.Order.length; i++) {
        this.TotalBill = this.TotalBill + this.storewiserpt.Order[i].BillAmount;
        this.TotalPaidAmt = this.TotalPaidAmt + this.storewiserpt.Order[i].PaidAmount;
        this.Tax = this.Tax + this.storewiserpt.Order[i].Tax;
        this.TotalDisc = this.TotalDisc + this.storewiserpt.Order[i].DiscAmount;
        this.TotalPOS = this.TotalPOS + this.storewiserpt.Order[i].Pos;
        this.TotalSWIGGY = this.TotalSWIGGY + this.storewiserpt.Order[i].Swiggy;
        this.TotalZomato = this.TotalZomato + this.storewiserpt.Order[i].Zomato;
      }
      this.TotalBill = +(this.TotalBill.toFixed(2))
      this.TotalPaidAmt = +(this.TotalPaidAmt.toFixed(2))
      this.Tax = +(this.Tax.toFixed(2))
      this.TotalDisc = +(this.TotalDisc.toFixed(2))
      this.TotalPOS = +(this.TotalPOS.toFixed(2))
      this.TotalSWIGGY = +(this.TotalSWIGGY.toFixed(2))
      this.TotalZomato = +(this.TotalZomato.toFixed(2))
      this.showloading = false
    });
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
    return this.storewiserpt.Order.sort((a, b) => {
      if (a[this.sortfield] < b[this.sortfield]) return this.x;
      else if (a[this.sortfield] > b[this.sortfield]) return this.y;
      else return 0;
    });
  }
  getData(contentdetail, storeId, Id) {
    console.log(storeId, Id)
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    console.log(this.CompanyId, this.categoryId, frmdate, todate, Id, storeId)
    this.Auth.Getprddata(storeId, frmdate, todate, this.CompanyId, Id, this.categoryId,0).subscribe(data => {
      this.prdstore = data;
      console.log(this.prdstore)
      this.TotalProductSale = 0;
      this.TotalPrdQty = 0;
      for (let i = 0; i < this.prdstore.data.length; i++) {
        this.TotalProductSale = this.TotalProductSale + this.prdstore.data[i].TotalSales;
        this.TotalPrdQty = this.TotalPrdQty + this.prdstore.data[i].Totalqty;
        this.TotalProductSale = +(this.TotalProductSale.toFixed(2))
        this.TotalPrdQty = +(this.TotalPrdQty.toFixed(2))
      }
      this.Auth.catSales(storeId, frmdate, todate, this.CompanyId, this.categoryId, Id).subscribe(data => {
        this.catstore = data;
        this.cat = this.catstore.Order;
        console.log(this.cat)
        this.TotalPrdtSale = 0;
        for (let i = 0; i < this.catstore.Order.length; i++) {
          this.TotalPrdtSale = this.TotalPrdtSale + this.catstore.Order[i].TotalSales;
          this.TotalPrdtSale = +(this.TotalPrdtSale.toFixed(2))
        }
        this.openDetailpopup(contentdetail)
      });
    });
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
}
