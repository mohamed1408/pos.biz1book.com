import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-wise-rpt',
  templateUrl: './category-wise-rpt.component.html',
  styleUrls: ['./category-wise-rpt.component.css']
})
export class CategoryWiseRptComponent implements OnInit {
  CompanyId: number;
  StoreId: number;
  ParentCatId = 0;
  catId: number;
  storeId: any;
  sourceId = 0;
  all: string = "All";
  // al: string = "All";
  stores: any;
  category: any;
  alwaysShowCalendars: boolean;
  key = 'Name';
  key2 = 'Description';
  startdate: any;
  enddate: any;
  show: boolean = true;
  categorywiserpt: any;
  prdstore: any;
  filtprd: any;
  ParentCategoryId: any;
  parentcategory: any = [];
  TotalSales = 0;
  TotalProductSale = 0;
  TotalPrdQty = 0;
  showloading = true;
  term;
  p;
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
  data: any;
  sortfield: any;
  x: number;
  y: number;

  constructor(private Auth: AuthService, private modalService: NgbModal) {
    this.alwaysShowCalendars = true;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;

  }

  ngOnInit() {
    this.All();
    this.GetStores();
    this.Getcategory();
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
    console.log(this.storeId + "frm" + frmdate + "" + todate + "sourceId" + this.sourceId);
    this.Auth.GetSalesRpt5(this.storeId, frmdate, todate, this.CompanyId, this.ParentCatId, this.sourceId).subscribe(data => {
      this.categorywiserpt = data;
      console.log(this.categorywiserpt);
      this.TotalSales = 0;
      for (let i = 0; i < this.categorywiserpt.Order.length; i++) {
        this.categorywiserpt.Order[i].OrderedDate = moment(this.categorywiserpt.Order[i].OrderedDate).format('ll');
        this.TotalSales = this.TotalSales + this.categorywiserpt.Order[i].TotalSales;
      }
      this.TotalSales = +(this.TotalSales.toFixed(2))
      console.log(this.startdate);
      console.log(this.enddate);
    })
  }
  strMatch(string, substring) {
    // console.log(string, substring)
    return string.toLowerCase().includes(substring)
  }
  filter(obj) {
    const term = this.term.toLowerCase()
    if (term == '') return true
    var ismatching = false
    Object.keys(obj).forEach(key => {
      if (typeof (obj[key]) == 'string') {
        this.strMatch(obj[key], term) ? ismatching = true : null
      }
      if (typeof (obj[key]) == 'number') this.strMatch(obj[key].toString(), term) ? ismatching = true : null
      if (typeof (obj[key]) == 'object') this.filter(obj[key]) ? ismatching = true : null
    })
    return ismatching
  }

  calculate() {
    this.TotalSales = 0;
    this.categorywiserpt.Order.filter(x => this.filter(x)).forEach(pd => {
      this.TotalSales += pd.TotalSales;
    });
    this.TotalSales = +this.TotalSales.toFixed(2)
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
    return this.categorywiserpt.Order.sort((a, b) => {
      if (a[this.sortfield] < b[this.sortfield]) return this.x;
      else if (a[this.sortfield] > b[this.sortfield]) return this.y;
      else return 0;
    });
  }

  All() {
    var frmdate = moment().format("YYYY-MM-DD  00:00:00");
    var todate = moment().format("YYYY-MM-DD  23:59:59");
    this.Auth.GetSalesRpt5(this.storeId, frmdate, todate, this.CompanyId, this.ParentCatId, this.sourceId).subscribe(data => {
      this.categorywiserpt = data;
      console.log(this.categorywiserpt);
      this.TotalSales = 0;
      for (let i = 0; i < this.categorywiserpt.Order.length; i++) {
        this.categorywiserpt.Order[i].OrderedDate = moment(this.categorywiserpt.Order[i].OrderedDate).format('ll');
        // this.TotalPayments = this.TotalPayments + this.daywisesalesrpt.Order[i].TotalPayments;
        this.TotalSales = (this.TotalSales + this.categorywiserpt.Order[i].TotalSales);
      }
      this.TotalSales = +(this.TotalSales.toFixed(2))
      this.showloading = false
    })
  }

  selectEvent(e) {
    this.storeId = e.Id;
  }

  selectedEvent(e) {
    this.catId = e.Id;
  }

  date(e) {
    this.startdate = e.startDate.format('YYYY-MM-DD')
    this.enddate = e.endDate.format('YYYY-MM-DD')
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
  openDetailpopup(contentdetail, Id) {
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    console.log(this.CompanyId, this.storeId, frmdate, todate, Id, this.sourceId)
    this.Auth.Getprddata(this.storeId, frmdate, todate, this.CompanyId, this.sourceId, Id, 0).subscribe(data => {
      this.prdstore = data;
      this.filtprd = data;
      console.log(this.prdstore);
      console.log(this.filtprd)
      this.TotalProductSale = 0;
      this.TotalPrdQty = 0;
      for (let i = 0; i < this.filtprd.data.length; i++) {
        this.TotalProductSale = this.TotalProductSale + this.filtprd.data[i].TotalSales;
        this.TotalPrdQty = this.TotalPrdQty + this.filtprd.data[i].Totalqty;
      }
      this.TotalProductSale = +(this.TotalProductSale.toFixed(2))
      this.TotalPrdQty = +(this.TotalPrdQty.toFixed(2))
      console.log(this.TotalProductSale, this.TotalPrdQty)
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
    var xPathResult = document.evaluate('//*[@id="maindiv"]/app-root/app-category-wise-rpt/div/div/div[2]/div/section/div[1]/div[1]/ng-autocomplete/div[1]/div[1]/input', document, null, null, null);
    var element = null
    if (xPathResult) {
      element = xPathResult.iterateNext();
    }
    element.focus();
  }


}
