import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { toast, dangertoast } from "../../assets/dist/js/toast-data"

declare function setHeightWidth(): any;
@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {
  prefdata:any;
  CompanyId =1;
  kotgenerate: any;
  custno: any;
  freeqty:any;
  status: number;
  errorMsg:string = '';
  constructor(private Auth:AuthService)
   { 
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
  
  }

  ngOnInit()
   {
     setHeightWidth();
     this.Getdata();
  }
  saveData()
  {
    console.log(this.prefdata)
  var postdata = { data: JSON.stringify(this.prefdata) };
  this.Auth.savePrefer(postdata).subscribe(data =>
   { this.Getdata(); 
    var response:any = data;
    if(response.status == 0)
    {
      this.status = 0;
      this.errorMsg = response.msg;
      console.log(dangertoast(this.errorMsg));
    }
  // this.kotgenerate = this.prefdata.KOTGenerate;
  // this.custno = this.prefdata.EnforceCustomerNo;
  // this.freeqty = this.prefdata.FreeQuantity;
  });
  
  }
  Getdata() 
  {
    this.Auth.getprefdata(this.CompanyId).subscribe(data=>{
      this.prefdata =data[0];
      console.log(this.prefdata)
    })
  }
}
