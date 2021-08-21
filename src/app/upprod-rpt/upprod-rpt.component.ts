import { Component, OnInit, NgModule, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-upprod-rpt',
  templateUrl: './upprod-rpt.component.html',
  styleUrls: ['./upprod-rpt.component.css']
})
export class UPProdRptComponent implements OnInit {
  CompanyId:number;
  product:any;
  show: any = false;
  receipt = [];
  category:any;
  all: string = "All";
categoryId =0;
key = 'Description';
selected: any;
stock:any;
term;
showloading = true;
cat:any;
  constructor( private Auth: AuthService, private modalService: NgbModal)
   {
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;

    }

  ngOnInit() 
  {
 this.Getcategory();
 this.All();
  }

  Submit() 
  {
    console.log(this.categoryId)
    this.Auth.getupprd(this.CompanyId,this.categoryId).subscribe(data => {
      this.product = data;
      console.log(this.product)
      
    })
  }

  All()
  {
    this.Auth.getupprd(this.CompanyId,this.categoryId).subscribe(data => {
      this.product = data;
      console.log(this.product)
      this.showloading = false
      
    })
  }
  selectEvent(e) {
    this.categoryId = e.Id;
  }
 
  Getcategory() {
    this.Auth.getcat(this.CompanyId).subscribe(data => {
      this.category = data;
      this.cat = this.category.filter(x => x.IsUPCategory == 1);
      console.log(this.category)
      var obj = { Id: 0, Description: "All", ParentCategoryId: null }
      this.cat.push(obj);
      console.log(this.cat)

    })
  }


  func(Id)
  {
    var orderitem = this.product.Order.filter(x => x.Id == Id)
    console.log(orderitem)
this.receipt=[];
orderitem.forEach(element => {
  this.stock =element.InStock;
  var str = this.stock; 
   var splitted = str.split("&",100); 
  this.receipt.push(element)
  console.log("splitted"+splitted);
  this.receipt.push(splitted);
 console.log(this.receipt)

});

// var str = this.stock; 
// var splitted = str.split("&", 100); 
// console.log(splitted)

}

func1(Id)
{
  var orderitem = this.product.Order.filter(x => x.Id == Id )
  console.log(orderitem)
  this.receipt=[];
  orderitem.forEach(element => {
    this.stock =element.OutStock;
    var str = this.stock; 
     var splitOut = str.split("&",100); 
    this.receipt.push(element)
    console.log("splitOut"+splitOut);
    this.receipt.push(splitOut);
   console.log(this.receipt)
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
focusAutocomplete() {
  var xPathResult = document.evaluate('//*[@id="maindiv"]/app-root/app-upprod-rpt/div/div/div[2]/div/section/div[1]/div[1]/ng-autocomplete/div/div[1]/input', document, null, null, null);
  var element = null
  if (xPathResult) {
    element = xPathResult.iterateNext();
  }
  element.focus();
}


}
