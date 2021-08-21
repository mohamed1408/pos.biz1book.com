import { Component, OnInit } from '@angular/core';
import { idbService } from "../service/idb.service";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toast, dangertoast } from "../../assets/dist/js/toast-data"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
declare function setHeightWidth(): any;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: any;
  CompanyId: number;
  status: number;
  errorMsg: any;
  show: any = false;
  StoreId: number;
  term;
  p;
  ParentCategories: any;
  sortfield: any;
  x: number;
  y: number;
  showloading = true;
  // model: any = {};
  // value = "na";
  Id = 0;
  isactive: boolean;
  constructor(private IDB: idbService, private Auth: AuthService, public router: Router, private modalService: NgbModal, private toaster: Toaster) {
    // var userinfo = localStorage.getItem("userinfo");
    // var userinfoObj = JSON.parse(userinfo);
    // console.log(userinfoObj)
    // this.CompanyId = userinfoObj[0].CompanyId;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;

  }
  private types: Array<ToastType> = ['danger'];

  ngOnInit() {
    setHeightWidth();
    this.getCategory();
    // this.getproducts();
  }
  // public options = [
  //   { value: "on", id: "On" },
  //   { value: "off", id: "Off" },
  // ]

  // onSubmit() {
  //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  // }

  // onSelectionChange(entry) {
  //   debugger
  //   this.value = entry;
  // }

  // getproducts() {
  //   this.Auth.getProduct(0, this.CompanyId).subscribe(data => {
  //     var dat: any = data;
  //     var products = dat.products;
  //     console.log(products);
  //     var response: any = data
  //     if (response.status == 0) {
  //       this.errorMsg = response.msg;
  //       console.log(dangertoast(this.errorMsg));
  //     }
  //   });
  // }
  getCategory() {
    this.Auth.getcat(this.CompanyId).subscribe(data => {
      this.category = data;
      console.log(this.category)
      // this.category = this.category.filter(x=> x.isactive)
      for (let i = 0; i < this.category.length; i++) {
        //match parent category name
        if (this.category[i].ParentCategoryId > 0) {
          var obj = this.category.filter(x => x.Id == this.category[i].ParentCategoryId);
          this.category[i].ParentCat = obj[0].Description;
        }
        else {
          this.category[i].ParentCat = "";
        }
      }
      var response: any = data;
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg))
      }
      // else{
      //   this.show = false;
      //   this.errorMsg = response.msg;
      //   const type = "info";
      //   console.log(toast(this.errorMsg))
      // }
      console.log(this.category)
      // this.category = this.category.filter(x => x.ParentCategoryId!=null)
      this.showloading = false
    });
  }
  active(id, act,) {
    //   if(act="undefined")
    //   {
    //     act=true;
    //   }
    //   this.Id =id;
    // this.isactive =act;
    this.Auth.updateactive(id, act, this.CompanyId).subscribe(data => {
      this.getCategory()
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
    return this.category.sort((a, b) => {
      if (a[this.sortfield] < b[this.sortfield]) return this.x;
      else if (a[this.sortfield] > b[this.sortfield]) return this.y;
      else return 0;
    });
  }


  Delete1(Id) {
    this.Auth.Deletecat(Id).subscribe(data => {
      var response: any = data
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg))

      }
      else {
        this.getCategory();
        this.show = false;
      }

      //  window.location.reload();
      console.log(Id)
    });
  }
  openDetailpopup(contentDetail) {
    const modalRef = this.modalService
      .open(contentDetail, {
        ariaLabelledBy: "modal-basic-title",
        centered: true
      })
      .result.then(
        result => {
          //this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    //var userid = this.userid;
  }
  changefilter(bool) {
    console.log(bool)
    if(bool){
      this.category = this.category.filter(x => !x.isactive);
    } else {
      this.category = this.category.filter(x => x.isactive);
    }
    console.log(this.category.length)
  }

}