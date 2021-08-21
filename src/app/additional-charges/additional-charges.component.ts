import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocsService } from "../service/locs.service";
import { AuthService } from "../auth.service";
import { idbService } from "../service/idb.service";
import { Router } from '@angular/router';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toast, dangertoast } from "../../assets/dist/js/toast-data"
declare function setHeightWidth(): any;
@Component({
  selector: 'app-additional-charges',
  templateUrl: './additional-charges.component.html',
  styleUrls: ['./additional-charges.component.css']
})
export class AdditionalChargesComponent implements OnInit {
  Addtnchrgs: any;
  taxgrp: any;
  CompanyId: number;
  private types: Array<ToastType> = ['info'];
  private text = 'Data Deleted Succesfully';
  StoreId: number;
  status: number;
  errorMsg: string = '';
  show: any = false;
  term;
  p;
  addtnchrg: any;
  sortfield: any;
  x: number;
  y: number;

  constructor(private Auth: AuthService, public router: Router, private toaster: Toaster, private modalService: NgbModal) {
    // var userinfo = localStorage.getItem("userinfo");
    // var userinfoObj = JSON.parse(userinfo);
    // console.log(userinfoObj)
    // this.CompanyId = userinfoObj[0].CompanyId;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;

  }

  ngOnInit() {
    setHeightWidth();
    this.getAddtnchrgs();

  }
  getAddtnchrgs() {
    // console.log(this.CompanyId);
    this.Auth.getAddtnchrgs(this.CompanyId).subscribe(data => {
      this.Addtnchrgs = data;
      this.addtnchrg = this.Addtnchrgs.addtncharges;
      console.log(this.addtnchrg);
      for (let i = 0; i < this.Addtnchrgs.addtncharges.length; i++) {
        var obj = this.Addtnchrgs.taxGroup.filter(x => x.Id == this.Addtnchrgs.addtncharges[i].TaxGroupId);
        console.log(obj)
        this.Addtnchrgs.addtncharges[i].taxgroup = obj[0].Description;
      }
      console.log(this.Addtnchrgs.addtncharges)
    });
  }
  get randomType() {
    return this.types[Math.ceil((Math.random() * 8)) % this.types.length];
  }

  sortsettings(field) {
    if(this.sortfield == field) {
      this.x = this.x*-1;
      this.y = this.y*-1;
    } else {
      this.sortfield = field;
      this.x = -1;
      this.y = 1;
    }
  }

  get sortData() {
    return this.addtnchrg.sort((a, b) => {
    if (a[this.sortfield] < b[this.sortfield]) return this.x;
    else if (a[this.sortfield] > b[this.sortfield]) return this.y;
    else return 0;
  });
  }



  getdelete(Id) {
    this.Auth.DeleteAddchrgs(Id).subscribe(data => {
      this.getAddtnchrgs();
      // window.location.reload();
      // const type = this.randomType;
      // this.toaster.open({
      //   text: this.text,
      //   caption: type + ' notification',
      //   type: type,
      // });
      var response: any = data;
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg))

      }
      else {
        this.getAddtnchrgs();
        this.show = false;
        this.errorMsg = response.msg;
        const type = "info";
        console.log(toast(this.errorMsg))
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

}