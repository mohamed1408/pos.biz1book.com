import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toast,dangertoast } from "../../assets/dist/js/toast-data"
declare function setHeightWidth(): any;
@Component({
  selector: 'app-kotgroup',
  templateUrl: './kotgroup.component.html',
  styleUrls: ['./kotgroup.component.css']
})
export class KOTGroupComponent implements OnInit {
  CompanyId :number;
  kotgrp:any;
  show:any = false;
  errorMsg:string = '';
  status:number;
  StoreId: number;
term;
p;
  constructor(private Auth: AuthService,private toaster: Toaster,private modalService: NgbModal) {
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;
   }
  private types: Array<ToastType> = ['danger'];
  private text = 'Data Saved Succesfully';

  ngOnInit()
   {
     setHeightWidth();
    this.getKOTGroup();
  }
  getKOTGroup() 
  {
    this.Auth.getkotgrp(this.CompanyId).subscribe(data=>{
      this.kotgrp = data;
      var response:any = data
      if(response.status == 0)
      {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
      }
    });
  }
  get randomType() {
    return this.types[Math.ceil((Math.random() * 8)) % this.types.length];
  }

  getkotdelete(Id)
  {
    this.Auth.Deletekotgrp(Id).subscribe(data=>{this.getKOTGroup();   
      var response:any = data
      if(response.status == 0)
      {
        this.status = 0;
        this.errorMsg = response.msg;
      }
      else{
        this.getKOTGroup();
        this.show = false;
        this.errorMsg = response.msg;
        const type = "info";
      }

    });
  
  }

  openDetailpopup(contentdetail)
  {
    const modalRef = this.modalService
    .open(contentdetail, {
      ariaLabelledBy: "modal-basic-title",
      centered: true
    })
    .result.then(
      result => {
      },
      reason => {
      }
    );
  
  } 
  

}
