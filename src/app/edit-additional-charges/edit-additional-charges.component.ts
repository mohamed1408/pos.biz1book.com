import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocsService } from "../service/locs.service";
import { AuthService } from "../auth.service";
import { idbService } from "../service/idb.service";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { dangertoast, toast } from 'src/assets/dist/js/toast-data';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-edit-additional-charges',
  templateUrl: './edit-additional-charges.component.html',
  styleUrls: ['./edit-additional-charges.component.css']
})
export class EditAdditionalChargesComponent implements OnInit {
  AddtnId:any;
  AddForm:FormGroup;
  Addtnchrgs:any;
  tax:any;
  CompanyId: number;
  StoreId: number;
  status: number;
  errorMsg: string = '';
  chrgtype: any;
  taxgrp: any;

  constructor(private _fb: FormBuilder ,public router: Router, private _avRoute: ActivatedRoute,private LOCS: LocsService,
    private Auth: AuthService,  private IDB: idbService,public location: Location)
   {
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.AddtnId = Number(this._avRoute.snapshot.params["Id"]);
    this.AddForm = this._fb.group({
      Id:[0],
      Description: ['', [Validators.required]],
      ChargeType: ['', [Validators.required]],
      ChargeValue: ['', [Validators.required]],
      TaxGroupId: ['', [Validators.required]],
      CompanyId: [0, [Validators.required]],
    })
   }

  ngOnInit()
   {
     setHeightWidth();
     this.getTaxGroup();
    console.log(this.AddForm.value);
    this.Auth.EditAddchrgs(this.AddtnId,this.CompanyId).subscribe(data => {
      this.Addtnchrgs = data;
      this.chrgtype = this.Addtnchrgs.ChargeType;
      this.taxgrp = this.Addtnchrgs.TaxGroupId;
      console.log(data);
      this.formArray(this.Addtnchrgs);
  });
  }
  getTaxGroup() {
    this.Auth.getTax(this.CompanyId).subscribe(data => {
      this.tax = data;
      console.log(this.tax);
    });
  }
  formArray(data)
  {
    this.AddForm.setValue({
      Id:data.Id,
      Description: data.Description,
      ChargeType: data.ChargeType,
      ChargeValue:data.ChargeValue,
      TaxGroupId:data.TaxGroupId,
      CompanyId:this.CompanyId,
    });
    
  }
  UpdateAddCharge()  { 
    var data = {data:JSON.stringify(this.AddForm.value)}
    this.Auth.UpdateAddchrgs(data).subscribe(data => {
     this.router.navigate(['addtnchrgs'])
     var response:any = data
     if(response.status == 0)
     {
       this.status = 0;
       this.errorMsg = response.msg;
       console.log(dangertoast(this.errorMsg));
     }
     else{
       this.errorMsg = response.msg;
       const type = "info";
       console.log(toast(this.errorMsg))
       this.router.navigate(['addtnchrgs'])
     }
         });
   
 }
 
}
