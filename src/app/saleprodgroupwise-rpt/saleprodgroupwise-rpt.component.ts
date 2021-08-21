import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { idbService } from "../service/idb.service";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { DataService } from "../service/data.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toast, dangertoast } from "../../assets/dist/js/toast-data"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

import { ExcelService } from '../service/excel.service';
import { FormControl } from '@angular/forms';
import * as moment from "moment";

@Component({
  selector: 'app-saleprodgroupwise-rpt',
  templateUrl: './saleprodgroupwise-rpt.component.html',
  styleUrls: ['./saleprodgroupwise-rpt.component.scss']
})
export class SaleprodgroupwiseRptComponent implements OnInit {

  CompanyId: number;
  StoreId: number;
  products: any; 
  saleProducts:any;
  saleProductId:number;
  stores: any;
  errorMsg: string = '';
  startdate: any;
  enddate: any;
  myControl = new FormControl();
  key = 'Name';
  all: string = "All";
  sourceId = 0;
  saleprodgrouprpt: any=[];
  // saleprodgroupbystr:any=[];
  responseData: any;
  sortfield: any;
  showloading = true;
  x: number;
  y: number;
  TotalSale = 0;
  Quantity = 0;
  FreeQty = 0;
  Totalqty = 0;  
  TotalSales = 0;
  TotalProductSale =0;
  TotalPrdQty =0;
  TotalDetQty=0;
  TotalDetSale=0;
  stockprdwiserpt: any=[];
  detailedRpt: any=[];
  show: boolean = true;
  term;
  p;
  searchSaleProdId=0;
  action="";
  // selected: any;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  selected: any = { startDate: moment(), endDate: moment() };

  constructor(private IDB: idbService, private Auth: AuthService, private router: Router,
    private data: DataService, private modalService: NgbModal, private toaster: Toaster, private excelservice: ExcelService) {
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;
  }
  ngOnInit() {
    this.getsaleproducts();
this.GetStore();
this.All();
  }
  getsaleproducts() {
    this.Auth.getSaleProducts(this.CompanyId).subscribe(data => {
      console.log(data)
      var response: any = data

      this.saleProducts = response.products;
    });
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
  selectEvent(e) {
    this.StoreId = e.Id;

  }

  setSaleProductId(saleProductId) {
    this.searchSaleProdId = saleProductId;
  }
  All() {
    this.startdate = moment().format("YYYY-MM-DD  00:00:00");
    this.enddate = moment().format("YYYY-MM-DD  23:59:59");
    this.Auth.GetSaleProdGroupRpt(this.StoreId, this.startdate, this.enddate, this.CompanyId, this.sourceId,this.searchSaleProdId).subscribe(data => {
      console.log(data)
      this.responseData = data;
      this.saleprodgrouprpt = this.responseData.data;
      if(this.saleprodgrouprpt==null)this.saleprodgrouprpt=[];

      for (let i = 0; i < this.saleprodgrouprpt.length; i++) {
        // this.productrpt[i].OrderedDate = moment(this.productrpt[i].OrderedDate).format('LL');
        this.TotalSale = this.TotalSale + this.saleprodgrouprpt[i].TotalSales;
        this.Quantity = this.Quantity + this.saleprodgrouprpt[i].Quantity;
        this.FreeQty = this.FreeQty + this.saleprodgrouprpt[i].FreeQty;
        this.Totalqty = this.Totalqty + this.saleprodgrouprpt[i].Totalqty;
      }
      this.TotalSale = +(this.TotalSale.toFixed(2))
      this.Quantity = +(this.Quantity.toFixed(2))
      this.FreeQty = +(this.FreeQty.toFixed(2))
      this.Totalqty = +(this.Totalqty.toFixed(2))
 
      this.showloading = false
      console.log(this.TotalSale)

      if (this.responseData.status == 0) {
        this.errorMsg = this.responseData.msg;
        console.log(dangertoast(this.errorMsg));
      }
    });

  }

  date(e) {
    console.log(e)
    if(e.startDate!= null && e.endDate!= null){
    this.startdate = e.startDate.format('YYYY-MM-DD')
    this.enddate = e.endDate.format('YYYY-MM-DD');
    }
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
    return this.saleprodgrouprpt.sort((a, b) => {
    if (a[this.sortfield] < b[this.sortfield]) return this.x;
    else if (a[this.sortfield] > b[this.sortfield]) return this.y;
    else return 0;
  });
  }
  openDetailpopup(contentdetail, saleProductId) {
    console.log(this.CompanyId)
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    this.Auth.GetStockPrdwise(frmdate, todate,saleProductId, this.CompanyId, this.sourceId,this.StoreId,2).subscribe(data => {
      this.detailedRpt = data;
      console.log('dd',this.detailedRpt);

      this.TotalDetSale = 0;
      this.TotalDetQty = 0;
      for (let i = 0; i < this.detailedRpt.data.length; i++) {
        this.TotalDetSale = this.TotalDetSale + this.detailedRpt.data[i].TotalSales;
        this.TotalDetQty = this.TotalDetQty + (this.detailedRpt.data[i].Quantity * this.detailedRpt.data[i].Factor);
      }
      this.TotalDetSale = +(this.TotalDetSale.toFixed(2))
      this.TotalDetQty = +(this.TotalDetQty.toFixed(2))
      this.Auth.GetStockPrdwise(frmdate, todate,saleProductId, this.CompanyId, this.sourceId,this.StoreId,3).subscribe(data => {
        this.stockprdwiserpt = data;
        console.log(this.stockprdwiserpt);
        // this.storeprd = data;
        this.TotalProductSale = 0;
        this.TotalPrdQty = 0;
        for (let i = 0; i < this.stockprdwiserpt.data.length; i++) {
          this.TotalProductSale = this.TotalProductSale + this.stockprdwiserpt.data[i].TotalSales;
          this.TotalPrdQty = this.TotalPrdQty + (this.stockprdwiserpt.data[i].Quantity * this.stockprdwiserpt.data[i].Factor);
        }
        this.TotalProductSale = +(this.TotalProductSale.toFixed(2))
        this.TotalPrdQty = +(this.TotalPrdQty.toFixed(2))
        // console.log("TotalPrdQty",this.TotalPrdQty,"TotalDetQty",this.TotalDetQty);

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
  Submit(action){
    this.show = true;
    if (this.startdate.hasOwnProperty("month")) {
      this.startdate.month = this.startdate.month - 1;
      this.enddate.month = this.enddate.month - 1;
    }
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    this.action=action;
    // console.log('this.StoreId, frmdate, todate, this.CompanyId, this.CategoryId, this.sourceId,this.tagId'
    // ,this.StoreId, frmdate, todate, this.CompanyId, this.CategoryId, this.sourceId,this.tagId);
    if(action == "DetailedRpt"){
    this.Auth.GetSaleProdGroupRpt(this.StoreId, frmdate, todate, this.CompanyId, this.sourceId,this.searchSaleProdId).subscribe(data => {
      console.log(data)
      this.responseData = data;
      this.saleprodgrouprpt = this.responseData.data;
      if(this.saleprodgrouprpt==null)this.saleprodgrouprpt=[];
      this.TotalSale = 0;
      this.Quantity = 0;
      this.FreeQty = 0;
      this.Totalqty = 0;
      for (let i = 0; i < this.saleprodgrouprpt.length; i++) {
        // this.productrpt[i].OrderedDate = moment(this.productrpt[i].OrderedDate).format('LL');
        this.TotalSale = this.TotalSale + this.saleprodgrouprpt[i].TotalSales;
        this.Quantity = this.Quantity + this.saleprodgrouprpt[i].Quantity;
        this.FreeQty = this.FreeQty + this.saleprodgrouprpt[i].FreeQty;
        this.Totalqty = this.Totalqty + this.saleprodgrouprpt[i].Totalqty;
      }
      this.TotalSale = +(this.TotalSale.toFixed(2))
      this.Quantity = +(this.Quantity.toFixed(2))
      this.FreeQty = +(this.FreeQty.toFixed(2))
      this.Totalqty = +(this.Totalqty.toFixed(2))
 
      this.showloading = false
      if (this.responseData.status == 0) {
        this.errorMsg = this.responseData.msg;
        console.log(dangertoast(this.errorMsg));
      }
    });
  }
  else if(action == "ByStore"){
    this.Auth.GetStockPrdwise(frmdate, todate,this.searchSaleProdId, this.CompanyId, this.sourceId,this.StoreId,4).subscribe(data => {
      console.log('4',data)
      this.responseData = data;
      this.saleprodgrouprpt = this.responseData.data;
      if(this.saleprodgrouprpt==null)this.saleprodgrouprpt=[];
      this.TotalSale = 0;
      this.Quantity = 0;
      this.FreeQty = 0;
      this.Totalqty = 0;
      for (let i = 0; i < this.saleprodgrouprpt.length; i++) {
        // this.productrpt[i].OrderedDate = moment(this.productrpt[i].OrderedDate).format('LL');
        this.TotalSale = this.TotalSale + this.saleprodgrouprpt[i].TotalSales;
        this.Quantity = this.Quantity + this.saleprodgrouprpt[i].Quantity;
        this.FreeQty = this.FreeQty + this.saleprodgrouprpt[i].FreeQty;
        this.Totalqty = this.Totalqty + this.saleprodgrouprpt[i].Totalqty;
      }
      this.TotalSale = +(this.TotalSale.toFixed(2))
      this.Quantity = +(this.Quantity.toFixed(2))
      this.FreeQty = +(this.FreeQty.toFixed(2))
      this.Totalqty = +(this.Totalqty.toFixed(2))

      this.showloading = false

      if (this.responseData.status == 0) {
        this.errorMsg = this.responseData.msg;
        console.log(dangertoast(this.errorMsg));
      }
    });
  }
  else{
    this.Auth.GetStockPrdwise(frmdate, todate,this.searchSaleProdId, this.CompanyId, this.sourceId,this.StoreId,3).subscribe(data => {
      console.log(data)
      this.responseData = data;
      this.saleprodgrouprpt = this.responseData.data;
      if(this.saleprodgrouprpt==null)this.saleprodgrouprpt=[];
      this.TotalSale = 0;
      this.Quantity = 0;
      this.FreeQty = 0;
      this.Totalqty = 0;
      for (let i = 0; i < this.saleprodgrouprpt.length; i++) {
        // this.productrpt[i].OrderedDate = moment(this.productrpt[i].OrderedDate).format('LL');
        this.TotalSale = this.TotalSale + this.saleprodgrouprpt[i].TotalSales;
        this.Quantity = this.Quantity +this.saleprodgrouprpt[i].Quantity;
        this.FreeQty = this.FreeQty + this.saleprodgrouprpt[i].FreeQty;
        this.Totalqty = this.Totalqty + this.saleprodgrouprpt[i].Totalqty;
      }
      this.TotalSale = +(this.TotalSale.toFixed(2))
      this.Quantity = +(this.Quantity.toFixed(2))
      this.FreeQty = +(this.FreeQty.toFixed(2))
      this.Totalqty = +(this.Totalqty.toFixed(2))
 
      this.showloading = false;
      console.log("this.Quantityyyy",this.Quantity)


      if (this.responseData.status == 0) {
        this.errorMsg = this.responseData.msg;
        console.log(dangertoast(this.errorMsg));
      }
    });
  }
  }
  
}
