import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocsService } from "../service/locs.service";
import { AuthService } from "../auth.service";
import { idbService } from "../service/idb.service";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toast,dangertoast } from 'src/assets/dist/js/toast-data';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-discount-rules',
  templateUrl: './discount-rules.component.html',
  styleUrls: ['./discount-rules.component.css']
})
export class DiscountRulesComponent implements OnInit {
  discountRule:any;
  CompanyId :number;
  StoreId: number;
  errorMsg:string = '';
  status: number;
  term;
  p;
  sortfield: any;
  x: number;
  y: number;

  constructor(private Auth: AuthService,private modalService: NgbModal)
  {
    // var userinfo = localStorage.getItem("userinfo");
    // var userinfoObj = JSON.parse(userinfo);
    // console.log(userinfoObj)
    // this.CompanyId = userinfoObj[0].CompanyId;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;

   }

  ngOnInit() {
    setHeightWidth();
    this.getDiscount();
  }
  getDiscount() 
  {
    this.Auth.getDiscount(this.CompanyId).subscribe(data=>{
      this.discountRule = data;
      console.log(this.discountRule);
      var response:any = data
      if(response.status == 0)
      {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
        
      }
    });
  }
  getdelete(Id)
  {
    this.Auth.DeleteDisc(Id).subscribe(data =>{
      var response:any = data;
      if(response.status == 0)
      {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg))

      }
      else{
        this.getDiscount();
        this.errorMsg = response.msg;
        const type = "info";
        console.log(toast(this.errorMsg))
    }
  });
  
  }
  sortsettings(field) {
    if(this.sortfield == field) {
      this.x = this.x*-1;
      this.y = this.y*-1;
    } else {
      this.sortfield = field;
      this.x = -1;
      this.y = 1;
    }
  }

  get sortData() {
    return this.discountRule.sort((a, b) => {
    if (a[this.sortfield] < b[this.sortfield]) return this.x;
    else if (a[this.sortfield] > b[this.sortfield]) return this.y;
    else return 0;
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