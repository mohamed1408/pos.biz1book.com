import { Component, OnInit } from '@angular/core';
import { idbService } from '../service/idb.service';
import { AuthService } from "../auth.service";
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.css']
})
export class VariantComponent implements OnInit {
  variant:any;
  Auth: any;
  CompanyId =1;
  term;
  p;
  private types: Array<ToastType> = ['success'];
  private text = 'Data Deleted Succesfully';

  constructor(private IDB:idbService, private auth: AuthService,private toaster: Toaster,private modalService: NgbModal) 
  { 
    var userinfo = localStorage.getItem("userinfo");
    var userinfoObj = JSON.parse(userinfo);
    console.log(userinfoObj)
    this.CompanyId = userinfoObj[0].CompanyId;

  }

  ngOnInit() {
    this.getVariant();
  }
  get randomType() {
    return this.types[Math.ceil((Math.random() * 8)) % this.types.length];
  }


  getVariant() 
  {
    this.auth.getVariant(this.CompanyId).subscribe(data=>{
      this.variant = data;
      console.log(this.variant);
    });
  }
  getdelete(Id)
  {
    this.auth.Delete(Id).subscribe(data=>{
      window.location.reload();

      const type = this.randomType;
      this.toaster.open({
        text: this.text,
        caption: type + ' notification',
        type: type,
      });

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