import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
declare function setHeightWidth(): any;
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth.service";
import { Alert } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { Location } from '@angular/common';
import { dangertoast, toast } from 'src/assets/dist/js/toast-data';
import { Directive, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {
  DiscForm: FormGroup;
  submitted = false;
  private types: Array<ToastType> = ['success'];
  private text = 'Data Saved Succesfully';
  StoreId: number;
  CompanyId: number;
  status: number;
  errorMsg: string = '';
  show: any = false;
  
  constructor(public http: HttpClient, private Auth: AuthService, private _fb: FormBuilder,
    public router: Router, private toaster: Toaster, public location: Location, private el: ElementRef) {
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;

  }

  ngOnInit() {
    this.DiscForm = this._fb.group({
      CouponCode: ['', [Validators.required]],
      StartDate: [''],
      EndDate: [''],
      DiscountType: [0, [Validators.required, Validators.min(1)]],
      DiscountValue: [0, [Validators.required, Validators.min(1)]],
      MiniOrderValue: [0, [Validators.required, Validators.min(1)]],
      MaxDiscountAmount: [0, [Validators.required, Validators.min(1)]],
      CompanyId: [this.CompanyId, [Validators.required]],
      // StoreId: [this.StoreId, [Validators.required]],
    })
  }
  // get f() {
  //   return this.DiscForm.controls;
  // }
  // get randomType() {
  //   return this.types[Math.ceil((Math.random() * 8)) % this.types.length];
  // }
  get f() {
    return this.DiscForm.controls;
  }

  addDiscRule() {
    this.submitted = true;
    if (this.DiscForm.invalid) {
      this.focus();
      return;
    }
    var data = { data: JSON.stringify(this.DiscForm.value) }
    this.Auth.addDiscount(data).subscribe(data => {
      this.router.navigate(['discountrule'])
      var response: any = data
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
      }
      else {
        this.show = false;
        this.errorMsg = response.msg;
        const type = "info";
        console.log(toast(this.errorMsg))

      }

    });
  }
  focus() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
    if (invalidElements.length > 0) {
      // console.log(invalidElements[1]);

      invalidElements[1].focus();
    }

  }

}
