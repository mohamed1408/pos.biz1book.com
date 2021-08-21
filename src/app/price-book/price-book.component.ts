import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';
import { ClickOutsideDirective } from 'ng-multiselect-dropdown/click-outside.directive';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-price-book',
  templateUrl: './price-book.component.html',
  styleUrls: ['./price-book.component.css']
})
export class PriceBookComponent implements OnInit {
  StoreId = 69;
  Pricedata: any;
  show = false;
  term;
  p;
  @HostListener('document:click', ['$event']) ClickOutsideDirective($event) {
    var Id = $event.path[0].id
    var element = document.getElementById(Id);
    if (element != null) {
      element.focus();
    }
  }
  constructor(private Auth: AuthService) { }

  ngOnInit() {
    setHeightWidth();
    this.GetPrice();
  }
  GetPrice() {
    this.Auth.GetPrice(this.StoreId).subscribe(data => {
      this.Pricedata = data;
      this.Pricedata.streprd.forEach(element => {
        element.priceE = false;
        element.delpriceE = false;
        element.takpriceE = false;
        element.Changed = false;
      });
      console.log(this.Pricedata);
    })
  }
  SavePrd() {
    var arr = this.Pricedata.streprd.filter(x => x.Changed == true)
    var postdata = { data: JSON.stringify(arr) };
    this.Auth.Updatepricebook(postdata).subscribe(data => { })

  }
  saveOpt() {
    var arr = this.Pricedata.streopt.filter(x => x.Changed == true)
    var postdata = { data: JSON.stringify(arr) };
    this.Auth.Updateoptionbook(postdata).subscribe(data => { })
  }

}
