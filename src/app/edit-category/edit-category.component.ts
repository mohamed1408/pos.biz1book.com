import { Component, OnInit } from '@angular/core';
import { idbService } from "../service/idb.service";
import { AuthService } from "../auth.service";
//import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import { CategoryModule } from "../category/category.module";
import { updateLocale } from 'moment';
import { LocsService } from '../service/locs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
import { isNgTemplate } from '@angular/compiler';
import { Location } from '@angular/common';
import { dangertoast, toast } from 'src/assets/dist/js/toast-data';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  category: any;
  categ: any;
  categ1: any;
  catId: number;
  catno: CategoryModule;
  categry: any;
  public catForm: FormGroup;
  private formBuilder: FormBuilder;
  public CatForm: FormGroup;
  parentcategory: any = [];
  varcat: any;
  variants1: any;
  Variants: any = [];
  groupId: number;
  products: any = [];
  category1: CategoryModule;
  addons1: any;
  Addons: any = [];
  AddonGrpId: number;
  tempArray: any = [];
  tempArray2: any = [];
  variantGroup: any = [];
  addonGroup: any = [];
  CompanyId: number;
  options1: any;
  Optiongrp: any = [];
  optgp: any = [];
  options: any = [];
  tempArray3: any = [];
  optionGroup: any = [];
  OptionGrpId: number;
  optgrpId: number;
  opt: any;
  parentcategories: any = [];
  options2: any;
  StoreId: number;
  status: number;
  errorMsg: string = '';
  show: any = false;
  public settings = {};
  selectedItems: any;
  null_value = null;
  constructor(private IDB: idbService, private _fb: FormBuilder, public http: HttpClient, public router: Router, private Auth: AuthService,
    private _avRoute: ActivatedRoute, private LOCS: LocsService, private modalService: NgbModal, public location: Location) {
    this.catId = Number(this._avRoute.snapshot.params["Id"]);

    // var userinfo = localStorage.getItem("userinfo");
    // var userinfoObj = JSON.parse(userinfo);
    // console.log(userinfoObj)
    // this.CompanyId = userinfoObj[0].CompanyId;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.category1 = { Id: 0, Description: "", ParentCategoryId: 0, FreeQtyPercentage: 0, MinimumQty: 0, Variants: [], Addons: [], options: [], Delete: [], IsUPCategory: false, CompanyId: this.CompanyId, isactive: false };
  }
  ngOnInit() {
    setHeightWidth();
    this.getCategory();
    this.getproducts();
    // this.getoptions();
    this.settings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 200,
      itemsShowLimit: 3,
      searchPlaceholderText: 'Search',
      noDataAvailablePlaceholderText: 'No Stores Found',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
  }
  getproducts() {
    this.Auth.getProduct(0, this.CompanyId).subscribe(data => {
      var dat: any = data;
      this.products = dat.products;
      console.log(this.products);
      var response: any = data
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
      }
    });
  }
  getCategory() {
    this.Auth.getcat1(this.catId, this.CompanyId).subscribe(data => {
      this.category = data;
      this.category1.IsUPCategory = this.category.category.IsUPCategory;
      this.category1.Id = this.category.category.Id;
      this.category1.Description = this.category.category.Description;
      this.category1.ParentCategoryId = this.category.category.ParentCategoryId;
      this.category1.FreeQtyPercentage = this.category.category.FreeQtyPercentage;
      this.category1.MinimumQty = this.category.category.MinimumQty;
      this.parentcategories = this.category.parentCategories;
      this.category1.isactive = this.category.category.isactive;
      this.selectedItems = [];
      console.log(this.parentcategories)
      this.Auth.getoption(this.CompanyId).subscribe(data => {
        this.opt = data;
        console.log(this.opt);
        this.optgp = this.opt.catOptgp;
        this.category.categoryOptionGroup.forEach(element => {
          this.category1.options.push(element.OptionGroupId);
          console.log(this.opt.catOptgp.filter(x => x.Id == element.OptionGroupId)[0])
          this.selectedItems.push(this.opt.catOptgp.filter(x => x.Id == element.OptionGroupId)[0]);
          // element.Name =this.opt.catOptgp.filter()
          console.log(this.selectedItems);
        })
      });

      // this.category.categoryOptions.forEach(element => {
      // element.Name = this.opt.catopt.filter(x => x.Id == element.OptionId)[0].Name;
      // this.opt.catopt.filter(x => x.Id == element.OptionId)[0].checked = 1;
      //  if(!this.optionGroup.some(x => x.Id === element.OptionGroupId))
      //   {
      //     this.optionGroup.push(this.optgp.filter(x => x.Id == element.OptionGroupId)[0]);
      //     this.optgp = this.optgp.filter(x => x.Id != element.OptionGroupId);
      //   }
      //   var response:any = data;
      //   if(response.status == 0)
      //   {
      //     this.status = 0;
      //     this.errorMsg = response.msg;
      //     console.log(dangertoast(this.errorMsg));
      //   }
      //   else{
      //     this.show = false;
      //     this.errorMsg = response.msg;
      //     const type = "info";
      //     console.log(toast(this.errorMsg))
      //   }
      // });
      // let i=0;
      // this.category.forEach(element => {
      // if(element.ParentCategoryId == null)
      // {
      //   console.log(element)
      //   this.parentcategory[i]=element;
      //   i++;
      // }
      // });
    });
  }

  getparentcategory(id) {
    // this.parentcategories.forEach(element => {
    //   console.log(this.products.filter(y => y.CategoryId == element.Id)[0])
    // });
    return this.parentcategories.filter(x => x.Id != id && !this.products.some(y => y.CategoryId == x.Id));
  }

  public onItemSelect(item: any) {
    this.category1.options.push(item.Id);
  }

  public onDeSelect(item: any) {
    console.log(item);
    var ind = this.category1.options.findIndex(x => x == item.Id);
    console.log(ind);
    this.category1.options.splice(ind, 1);
  }

  public onSelectAll(items: any) {
    console.log(items);
    items.forEach(element => {
      this.category1.options.push(element.Id);
    });
  }

  public onDeSelectAll(items: any) {
    console.log(items);
    this.category1.options = [];
  }
  public onFilterChange(item: any) {
    console.log(item);
  }

  clear() {
    this.selectedItems = [];
    this.category1 = { Id: 0, Description: "", ParentCategoryId: 0, FreeQtyPercentage: 0, MinimumQty: 0, Variants: [], Addons: [], options: [], Delete: [], IsUPCategory: false, CompanyId: this.CompanyId, isactive: false };
  }

  SaveCat() {
    console.log(this.category1)
    if (!(this.category1.ParentCategoryId > 0)) {
      this.category1.ParentCategoryId = null;
    }
    var postdata = { objData: JSON.stringify(this.category1) };
    this.Auth.savecategory1(postdata).subscribe(data => {
      this.router.navigateByUrl("/category")
      var response: any = data
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
      }
      else {
        this.getCategory();
        this.show = false;
        this.errorMsg = response.msg;
        const type = "info";
        console.log(toast(this.errorMsg))
        this.router.navigate(['category'])
      }
    });
  }

  // filter(item) {
  //   this.selectedItems = [];
  //   this.category1 = { Id: 0, Description: "", ParentCategoryId: 0, FreeQtyPercentage: 0, MinimumQty: 0, Variants: [], Addons: [], options: [], Delete: [], IsUPCategory: false, CompanyId: this.CompanyId };
  //   this.opt.catOptgp.forEach(element => {
  //     this.category1.options.push(element.optionGroupId);
  //     this.selectedItems.push(element.optionGroup.filter(x => x.Id == element.OptionGroupId)[0]);
  //   });
  // }

  // onchng(devicevalue)
  // {

  // if(devicevalue == undefined)
  // {
  // this.options = this.opt.catopt.filter(x => x.OptionGroupId == this.optgp[0].Id)
  // this.optgrpId = this.optgp[0].Id;
  //  }
  //   else
  //   {
  //     this.options = this.opt.catopt.filter(x => x.OptionGroupId == devicevalue)
  //     this.optgrpId = devicevalue;
  //   }
  //   console.log(this.options)
  // }

  // push5(bool,item)
  // {console.log(item);
  // console.log(this.options);

  // if(bool)
  // {
  //   var obj = {Id:0,CategoryId:this.catId,OptionId:0,OptionGroupId:0,Price:0,CompanyId:this.CompanyId,Name:""};
  //   obj.OptionId = item.Id;
  //   obj.OptionGroupId = item.OptionGroupId;
  //   obj.Name = item.Name;
  //   this.options.filter(x => x.Id == item.Id)[0].checked=1;
  //   this.tempArray3.push(obj);
  // }
  // else
  // {

  // var index = this.tempArray3.findIndex(x => x.Id ==item.OptionId);
  // this.options.filter(x => x.Id == item.OptionId)[0].checked=0;
  // this.category1.options.filter(x =>x.OptionGroupId ==  item.OptionId)[0];
  // this.tempArray3.splice(index,1);

  // }
  //}
  setOptionId(id) {
    this.options1 = this.category.categoryOptions.filter(x => x.OptionGroupId == id);
    this.optgrpId = id;
    this.options2 = this.opt.catopt.filter(x => x.OptionGroupId == id);
    console.log(this.options1);
  }
  saveOption() {
    this.optionGroup.push(this.opt.catOptgp.filter(x => x.Id == this.optgrpId)[0]);
    console.log(this.optgrpId);
    console.log(this.optionGroup);
    this.tempArray3.forEach(element => {
      this.category1.options.push(element)
    });
    this.tempArray3 = [];
    this.setOptionId(this.optgrpId);
    this.optgp = this.optgp.filter(l => l.Id != this.optgrpId)
    // if(this.optgp.length > 0)
    // {
    //   this.onchng(undefined);
    // }
  }

  // deleteOption()
  // {
  // var Index = this.optionGroup.findIndex(x=>x.Id == this.OptionGrpId)
  // // this.Optiongrp.push(this.optionGroup.filter(x=>x.Id == this.OptionGrpId)[0]);
  // this.optgp.push(this.opt.catOptgp.filter(x => x.Id == this.OptionGrpId)[0])
  // console.log(this.OptionGrpId,this.optgp);
  // this.optionGroup.splice(Index,1);
  // this.category1.options.filter(x=>x.OptionGroupId == this.OptionGrpId).forEach(option => {
  //   this.category1.Delete.push(option.Id);
  // })
  // this.category1.options = this.category1.options.filter(x=>x.OptionGroupId != this.OptionGrpId);
  // console.log(this.category1.options);
  // this.onchng(undefined);
  // }

  // push6(e,item)
  // {console.log(item);
  // if(e.target.checked)
  // {
  //   var obj = {Id:0,CategoryId:this.catId,OptionId:0,OptionGroupId:0,Price:0,CompanyId:this.CompanyId,Name:""};
  //   obj.OptionId = item.Id;
  //   obj.OptionGroupId = item.OptionGroupId;
  //   obj.Name = item.Name;
  //   this.options2.filter(x => x.Id == item.Id)[0].checked=1;
  //   this.category1.options.push(obj);
  //   console.log(obj);

  // }
  // else
  // { 
  //   var index = this.category1.options.findIndex(x=> x.OptionId == item.Id);
  //   this.category1.Delete.push(this.category1.options.filter(x=> x.OptionId == item.Id)[0].Id)
  //   this.category1.options.splice(index,1);
  //   this.options2.filter(x => x.Id == item.Id)[0].checked=0;
  // }
  // }

}
//   setvarId(id)
//   {
//     this.variants1 = this.varcat.catvar.filter(x => x.VariantGroupId == id);
//     this.groupId = id;
//     console.log(this.variants1)
//   }  

//   setAddonId(id)
//   {
//     this.addons1 = this.products.filter(x => x.AddonGroupId == id);
//     this.AddonGrpId = id;
//     console.log(this.addons1)
//   }  
//   onChange(deviceValue) 
//   {
//     if(deviceValue == undefined)
//     {
//       this.Variants=this.varcat.catvar.filter(x => x.VariantGroupId == this.varcat.catVgp[0].Id)
//       this.groupId = this.varcat.catVgp[0].Id;
//     }
//     else{

//     this.Variants=this.varcat.catvar.filter(x => x.VariantGroupId == deviceValue)
//     this.groupId = deviceValue;
//     }
//     console.log(this.Variants)
//   }
//   EditAdd(data,group,add)
//   {
//     console.log(data)
//     this.category1.Addons = [];
//     this.category1.Variants = [];
//     this.category1.Description =data.category[0].Description;
//     this.category1.Id = data.category[0].Id;
//     this.category1.ParentCategoryId = data.category[0].ParentCategoryId;
//     data.categoryVariant.forEach(element => {
//       this.category1.Variants.push(element);
//       if(!this.variantGroup.some(x => x.Id === element.VariantGroupId))
//       {
//         this.variantGroup.push(group.filter(y => y.Id == element.VariantGroupId)[0])
//       }
//     });
//     data.categoryAddon.forEach(element=>{
//       this.category1.Addons.push(element);
//       if(!this.addonGroup.some(x => x.Id === element.AddonGroupId))
//       {
//         this.addonGroup.push(add.filter(l => l.Id == element.AddonGroupId)[0])
//       }

//     });
//     // this.category1.Variants = data.categoryVariant[0].Description;
//     // this.category1.Addons = data.categoryAddon[0].Description;
//     console.log(this.category1.Variants);
//     console.log(this.category1.Addons);
// }
//   GetVariant()
//   {
//   //   this.Auth.GetVar().subscribe(data=>{
//   //     this.varcat = data;
//   //     console.log(this.varcat);
//   //     this.varcat.catAddon.forEach(element => {
//   //       // element.Product.AddonId = element.Id;
//   //       this.products.push(element);
//   //       console.log(this.products);
//   //     });
//   //     this.Auth.Getcat(this.catId).subscribe(data=>{
//   //       this.categ=data;
//   //       this.EditAdd(this.categ,this.varcat.catVgp,this.varcat.catAdgp)
//   //       console.log(this.categ)
//   //     });
//   // });
//   }
//   onChange1(deviceValue) 
//   {
//     if(deviceValue == undefined)
//     {
//       this.Addons = this.products.filter(x => x.AddonGroupId == this.varcat.catAdgp[0].Id)
//       this.AddonGrpId = this.varcat.catAdgp[0].Id;

//     }
//     else
//     {
//       this.Addons = this.products.filter(x => x.AddonGroupId == deviceValue)
//       this.AddonGrpId = deviceValue;
//     }
//     console.log(this.Addons)
//   }
//   push(bool,id)
// {
//   if(bool)
//   {
//     var obj = this.Variants.filter(x => x.Id == id)[0];
//     this.Variants.filter(x => x.Id == id)[0].valid=1;
//     this.tempArray.push(obj);
//   }
//   else
//   {
//     var index = this.tempArray.findIndex(x => x.Id == id);
//     this.Variants.filter(x => x.Id == id)[0].valid=0;
//     this.tempArray.splice(index,1);
//   }
//   console.log(this.tempArray);
// }
// SaveAddon()
// {
// this.addonGroup.push(this.varcat.catAdgp.filter(x=>x.Id == this.AddonGrpId)[0]);
// console.log(this.addonGroup,this.AddonGrpId)
// this.tempArray2.forEach(element =>{
//   this.category1.Addons.push(element)
// });
// this.tempArray2 =[];
// this.setAddonId(this.AddonGrpId);
// }

// push3(bool,id)
// {
//   if(bool)
//   {
//   var obj = this.Addons.filter(x => x.Id == id)[0];
//   this.Addons.filter(x => x.Id == id)[0].checked=1;
//   this.tempArray2.push(obj);
// }
// else
// {
//   var index = this.tempArray2.findIndex(x => x.Id == id);
//   this.Addons.filter(x => x.Id == id)[0].checked=0;
//   this.tempArray2.splice(index,1);

// }
// console.log(this.tempArray2);

// }

// save()
// {
//   this.variantGroup.push(this.varcat.catVgp.filter(x => x.Id == this.groupId)[0]);
//   console.log(this.variantGroup,this.groupId)
//   this.tempArray.forEach(element => {
//       this.category1.Variants.push(element)
//   });
//   this.tempArray = [];
//   this.setvarId(this.groupId);
// }
// deletevrt()
// {
//   var Index= this.variantGroup.findIndex(x=>x.Id == this.groupId)
//   this.varcat.catVgp.push(this.variantGroup.filter(x=>x.Id == this.groupId)[0]);
//   this.variantGroup.splice(Index,1);
//   this.category1.Variants = this.category1.Variants.filter(x => x.VariantGroupId != this.groupId);
//   console.log(this.category1.Variants)
// }
// deleteAddon()
// {
//   var Index= this.addonGroup.findIndex(x=>x.Id == this.AddonGrpId)
//   this.varcat.catAdgp.push(this.addonGroup.filter(x=>x.Id == this.AddonGrpId)[0]);
//   this.addonGroup.splice(Index,1);
//   this.category1.Addons = this.category1.Addons.filter(x => x.AddonGroupId != this.AddonGrpId);
//   console.log(this.category1.Addons)
// }
// push2(e,id)
// {
//   if(e.target.checked)
//   {
//     var obj = this.Variants.filter(x => x.Id == id)[0];
//     this.variants1.filter(x => x.Id == id)[0].checked=1;
//     this.category1.Variants.push(obj);
//   }
//   else
//   {
//     var index = this.category1.Variants.findIndex(x => x.Id == id);
//     this.variants1.filter(x => x.Id == id)[0].checked=0;
//     this.category1.Variants.splice(index,1);
//   }
// }
// push4(e,id)
// {
//   if(e.target.checked)
//   {
//     var obj = this.Addons.filter(x => x.Id == id)[0];
//     this.addons1.filter(x => x.Id == id)[0].checked=1;
//     this.category1.Addons.push(obj);
//   }
//   else
//   {
//     var index = this.category1.Addons.findIndex(x => x.Id == id);
//     this.addons1.filter(x => x.Id == id)[0].checked=0;
//     this.category1.Addons.splice(index,1);
//   }

// }
