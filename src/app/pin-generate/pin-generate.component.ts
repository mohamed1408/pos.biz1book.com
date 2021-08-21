import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from "../auth.service";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { userInfo } from 'os';
import { element } from 'protractor';
import { Router } from "@angular/router";
import { idbService } from "../service/idb.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare function setHeightWidth(): any;
@Component({
  selector: 'app-pin-generate',
  templateUrl: './pin-generate.component.html',
  styleUrls: ['./pin-generate.component.css']
})
export class PinGenerateComponent implements OnInit {
  public PinForm: FormGroup;
  alert_msg = "";
  showHead: true;
  showForgot: boolean;
  disabledRP: boolean;
  CompanyId = 0;
  store: any;
  key = 'Name';
  UserStores: any;
  Show = false;
  data: any;
  storeInfo: any;
  StoreId: any;
  locked = true;
  company;
  company_initial: string = '';
  emailid: string;
  pin: string = '';
  constructor(private Auth: AuthService, private _fb: FormBuilder, private router: Router,
    private IDB: idbService, private modalService: NgbModal, private _snackBar: MatSnackBar, private sanitizer: DomSanitizer) {
    var userinfo = localStorage.getItem("userinfo");
    var userinfoObj = JSON.parse(userinfo);
    this.company = JSON.parse(localStorage.getItem('company'));
    // this.CompanyId = userinfoObj[0].CompanyId;
    // console.log(userinfoObj);
  }

  ngOnInit() {
    localStorage.removeItem("loginInfo");
    var strarray = this.company.Name.split(' ');
    strarray.forEach((element, index) => {
      if (index < 3) this.company_initial += element.charAt(0).toUpperCase();
    });
    this.emailid = this.company.emailId
    setHeightWidth();
    this.showForgot = false;
    this.disabledRP = false;
    showHead: false;
    this.PinForm = this._fb.group({
      Description: ['', [Validators.required]],
    })
  }


  Getdetails(popup) {
    var userinfo = localStorage.getItem("userinfo");
    var userinfoObj = JSON.parse(userinfo);
    userinfoObj.forEach(element => {
      var pin = +this.PinForm.value.Description;
      if (pin == element.Pin) {
        localStorage.setItem("loginInfo", JSON.stringify(element));
        localStorage.setItem("issessionvalid", "true");
        if (element.RoleId == 1) {
          this.router.navigate(["/dashboard"]);
        } else {
          this.router.navigate(["/product"]);
        }
      }
      else {
        this.alert_msg = "Invalid Pin"
      }
    });

  }
  openDetailpopup(contentDetail) {
    const modalRef = this.modalService
      .open(contentDetail, {
        ariaLabelledBy: "modal-basic-title",
        centered: true
      })
      .result.then(
        result => {
          //this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    //var userid = this.userid;
  }
  setStoreInfo(item) {
    var object = JSON.parse(item);
    console.log(object);
    this.storeInfo = { StoreId: object.StoreId, OpeningTime: object.OpeningTime, ClosingTime: object.ClosingTime }
    console.log(this.storeInfo)
  }
  getdata(storeId) {
    var loginObj = { companyId: this.data.CompanyId, storeId: this.UserStores[0].StoreId, Role: this.data.Role, Name: this.data.Name }
    localStorage.setItem("loginInfo", JSON.stringify(loginObj));
    // var storetime ={StoreId:this.UserStores[0].StoreId,OpeningTime:this.UserStores[0].OpeningTime,ClosingTime:this.UserStores[0].ClosingTime}
    localStorage.setItem("StoreInfo", JSON.stringify(this.storeInfo));
    this.router.navigate(["/dashboard"]);
  }
  @ViewChild('invalidpin', { static: false }) public invalidpin: TemplateRef<any>;
  @ViewChild('servererror', { static: false }) public servererror: TemplateRef<any>;
  @ViewChild('usererror', { static: false }) public usererror: TemplateRef<any>;
  usererrormsg: string = '';
  unlock() {
    if (this.pin == '') {
      this.usererrormsg = "Pin Shouldn't be empty";
      this._snackBar.openFromTemplate(this.usererror, {
        duration: 1000,
        panelClass: ['border', 'border-danger']
      })
      return
    }
    if (!(/^\d+$/.test(this.pin))) {
      this.usererrormsg = "Pin can contain only numbers";
      this._snackBar.openFromTemplate(this.usererror, {
        duration: 1000,
        panelClass: ['border', 'border-danger']
      })
      return
    }
    this.Auth.unlock(+this.pin, this.company.Id).subscribe(data => {
      if (data["status"] == 200) {
        var decodedToken = this.decodejwt(data["token"]);
        var logininfo = { "Id": +decodedToken.userid, "Name": decodedToken.user, "RoleId": +decodedToken.roleid, "Role": decodedToken.role, "CompanyId": this.company.Id };
        localStorage.setItem('loginInfo', JSON.stringify(logininfo));
        localStorage.setItem('jwt', data["token"]);
        if (logininfo.RoleId == 1) {
          this.router.navigate(["/dashboard"]);
        } else {
          this.router.navigate(["/product"]);
        }
      } else if (data["status"] == 0) {
        this._snackBar.openFromTemplate(this.invalidpin, {
          duration: 1000,
          panelClass: ['border', 'border-danger']
        })
      } else if (data["status"] == -1) {
        this._snackBar.openFromTemplate(this.servererror, {
          duration: 1000,
          panelClass: ['border', 'border-orange']
        })
      }
    })
  }
  logout() {
    localStorage.removeItem("jwt");
    this.router.navigate([""]);
  }
  decodejwt(jwt) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(jwt);
    return decodedToken;
  }

}    
