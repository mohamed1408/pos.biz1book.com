import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { idbService } from "../service/idb.service";
import { Observable } from "rxjs";
// import { debounceTime, map } from "rxjs/operators";
import { startWith, map, debounceTime } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from "../auth.service";
// import { AutoselectService } from "../autoselect.service";
import { HttpClient } from "@angular/common/http";
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { toast, dangertoast } from "../../assets/dist/js/toast-data"
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare function setHeightWidth(): any;
declare function mintos(): any;

@Component({
  selector: 'app-create-customers',
  templateUrl: './create-customers.component.html',
  styleUrls: ['./create-customers.component.css']
})
export class CreateCustomersComponent implements OnInit {
  CustomerForm:FormGroup;
  cusId:number;
  cusData:any;
  submitted:any;
  private types: Array<ToastType> = ['success'];
  private text = 'Data Saved Succesfully';
  CompanyId: number;
  status: number;
  errorMsg:string = '';
  show:any = false;

  constructor(private fb: FormBuilder, private IDB: idbService,private Auth: AuthService,
    public router:Router, private _avRoute: ActivatedRoute,private toaster: Toaster,public location: Location)
  {
    this.cusId = Number(this._avRoute.snapshot.params["Id"]);
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
}

  ngOnInit() {
    setHeightWidth();
    this.CustomerForm = this.fb.group({
      Id:0,
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      PhoneNo: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      City: ['', [Validators.required]],
      PostalCode: ['', [Validators.required]],
      StoreId:['',[Validators.required]],
      CompanyId: [this.CompanyId, [Validators.required]]
    })
    console.log(this.CustomerForm.value);
    this.Auth.EditCustomers(this.cusId,this.CompanyId).subscribe(data => {
      this.cusData = data;
      console.log(data);
      this.formArray(this.cusData);
      var response:any = data;
      if(response.status == 0)
      {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
      }
  });
  }
  formArray(data)
  {
    this.CustomerForm.setValue({
      Id:data.Id,
      Name: data.Name,
      Email: data.Email,
      PhoneNo:data.PhoneNo,
      Address:data.Address,
      City:data.City,
      PostalCode:data.PostalCode,
      CompanyId:this.CompanyId,
      StoreId:data.StoreId,

    });
  }
  get f() {
    return this.CustomerForm.controls;
  }
  get randomType() {
    return this.types[Math.ceil((Math.random() * 8)) % this.types.length];
  }

  Savecustomer()
  {
    console.log(this.CustomerForm.value)
    this.submitted = true;
    // if (this.CustomerForm.invalid) {
    //   return;
    // }
    if (this.CustomerForm.value.Id == 0)
     {
     var data = {data:JSON.stringify(this.CustomerForm.value)}
     this.Auth.addcustomers(data).subscribe(data => {
       this.router.navigate(['customer'])
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
    else
    {
      var data = { data: JSON.stringify(this.CustomerForm.value) }
      this.Auth.UpdateCustomer(data).subscribe(data => {
        this.router.navigate(['customer'])
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
}
