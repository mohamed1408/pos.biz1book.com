import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { idbService } from "../service/idb.service";
import { LocsService } from "../service/locs.service";
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-edit-optiongroup',
  templateUrl: './edit-optiongroup.component.html',
  styleUrls: ['./edit-optiongroup.component.css']
})
export class EditOptiongroupComponent implements OnInit {
  OptId: number;
  public OptionForm: FormGroup;
  optiongrp:any;
  CompanyId: number;
  StoreId: number;
  controls:any;
  constructor(
    private _avRoute: ActivatedRoute,public router: Router,
    private IDB: idbService, private Auth: AuthService, private LOCS: LocsService, private _fb: FormBuilder
  ) {
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;

    this.OptId = Number(this._avRoute.snapshot.params["Id"]);
  }

  ngOnInit()
   {
     setHeightWidth();
    this.OptionForm = this._fb.group({
      Id: ['', Validators.required],
      Name: ['', Validators.required],
      Options: this._fb.array([]),
      del: this._fb.array([]),
      CompanyId: [this.CompanyId, Validators.required],

    })    
    // this.Auth.EditOption(this.OptId).subscribe(data => {
    //   this.optiongrp = data;
    //   this.optiongrp = this.optiongrp[0];
    //   console.log(this.optiongrp);
    //   this.formArray(this.optiongrp);
    // });

  }
  formArray(data)
  {
    console.log(data)
    let control = <FormArray>this.OptionForm.controls.Options;
    let control1 = <FormGroup>this.OptionForm.controls.OptionGroup;
    this.OptionForm.setValue({
      Id:data.Id,
      Name: data.OptionGroup,
      Options: [],
      del:[],
      CompanyId:this.CompanyId
    });
    for(let i=0; i < data.Options.length; i++)
    {
      control.push(
        this._fb.group({
          id: [data.Options[i].Id],
          Name: [data.Options[i].Name],
          optionGroupId:[data.Id]
        })
      )
    }
    console.log(this.OptionForm.value)
  }
  Update() 
  { 
   console.log(this.OptionForm.value)
   var data = {data:JSON.stringify(this.OptionForm.value)}
  //  this.Auth.Updateoption(data).subscribe(data => {
  //   this.router.navigate(['options'])
  //  });
  }

  addVar() 
  {
      let control = <FormArray>this.OptionForm.controls.Options;
    control.push(
      this._fb.group({
        id: [0],
        Name: [''],
       OptionGroupId:[this.OptId]
      })
    )
    console.log(this.OptionForm.value)
  }

  deleteVariant(i) {
    let control = <FormArray>this.OptionForm.controls.Options;
    let control1 = <FormArray>this.OptionForm.controls.del;
    control1.push(
      this._fb.group({
        id: control.value[i].id
      })
    )
    control.removeAt(i)
    console.log(this.OptionForm.value.del)
  }
  

}
