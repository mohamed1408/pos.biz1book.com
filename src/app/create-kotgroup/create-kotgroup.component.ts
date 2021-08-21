import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
declare function setHeightWidth(): any;
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth.service";
import { Alert } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { Location } from '@angular/common';
import { dangertoast, toast } from 'src/assets/dist/js/toast-data';

@Component({
  selector: 'app-create-kotgroup',
  templateUrl: './create-kotgroup.component.html',
  styleUrls: ['./create-kotgroup.component.css']
})
export class CreateKOTGroupComponent implements OnInit {
  public KOTForm: FormGroup;
  KOTId: any;
  kotgrp: any;
  submitted = false;
  private types: Array<ToastType> = ['success'];
  private text = 'Data Saved Succesfully';
  CompanyId: number;
  status: number;
  errorMsg:string = '';
  show:any = false;
term;
p;
onSubmit;
  constructor(public http: HttpClient, private Auth: AuthService, private _fb: FormBuilder,
     public router: Router, private _avRoute: ActivatedRoute,private toaster: Toaster,public location:Location) {
      var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
      this.CompanyId = logInfo.CompanyId;
  
    this.KOTId = Number(this._avRoute.snapshot.params["Id"]);
    this.KOTForm = this._fb.group({
      Id: [0],
      Description: ['', [Validators.required]],
      CompanyId: [this.CompanyId, [Validators.required]]
    })
  }

  ngOnInit() {
    setHeightWidth();
    this.KOTForm = this._fb.group({
      Id: [0],
      Description: ['', Validators.required],
      CompanyId: [this.CompanyId, Validators.required]
    })
    console.log(this.KOTForm.value);
    this.Auth.Editkotgp(this.KOTId).subscribe(data => {
      this.kotgrp = data;
      console.log(data);
      this.formArray(this.kotgrp);
      var response:any = data
      if(response.status == 0)
      {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
        
      }
    });

  }

  get f() {
    return this.KOTForm.controls;
  }


  get randomType() {
    return this.types[Math.ceil((Math.random() * 8)) % this.types.length];
  }

  saveKot()
   {
   this.submitted = true;
    if (this.KOTForm.invalid) {
      return;
    }
    if (this.KOTForm.value.Id == 0) 
    {
      var data = { data: JSON.stringify(this.KOTForm.value) }
      this.Auth.addkotgrp(data).subscribe(data => {
        this.router.navigate(['kotgroup'])
        var response:any = data
        if(response.status == 0)
        {
          this.status = 0;
          this.errorMsg = response.msg;
          console.log(dangertoast(this.errorMsg));
        }
        else{
          this.show = false;
          this.errorMsg = response.msg;
          const type = "info";
          console.log(toast(this.errorMsg))
  
        }
      });
    }
    else {
      var data = { data: JSON.stringify(this.KOTForm.value) }
      this.Auth.UpdateKot(data).subscribe(data => {        
        this.router.navigate(['kotgroup'])
        var response:any = data
        if(response.status == 0)
        {
          this.status = 0;
          this.errorMsg = response.msg;
          console.log(dangertoast(this.errorMsg));
          
        }
        else{
          this.show = false;
          this.errorMsg = response.msg;
          const type = "info";
          console.log(toast(this.errorMsg))
        }
      });
    }
  }
  formArray(data) {
    console.log(data)
    this.KOTForm.setValue({
      Id: data.Id,
      Description: data.Description,
      CompanyId: this.CompanyId
    });
  }


}
