import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { idbService } from "../service/idb.service";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { DataService } from "../service/data.service";
//import * as XLSX from 'ts-xlsx';
import * as moment from "moment";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toast, dangertoast } from "../../assets/dist/js/toast-data"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
// import * as xlsx from 'xlsx';
// import * as alasql from 'alasql';
import { ExcelService } from '../service/excel.service';
declare function setHeightWidth(): any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  products: any;
  taxGroups: any;
  categories: any;
  importedProducts: any;
  CompanyId: number;
  StoreId: number;
  fromDate = 0;
  toDate = 0;
  resData: any;
  term;
  p;
  public dash: any;
  status: number;
  errorMsg: any;
  show: any = false;
  prod: any;
  fileReaded: any;
  Id = 0;
  isactive: boolean;

  bool: boolean = true;
  constructor(private IDB: idbService, private Auth: AuthService, private router: Router,
    private data: DataService, private modalService: NgbModal, private toaster: Toaster, private excelservice: ExcelService) {
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;
  }

  private types: Array<ToastType> = ['danger'];

  ngOnInit() {
    setHeightWidth();
    this.getProducts();
    // var issessionvalid = JSON.parse(localStorage.getItem("issessionvalid"));
    // if (!issessionvalid) {
    //   localStorage.removeItem("userinfo");
    //   this.router.navigate([""]);
    // }
  }
  arrayBuffer: any;
  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }
  active(id, act) {
    //   if(act="undefined")
    //   {
    //     act=true;
    //   }
    //   this.Id =id;
    // this.isactive =act;
    this.Auth.prdactive(id, act).subscribe(data => {
      this.getProducts();
    });
  }
  changefilter(bool) {
    console.log(bool)
    if(bool){
      this.prod = this.products.products;
    } else {
      this.prod = this.products.products.filter(x => x.isactive);
    }
    console.log(this.prod.length)
  }
  getProducts() {
    this.Auth.getProduct(0, this.CompanyId).subscribe(data => {
      this.products = data;
      this.prod = this.products.products.filter(x => x.isactive);
      // this.prod.filter(x => x.isactive == isac)
      console.log(this.prod);
      var response: any = data
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
      }
    });
  }

  deleteProduct(id) {
    this.Auth.DeleteProduct(id, this.CompanyId).subscribe(data => {
      var response: any = data
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg))
      } else {
        this.getProducts();
        this.show = false;
        this.errorMsg = response.msg;
        console.log(toast(this.errorMsg));
      }
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
  csv2Array(fileInput: any) {
    //read file from input
    this.fileReaded = fileInput.target.files[0];

    let reader: FileReader = new FileReader();
    reader.readAsText(this.fileReaded);

    reader.onload = (e) => {
      let csv: any = reader.result;
      let allTextLines = csv.split(/\r|\n|\r/);
      console.log(csv, allTextLines);
      let headers = allTextLines[0].split(',');
      let lines = [];
      console.log(allTextLines.length)
      for (let i = 1; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        console.log(i, data)
        if (data.length === headers.length) {
          console.log(i)
          let tarr = [];
          var obj = { Product: "", ParentCategory: "", Category: "", Price: 0, OptionGroup: "", Type: 0, TaxGroup: "" };
          obj.Product = data[0];
          obj.ParentCategory = data[1];
          obj.Category = data[2];
          obj.Price = data[3];
          obj.OptionGroup = data[4];
          obj.Type = data[5];
          obj.TaxGroup = data[6];
          lines.push(obj);
        }
      }
      // all rows in the csv file 
      console.log(">>>>>>>>>>>>>>>>>", lines);
      this.importedProducts = lines;
    }
  }
  Upload() {
    console.log(this.importedProducts);
    var prodData = { productData: JSON.stringify(this.importedProducts) };
    this.Auth.importProduct(prodData, this.CompanyId).subscribe(data => {
      var response: any = data;
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }
      else {
        this.errorMsg = response.msg;
        console.log(toast(this.errorMsg));

        this.getProducts();
      }
    })

  }
  exceldata = [];
  exportToExcel() {
    // console.log(this.products)
    this.products.products.forEach(element => {
      // console.log(element)
      var parentcategory = '';
      var category = '';
      if (element.Category.ParentCategory != null) {
        parentcategory = element.Category.ParentCategory.Description;
        category = element.Category.Description;
      } else {
        parentcategory = '';
        category = element.Category.Description;
      }

      var obj = { "Product": element.Name, "ParentCategory": parentcategory, "Category": category, "Price": element.Price, "OptionGroup": "", "Type": element.ProductTypeId, "TaxGroup": element.TaxGroup.Description }
      this.exceldata.push(obj)
    });
    this.excelservice.exportAsExcelFile(this.exceldata, 'newexcel')
  }
}
