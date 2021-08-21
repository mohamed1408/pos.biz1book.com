import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray ,FormControl} from "@angular/forms";
declare function setHeightWidth(): any;
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth.service";
import { Alert } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { toast, dangertoast } from "../../assets/dist/js/toast-data"

@Component({
  selector: 'app-create-outlet',
  templateUrl: './create-outlet.component.html',
  styleUrls: ['./create-outlet.component.css']
})
export class CreateOutletComponent implements OnInit {
  outletData: any;
  outletId: any;
  public OutletForm: FormGroup;
  CompanyId: number;
  StoreId: number;

  submitted = false;
  status: number;
  errorMsg: string = '';
  isprogress = false;
  constructor(public http: HttpClient, private Auth: AuthService, private _fb: FormBuilder,
    public router: Router, private _avRoute: ActivatedRoute,
     private toaster: Toaster, public location: Location,private formBuilder: FormBuilder) {

    this.outletId = Number(this._avRoute.snapshot.params["Id"]);
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;

  }

  ngOnInit() {
    setHeightWidth();
    this.OutletForm = this._fb.group({
      Id:[0],
      Name: [null, Validators.required],
      Address: [null, [Validators.required]],
      City: [null, Validators.required],
      PostalCode: [null, Validators.required],
      ContactNo: [null, Validators.required],
      Email: [null, Validators.required],
      OpeningTime: [null, Validators.required],
      ClosingTime: [null, Validators.required],
      GSTno: [null, Validators.required],
      CompanyId: [this.CompanyId, [Validators.required]],
      })
    this.Auth.Editoutlet(this.outletId).subscribe(data => {
      this.outletData = data;
      console.log(data);
      if (this.outletData != null) {
        this.EditData(this.outletData);

      }
    });
  }



  get f() { return this.OutletForm.controls }


  AddOutlet() {
    this.submitted = true;
    // if (this.OutletForm.invalid) {
    //   console.log(this.OutletForm.value)
    //   alert(778889999)
    //   return;
    // }
    this.isprogress = true;
    if (this.OutletForm.value.Id == 0) {
      var data = { data: JSON.stringify(this.OutletForm.value) }
      console.log(this.OutletForm.value);
      this.Auth.AddStoreData1(data).subscribe(data => {
        this.router.navigate(['outlet'])
        var response: any = data
        if (response.status == 0) {
          this.status = 0;
          this.errorMsg = response.msg;
          console.log(response)
          console.log(dangertoast(this.errorMsg));
        }
        else {
         // alert("not added")
          this.errorMsg = response.msg;
          const type = "info";
          console.log(toast(this.errorMsg))
        }
      })
    }
    else {
      var data = { data: JSON.stringify(this.OutletForm.value) }
      console.log(this.OutletForm.value);
      this.Auth.Updateoutlet(data).subscribe(data => {
        this.router.navigate(['outlet'])
        var response: any = data
        if (response.status == 0) {
          this.status = 0;
          this.errorMsg = response.msg;
          console.log(dangertoast(this.errorMsg));
        }
        else {
          this.errorMsg = response.msg;
          const type = "info";
          console.log(toast(this.errorMsg))
        }
      });
    }
  }
  // savearea() {
  //   if (this.DiningArea.Id == 0) {
  //     var data = { data: JSON.stringify(this.DiningArea) }
  //     this.Auth.addtable(data).subscribe(data => {
  //       this.router.navigate(['diningarea'])
  //       var response: any = data;
  //       if (response.status == 0) {
  //         this.status = 0;
  //         this.errorMsg = response.msg;
  //         console.log(dangertoast(this.errorMsg))
  //       }
  //       else {

  //         this.errorMsg = response.msg;
  //         const type = "info";
  //         console.log(toast(this.errorMsg))
  //       }
  //     });
  //   }
  //   else {
  //     var data = { data: JSON.stringify(this.DiningArea) }
  //     this.Auth.UpdateTable(data).subscribe(data => {
  //       this.router.navigate(['diningarea'])
  //       var response: any = data
  //       if (response.status == 0) {
  //         this.status = 0;
  //         this.errorMsg = response.msg;
  //         console.log(dangertoast(this.errorMsg));
  //       }
  //       else {
  //         this.errorMsg = response.msg;
  //         const type = "info";
  //         console.log(toast(this.errorMsg))
  //         this.router.navigate(['diningarea'])
  //       }
  //     });
  //   }
  // }


  EditData(data) {
    this.OutletForm.setValue({
      Id: data.Id,
      Name: data.Name,
      Address: data.Address,
      City: data.City,
      PostalCode: data.PostalCode,
      ContactNo: data.ContactNo,
      Email: data.Email,
      OpeningTime: data.OpeningTime,
      ClosingTime: data.ClosingTime,
      CompanyId: this.CompanyId,
      GSTno: data.GSTno
    });
    console.log(this.OutletForm.value);
  }
}
