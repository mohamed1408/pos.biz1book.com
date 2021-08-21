import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl } from '@angular/forms';
import * as moment from "moment";
import { dangertoast } from 'src/assets/dist/js/toast-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-transaction-rpt',
  templateUrl: './transaction-rpt.component.html',
  styleUrls: ['./transaction-rpt.component.css']
})
export class TransactionRptComponent implements OnInit {
  transactionrpt: any;
  CompanyId: number;
  startdate: any;
  enddate: any;
  StoreId: number;
  show: boolean = true;
  myControl = new FormControl();
  stores: any;
  key = 'Name';
  all: string = "All";
  alwaysShowCalendars: boolean;
  term;
  p;
  selected;
  sourceId = 0;
  Totalsales = 0;
  paymt: any;
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
  Totalrefund = 0;
  Totalexpenses = 0;
  sortfield: any;
  x: number;
  y: number;
  PaymentId: any;
  trxord: any;
  filtprd: any;
  TotalProductSale = 0;
  TotalPrdQty = 0;
  receipt = [];

  constructor(private Auth: AuthService, private modalService: NgbModal) {
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
    // this.Submit1();
    this.GetStore();
    this.Payment();
    // var date = new Date();
    // this.startdate = {"year":date.getFullYear(),"month":date.getMonth()+1,"day":date.getDate()};
    // this.enddate = {"year":date.getFullYear(),"month":date.getMonth()+1,"day":date.getDate()};
    this.All();
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
    if (this.transactionrpt) {
      return this.transactionrpt.Order.sort((a, b) => {
        if (a[this.sortfield] < b[this.sortfield]) return this.x;
        else if (a[this.sortfield] > b[this.sortfield]) return this.y;
        else return 0;
      });
    } else {
      return [];
    }
  }

  Submit() {
    this.show = true;
    this.Totalsales = 0;
    if (this.startdate.hasOwnProperty("month")) {
      this.startdate.month = this.startdate.month - 1;
      this.enddate.month = this.enddate.month - 1;
    }
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    console.log(this.PaymentId)
    this.Auth.GetTransactionRpt(this.StoreId, frmdate, todate, this.CompanyId, this.sourceId, this.PaymentId).subscribe(data => {
      this.transactionrpt = data;
      console.log(this.transactionrpt)
      this.Totalsales = 0;
      // for (let i = 0; i < this.transactionrpt.Order.length; i++) {
      //   this.transactionrpt.Order[i].TransDate = moment(this.transactionrpt.Order[i].TransDate).format('LL');
      //   if (this.transactionrpt.Description == "Sales") {
      //     this.Totalsales = this.Totalsales + this.transactionrpt.Order[i].Amount;
      //     console.log(this.transactionrpt.Order[i].Amount);

      //   }
      //   if (this.transactionrpt.Description == "Sales(Refund)") {
      //     this.Totalrefund = this.Totalrefund + this.transactionrpt.Order[i].Amount;
      //   }
      //   if (this.transactionrpt.Description == "Expenses") {
      //     this.Totalexpenses = this.Totalexpenses + this.transactionrpt.Order[i].Amount;
      //   }
      // }
      this.transactionrpt.Order.forEach(element => {
        console.log(element.Description)
        element.TransDate = moment(element.TransDate).format('LL');
        if (element.Description == "Sales") {
          console.log(element.Description)
          this.Totalsales = this.Totalsales + element.Amount;
        } else if (element.Description == "Sales(Refund)") {
          console.log(element.Description)
          this.Totalrefund = this.Totalrefund + element.Amount;
          this.Totalsales = this.Totalsales - element.Amount;
        } else if (element.Description == "Expense") {
          console.log(element.Description)
          this.Totalexpenses = this.Totalexpenses + element.Amount;
        }
      });
      this.Totalsales = +(this.Totalsales.toFixed(2))
      this.Totalexpenses = +(this.Totalexpenses.toFixed(2))
      this.Totalrefund = +(this.Totalrefund.toFixed(2))

      var response: any = data
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }
    })
  }
  Submit1() {
    this.show = true;
    var frmdate = moment().format("YYYY-MM-DD");
    var todate = moment().format("YYYY-MM-DD");

    this.Auth.GetTransactionRpt(this.StoreId, frmdate, todate, this.CompanyId, this.sourceId, this.PaymentId).subscribe(data => {
      this.transactionrpt = data;
      console.log(this.transactionrpt)
      this.Totalsales = 0;
      for (let i = 0; i < this.transactionrpt.Order.length; i++) {
        this.transactionrpt.Order[i].TransDate = moment(this.transactionrpt.Order[i].TransDate).format('ll');
        this.Totalsales = this.Totalsales + this.transactionrpt.Order[i].Amount;
      }
      var response: any = data
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }
    })
  }

  selectEvent(e) {
    this.StoreId = e.Id;
  }
  Payment() {
    this.Auth.getpaymt().subscribe(data => {
      this.paymt = data;
      console.log(this.paymt);
    })

  }

  All() {
    var frmdate = moment().format("YYYY-MM-DD  00:00:00");
    var todate = moment().format("YYYY-MM-DD  23:59:59");
    this.startdate = frmdate;
    this.enddate = todate;
    this.Auth.GetTransactionRpt(this.StoreId, frmdate, todate, this.CompanyId, this.sourceId, this.PaymentId).subscribe(data => {
      this.transactionrpt = data;
      console.log(this.transactionrpt)
      this.Totalsales = 0;
      this.transactionrpt.Order.forEach(element => {
        element.TransDate = moment(element.TransDate).format('LL');
        if (element.Description == "Sales") {
          console.log(element.Description)
          this.Totalsales = this.Totalsales + element.Amount;
        } else if (element.Description == "Sales(Refund)") {
          console.log(element.Description)
          this.Totalrefund = this.Totalrefund + element.Amount;
          this.Totalsales = this.Totalsales - element.Amount;
        } else if (element.Description == "Expense") {
          console.log(element.Description)
          this.Totalexpenses = this.Totalexpenses + element.Amount;
        }
      });
      this.Totalsales = +(this.Totalsales.toFixed(2))
      this.Totalexpenses = +(this.Totalexpenses.toFixed(2))
      this.Totalrefund = +(this.Totalrefund.toFixed(2))

      // for (let i = 0; i < this.transactionrpt.Order.length; i++) {
      //   this.transactionrpt.Order[i].TransDate = moment(this.transactionrpt.Order[i].TransDate).format('ll');
      //   if(this.transactionrpt.Order[i].Description == 'Sales(Refund)'){
      //     this.Totalsales = this.Totalsales - this.transactionrpt.Order[i].Amount;
      //   }
      //   else{
      //     this.Totalsales = this.Totalsales + this.transactionrpt.Order[i].Amount;
      //   }
      // }
      var response: any = data
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }
      this.showloading = false
    })
  }

  GetStore() {
    this.Auth.GetStoreName2(this.CompanyId).subscribe(data => {
      this.stores = data;
      console.log(this.stores);
      var obj = { Id: 0, Name: "All", ParentStoreId: null, ParentStore: null, IsMainStore: false }
      this.stores.push(obj);
      var response: any = data
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }

    })
  }
  date(e) {
    // console.log(e);
    this.startdate = e.startDate.format('YYYY-MM-DD')
    this.enddate = e.endDate.format('YYYY-MM-DD')
  }

  openDetailpopup(contentdetail, Id) {
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    console.log(this.CompanyId, frmdate, todate, this.sourceId, this.StoreId)
    this.Auth.GetSalesRpt1(this.StoreId, frmdate, todate, this.CompanyId, this.sourceId).subscribe(data => {
      this.trxord = data;
      console.log(this.trxord)
      var orderitem = this.trxord.order1.filter(x => x.OrderId == Id)
      this.filtprd = orderitem;
      this.receipt = [];
      this.TotalProductSale = 0;
      this.TotalPrdQty = 0;
      orderitem.forEach(element => {
        this.TotalProductSale = this.TotalProductSale + element.Price;
        this.TotalPrdQty = this.TotalPrdQty + element.Quantity;
        this.TotalProductSale = +(this.TotalProductSale.toFixed(2))
        this.TotalPrdQty = +(this.TotalPrdQty.toFixed(2))
        this.receipt.push(element)
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
  focusAutocomplete() {
    var xPathResult = document.evaluate('//*[@id="maindiv"]/app-root/app-transaction-rpt/div/div/div[2]/div/section/div[1]/div[1]/ng-autocomplete/div/div[1]/input', document, null, null, null);
    var element = null
    if (xPathResult) {
      element = xPathResult.iterateNext();
    }
    element.focus();
  }

}

