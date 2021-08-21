import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toast,dangertoast } from 'src/assets/dist/js/toast-data';

@Component({
  selector: 'app-dining-area',
  templateUrl: './dining-area.component.html',
  styleUrls: ['./dining-area.component.css']
})
export class DiningAreaComponent implements OnInit {
  dining:any;
  CompanyId =0;
  errorMsg:string = '';
  status: number;
term;
p;
sortfield: any;
x: number;
y: number;

  constructor(private Auth:AuthService,private modalService: NgbModal)
   { 
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;

   }

  ngOnInit() 
  {
    this.getTable();
  }
  getTable()
  {
    this.Auth.getdining(this.CompanyId).subscribe(data=>{
      this.dining =data;
      console.log(this.dining);
    })
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
    return this.dining.sort((a, b) => {
    if (a[this.sortfield] < b[this.sortfield]) return this.x;
    else if (a[this.sortfield] > b[this.sortfield]) return this.y;
    else return 0;
  });
  }
  
  DeleteTable(Id)
  {
    this.Auth.deleteArea(Id).subscribe(data=>{
      var response:any = data;
      if(response.status == 0)
      {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg))

      }
      else
      {
        this.getTable();
        this.errorMsg = response.msg;
        const type = "info";
        console.log(toast(this.errorMsg))
    }
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

