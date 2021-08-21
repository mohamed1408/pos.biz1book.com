import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { idbService } from "../service/idb.service";
import { LocsService } from "../service/locs.service";
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
@Component({
  selector: 'app-edit-variant-grp',
  templateUrl: './edit-variant-grp.component.html',
  styleUrls: ['./edit-variant-grp.component.css']
})

export class EditVariantGrpComponent implements OnInit {

  vatId: number;
  varint: any;
  variant: any;
  variantgrp: any;
  varintgrp: any;
  public VrtForm: FormGroup;
  public VatForm: FormGroup;
  delarray:any=[];
  jstring = "{\"categories\":[{\"ref_id\":\"C-123\",\"name\":\"Breads1\",\"description\":\"Remote category åß˙\",\"sort_order\":1,\"active\":true,\"img_url\":\"https://static.giantbomb.com/uploads/scale_small/0/6087/2437349-pikachu.png\"},{\"ref_id\":\"C-124\",\"name\":\"Sliders\",\"description\":\"Another one ˚∫∆˙∫\",\"sort_order\":1,\"active\":true,\"img_url\":\"https://static.giantbomb.com/uploads/scale_small/0/6087/2437349-pikachu.png\",\"parent_ref_id\":\"C-123\"}],\"items\":[{\"ref_id\":\"XX-1225\",\"title\":\"Whole grain\",\"available\":true,\"description\":\"Super healthy\",\"sold_at_store\":true,\"price\":41.0,\"current_stock\":24,\"recommended\":true,\"food_type\":\"2\",\"category_ref_ids\":[\"C-123\"]},{\"ref_id\":\"XX-1226\",\"title\":\"Parsley\",\"description\":\"very taasty\",\"available\":false,\"sold_at_store\":true,\"img_url\":\"http://image.com/media/2017/03/20/B50_500_x_500.png\",\"sort_order\":123,\"price\":145.0,\"current_stock\":1,\"category_ref_ids\":[\"C-124\"]}],\"option_groups\":[{\"ref_id\":\"OG-1234\",\"title\":\"This G-1 group\",\"min_selectable\":1,\"max_selectable\":1,\"active\":true},{\"ref_id\":\"OG-1235\",\"title\":\"This G-2 group\",\"min_selectable\":1,\"max_selectable\":1,\"active\":true}],\"options\":[{\"ref_id\":\"opt-0112233\",\"title\":\"Opt integra 1\",\"description\":\"option through integration\",\"weight\":123,\"available\":true,\"price\":123.23,\"sold_at_store\":true,\"opt_grp_ref_ids\":[\"OG-1234\"],\"nested_opt_grps\":[\"OG-1235\"]},{\"ref_id\":\"opt-0112234\",\"title\":\"Opt integra 2\",\"description\":\"option through integration\",\"weight\":123,\"available\":true,\"price\":123.23,\"sold_at_store\":true,\"opt_grp_ref_ids\":[\"OG-1235\"]}],\"callback_url\":\"https://enp27ugn0clof.x.pipedream.net/\"}";
  json = JSON.parse(this.jstring);
  private formBuilder: FormBuilder;
  // Auth: any;

  constructor(
    private _avRoute: ActivatedRoute,public router: Router,
    private IDB: idbService, private Auth: AuthService, private LOCS: LocsService, private _fb: FormBuilder
  ) {
    this.vatId = Number(this._avRoute.snapshot.params["Id"]);
  //this.formArray();
  }


  ngOnInit() {
    this.VatForm = this._fb.group({
      Id: ['', Validators.required],
      Description: ['', Validators.required],
      Variants: this._fb.array([]),
      del: this._fb.array([]),
    })    
    this.Auth.EditVariant(this.vatId).subscribe(data => {
      this.variantgrp = data;
      this.variantgrp = this.variantgrp[0];
      console.log(this.variantgrp);
      //this.getVariant(this.variantgrp);
      this.formArray(this.variantgrp);
    });
  }



  formArray(data)
  {
    console.log(data)
    let control = <FormArray>this.VatForm.controls.Variants;
    let control1 = <FormGroup>this.VatForm.controls.VariantGroup;
    this.VatForm.setValue({
      Id:data.Id,
      Description: data.VariantGroup,
      Variants: [],
      del:[]
    });
    for(let i=0; i < data.Variants.length; i++)
    {
      control.push(
        this._fb.group({
          id: [data.Variants[i].Id],
          description: [data.Variants[i].Description],
          variantGroupId:[data.Id]
        })
      )
    }
    console.log(this.VatForm.value)
  }
  getVariantGrp() {
    this.Auth.EditVariant(this.vatId).subscribe(data => {
      this.variantgrp = data;
      this.variantgrp = this.variantgrp[0];
      console.log(this.variantgrp)
    });
  }

  getformArray() 
  { 
   console.log(this.VatForm.value)
   var data = {data:JSON.stringify(this.VatForm.value)}
   this.Auth.formArray(data).subscribe(data => {
    this.router.navigate(['variant'])
   });
  }
  addVar() 
  {
      let control = <FormArray>this.VatForm.controls.Variants;
    control.push(
      this._fb.group({
        id: [0],
        description: [''],
        variantGroupId:[this.vatId]
      })
    )
    console.log(this.VatForm.value)
  }

deleteVariant(i) {
  let control = <FormArray>this.VatForm.controls.Variants;
  let control1 = <FormArray>this.VatForm.controls.del;
  // this.delarray.push(control.value[i].id)
  control1.push(
    this._fb.group({
      id: control.value[i].id
    })
  )
  control.removeAt(i)
  console.log(this.VatForm.value.del)
}
// deleteVariant(i) {
//   console.log(this.myForm.value)
//   let control = <FormArray>this.myForm.controls.arr;
//   control.removeAt(i)
//   this.addonArray1.splice(i,1)

// }

}
