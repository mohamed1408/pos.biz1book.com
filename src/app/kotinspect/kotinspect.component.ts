import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { NgbDateStruct, NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';


@Component({
  selector: 'app-kotinspect',
  templateUrl: './kotinspect.component.html',
  styleUrls: ['./kotinspect.component.scss']
})
export class KotinspectComponent implements OnInit {
  CompanyId: number = 3;
  StoreId: any;
  MinQty: any;
  RemainingHrs: any;
  Kotinspect: any
  Stores: any
  storeId: number = 0
  smodel = ''
  model: NgbDateStruct
  orderid:any
  kotdetail:any
 
  constructor(private Auth: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
    this.gettime()
    this.getstores()
  }

  getkotinspect() {
    this.Auth.getKotInspect(this.StoreId, this.CompanyId, this.MinQty, this.RemainingHrs).subscribe(data => {
      this.Kotinspect = data["Orders"];
      console.log(this.Kotinspect)  
    })
    this.gettime()
    this.getstores()
  }
  getstores() {
    this.Auth.getStores(this.CompanyId).subscribe(data => {          
      this.Stores = data
       // console.log(data)
    })
  }
  getKotdetail(orderid, modalRef){
    this.Auth.GetKOTInspectdetail(orderid).subscribe(data =>{
      this.kotdetail = data
      console.log(this.kotdetail)
      this.openDetailpopup(modalRef)
    })
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      map(term =>
        term === ''
          ? []
          : this.Stores
            .filter(v => v.Name.toLowerCase().indexOf(term.toLowerCase()) > -1)
            .slice(0, 10),
      ),
    )

  formatter = (x: { Name: string }) => x.Name

  selectedItem(store) {
    console.log(store)
    this.StoreId = store.Id
  }

  gettime() {
    var RemainingHrs = this.RemainingHrs;
    var hours = Math.floor(RemainingHrs / 60);
    var minutes = RemainingHrs % 60;
    var formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
     console.log(formatted);
  }

  openDetailpopup(contentdetail) {
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



