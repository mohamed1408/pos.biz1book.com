import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { Router } from '@angular/router';
declare function setHeightWidth(): any;
declare function mintos(): any;

@Component({
  selector: 'app-editvariant',
  templateUrl: './editvariant.component.html',
  styleUrls: ['./editvariant.component.css']
})
export class EditvariantComponent implements OnInit {
  private formBuilder: FormBuilder;
  public model: any;
  public VatForm: FormGroup;
  submitted = false;
  private types: Array<ToastType> = ['success'];
  private text = 'Data Saved Succesfully';

  constructor(public http: HttpClient, private Auth: AuthService, private _fb: FormBuilder, private toaster: Toaster, public router:Router) {
    this.VatForm = this._fb.group({
      description: ['', [Validators.required]],
      Variants: this._fb.array([this._fb.group({ description: '' })])
    })
  }

  ngOnInit() {
    setHeightWidth();
    console.log(this.VatForm.value)
  }

  addVariant() {
    this.submitted = true;
    if (this.VatForm.invalid) {
      return;
    }

    console.log(this.VatForm.value)
    var data = { data: JSON.stringify(this.VatForm.value) }
    this.Auth.addvariant(data).subscribe(data => {
      this.router.navigate(['variant'])
      const type = this.randomType;
      this.toaster.open({
        text: this.text,
        caption: type + ' notification',
        type: type,
      });
    });
  }

  get randomType() {
    return this.types[Math.ceil((Math.random() * 8)) % this.types.length];
  }

  get variantPoints() {
    return this.VatForm.get('Variants') as FormArray;
  }
  get f() {
    return this.VatForm.controls;
  }

  addVar() {
    console.log(this.VatForm.value)
    this.variantPoints.push(this._fb.group({ description: '' }));
  }

  deleteVariant(index) {

    this.variantPoints.removeAt(index);
    console.log(this.VatForm.value)
  }


}
