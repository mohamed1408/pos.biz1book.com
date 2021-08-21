import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { idbService } from "../service/idb.service";
import { Observable } from "rxjs";
// import { debounceTime, map } from "rxjs/operators";
import { startWith, map, debounceTime } from 'rxjs/operators';

import { AuthService } from "../auth.service";
// import { AutoselectService } from "../autoselect.service";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

declare function setHeightWidth(): any;
declare function mintos(): any;

@Component({
  selector: 'app-create-addon',
  templateUrl: './create-addon.component.html',
  styleUrls: ['./create-addon.component.css']
})
export class CreateAddonComponent implements OnInit {
  name = 'Angular';
  myForm: FormGroup;
  arr: FormArray;
  keyword = 'Product';
  product: any;
  addonArray: any = [''];
  submitted = false;
  private types: Array<ToastType> = ['success'];
  private text = 'Data Saved Succesfully';

  constructor(private fb: FormBuilder, private IDB: idbService, private Auth: AuthService, public router: Router,private toaster: Toaster) { }

  ngOnInit() {
    setHeightWidth();


    this.myForm = this.fb.group({
      description: ['', [Validators.required]],
      arr: this.fb.array([])
    })
    this.getProduct();
  }
  get f() {
    return this.myForm.controls;
  }
  get randomType() {
    return this.types[Math.ceil((Math.random() * 8)) % this.types.length];
  }
  getProduct() {
    console.log(2);
    const Observable = this.IDB.IDBGetStoreObser("Product");
    Observable.subscribe(Data => {
      this.product = Data;
    });
  }
  createItem() {
    return this.fb.group({
      name: [''],
    })
  }
  deleteVariant(i)
   {
    console.log(i);
    let control = <FormArray>this.myForm.controls.arr;
    control.removeAt(i)
    this.addonArray.splice(i,1)
    //control.valueChanges
  }


  addItem() {
    this.addonArray.push('e.Id');

  }

  Submit() {
    this.submitted = true;
    if (this.myForm.invalid) {
      return;
    }
    console.log(this.myForm.value)
    var data = { data: JSON.stringify(this.myForm.value) }
    this.Auth.addProd(data).subscribe(data => {
      this.router.navigate(['addon'])
      const type = this.randomType;
      this.toaster.open({
        text: this.text,
        caption: type + ' notification',
        type: type,
      });
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
  }
  selectEvent(e,i) {
    let control = <FormArray>this.myForm.controls.arr;
    if(i <= control.length)
    {
      control.removeAt(i);
    }
    control.insert(i,  this.fb.group({
      productId: [e.Id],
      description: [e.Product]
    }))
  }
}