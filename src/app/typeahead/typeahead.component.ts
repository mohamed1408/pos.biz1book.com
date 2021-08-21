import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer,
  Input
} from "@angular/core";

import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { idbService } from "../service/idb.service";
declare function setHeightWidth(): any;
@Component({
  selector: "app-typeahead",
  templateUrl: "./typeahead.component.html",
  styleUrls: ["./typeahead.component.css"]
})
export class TypeaheadComponent implements OnInit {
  //@Input() SelectedProduct: any;
  product: any;
  AddButtom = 0;
  @ViewChild("Quantity", { static: false }) private QuantityRef: ElementRef;
  constructor(private IDB: idbService, private renderer: Renderer) {}
  ngOnInit() {
    setHeightWidth();
    this.getProduct();
  }
  getProduct() {
    const studentsObservable = this.IDB.IDBGetStoreObser("product");
    studentsObservable.subscribe(Data => {
      this.product = Data;
    });
  }
  selectedItem(item) {
    this.AddButtom = 1;
    this.QuantityRef.nativeElement.focus();
  }
  public model: any;
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term =>
        term === ""
          ? []
          : this.product
              .filter(
                v => v.product.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  formatter = (x: { product: string }) => x.product;
}
