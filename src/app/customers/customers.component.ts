import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import * as moment from "moment";
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toast,dangertoast } from "../../assets/dist/js/toast-data"
declare function setHeightWidth(): any;
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  Customer:any;
  CompanyId :number;
  status: number;
  errorMsg: any;
  show:any = false;
  StoreId: number;
term;
p;
  cust: any;
  constructor(private Auth: AuthService,private modalService: NgbModal,private toaster: Toaster) 
  { 
    // var userinfo = localStorage.getItem("userinfo");
    // var userinfoObj = JSON.parse(userinfo);
    // console.log(userinfoObj)
    // this.CompanyId = userinfoObj[0].CompanyId;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.StoreId;
    
  }
  private types: Array<ToastType> = ['danger'];

  ngOnInit()
   {
     setHeightWidth();
    this.getCustomer();
  }
  getCustomer() 
  {
    this.Auth.getCustomers(this.CompanyId).subscribe(data=>{
      this.Customer = data;
      this.cust = this.Customer.Order;
      console.log(this.Customer);
      for(let i =0; i < this.Customer.Order.length; i++)
      {
        this.Customer.Order[i].LastSeen = moment(this.Customer.Order[i].LastSeen).format('LLL');
      } 
      var response:any = data
      if(response.status == 0)
      {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
        
      } 
      else{
        this.show = false;
        // this.errorMsg = response.msg;
        // const type = "info";
        // console.log(toast(this.errorMsg))
     }
    });
  }

  getcusdelete(Id)
  {
    this.Auth.Deletecustomer(Id).subscribe(data=>{ 
      var response:any = data
      if(response.status == 0)
      {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg))

      }
      else{
        this.getCustomer();
        this.show = false;
        this.errorMsg = response.msg;
        const type = "info";
        console.log(toast(this.errorMsg))
    
      }
   
      // window.location.reload();
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
