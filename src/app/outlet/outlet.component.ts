import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toast,dangertoast } from "../../assets/dist/js/toast-data"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
// import { LoaderService } from '../service/loader.service';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.css']
})
export class OutletComponent implements OnInit {
  outlet:any;
  outletId:any;
  CompanyId :number;
  status: number;
  errorMsg: any;
  show:any = false;
  StoreId: number;
  term;
  p;
  sortfield: any;
x: number;
y: number;
Id =0;
isactive :boolean;
showloading = true;


  constructor(private Auth:AuthService,private _avRoute: ActivatedRoute,public router:Router,
    private modalService: NgbModal,private toaster: Toaster) {
    this.outletId = Number(this._avRoute.snapshot.params["Id"]);
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;

    // var userinfo = localStorage.getItem("userinfo");
    // var userinfoObj = JSON.parse(userinfo);
    // console.log(userinfoObj)
    // this.CompanyId = userinfoObj[0].CompanyId;

   }
   private types: Array<ToastType> = ['danger'];

  ngOnInit() 
  {
    // this.loaderService.show();
    setHeightWidth();
this.GetData();
  }
GetData()
{
  this.Auth.GetStoreData1(this.CompanyId).subscribe(data=>{
    this.outlet=data;
    console.log(this.outlet)
    var response:any = data
    if(response.status == 0)
    {
      this.errorMsg = response.msg;
      console.log(dangertoast(this.errorMsg));
      
    }
    // this.loaderService.hide();
    this.showloading =false

  })
}
active(id,act,)
  {
  //   if(act="undefined")
  //   {
  //     act=true;
  //   }
  //   this.Id =id;
  // this.isactive =act;
  this.Auth.storeactive(id,act,).subscribe(data => {
    this.GetData()
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
  return this.outlet.sort((a, b) => {
  if (a[this.sortfield] < b[this.sortfield]) return this.x;
  else if (a[this.sortfield] > b[this.sortfield]) return this.y;
  else return 0;
});
}


DeleteData(Id)
{
  this.Auth.DeleteOutlet(Id).subscribe(data=>{
    var response:any = data
    if(response.status == 0)
    {
      this.status = 0;
      this.errorMsg = response.msg;
      console.log(dangertoast(this.errorMsg))

    }
    else{
      this.GetData();
      this.show = false;
      this.errorMsg = response.msg;
      const type = "info";
      console.log(toast(this.errorMsg))
    }

  })
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
