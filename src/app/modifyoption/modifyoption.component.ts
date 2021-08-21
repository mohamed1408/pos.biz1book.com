import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { toast, dangertoast } from 'src/assets/dist/js/toast-data';
import { Location } from '@angular/common';
import { Directive, HostListener, ElementRef } from '@angular/core';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-modifyoption',
  templateUrl: './modifyoption.component.html',
  styleUrls: ['./modifyoption.component.css']
})
export class ModifyoptionComponent implements OnInit {
  public OptionForm: FormGroup;
  OptId: any;
  prefdata: any;
  CompanyId: number;
  optiongrp: any;
  errorMsg: string = '';
  status: number;

  OptionGroup = { Id: 0, Name: "", OptionGroupType: 1, Description: '', Options: [{ Id: 0, Name: "", Description: "", Price: 0, SortOrder: -1, OptionGroupId: 0, CompanyId: this.CompanyId }], CompanyId: this.CompanyId, MinimumSelectable: 1, MaximumSelectable: 1, Del: [{ Id: 0 }] };
  OptionGroupType = [{ Id: 1, Name: "Variant" }, { Id: 2, Name: "Addon" }];
  constructor(public http: HttpClient, private Auth: AuthService, private _fb: FormBuilder, private toaster: Toaster,
    public router: Router, private _avRoute: ActivatedRoute, public location: Location, private el: ElementRef) {
    this.OptId = Number(this._avRoute.snapshot.params["Id"]);
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    console.log(this.CompanyId)
    this.OptionGroup = { Id: 0, Name: "", OptionGroupType: 1, Description: '', Options: [{ Id: 0, Name: "", Description: "", Price: 0, SortOrder: -1, OptionGroupId: this.OptionGroup.Id, CompanyId: this.CompanyId }], CompanyId: this.CompanyId, MinimumSelectable: 1, MaximumSelectable: 1, Del: [{ Id: 0 }] };
  }

  ngOnInit() {
    setHeightWidth();
    console.log(this.OptId)
    if (this.OptId > 0) {
      this.Auth.EditOption(this.OptId).subscribe(data => {
        this.optiongrp = data[0];
        console.log(this.optiongrp)
        this.OptionGroup.Name = this.optiongrp.OptionGroup;
        this.OptionGroup.Id = this.optiongrp.Id;
        this.OptionGroup.Description = this.optiongrp.Description;
        this.OptionGroup.MinimumSelectable = this.optiongrp.MinimumSelectable;
        this.OptionGroup.MaximumSelectable = this.optiongrp.MaximumSelectable;
        this.OptionGroup.Options = [];
        this.OptionGroup.Del = [];
        this.OptionGroup.OptionGroupType = this.optiongrp.OptionGroupType;
        this.optiongrp.Options.forEach(element => {
          var obj = { Id: element.Id, Name: element.Name, Description: element.Description, Price: element.Price, OptionGroupId: this.OptionGroup.Id, SortOrder: element.SortOrder, CompanyId: this.CompanyId };
          this.OptionGroup.Options.push(obj);
        });
      });
    }
  }
  saveOption() {
    if (this.OptionGroup.OptionGroupType == 1) {
      this.OptionGroup.MinimumSelectable = 1;
      this.OptionGroup.MaximumSelectable = 1;
    } else if (this.OptionGroup.OptionGroupType == 2) {
      this.OptionGroup.MinimumSelectable = 0;
      this.OptionGroup.MaximumSelectable = -1;
    }
      console.log(this.OptionGroup)
    if (this.OptionGroup.Id == 0) {
      var data = { data: JSON.stringify(this.OptionGroup) }
      this.Auth.saveoption(data).subscribe(data => {
        this.router.navigate(['options'])
        var response: any = data;
        if (response.status == 0) {
          this.status = 0;
          this.errorMsg = response.msg;
          console.log(dangertoast(this.errorMsg))
        }
        else {
          this.errorMsg = response.msg;
          const type = "info";
          console.log(toast(this.errorMsg))
        }
      });
    }
    else {
      var data = { data: JSON.stringify(this.OptionGroup) }
      this.Auth.Updateoption(data).subscribe(data => {
        this.router.navigate(['options'])
        var response: any = data
        if (response.status == 0) {
          this.status = 0;
          this.errorMsg = response.msg;
          console.log(dangertoast(this.errorMsg));
        }
        else {
          this.errorMsg = response.msg;
          const type = "info";
          console.log(toast(this.errorMsg))
          this.router.navigate(['options'])
        }
      });
    }
  }
  addOption() {
    this.OptionGroup.Options.push({ Id: 0, Name: "", Description: "", Price: 0, SortOrder: -1, OptionGroupId: this.OptionGroup.Id, CompanyId: this.CompanyId });
  }
  deleteOption(index) {
    var id = this.OptionGroup.Options[index].Id;
    this.OptionGroup.Del.push({ Id: id })
    this.OptionGroup.Options.splice(index, 1);
  }
  focus() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
    if (invalidElements.length > 0) {
      console.log(invalidElements[1]);

      invalidElements[1].focus();
    }

  }
  // get optionPoints() {
  //   return this.OptionForm.get('Options') as FormArray;
  // }
  // get f() {
  //   return this.OptionForm.controls;
  // }

}
