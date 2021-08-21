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
  selector: 'app-edit-tax',
  templateUrl: './edit-tax.component.html',
  styleUrls: ['./edit-tax.component.css']
})
export class EditTaxComponent implements OnInit {
  TaxForm: FormGroup;
  submitted = false;
  taxId: number;
  taxgp:any;
  CompanyId: number;
  StoreId: number;
  errorMsg:string = '';
  constructor(private _fb: FormBuilder ,public router: Router, private _avRoute: ActivatedRoute,
    private LOCS: LocsService,private Auth: AuthService,  private IDB: idbService,public location:Location,private el: ElementRef) 
  { 
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;

    this.taxId = Number(this._avRoute.snapshot.params["Id"]);
    console.log(this.taxId);
   
  }

  ngOnInit() {
   setHeightWidth(); 
    
  this.TaxForm = this._fb.group({
    IsInclusive:[false],
    Id:[0],
    Description: ['', [Validators.required]],
    Tax1: [0, [Validators.required]],
    Tax2: [0, [Validators.required]],
    Tax3: [0, [Validators.required]],
    CompanyId: [this.CompanyId, [Validators.required]],
  })
  this.Auth.EditTaxGrp(this.taxId).subscribe(data => {
    this.taxgp = data;
    console.log(this.taxgp);
    this.formArray(this.taxgp);
    var response:any = data
    if(response.status == 0)
    {
      this.errorMsg = response.msg;
      console.log(dangertoast(this.errorMsg));
      
    }

});
  }
  saveTaxGroup() 
  { 
    this.submitted = true;
    if (this.TaxForm.invalid) {
      return;
    }

   var data = {data:JSON.stringify(this.TaxForm.value)}
   this.Auth.UpdateTax(data).subscribe(data => {
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
formArray(data)
{
  this.TaxForm.setValue({
    IsInclusive:data.IsInclusive,
    Id:data.Id,
    Description: data.Description,
    Tax1: data.Tax1,
    Tax2:data.Tax2,
    Tax3:data.Tax3,
    CompanyId:this.CompanyId,
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
  return this.TaxForm.controls;
}

}
