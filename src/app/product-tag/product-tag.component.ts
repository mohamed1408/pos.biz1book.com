import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { idbService } from "../service/idb.service";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { DataService } from "../service/data.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toast, dangertoast } from "../../assets/dist/js/toast-data"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

import { ExcelService } from '../service/excel.service';
@Component({
  selector: 'app-product-tag',
  templateUrl: './product-tag.component.html',
  styleUrls: ['./product-tag.component.scss']
})
export class ProductTagComponent implements OnInit {

  CompanyId: number;
  StoreId: number;
  products: any;
  prod: any;
  errorMsg: any;
  tags: any;
  tagId: number;
  prodIds: any = [];
  show: any = false;
  status: number;
  p;
  term;
  constructor(private IDB: idbService, private Auth: AuthService, private router: Router,
    private data: DataService, private modalService: NgbModal, private toaster: Toaster, private excelservice: ExcelService) {
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;
  }

  ngOnInit() {
    this.getProducts();
    this.gettags();
  }
  getProducts() {
    this.Auth.getProduct(0, this.CompanyId).subscribe(data => {
      this.products = data;
      this.prod = this.products.products;
      console.log(this.prod);
      var response: any = data
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
      }
    });
  }
  gettags() {
    this.Auth.getTag(this.CompanyId).subscribe(data => {
      this.tags = data;
    });
  }
  setTagId(tagId) {
    this.tagId = tagId;
  }
  select(prodId, ischecked) {
    if (!ischecked) {
      let index = this.prodIds.findIndex(x => x.Id === prodId);
      this.prodIds.splice(index, 1);
    } else {
      var obj = { Id: prodId };
      this.prodIds.push(obj)
    }
    console.log('prodIds', this.prodIds);
  }
  save(){
    var obj={tagId:this.tagId,companyId:this.CompanyId, item: this.prodIds}
var postdata = {objData: JSON.stringify(obj) };
    this.Auth.saveTagMapping(postdata).subscribe(data => {this.router.navigateByUrl("/product-tag") 
    var response:any =  data
    if(response.status == 0)
    {
      this.status = 0;
  this.errorMsg = response.msg;
  console.log(dangertoast(this.errorMsg))
    }
    else{
      this.getProducts();
      this.gettags();
      this.show = false;
      this.errorMsg = response.msg;
      const type = "info";
      console.log(toast(this.errorMsg))
    }
  });
  }
}
