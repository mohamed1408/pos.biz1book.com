import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { toast,dangertoast } from "../../assets/dist/js/toast-data"
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-option-groups',
  templateUrl: './option-groups.component.html',
  styleUrls: ['./option-groups.component.css']
})
export class OptionGroupsComponent implements OnInit {
  optiondata:any;
  CompanyId :number;
  StoreId: number;
  status: number;
  errorMsg: string = '';
term;
p;
sortfield: any;
x: number;
y: number;
Id =0;
showloading = true;
isactive :boolean;


  constructor(private Auth:AuthService,private modalService: NgbModal)
   { 
    // var userinfo = localStorage.getItem("userinfo");
    // var userinfoObj = JSON.parse(userinfo);
    // console.log(userinfoObj)
    // this.CompanyId = userinfoObj[0].CompanyId;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;

  }

  ngOnInit() 
  {
    setHeightWidth();
    this.GetOptions();
  }
  GetOptions() 
  {
    this.Auth.getOption(this.CompanyId).subscribe(data=>{
      this.optiondata = data;
      console.log(this.optiondata);
      this.showloading = false
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

  active(id,act)
  {
  //   if(act="undefined")
  //   {
  //     act=true;
  //   }
  //   this.Id =id;
  // this.isactive =act;
  this.Auth.optactive(id,act).subscribe(data => {
    this.GetOptions();
  });
  }

  get sortData() {
    return this.optiondata.sort((a, b) => {
    if (a[this.sortfield] < b[this.sortfield]) return this.x;
    else if (a[this.sortfield] > b[this.sortfield]) return this.y;
    else return 0;
  });
  }


  Delete(Id)
  {
    this.Auth.DeleteOption(Id).subscribe(data=>{
      var response: any = data;
      if(response.status == 0)
      {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg))
  
      }
      else
      {
        this.GetOptions();
        this.errorMsg = response.msg;
        const type = "info";
        console.log(toast(this.errorMsg))
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
