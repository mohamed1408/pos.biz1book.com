import * as moment from "moment";
import { AuthService } from '../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';

export interface PeriodicElement {
  Name: string;
  Quantity: number;
  FreeQty: number;
  Totalqty: number;
  TotalSales: number;
}

@Component({
  selector: 'app-storewise-rpt',
  templateUrl: './storewise-rpt.component.html',
  styleUrls: ['./storewise-rpt.component.css']
})
export class StorewiseRptComponent {
  orders: PeriodicElement[] = [];
  displayedColumns: string[] = ['Name', 'Quantity', 'FreeQty', 'Totalqty', 'TotalSales'];
  dataSource = new MatTableDataSource(this.orders);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  CompanyId: number;
  StoreId: number;
  categoryId: any;
  catId: 0;
  productId: any;
  all: string = "All";
  prd: string = "All"
  category: any;
  product: any;
  alwaysShowCalendars: boolean;
  key = 'Description';
  key2 = 'Description';
  startdate: any;
  enddate: any;
  show: boolean = true;
  storewiserpt: any;
  prdstore: any;
  TotalSales = 0;
  sourceId = 0;
  Totalqty = 0;
  FreeQty = 0;
  Quantity = 0;
  TotalProductSale = 0;
  TotalPrdQty = 0;
  term;
  p;
  showloading = true;
  storewisedata = [];
  storeproducts: any;
  filteredproducts: any;
  filtprd: any;
  categorywiserpt: any;
  TotalPrdtSale = 0;
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
  tags: any;
  tagId=0;
  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }
  sortfield: any;
  x: number;
  y: number;

  constructor(private Auth: AuthService, private modalService: NgbModal) {
    this.alwaysShowCalendars = true;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
  }
  dtOptions: any = {};

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print', 'pdf'
      ]
    };
    this.Getcategory()
    this.All()
    this.startdate = moment().format('YYYY-MM-DD')
    this.enddate = moment().format('YYYY-MM-DD')
    this.GetProduct()
    this.gettags();
    this.dataSource.sort = this.sort;


  }

  Submit() {
    this.show = true;
    if (this.startdate.hasOwnProperty("month")) {
      this.startdate.month = this.startdate.month - 1;
      this.enddate.month = this.enddate.month - 1;
    }
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");

    this.Auth.GetSalesRpt6(this.categoryId, frmdate, todate, this.CompanyId, this.sourceId, this.productId,this.tagId).subscribe(data => {
      this.storewiserpt = data;
      console.log(this.storewiserpt);
      this.TotalSales = 0;
      this.Quantity = 0;
      this.FreeQty = 0;
      this.Totalqty = 0;
      for (let i = 0; i < this.storewiserpt.Order.length; i++) {
        this.TotalSales = this.TotalSales + this.storewiserpt.Order[i].TotalSales;
        this.Quantity = this.Quantity + this.storewiserpt.Order[i].Quantity;
        this.FreeQty = this.FreeQty + this.storewiserpt.Order[i].FreeQty;
        this.Totalqty = this.Totalqty + this.storewiserpt.Order[i].Totalqty;
      }
      this.TotalSales = +(this.TotalSales.toFixed(2))
      this.Quantity = +(this.Quantity.toFixed(2))
      this.FreeQty = +(this.FreeQty.toFixed(2))
      this.Totalqty = +(this.Totalqty.toFixed(2))
    });
  }

  All() {
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    this.Auth.GetSalesRpt6(this.categoryId, frmdate, todate, this.CompanyId, this.sourceId, this.productId,this.tagId).subscribe(data => {
      this.storewiserpt = data;
      console.log(this.storewiserpt);
      this.TotalSales = 0;
      this.Quantity = 0;
      this.FreeQty = 0;
      this.Totalqty = 0;
      for (let i = 0; i < this.storewiserpt.Order.length; i++) {
        this.TotalSales = this.TotalSales + this.storewiserpt.Order[i].TotalSales;
        this.Quantity = this.Quantity + this.storewiserpt.Order[i].Quantity;
        this.FreeQty = this.FreeQty + this.storewiserpt.Order[i].FreeQty;
        this.Totalqty = this.Totalqty + this.storewiserpt.Order[i].Totalqty;
      }
      this.TotalSales = +(this.TotalSales.toFixed(2))
      this.Quantity = +(this.Quantity.toFixed(2))
      this.FreeQty = +(this.FreeQty.toFixed(2))
      this.Totalqty = +(this.Totalqty.toFixed(2))
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



  selectEvent(e) {
    this.categoryId = e.Id;
  }


  selectedEvent(e) {
    this.productId = e.Id;
  }

  date(e) {
    console.log(e)
    if (e.startDate != null && e.endDate != null) {
      this.startdate = e.startDate.format('YYYY-MM-DD')
      this.enddate = e.endDate.format('YYYY-MM-DD')
    }
  }

  Getcategory() {
    this.Auth.getcat(this.CompanyId).subscribe(data => {
      this.category = data;
      var obj = { Id: 0, Description: "All", ParentCategoryId: null }
      this.category.push(obj);
    })
  }

  GetProduct() {
    this.Auth.getcatprd(this.CompanyId).subscribe(data => {
      this.product = data;
      var obj = { Id: 0, Description: "All", ParentCategoryId: null }
      this.product.push(obj);
    })
  }
  gettags() {
    this.Auth.getTag(this.CompanyId).subscribe(data => {
      this.tags = data;
    });
  }
  setTagId(tagId) {
    this.tagId = tagId;
  }
  openDetailpopup(contentdetail, Id) {
    console.log('contentdetail',contentdetail)
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    console.log(this.CompanyId, this.categoryId, frmdate, todate, Id, this.sourceId)
    this.Auth.Getprddata(Id, frmdate, todate, this.CompanyId, this.sourceId, this.categoryId,this.tagId).subscribe(data => {
      this.prdstore = data;
      this.filtprd = data;
      var array = []
      console.log(this.prdstore);
      console.log(this.filtprd)
      this.filtprd.data.forEach(element => {
        if (array.some(x => x.Id === element.Id)) {
          array.filter(x => x.Id == element.Id)[0].TotalSales = array.filter(x => x.Id == element.Id)[0].TotalSales + element.TotalSales;
          array.filter(x => x.Id == element.Id)[0].FreeQty = array.filter(x => x.Id == element.Id)[0].FreeQty + element.FreeQty;
          array.filter(x => x.Id == element.Id)[0].Quantity = array.filter(x => x.Id == element.Id)[0].Quantity + element.Quantity;
          array.filter(x => x.Id == element.Id)[0].Totalqty = array.filter(x => x.Id == element.Id)[0].Totalqty + element.Totalqty;
        } else {
          array.push(element)
        }
      });
      array.forEach(element => {
        element.Quantity = +(element.Quantity.toFixed(3))
      })

      this.filtprd.data = array;
      this.Auth.GetSalesRpt5(Id, frmdate, todate, this.CompanyId, this.categoryId, this.sourceId).subscribe(data => {
        this.categorywiserpt = data;
        console.log(this.categorywiserpt);
        console.log(this.filteredproducts)
        this.TotalProductSale = 0;
        this.TotalPrdQty = 0;
        for (let i = 0; i < this.filtprd.data.length; i++) {
          this.TotalProductSale = this.TotalProductSale + this.filtprd.data[i].TotalSales;
          this.TotalPrdQty = this.TotalPrdQty + this.filtprd.data[i].Totalqty;
          this.TotalProductSale = +(this.TotalProductSale.toFixed(2))
          this.TotalPrdQty = +(this.TotalPrdQty.toFixed(2))
        }

        this.TotalPrdtSale = 0;
        for (let i = 0; i < this.categorywiserpt.Order.length; i++) {
          this.TotalPrdtSale = this.TotalPrdtSale + this.categorywiserpt.Order[i].TotalSales;
          this.TotalPrdtSale = +(this.TotalPrdtSale.toFixed(2))
        }
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
    });



  }
  focusAutocomplete() {
    var xPathResult = document.evaluate('//*[@id="maindiv"]/app-root/app-storewise-rpt/div/div/div[2]/div/section/div[1]/div[1]/ng-autocomplete/div/div[1]/input', document, null, null, null);
    var element = null
    if (xPathResult) {
      element = xPathResult.iterateNext();
    }
    element.focus();
  }
  focusedAutocomplete() {
    var xPathResult = document.evaluate('//*[@id="maindiv"]/app-root/app-storewise-rpt/div/div/div[2]/div/section/div[1]/div[5]/ng-autocomplete/div/div[1]/input', document, null, null, null);
    var element = null
    if (xPathResult) {
      element = xPathResult.iterateNext();
    }
    element.focus();
  }


}

  // Submit() {
  //   this.show = true;
  //   if (this.startdate.hasOwnProperty("month")) {
  //     this.startdate.month = this.startdate.month - 1;
  //     this.enddate.month = this.enddate.month - 1;
  //   }
  //   this.orders = []
  //   var frmdate = moment(this.startdate).format("YYYY-MM-DD");
  //   var todate = moment(this.enddate).format("YYYY-MM-DD");
  //   console.log(this.orders);
  //   this.Auth.GetSalesRpt6(this.categoryId, frmdate, todate, this.CompanyId, this.sourceId, this.productId).subscribe(data => {
  //     this.storewiserpt = data;
  //     this.storeproducts = data;
  //     console.log(this.storewiserpt);
  //     var storewisedata = [];
  //     var storename = '';
  //     var qty = 0;
  //     var freeqty = 0;
  //     var totqty = 0;
  //     var totsales = 0;
  //     this.storewiserpt.forEach((element, index) => {
  //       if (storename == '' || storename == element.Name) {
  //         qty = qty + element.Quantity;
  //         freeqty = freeqty + element.FreeQty;
  //         totqty = totqty + element.Totalqty;
  //         totsales = totsales + element.TotalSales;
  //         storename = element.Name;
  //       } else {
  //         console.log('push', storename, element.Name);
  //         var obj = { Name: storename, Quantity: qty, FreeQty: freeqty, Totalqty: totqty, TotalSales: totsales }
  //         storewisedata.push(obj);
  //         qty = 0;
  //         freeqty = 0;
  //         totqty = 0;
  //         totsales = 0;
  //         storename = element.Name;
  //       }
  //     });
  //     var obj = { Name: storename, Quantity: qty, FreeQty: freeqty, Totalqty: totqty, TotalSales: totsales }
  //     storewisedata.push(obj);
  //     qty = 0;
  //     freeqty = 0;
  //     totqty = 0;
  //     totsales = 0;
  //     storename = ''
  //     console.log(storewisedata);

  //     storewisedata.forEach(element => {
  //       var obj = { Name: element.Name, Quantity: element.Quantity, FreeQty: element.FreeQty, Totalqty: element.Totalqty, TotalSales: element.TotalSales };
  //       this.orders.push(obj);
  //     });
  //     console.log(this.orders);
  //     this.TotalSales = 0;
  //     this.Quantity = 0;
  //     this.FreeQty = 0;
  //     this.Totalqty = 0;
  //     for (let i = 0; i < this.orders.length; i++) {
  //       this.TotalSales = this.TotalSales + this.orders[i].TotalSales;
  //       this.Quantity = this.Quantity + this.orders[i].Quantity;
  //       this.FreeQty = this.FreeQty + this.orders[i].FreeQty;
  //       this.Totalqty = this.Totalqty + this.orders[i].Totalqty;
  //     }
  //     this.TotalSales = +(this.TotalSales.toFixed(2))
  //     this.Quantity = +(this.Quantity.toFixed(2))
  //     this.FreeQty = +(this.FreeQty.toFixed(2))
  //     this.Totalqty = +(this.Totalqty.toFixed(2))
  //   })
  // }

  // All() {
  //   this.orders = []
  //   var frmdate = moment(this.startdate).format("YYYY-MM-DD");
  //   var todate = moment(this.enddate).format("YYYY-MM-DD");
  //   console.log(this.orders);
  //   this.Auth.GetSalesRpt6(this.categoryId, frmdate, todate, this.CompanyId, this.sourceId, this.productId).subscribe(data => {
  //     this.storewiserpt = data;
  //     this.storeproducts = data;
  //     console.log(this.storewiserpt,"sfdg");
  //     var storewisedata = [];
  //     var storename = '';
  //     var qty = 0;
  //     var freeqty = 0;
  //     var totqty = 0;
  //     var totsales = 0;
  //     this.storewiserpt.forEach((element, index) => {
  //       if (storename == '' || storename == element.Name) {
  //         qty = qty + element.Quantity;
  //         freeqty = freeqty + element.FreeQty;
  //         totqty = totqty + element.Totalqty;
  //         totsales = totsales + element.TotalSales;
  //         storename = element.Name;
  //       } else {
  //         console.log('push', storename, element.Name);
  //         var obj = { Name: storename, Quantity: qty, FreeQty: freeqty, Totalqty: totqty, TotalSales: totsales }
  //         storewisedata.push(obj);
  //         qty = 0;
  //         freeqty = 0;
  //         totqty = 0;
  //         totsales = 0;
  //         storename = element.Name;
  //       }
  //     });
  //     var obj = { Name: storename, Quantity: qty, FreeQty: freeqty, Totalqty: totqty, TotalSales: totsales }
  //     storewisedata.push(obj);
  //     qty = 0;
  //     freeqty = 0;
  //     totqty = 0;
  //     totsales = 0;
  //     storename = ''
  //     console.log(storewisedata);

  //     storewisedata.forEach(element => {
  //       var obj = { Name: element.Name, Quantity: element.Quantity, FreeQty: element.FreeQty, Totalqty: element.Totalqty, TotalSales: element.TotalSales };
  //       this.orders.push(obj);
  //     });
  //     console.log(this.orders);
  //     this.TotalSales = 0;
  //     this.Quantity = 0;
  //     this.FreeQty = 0;
  //     this.Totalqty = 0;
  //     for (let i = 0; i < this.orders.length; i++) {
  //       this.TotalSales = this.TotalSales + this.orders[i].TotalSales;
  //       this.Quantity = this.Quantity + this.orders[i].Quantity;
  //       this.FreeQty = this.FreeQty + this.orders[i].FreeQty;
  //       this.Totalqty = this.Totalqty + this.orders[i].Totalqty;
  //     }
  //     this.TotalSales = +(this.TotalSales.toFixed(2))
  //     this.Quantity = +(this.Quantity.toFixed(2))
  //     this.FreeQty = +(this.FreeQty.toFixed(2))
  //     this.Totalqty = +(this.Totalqty.toFixed(2))
  //   })
  // }
