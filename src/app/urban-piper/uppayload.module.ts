// import { NgModule, Injectable } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Injectable({
//   providedIn: 'root'
// })

export class CategoryModule {
  ref_id: string;
  name: string;
  description: string;
  sort_order: number;
  active: boolean;
  translations: Array<any>;
  parent_ref_id: string;
  // varGId:number;
  constructor(category: any) {
    this.ref_id = category.Id.toString();
    this.name = category.Description.replace('**', '');
    this.description = category.Description;
    this.sort_order = category.SortOrder;
    this.active = true;
    this.translations = [];
    if (category.ParentCategoryId != null) {
      this.parent_ref_id = category.ParentCategoryId.toString();
    }
  }
}

export class ItemModule {
  ref_id: string;
  title: string;
  available: boolean;
  sort_order: number;
  description: string;
  price: number;
  current_stock: number;
  recommended: boolean;
  food_type: number;
  category_ref_ids: Array<string>;
  tags: object;
  included_platforms: Array<string>;
  translations: Array<any>;
  img_url: string;
  // varGId:number;
  constructor(obj, include_platforms) {
    this.ref_id = obj.Id.toString();
    this.title = obj.Name.replace('**', '');
    this.description = obj.Description;
    this.sort_order = obj.SortOrder;
    this.available = obj.Available;
    this.price = obj.UPPrice;
    this.current_stock = -1;
    this.recommended = obj.Recommended;
    this.food_type = obj.ProductTypeId;
    this.included_platforms = include_platforms;
    this.tags = {};
    this.category_ref_ids = [];
    this.category_ref_ids.push(obj.CategoryId.toString())
    this.translations = [];
    if (obj.ImgUrl != null && obj.ImgUrl != '') {
      this.img_url = obj.ImgUrl;
    }
  }
}

export class OptionGroupModule {
  ref_id: string;
  title: string;
  min_selectable: number;
  max_selectable: number;
  active: boolean;
  item_ref_ids: Array<string>;
  constructor(obj) {
    this.ref_id = obj.OptionGroupId.toString();
    this.title = obj.Name;
    this.min_selectable = obj.MinimumSelectable;
    this.max_selectable = obj.MaximumSelectable;
    this.active = true;
    this.item_ref_ids = [];
  }
}

export class OptionModule {
  ref_id: string;
  title: string;
  description: string;
  Weight: number;
  food_type: number;
  sold_at_store: boolean;
  available: boolean;
  price: number;
  opt_grp_ref_ids: Array<string>;
  constructor(obj) {
    this.ref_id = obj.OptionId.toString();
    this.title = obj.Name;
    this.description = obj.Description;
    this.Weight = 0;
    this.food_type = 1;
    this.sold_at_store = true;
    this.available = true;
    this.price = obj.UPPrice;
    this.opt_grp_ref_ids = [];
    this.opt_grp_ref_ids.push(obj.OptionGroupId.toString())
  }
}

export class TaxModule {
  code: string;
  title: string;
  description: string;
  active: boolean;
  structure: { value: number };
  item_ref_ids: Array<string>;
  constructor(type, value, productarray) {
    this.code = type + '_P';
    this.title = type;
    this.description = value + '% ' + type + ' on all items';
    this.active = true;
    this.structure = { value: value }
    this.item_ref_ids = [];
    productarray.forEach(element => {
      this.item_ref_ids.push(element.Id.toString())
    });
  }
}

export class UppayloadModule {
  categories: Array<CategoryModule>;
  flush_items: boolean;
  items: Array<ItemModule>;
  flush_option_groups: boolean;
  option_groups: Array<OptionGroupModule>;
  flush_options: boolean;
  options: Array<OptionModule>;
  taxes: Array<TaxModule>;
  constructor(categories, products, optiongroups, options, taxes, include_platforms) {
    this.items = [];
    this.categories = [];
    this.option_groups = [];
    this.options = [];
    this.taxes = [];
    this.flush_items = true;
    console.log(categories, products, optiongroups, options, taxes, include_platforms)
    products.forEach(element => {
      if (element.IsEnabled) {
        this.items.push(new ItemModule(element, include_platforms))
      }
    });
    categories.forEach(element => {
      if (products.some(x => x.CategoryId == element.Id && x.IsEnabled == true)) {
        if (element.ParentCategoryId != null && !this.categories.some(x => x.ref_id == element.ParentCategoryId.toString())) {
          this.categories.push(new CategoryModule(categories.filter(x => x.Id == element.ParentCategoryId)[0]))
        }
        this.categories.push(new CategoryModule(element));
      }
    });
    this.flush_option_groups = true;
    optiongroups.forEach(element => {
      if (!this.option_groups.some(x => x.ref_id === element.OptionGroupId.toString())) {
        this.option_groups.push(new OptionGroupModule(element));
      }
      if (products.some(x => x.Id === element.ProductId && x.IsEnabled == true)) {
        this.option_groups.filter(x => x.ref_id == element.OptionGroupId.toString())[0].item_ref_ids.push(element.ProductId.toString())
      }
    });
    this.flush_options = true;
    this.option_groups = this.option_groups.filter(x => x.item_ref_ids.length > 0);
    options.forEach(element => {
      if (this.option_groups.some(x => x.ref_id === element.OptionGroupId.toString())) {
        this.options.push(new OptionModule(element))
      }
    });
    taxes.forEach(element => {
      if(element.Tax1 != 0 && element.Tax2 != 0 && products.some(x => x.TaxGroupId == element.Id && x.IsEnabled == true)) {
        this.taxes.push(new TaxModule("CGST", element.Tax1, products.filter(x => x.TaxGroupId == element.Id && x.IsEnabled == true)))
        this.taxes.push(new TaxModule("SGST", element.Tax2, products.filter(x => x.TaxGroupId == element.Id && x.IsEnabled == true)))
      }
    });
  }
}
