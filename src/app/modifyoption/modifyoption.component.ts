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
  term: any
  p: any
  OptId: any;
  prefdata: any;
  CompanyId: number = 0;
  optiongrp: any;
  errorMsg: string = '';
  status: number;
  unmappedCatId: number = 0
  mappedCatId: number = 0
  category: any = []
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
    this.getOpgMappedProducts()
    this.getCategory()
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
  pipeTrigger: boolean = true
  public toggleSelection(data) {
    data.selected = !data.selected;
  }
  movedblclick(direction, product) {
    product.selected = true
    this.moveSelected(direction)
  }
  public moveSelected(direction) {
    console.log(direction)
    if (direction === 'left') {
      console.log(direction === 'left')
      this.mappedProducts.forEach((item, i) => {
        if (item.selected) {
          console.log(item)
          this.unmappedProducts.push(item);
          this.mappedProducts = this.mappedProducts.filter(x => !x.selected)
          item.selected = false;
        }
      });
    } else if (direction === 'right') {
      console.log(direction === 'right')
      this.unmappedProducts.forEach((item, i) => {
        if (item.selected) {
          console.log(item)
          this.mappedProducts.push(item);
          this.unmappedProducts = this.unmappedProducts.filter(x => !x.selected)
          item.selected = false;
        }
      });
    }
    this.pipeTrigger = !this.pipeTrigger
  }
  public moveAll(direction) {
    if (direction === 'left') {
      this.mappedProducts.forEach(item => item.selected = false)
      this.unmappedProducts = [...this.unmappedProducts, ...this.mappedProducts.filter(x => x.CategoryId == this.mappedCatId || this.mappedCatId == 0)];
      this.mappedProducts = this.mappedCatId == 0 ? [] : this.mappedProducts.filter(x => x.CategoryId != this.mappedCatId);
    } else {
      this.unmappedProducts.forEach(item => item.selected = false)
      this.mappedProducts = [...this.mappedProducts, ...this.unmappedProducts.filter(x => x.CategoryId == this.unmappedCatId || this.unmappedCatId == 0)];
      this.unmappedProducts = this.unmappedCatId == 0 ? [] : this.unmappedProducts.filter(x => x.CategoryId != this.unmappedCatId);
    }
  }
  mappedProducts = []
  unmappedProducts = []
  getOpgMappedProducts() {
    this.Auth.getOpgMappedProducts(this.CompanyId, this.OptId).subscribe(data => {
      this.mappedProducts = data["Products"].filter(x => x.Mapped)
      this.unmappedProducts = data["Products"].filter(x => !x.Mapped)
      console.log(this.mappedProducts, this.unmappedProducts)
    })
  }
  bulksave() {
    let productids = this.mappedProducts.map(x => x.ProductId)
    console.log(productids)
    this.Auth.pogBulkSave(this.OptId, this.CompanyId, productids).subscribe(data => {
      console.log(data)
      this.getOpgMappedProducts()
    })
  }
  // mapped unmapped category
  getCategory() {
    this.Auth.getcat(this.CompanyId).subscribe(data => {
      this.category = data;
      console.log(this.category)
    });
  }
  active(id, act,) {
    this.Auth.updateactive(id, act, this.CompanyId).subscribe(data => {
      this.getCategory()
    });
  }

  // get optionPoints() {
  //   return this.OptionForm.get('Options') as FormArray;
  // }
  // get f() {
  //   return this.OptionForm.controls;
  // }

}
