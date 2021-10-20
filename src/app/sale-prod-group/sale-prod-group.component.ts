import { Component, ElementRef, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { idbService } from "../service/idb.service";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { DataService } from "../service/data.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toast, dangertoast } from "../../assets/dist/js/toast-data"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { ExcelService } from '../service/excel.service';

@Component({
  selector: 'app-sale-prod-group',
  templateUrl: './sale-prod-group.component.html',
  styleUrls: ['./sale-prod-group.component.scss']
})
export class SaleProdGroupComponent implements OnInit {
  CompanyId: number;
  StoreId: number;
  products: any;
  prod: any;
  errorMsg: any;
  saleProducts: any;
  saleProductId: number;
  items: any = [];
  status: number;
  p;
  term;
  term1;
  key = "Name"
  childProds: any = [];
  removeStockProds: any = [];
  // products: any;
  categ: any;
  isSearchAndAdd: any = false;
  newItem = [];
  CategoryId = 0;
  all: string = "All";
  sourceId = 0;
  searchAndAddObj = [];
  productText = "";
  constructor(private IDB: idbService, private Auth: AuthService, private router: Router,
    // private _snackBar: MatSnackBar,
    private data: DataService, private modalService: NgbModal, private toaster: Toaster, private excelservice: ExcelService) {
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;
  }

  ngOnInit() {
    console.log('sale-prod-group')
    this.getsaleproducts();
    this.getoptionproduct();
    this.getCategory();
  }
  getCategory() {
    this.Auth.getcat(this.CompanyId).subscribe(data => {
      this.categ = data;
    })
  }
  addItem() {
    // this.Reset();
    this.isSearchAndAdd = false;
    this.searchAndAddObj = [];
    this.childProds = [];
    this.newItem.push({ ProductId: 0, Description: '', Factor: 1 });
    // this.childProds=[];
    // this.isSearchAndAdd=false;
    // this.searchAndAddObj=[];
    console.log(this.newItem)
  }
  searchAndAdd() {
    this.Reset();
    this.isSearchAndAdd = true;
  }
  delete(index) {
    // var id = this.newItem[index].ProductId;
    // console.log(id)
    this.newItem.splice(index, 1);

  }
  getsaleproducts() {
    this.Auth.getSaleProducts(this.CompanyId).subscribe(data => {
      console.log(data)
      var response: any = data

      this.saleProducts = response.products;
    });
  }
  setSaleProductId(saleProductId) {
    this.saleProductId = saleProductId;
    this.GetChildProds();
  }
  Reset() {
    this.isSearchAndAdd = false;
    this.searchAndAddObj = [];
    this.newItem = [];
    this.childProds = [];
  }
  GetChildProds() {
    this.Reset();
    this.Auth.GetChildProds(this.saleProductId, this.CompanyId).subscribe(data => {
      console.log('op', data);
      var response: any = data
      this.childProds = response.products;
      // console.log('childProds',this.childProds);

      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
      }
    });
  }
  getoptionproduct(action = '') {
    // console.log(this.productText)
    if (action == 'Search') {
      this.Auth.getproductsNoptions(this.CompanyId, this.CategoryId, this.productText).subscribe(data => {
        var response: any = data

        let prodsNoptions = response.prod;
        prodsNoptions.push(...response.productOption)
        this.searchAndAddObj = prodsNoptions;
        // console.log('op',this.prod.filter(x => !x.Name));
        this.searchAndAddObj.forEach(val => {
          val["checked"] = false;
          if (typeof (val.OptionId) == 'undefined') val["OptionId"] = null;
        });
        console.log('op', this.searchAndAddObj);

        if (response.status == 0) {
          this.errorMsg = response.msg;
          console.log(dangertoast(this.errorMsg));
        }
      });
    }
    else {
      this.Auth.getproductsNoptions(this.CompanyId, null, '').subscribe(data => {
        console.log('op', data);
        var response: any = data

        let prodsNoptions = response.prod;
        prodsNoptions.push(...response.productOption)
        this.prod = prodsNoptions;
        console.log('op1', this.prod, this.prod.filter(x => !x.Name));

        if (response.status == 0) {
          this.errorMsg = response.msg;
          console.log(dangertoast(this.errorMsg));
        }
      });
    }
  }
  selectEvent(e) {
    if (typeof (e.OptionId) == 'undefined') e.OptionId = null;
    if (typeof (e.SortOrder) == 'undefined') e.SortOrder = null;
    if (typeof (e.IsOnline) == 'undefined') e.IsOnline = null;

    console.log(e)
    var obj = { StockProductId: e.Id, OptionId: e.OptionId, SortOrder: e.SortOrder, IsOnline: e.IsOnline };
    this.items.push(obj);
    console.log(this.items)

    // this.StoreId = e.Id;

  }
  selectAll() {
    this.items = [];

    if (this.searchAndAddObj.every(val => val.checked == true)) {
      this.searchAndAddObj.forEach(val => { val.checked = false });
    }
    else {
      this.searchAndAddObj.forEach(val => {
        val.checked = true;
        var obj = {
          StockProductId: val.Id, OptionId: val.OptionId, SortOrder: val.SortOrder
          , IsOnline: val.IsOnline
        };
        this.items.push(obj);
      });
      console.log(this.items)
    }

  }
  onchangeFactor(value, index) {
    console.log('value', value, index, this.items[0])
    this.items[index].Factor = value;
  }
  onchangeSortOrder(value, index) {
    console.log(111111, value, index, this.items[0])
    this.items[index].SortOrder = value;
  }
  onClickOnline(val, index) {
    console.log(val, index)
    this.items[index].IsOnline = val;

  }
  select(stockProductId, optionId, ischecked) {
    if (typeof (optionId) == 'undefined') optionId = null;
    if (!ischecked) {
      let index = this.items.findIndex(x => x.StockProductId === stockProductId && x.OptionId == optionId);
      this.items.splice(index, 1);
    } else {
      var obj = { StockProductId: stockProductId, OptionId: optionId, Factor: 1, SortOrder: null, IsOnline: null };
      this.items.push(obj)
    }
    console.log('items', this.items);
  }
  save() {
    var updatedItems = this.childProds.filter(x => x.changed);
    var obj = {
      saleProductId: this.saleProductId, companyId: this.CompanyId, item: this.items, removeStockProds: this.removeStockProds,
      updatedItems: updatedItems
    }
    var postdata = { objData: JSON.stringify(obj) };
    console.log('obj', this.childProds.filter(x => x.changed))
    this.Auth.saveSaleProdGroup(postdata).subscribe(data => {
      console.log(data)
      this.router.navigateByUrl("/sale-prod-group")
      var response: any = data
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg))
      }
      else {
        this.getoptionproduct();
        // this.getsaleproducts();
        this.GetChildProds();
        this.childProds = [];
        this.removeStockProds = [];
        this.items = [];
        this.errorMsg = response.msg;
        const type = "info";
        console.log(toast(this.errorMsg))
      }
    });
  }

  remove(item) {
    // var id = this.childProds[index].StockProductId;
    var index = this.childProds.map(function (x) { return x.StockProductId; }).indexOf(item.StockProductId);
    // var objectFound = this.childProds[elementPos];

    // console.log(item.StockProductId,index)
    this.removeStockProds.push({ StockProductId: item.StockProductId })
    this.childProds.splice(index, 1);
  }
}
