import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-addon',
  templateUrl: './addon.component.html',
  styleUrls: ['./addon.component.css']
})
export class AddonComponent implements OnInit {
  auth: any;
  addons: any;
  CompanyId =1;
  private types: Array<ToastType> = ['info'];
  private text = 'Data Deleted Succesfully';

  constructor(public http: HttpClient, private Auth: AuthService, private _fb: FormBuilder,private toaster: Toaster,private modalService: NgbModal) 
  { 
    var userinfo = localStorage.getItem("userinfo");
    var userinfoObj = JSON.parse(userinfo);
    console.log(userinfoObj)
    this.CompanyId = userinfoObj[0].CompanyId;

  }

  ngOnInit() {
    this.getAddonlist()
  }


  getAddonlist() {
    this.Auth.getAddon(this.CompanyId).subscribe(data => {
      this.addons = data;
      console.log(this.addons);
    });
  }
  get randomType() {
    return this.types[Math.ceil((Math.random() * 8)) % this.types.length];
  }

  getdelete(Id)
  {
    this.Auth.DeleteAddon(Id).subscribe(data=>{
      window.location.reload();
      const type = this.randomType;
      this.toaster.open({
        text: this.text,
        caption: type + ' notification',
        type: type,
      });
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
   
}



