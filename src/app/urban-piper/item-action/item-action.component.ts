import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UrbanPipeService } from 'src/app/service/urban-pipe.service';
import { toast, dangertoast } from "../../../assets/dist/js/toast-data"
import { element } from 'protractor';
import { Location } from '@angular/common'
import { from } from 'rxjs';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-item-action',
  templateUrl: './item-action.component.html',
  styleUrls: ['./item-action.component.css']
})
export class ItemActionComponent implements OnInit {
  data: any;
  cat: any;
  CompanyId = 0;
  StoreId: any;
  term;
  p;
  productType = [
    { Id: 1, Name: "Veg" },
    { Id: 2, Name: "Non-Veg" }
  ]
  OptionPrice = [];
  ProductPrice = [];
  op_loading: boolean = false;
  pd_loading: boolean = false;
  sync_loading: boolean = false;
  catObj: { ref_id: any; name: any; description: string; sort_order: number; active: boolean; translations: []; };
  itemObj: { ref_id: string; title: string; available: boolean; sort_order: number; description: string; price: number; external_price: number; current_stock: number; recommended: boolean; food_type: number; category_ref_ids: any[]; fulfillment_modes: any[]; img_url: string; tags: object, included_platforms: any, translations: object[] };
  Option_groups: { ref_id: any; title: string; min_selectable: number; max_selectable: number; active: true; item_ref_ids: any; }
  response: any;
  responsecode: any;
  actionresponse: Object;
  stores: any;
  BrandId: any;
  Products = [];
  Data;;
  searchterm;
  LocationName = '';
  // tax: { ref_id: any; title: string; description: string; active: boolean; }
  // data = { categories: [], items: [], callback_url: "https://biz1pos.azurewebsites.net/api/Values/write" }
  // categ: { ref_id: any; name: any; description: any; sort_order: number; active: boolean; img_url: any; };
  // item: { ref_id: any; title: any; description: any; available: boolean; sold_at_store: boolean; price: any; current_stock: number; recommended: boolean; category_ref_ids: any; food_type: any };
  constructor(private Auth: AuthService, private _avRoute: ActivatedRoute, private modalService: NgbModal,
    private ups: UrbanPipeService, public location: Location) {
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = Number(this._avRoute.snapshot.params["Id"].split('-')[0]);
    this.BrandId = Number(this._avRoute.snapshot.params["Id"].split('-')[1]);
    this.BrandId = (this.BrandId) ? this.BrandId : null;
    console.log(this.StoreId, this.BrandId);
  }


  ngOnInit() {
    setHeightWidth();
    this.GetProd();
    // this.dropcat();
    let element = document.getElementById("itemstab") as HTMLElement
    element.click();
    this.GetUPStores();
  }

  GetProd() {
    this.Auth.Getitem(this.StoreId, this.CompanyId, this.BrandId).subscribe(data => {
      this.data = data;
      console.log(this.data);
      this.data.Products.forEach(element => {
        element.selected = false;
        console.log(element.IsEnabled)
        // element.UPPrice =false;
      });
      this.Products = this.data.Products
      this.cat = this.data.Categories.filter(x => x.ParentCategoryId != null)
      this.data.Charges.forEach(element => {
        element.selected = false;
      });
      this.Data = this.data.Categories.filter(x => x.ParentCategoryId == null && x.IsUPCategory == true);
      this.Data.forEach(element => {
        element.show = true
        element.subcategories = this.data.Categories.filter(x => x.ParentCategoryId == element.Id);
        element.subcategories.forEach(subcat => {
          subcat.products = this.data.Products.filter(x => x.CategoryId == subcat.Id);
          subcat.show = true
        });
      });
      console.log(this.Data)
      this.cat = this.data.Categories.filter(x => x.ParentCategoryId != null)
      this.data.Charges.forEach(element => {
        element.selected = false;
      });
    });
  }
  GetUPStores() {
    this.Auth.urbandata(this.CompanyId).subscribe(data => {
      this.stores = data;
      console.log(this.stores, this.BrandId)
      console.log(this.stores.filter(x => x.StoreId == this.StoreId && x.BrandId == this.BrandId))
      this.LocationName = this.stores.filter(x => x.StoreId == this.StoreId && x.BrandId == this.BrandId)[0].LocationName;
    });
  }
  select(check) {
    if (check) {
      this.data.Products.forEach(element => {
        element.selected = true;
      });
    }
    else {
      this.data.Products.forEach(element => {
        element.selected = false;
      });
    }
  }
  selectCharge(check) {
    if (check) {
      this.data.Charges.forEach(element => {
        element.selected = true;
      });
    }
    else {
      this.data.Charges.forEach(element => {
        element.selected = false;
      });
    }
  }
  UpdateProdPrice() {
    if (this.ProductPrice.length > 0) {
      this.pd_loading = true;
      this.Auth.UpdateProductUPPrice({ ProductData: JSON.stringify(this.ProductPrice) }).subscribe(data => {
        var response: any = data;
        this.GetProd();
        this.ProductPrice = [];
        this.pd_loading = false;
        (response.status == 200) ? toast(response.msg) : dangertoast(response.msg);
      });
    } else {
      alert("No product price changed");
    }
  }
  UpdateOptionPrice() {
    if (this.OptionPrice.length > 0) {
      this.op_loading = true;
      this.Auth.UpdateOptionUPPrice({ OptionData: JSON.stringify(this.OptionPrice) }).subscribe(data => {
        var response: any = data;
        this.GetProd();
        this.OptionPrice = [];
        this.op_loading = false;
        (response.status == 200) ? toast(response.msg) : dangertoast(response.msg);
      });
    } else {
      alert("No option price is changed");
    }
  }
  optionGroup() {
    var array = [];
    var optionGroups = [];
    var obj = { ref_id: "", title: "", min_selectable: 0, max_selectable: 0, active: true, item_ref_ids: [] };
    // this.data.OptionGroups.forEach(element => {
    //   if (this.data.Products.some(x => x.ProductId === element.ProductId)) {
    //     obj = { ref_id: element.OptionGroupId.toString(), title: element.Name, min_selectable: element.MinimumSelectable, max_selectable: element.MaximumSelectable, active: true, item_ref_ids: [element.ProductId.toString()] };
    //     array.push(obj);
    //   }
    // });
    this.data.OptionGroups.forEach(element => {
      if (!array.some(x => x.ref_id === element.OptionGroupId.toString())) {
        obj = { ref_id: element.OptionGroupId.toString(), title: element.Name, min_selectable: element.MinimumSelectable, max_selectable: element.MaximumSelectable, active: true, item_ref_ids: [] };
        array.push(obj);
      }
      if (this.data.Products.some(x => x.ProductId === element.ProductId)) {
        array.filter(x => x.ref_id == element.OptionGroupId.toString())[0].item_ref_ids.push(element.ProductId.toString())
      }
    });
    array.forEach(element => {
      if (element.item_ref_ids.length > 0) {
        optionGroups.push(element);
      }
    });
    return optionGroups;
  }
  option() {
    var options = [];
    console.log(this.data.Options);
    var obj = { ref_id: "", title: "", description: "", Weight: 0, available: true, price: 0, food_type: 1, sold_at_store: true, opt_grp_ref_ids: [] };
    this.data.Options.forEach(element => {
      if (this.optionGroup().some(x => x.ref_id === element.OptionGroupId.toString())) {
        obj = { ref_id: element.OptionId.toString(), title: element.Name, description: "", Weight: 0, food_type: 1, sold_at_store: true, available: true, price: element.UPPrice, opt_grp_ref_ids: [element.OptionGroupId.toString()] };
        options.push(obj);
      }
    });
    return options;
  }
  // Charges()
  // {
  //   var charges =[];
  //   var obj =
  //   this.data.Charges.forEach(element => {
  //     obj ={ref_id:element.Id.toString(),title:element.Description,description:"",active: true,
  //     structure: { type: "percentage", applicable_on: "item.quantity", value: "" },}
  //   });
  // }
  tax() {
    var taxes = [];
    this.data.TaxGroups.forEach(element => {
      var products = this.data.Products.filter(x => x.TaxGroupId == element.Id);
      if (products.length > 0) {
        var prodIds = [];
        products.forEach(element => {
          prodIds.push(element.ProductId.toString());
        });
        var obj1 = {
          code: "CGST_P", title: "CGST", description: element.Tax1 + "% CGST on all items", active: true,
          structure: { value: element.Tax1 },
          item_ref_ids: prodIds
        }
        var obj2 = {
          code: "SGST_P", title: "SGST", description: element.Tax2 + "% CGST on all items", active: true,
          structure: { value: element.Tax2 },
          item_ref_ids: prodIds
        }
        if (obj2.structure.value > 0) {
          taxes.push(obj2);
        }
        if (obj1.structure.value > 0) {
          taxes.push(obj1);
        }
      }
    });
    return taxes;
  }
  // syncHighlight() {
  //   // var catObj = {ref_id:"",name:"",description:"",sort_order:1,active:true}
  //   var category = [];
  //   var items = [];
  //   // var optiongp = [];
  //   this.data.Products.forEach(element => {
  //     if (!element.IsSynced) {
  //       if (!category.some(x => x.ref_id === element.CategoryId)) {
  //         this.catObj = { ref_id: element.CategoryId, name: element.Category, description: element.Category + "is a good category", sort_order: 1, active: true };
  //         category.push(this.catObj);
  //       }
  //       this.itemObj = { ref_id: element.ProductId, title: element.Description, available: true, description: element.Description + " is healthy", price: element.UPPrice, current_stock: -1, recommended: true, food_type: element.ProductTypeId, category_ref_ids: [element.CategoryId.toString()] };
  //       items.push(this.itemObj);
  //     }
  //   });
  //   var data = { categories: category, items: items, option_groups: this.optionGroup(), options: this.option(), taxes: this.tax(), charges: this.charge() };
  //   console.log(data);
  //   this.Auth.catalogue({ catalogue: JSON.stringify(data) }, this.StoreId).subscribe(data => {
  //     alert(JSON.stringify(data));
  //   });
  // }
  charge() {
    var charges = [];
    this.data.Charges.forEach(element => {
      var obj = {
        ref_id: this.StoreId + '-' + (element.Description.match(/\b(\w)/g)).join('') + '-' + 1,
        title: element.Description,
        description: element.Description,
        active: true,
        structure: {
          type: 'fixed',
          applicable_on: "item.quantity",
          value: element.ChargeValue
        },
        fulfillment_modes: ['delivery', 'pickup'],
        excluded_platforms: [],
        item_ref_ids: []
      }
      this.data.Products.forEach(element => {
        obj.item_ref_ids.push(element.ProductId);
      });
      charges.push(obj);
    });
    return charges;
  }
  syncCharge() {
    this.data.Charges.foreach(element => {
    });
  }
  selectval() {
    if (this.data.Products.some(x => x.selected == true)) {
      return true;
    } else {
      return false;
    }
  }
  includedplatforms() {
    var platforms = [];
    var obj = this.stores.filter(x => x.StoreId == this.StoreId)[0];
    for (var o in obj) {
      if (obj[o] == true && !o.includes('Is')) {
        platforms.push(o.toLowerCase());
      }
    }
    return platforms;
  }

  charges() {
    return {
      "code": "PC_P",
      "title": "Packaging Charge",
      "description": "Fixed Packing Charge per Item Quantity",
      "active": true,
      "structure": {
        "applicable_on": "item.quantity",
        "value": 5.0
      },
      "fulfillment_modes": [
        "delivery"
      ],
      "excluded_platforms": ["zomato"],
      "item_ref_ids": [
        "all"
      ],
      // "location_ref_ids": [
      //   "all"
      // ],
      // "clear_items": false,
      // "clear_locations": false
    }
  }

  sync() {
    var category = [];
    var items = [];
    // var optiongp = [];
    this.sync_loading = true;
    this.data.Products.forEach(element => {
      console.log("hi")
      if (element.IsEnabled) {
        if (!category.some(x => x.ref_id === element.CategoryId.toString())) {
          var subcategory = this.data.Categories.filter(x => x.Id == element.CategoryId)[0];
          var parentcategory = this.data.Categories.filter(x => x.Id == subcategory.ParentCategoryId)[0];
          var catObj = { ref_id: element.CategoryId.toString(), name: element.Category.replace('**', ''), description: element.Category.replace('**', ''), sort_order: element.CategorySortOrder, active: true, translations: [], parent_ref_id: (subcategory.ParentCategoryId != null) ? subcategory.ParentCategoryId.toString() : null };
          if (subcategory.ParentCategoryId != null) {
            var parentcatobj = { ref_id: parentcategory.Id.toString(), name: parentcategory.Description.replace('**', ''), description: parentcategory.Description.replace('**', ''), sort_order: element.CategorySortOrder, active: true, translations: [] };
            if (!category.some(x => x.ref_id === parentcatobj.ref_id)) {
              category.push(parentcatobj);
            }
          }
          category.push(catObj);
        }
        this.itemObj = { ref_id: element.ProductId, title: element.Name.replace('**', ''), available: element.Available, sort_order: element.SortOrder, description: element.Description, price: element.UPPrice, external_price: element.UPPrice, current_stock: -1, recommended: element.Recommended, food_type: element.ProductTypeId, category_ref_ids: [element.CategoryId.toString()], fulfillment_modes: ["pickup", "delivery"], img_url: element.ImgUrl, tags: {}, included_platforms: this.includedplatforms(), translations: [] };
        if (this.itemObj.img_url == null || this.itemObj.img_url == '') {
          delete this.itemObj['img_url'];
        }
        items.push(this.itemObj);
      }
    });
    var data = {
      categories: category,
      flush_items: true, items: items,
      flush_option_groups: true,
      option_groups: this.optionGroup(),
      flush_options: true,
      options: this.option(),
      taxes: this.tax(),
      charges: [this.charges()]
    };

    console.log(JSON.stringify(data));
    // return;
    this.Auth.catalogue({ catalogue: JSON.stringify(data) }, this.StoreId, this.BrandId).subscribe(data => {
      // alert(JSON.stringify(data));
      var response: any = data;
      this.sync_loading = false;
      var button = document.createElement('button');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#message');
      button.hidden = true;
      document.body.appendChild(button);
      button.click();
      this.response = response.message;
      this.responsecode = response.StatusCode;
    });
  }
  stockData() {
    var items = [];
    if (!this.data.Products.some(x => x.selected === true && x.UProductId > 0)) {
      var button = document.createElement('button');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#error');
      button.hidden = true;
      document.body.appendChild(button);
      button.click();
      return;
    }
    this.data.Products.forEach(element => {
      if (element.selected == true && element.UProductId > 0) {
        items.push(element.ProductId);
      }
    });
    var data = {
      location_ref_id: this.BrandId ? this.BrandId + '-' + this.StoreId : this.StoreId.toString(),
      item_ref_ids: items,
      action: ""
    }
    return data;
  }
  enable_disable(action) {
    var data = { action: action, products: [] };
    if (!this.data.Products.some(x => x.selected === true)) {
      var button = document.createElement('button');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#error');
      button.hidden = true;
      document.body.appendChild(button);
      button.click();
      return;
    }
    this.data.Products.forEach(element => {
      if (element.selected == true) {
        data.products.push(element.Id);
      }
    });
    this.Auth.storeitemaction({ pddata: JSON.stringify(data) }, this.BrandId).subscribe(data => {
      this.GetProd();
    });
  }
  outStock() {
    var data = this.stockData();
    data.action = "disable"
    console.log(data);
    this.Auth.items({ stock: JSON.stringify(data) }).subscribe(data => {
      var button = document.createElement('button');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#actionresponse');
      button.hidden = true;
      document.body.appendChild(button);
      button.click();
      this.actionresponse = data['message'];
      this.GetProd();
    });
  }
  inStock() {
    var data = this.stockData();
    data.action = "enable"
    console.log(data);
    this.Auth.items({ stock: JSON.stringify(data) }).subscribe(data => {
      var button = document.createElement('button');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#actionresponse');
      button.hidden = true;
      document.body.appendChild(button);
      button.click();
      this.actionresponse = data['message'];
      this.GetProd();
    });
  }
  openDetailpopup(contentDetail) {
    const modalRef = this.modalService
      .open(contentDetail, {
        ariaLabelledBy: "modal-basic-title",
        centered: true
      })
      .result.then(
        result => {
          //this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    //var userid = this.userid;
  }
  OptionArray(Id, Price) {
    this.OptionPrice.push({ Id: Id, Price });
  }
  ProductArray(Id, Price) {
    this.ProductPrice.push({ Id: Id, Price })
  }
  toggle(category) {
    console.log(category)
    if (category.show) {
      category.show = false;
    } else {
      category.show = true;
    }
  }
  toggleSubcat(category) {
    console.log(category)
    if (category.show) {
      category.show = false;
    } else {
      category.show = true;
    }
  }
  Headselect(value, catId) {
    this.Data.filter(x => x.Id == catId)[0].subcategories.forEach(element => {
      element.selected = value;
      this.selectdeselect(value, element.Id);
    });
  }
  selectdeselect(value, catId) {
    console.log(value, catId, this.Products.filter(x => x.CategoryId == catId))
    this.Products.filter(x => x.CategoryId == catId).forEach(x => x.selected = value)
  }
  getproducts(categoryId) {
    var obj = [];
    if (this.Products.length > 0) {
      obj = this.Products.filter(x => x.CategoryId == categoryId)
    }
    return obj;
  }

}
