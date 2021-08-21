import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocsService } from "../service/locs.service";
import { AuthService } from "../auth.service";
import { idbService } from "../service/idb.service";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { dangertoast, toast } from 'src/assets/dist/js/toast-data';
import { Directive, HostListener, ElementRef } from '@angular/core';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.css']
})
export class EditDiscountComponent implements OnInit {
  submitted= false;
  DiscId: number;
  DiscForm: FormGroup;
  Disctrule: any;
  StoreId: number;
  CompanyId: number;
  errorMsg: string = '';
  status: number;
  show: any = false;
  discounttype: any;
  constructor(private _fb: FormBuilder, public router: Router, private _avRoute: ActivatedRoute,
    private LOCS: LocsService, private Auth: AuthService, private IDB: idbService, public location: Location,private el: ElementRef) {
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.DiscId = Number(this._avRoute.snapshot.params["Id"]);
    this.DiscForm = this._fb.group({
      Id: [0],
      CouponCode: ['', [Validators.required]],
      StartDate:['',],
      EndDate:['',],
      DiscountType: ['', [Validators.required]],
      DiscountValue: [0, [Validators.required,Validators.min(1)]],
      MiniOrderValue: [0, [Validators.required,Validators.min(1)]],
      MaxDiscountAmount: [0, [Validators.required,Validators.min(1)]],
      CompanyId: [this.CompanyId, [Validators.required]]
    })
  }

  ngOnInit() {
setHeightWidth();
    console.log(this.DiscForm.value);
    this.Auth.EditDiscRule(this.DiscId).subscribe(data => {
      this.Disctrule = data;
      this.discounttype = this.Disctrule.DisuntType;
      console.log(data);
      this.formArray(this.Disctrule);
      var response: any = data
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }
    });
  }

  formArray(data) {
    this.DiscForm.setValue({
      Id: data.Id,
      CouponCode: data.CouponCode,
      StartDate:data.StartDate,
      EndDate:data.EndDate,
      DiscountType: data.DiscountType,
      DiscountValue: data.DiscountValue,
      MiniOrderValue: data.MiniOrderValue,
      MaxDiscountAmount: data.MaxDiscountAmount,
      CompanyId: this.CompanyId,
    });

  }

  saveDiscountRule() {
    this.submitted = true;
    if (this.DiscForm.invalid) {
      this.focus();
      return;
    }
    var data = { data: JSON.stringify(this.DiscForm.value) }
    this.Auth.UpdateDisct(data).subscribe(data => {
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


      //this.onSubmitHandler(data);
    });

  }
  focus() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
    if (invalidElements.length > 0) {
      console.log(invalidElements[1]);

      invalidElements[1].focus();
    }

  }
  get f() {
    return this.DiscForm.controls;
  }


}
