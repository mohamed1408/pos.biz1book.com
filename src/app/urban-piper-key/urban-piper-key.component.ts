import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { jsonpFactory } from '@angular/http/src/http_module';
import { toast,dangertoast } from "../../assets/dist/js/toast-data"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-urban-piper-key',
  templateUrl: './urban-piper-key.component.html',
  styleUrls: ['./urban-piper-key.component.css']
})
export class UrbanPiperKeyComponent implements OnInit {
  urban:any;
  CompanyId =0;
  errorMsg:string = '';
  private types: Array<ToastType> = ['success'];
  private text = 'Data Saved Succesfully';
  toaster: any;
  status:number;

  constructor(private Auth:AuthService,private modalService: NgbModal)
   {
    var userinfo = localStorage.getItem("userinfo");
    var userinfoObj = JSON.parse(userinfo);
    console.log(userinfoObj)
    this.CompanyId = userinfoObj[0].CompanyId;
    }

  ngOnInit() 
  {
    setHeightWidth();
this.GetUrban();
  }
GetUrban()
{
  this.Auth.GetUrban(this.CompanyId).subscribe(data=>{
    this.urban =data[0];
  })
}
get randomType() {
  return this.types[Math.ceil((Math.random() * 8)) % this.types.length];
}
get f() {
  return this.urban.controls;
}

updateurban()
{
  var postdata ={objdata:JSON.stringify(this.urban)};
  this.Auth.updatepiper(postdata).subscribe(data =>{
    var response:any = data
    console.log(response);
    
    if(response.state == "success")
    {
      this.errorMsg = response.msg;
      console.log(toast(this.errorMsg))
    }
})
}

}
