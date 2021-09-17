import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Directive, HostListener, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { userInfo } from 'os';
import { dangertoast, toast } from 'src/assets/dist/js/toast-data';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  userdata: any;
  submitted = false;
  CompForm: FormGroup;
  CompanyId: number;
  resetData: Object;
  StoreId: number;
  comp: any;
  errormsg = "";
  account: any;
  name: any;
  errorMsg: string = '';
  address: any;
  city: any;
  state: any;
  country: any;
  postalcode: any;
  name1: any;
  email: any;
  phno: any;
  pin: any;
  userinfo: any;
  constructor(private Auth: AuthService, private _fb: FormBuilder, private el: ElementRef) {
    this.userinfo = JSON.parse(localStorage.getItem("userinfo")) || [];

    // this.CompanyId = userinfoObj[0].CompanyId;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;

  }

  ngOnInit() {
    setHeightWidth();
    this.Getdetails();
  }
  Getdetails() {
    this.Auth.getUserdata(this.CompanyId).subscribe(data => {
      this.userdata = data;
      console.log(this.userdata);
    });
  }
  checkpi() {
    this.userinfo.forEach(element => {
      if (this.userdata.user.Pin == element.Pin) {
        this.errormsg = "Pin Already Taken"
        return;
      }
    });
  }
  saveData() {
    this.submitted = true;
    var pinchk = false
    this.errormsg = ""
    this.userinfo.forEach(element => {
      if (this.userdata.user.Pin == element.Pin && element.Id != this.userdata.user.Id) {
        this.errormsg = "Pin Already Taken"
        pinchk = true;
        return;
      }
    });
    if (pinchk) {
      return
    }
    console.log(this.userdata);
    var postdata = { objData: JSON.stringify(this.userdata) };
    console.log(postdata);
    this.Auth.saveCompany(postdata).subscribe(data => {
      this.userinfo.filter(x => x.Id == this.userdata.user.Id)[0].Pin = this.userdata.user.Pin;
      localStorage.setItem("userinfo", JSON.stringify(this.userinfo))
      var response: any = data
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }
      else {
        this.errorMsg = response.msg;
        console.log(toast(this.errorMsg));

      }

    });


  }
  focus() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
    if (invalidElements.length > 0) {
      console.log(invalidElements[1]);

      invalidElements[1].focus();
    }

  }

}
