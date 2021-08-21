import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { AuthService } from "../auth.service";
import { ActivatedRoute } from '@angular/router';
import { LocsService } from "../service/locs.service";

import { idbService } from "../service/idb.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-addon',
  templateUrl: './edit-addon.component.html',
  styleUrls: ['./edit-addon.component.css']
})
export class EditAddonComponent implements OnInit {
  myForm: FormGroup;
  arr: FormArray;
  vatId: number;
  prodDesc: any;
  keyword = 'Description';
  addonArray: any = [];
  addonArray1: any = [];
  product: any;
  constructor(
    private _avRoute: ActivatedRoute, public router: Router,
    private IDB: idbService, private Auth: AuthService, private LOCS: LocsService, private _fb: FormBuilder
  ) {
    this.vatId = Number(this._avRoute.snapshot.params["Id"]);
    console.log(this.vatId)
  }

  // ngOnInit() {
  //   this.myForm = this.fb.group({
  //     description:['', [Validators.required]], 
  //     arr: this.fb.array([this.createItem()])
  //   })
  // }
  ngOnInit() {
    this.myForm = this._fb.group({
      Id: ['', Validators.required],
      Description: ['', Validators.required],
      arr: this._fb.array([]),
      del: this._fb.array([]),
    })

    this.formArray();
  }
  addItem() {
    this.addonArray1.push({Description:'e.Id'});
  }

  formArray() {

    this.Auth.EditAddOn(this.vatId).subscribe(data => {
      this.prodDesc = data;
      this.product = this.prodDesc.Product;
      console.log(this.prodDesc);
      let control = <FormArray>this.myForm.controls.arr;
      let control1 = <FormGroup>this.myForm.controls.VariantGroup;
      this.myForm.setValue({
        Id: this.prodDesc.addonGroups.Id,
        Description: this.prodDesc.addonGroups.Description,
        arr: [],
        del:[]
      });
      for (let i = 0; i < this.prodDesc.Addon.length; i++) {
       // alert(4)

        // this.addonArray.push({Description:"sdfsdf"})
        control.push(
          this._fb.group({
            // id: this.prodDesc.Addon[i].Id,

            id: this.prodDesc.Addon[i].Id,
            productId: this.prodDesc.Addon[i].Product.Id,
            description: this.prodDesc.Addon[i].Product.Description,
            AddonGroupId: this.prodDesc.addonGroups.Id
          })
        )
      }
      for (let i = 0; i < this.prodDesc.Addon.length; i++) {
        this.addonArray1.push({Description:this.prodDesc.Addon[i].Product.Description});
      }
      console.log(this.myForm.value)
    });
  }
  
  createItem() {
    return this._fb.group({
      //description: [''],
      id: [0],
      productId: [0],
      description: [''],
      AddonGroupId: this.prodDesc.addonGroups.Id
    })
  }

  // addItem() {
  //   this.arr = this.myForm.get('arr') as FormArray;
  //   this.arr.push(this.createItem());
  //   console.log(this.myForm.value)
  // }
  deleteaddon(i) {
    console.log(this.myForm.value)
    let control = <FormArray>this.myForm.controls.arr;
    let control1 = <FormArray>this.myForm.controls.del;
  // this.delarray.push(control.value[i].id)
  control1.push(
    this._fb.group({
      id: control.value[i].id
    })
  )
    control.removeAt(i)
    this.addonArray1.splice(i,1)

  }


  getformAddon() {
    // alert(52)
    console.log(this.myForm.value)
    var data = { data: JSON.stringify(this.myForm.value) }
    this.Auth.UpdateAddon(data).subscribe(data => {
      this.router.navigate(['addon'])
    });
  }
  selectEvent(e,i) {
    let control = <FormArray>this.myForm.controls.arr;
    if(i < control.length)
    {
      var id = control.value[i].id
      control.removeAt(i);
      control.insert(i,  this._fb.group({
        id:id,
        productId: [e.Id],
        description: [e.Description],
        AddonGroupId: this.prodDesc.addonGroups.Id
      }))
      console.log(control.value)
    }
    else{
    control.insert(i,  this._fb.group({
      id:0,
      productId: [e.Id],
      description: [e.Description],
      AddonGroupId: this.prodDesc.addonGroups.Id
    }))

    }
  }

  

}
