import { Component, OnInit } from '@angular/core';
import { idbService } from '../service/idb.service';
import { AuthService } from "../auth.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { dangertoast, toast } from 'src/assets/dist/js/toast-data';
declare function setHeightWidth(): any;

@Component({
  selector: 'app-tax-group',
  templateUrl: './tax-group.component.html',
  styleUrls: ['./tax-group.component.css']
})
export class TaxGroupComponent implements OnInit {
  tax:any;
  CompanyId :number;
  errorMsg:string = '';
  status:number;
  StoreId: number;
   p;
   term;
   sortfield: any;
   x: number;
   y: number;
   
   
  constructor(private IDB:idbService,private Auth: AuthService,private modalService: NgbModal) 
  {
    // var userinfo = localStorage.getItem("userinfo");
    // var userinfoObj = JSON.parse(userinfo);
    // console.log(userinfoObj)
    // this.CompanyId = userinfoObj[0].CompanyId;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.StoreId;

  }
taxgroup:any;

  ngOnInit() {
    setHeightWidth();
    this.gettax();
  }
  getdelete(Id)
  {
    this.Auth.DeleteTax(Id).subscribe(data=>{this.gettax();
      var response:any = data
        this.status = 0;
        this.errorMsg = response.msg;
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
    return this.tax.sort((a, b) => {
    if (a[this.sortfield] < b[this.sortfield]) return this.x;
    else if (a[this.sortfield] > b[this.sortfield]) return this.y;
    else return 0;
  });
  }
  
  gettax() 
  {
    console.log(this.CompanyId)
    this.Auth.getTax(this.CompanyId).subscribe(data=>{
      this.tax = data;
      console.log(this.tax);
    //   var response:any = data
    //   if(response.status == 0)
    //   {
    //     this.errorMsg = response.msg;
    //     console.log(dangertoast(this.errorMsg));
        
    //   }
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
