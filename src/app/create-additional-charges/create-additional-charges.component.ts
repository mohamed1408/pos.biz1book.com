import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { idbService } from "../service/idb.service";
import { Observable } from "rxjs";
// import { debounceTime, map } from "rxjs/operators";
import { startWith, map, debounceTime } from 'rxjs/operators';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

import { AuthService } from "../auth.service";
// import { AutoselectService } from "../autoselect.service";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { toast, dangertoast } from 'src/assets/dist/js/toast-data';
declare function setHeightWidth(): any;
declare function mintos(): any;
@Component({
  selector: 'app-create-additional-charges',
  templateUrl: './create-additional-charges.component.html',
  styleUrls: ['./create-additional-charges.component.css']
})
export class CreateAdditionalChargesComponent implements OnInit {
  tax: any;
  AddForm:FormGroup;
  submitted = false;
  private types: Array<ToastType> = ['success'];
  private text = 'Data Saved Succesfully';
  CompanyId: number;
  StoreId: number;
  show: any = false;
  errorMsg: string = '';
  status: number;

  constructor(private fb: FormBuilder, private IDB: idbService,private Auth: AuthService,private el: ElementRef,
    private toaster: Toaster,public router:Router,public location: Location) {
      var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
      this.CompanyId = logInfo.CompanyId;
      this.StoreId = logInfo.storeId;
  
     }



  ngOnInit() {
    setHeightWidth();
    this.getTaxGroup();
    this.AddForm = this.fb.group({
      Description: ['', [Validators.required]],
      ChargeType: [0, [Validators.required,Validators.min(1)]],
      ChargeValue: [0, [Validators.required,Validators.min(1)]],
      TaxGroupId: [0, [Validators.required,Validators.min(1)]],
      CompanyId: [this.CompanyId, [Validators.required]],
    })
  }
  getTaxGroup() {
    this.Auth.getTax(this.CompanyId).subscribe(data => {
      this.tax = data;
      console.log(this.tax);
      // var response: any = data;
      // if(response.status == 0)
      // {
      //   this.status = 0;
      //   this.errorMsg = response.msg;
      //   console.log(dangertoast(this.errorMsg))
  
      // }
      // else
      // {
        
      //   this.show = false;
      //   this.errorMsg = response.msg;
      //   const type = "info";
      //   console.log(toast(this.errorMsg))
      // }
      });
  }
  get f() {
    return this.AddForm.controls;
  }


  SaveAddCharge() 
  { 
    this.submitted = true;
    if (this.AddForm.invalid) {
      this.focus();
      return;
    }
 console.log(this.AddForm.value);
   var data = {data:JSON.stringify(this.AddForm.value)}
   this.Auth.addChargesave(data).subscribe(data => {
    this.router.navigate(['addtnchrgs'])
    // const type = this.randomType;
    // this.toaster.open({
    //   text: this.text,
    //   caption: type + ' notification',
    //   type: type,
    // });
    var response: any = data;
    if(response.status == 0)
    {
      this.status = 0;
      this.errorMsg = response.msg;
      console.log(dangertoast(this.errorMsg))

    }
    else
    {
      
      this.show = false;
      this.errorMsg = response.msg;
      const type = "info";
      console.log(toast(this.errorMsg))
    }

   });
  }
  UpdateKOT()  { 
    var data = {data:JSON.stringify(this.AddForm.value)}
    this.Auth.UpdateAddchrgs(data).subscribe(data => {
     this.router.navigate(['addtnchrgs'])
    //this.onSubmitHandler(data);
    });
   
 }

 get randomType() {
  return this.types[Math.ceil((Math.random() * 8)) % this.types.length];
}
focus() {
  const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
  if (invalidElements.length > 0) {
    invalidElements[1].focus();
  }
}

}
