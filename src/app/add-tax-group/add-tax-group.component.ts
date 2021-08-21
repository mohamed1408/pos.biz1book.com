import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
declare function setHeightWidth(): any;
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth.service";
import { Alert } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { Location } from '@angular/common';
import { toast, dangertoast } from 'src/assets/dist/js/toast-data';
import { Directive, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-tax-group',
  templateUrl: './add-tax-group.component.html',
  styleUrls: ['./add-tax-group.component.css']
})
export class AddTaxGroupComponent implements OnInit {
  public TaxForm: FormGroup;
  submitted = false;
  private types: Array<ToastType> = ['info'];
  private text = 'Data Saved Succesfully';
  CompanyId: number;
  StoreId: number;
  errorMsg:string = '';

  constructor(public http: HttpClient,private Auth: AuthService,private _fb: FormBuilder,
    public router:Router,private toaster: Toaster,public location: Location,private el: ElementRef)
   { 
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;

  }

  ngOnInit() {
    setHeightWidth();
    this.TaxForm = this._fb.group({
      IsInclusive:[false],
      Description: ['', [Validators.required]],
      Tax1: [0, [Validators.required]],
      Tax2: [0, [Validators.required]],
      Tax3: [0, [Validators.required]],
      CompanyId: [this.CompanyId, [Validators.required]],
    })
    
  }
  // get f() {
  //   return this.TaxForm.controls;
  // }
  // get randomType() {
  //   return this.types[Math.ceil((Math.random() * 8)) % this.types.length];
  // }


  addTaxGroup() 
  {
    this.submitted = true;
    if (this.TaxForm.invalid) {
      return;
    }
 
   var data = {data:JSON.stringify(this.TaxForm.value)}
   this.Auth.addTaxgrp(data).subscribe(data => {
    this.router.navigate(['taxgroup'])
    var response:any = data
    if(response.status == 0)
    {
      this.errorMsg = response.msg;
      console.log(dangertoast(this.errorMsg));
      
    }
    else{
      this.errorMsg = response.msg;
      console.log(toast(this.errorMsg));
    }
   //this.onSubmitHandler(data);
   });
  }
  focus() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
    if (invalidElements.length > 0) {
      // console.log(invalidElements[1]);

      invalidElements[1].focus();
    }

  }
  get f() {
    return this.TaxForm.controls;
  }


}
