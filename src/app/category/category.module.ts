import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
// @Injectable()
// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })

export class CategoryModule {
  Id: number;
  Description: string;
  ParentCategoryId: number;
  FreeQtyPercentage: number;
  MinimumQty: number;
  IsUPCategory: boolean;
  Variants: Array<VariantModule>;
  Addons: Array<AddonModule>;
  options: Array<OptionModule>;
  Delete: Array<any>;
  CompanyId: number
  isactive: boolean;
  constructor(catObj: any) {
    this.Id = catObj.id;
    this.Description = catObj.Description;
    this.ParentCategoryId = catObj.ParentId;
    this.MinimumQty = catObj.MinimumQty;
    this.FreeQtyPercentage = catObj.FreeQtyPercentage;
    this.IsUPCategory = catObj.IsUPCategory;
    this.isactive = catObj.isactive;
  }
}
export class VariantModule {
  Id: number;
  Description: string;
  VariantId: number;
  VariantGroupId: number;
  constructor() {

  }
}
export class AddonModule {
  Id: number;
  Description: string;
  AddonId: number;
  AddonGroupId: number;
  constructor() {

  }
}
export class OptionModule {
  Id: number;
  constructor() {

  }
}
