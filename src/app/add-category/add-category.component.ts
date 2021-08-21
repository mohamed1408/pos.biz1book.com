import { Component, OnInit } from '@angular/core';
import { idbService } from "../service/idb.service";
import { AuthService } from "../auth.service";
import { Validators, FormGroup, FormBuilder,FormArray, FormControl } from '@angular/forms';
import { RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import * as moment from "moment";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryModule } from '../category/category.module';
import { LocsService } from '../service/locs.service';
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { element } from 'protractor';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { dangertoast, toast } from 'src/assets/dist/js/toast-data';
import { Directive, HostListener, ElementRef } from '@angular/core';
// declare function mintos(): any;
declare function setHeightWidth(): any;
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  public settings = {};
  category:any; 
  categ:any;
  // cat:CategoryModule;
  // myForm: FormGroup;
  private formBuilder: FormBuilder;
  public model: any;
  public form: FormGroup;
  variants1: any;
  addons1:any;
  options1:any;
  catgy:any;
  varcat:any;
  category1: CategoryModule;
  arr: FormArray;
  vargp:FormArray;
  productVariants1: any[] = [];
  variantGroups: any;
  VrtArray: any=[''];
  addonArray: any = [''];
  key = "Description";
  products:any = [];
  vartGroup:any =[];
  Addongrp:any =[];
  Optiongrp:any =[];
  optgp:any =[];
  parentcategory:any=[];
  Variants:any=[];
  groupId:number;
  number:any;
  Addons: any=[];
  tempArray: any = [];
  tempArray2:any =[];
  variantGroup: any=[];
  addonGroup: any=[];
  optionGroup: any=[];
  AddonGrpId:number;
  OptionGrpId:number;
  optgrpId:number;
  submitted = false;
  CompanyId :number;
  opt: any;
  options: any;
  tempArray3: any=[];
  StoreId: number;
  status: number;
  errorMsg:string = '';
  show: any = false;
  catData:any;
  prdData:any;
  Parentctgy:any;
  Id:any;
  constructor(private IDB: idbService, public http: HttpClient, public router: Router,private Auth: AuthService,
     private LOCS: LocsService,private _fb: FormBuilder,private modalService: NgbModal,public location: Location,private el: ElementRef) 
  {
    // var userinfo = localStorage.getItem("userinfo");
    // var userinfoObj = JSON.parse(userinfo);
    // // console.log(userinfoObj)
    // this.CompanyId = userinfoObj[0].CompanyId;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.category1 = {Id:0,Description:"",ParentCategoryId:null,FreeQtyPercentage:0,MinimumQty:0,Variants:[],Addons:[],options:[],Delete:[],IsUPCategory:false,CompanyId:this.CompanyId,isactive:false};

   }
  ngOnInit() {
    
    setHeightWidth();
   this.getCategory();
   this.getoptions();
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
  
  getoptions()
  {
    this.Auth.getoption(this.CompanyId).subscribe(data =>{
      this.opt = data;
      // // console.log(this.opt);
      this.optgp = this.opt.catOptgp;
      // var response:any = data
      // if(response.status == 0)
      // {
      //   this.status = 0;
      //   this.errorMsg = response.msg;
        // console.log(dangertoast(this.errorMsg));
      //   }
      //   else{
      //     this.show = false;
      //     this.errorMsg = response.msg;
      //     const type = "info";
          // console.log(toast(this.errorMsg))
  
      //   }
      
    });
  }
  public onItemSelect(item: any) {
    // console.log(item);
    this.category1.options.push({Id:item.Id});
  }
  public onDeSelect(item: any) {
    // console.log(item);
    var ind = this.opt.catOptgp.findIndex(x => x == item.Id);
    this.category1.options.splice(ind,1);
  }

  public onSelectAll(items: any) {
    // console.log(items);
    items.forEach(element => {
      this.category1.options.push({Id:element.Id});
    });

  }
  
  public onDeSelectAll(items: any) {
    // console.log(items);
    this.category1.options = [];
  }
  public onFilterChange(item: any) {
    // console.log(item);
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
      this.Auth.getcat(this.CompanyId).subscribe(data=>{
        this.catData =data;
        console.log(this.catData)
        this.category=this.catData;
        // this.prdData =this.catData.products;
    let i=0;
    this.Auth.getProduct(0, this.CompanyId).subscribe(data => {
      var dat: any = data;
      this.products = dat.products;
      console.log( this.category)
      this.category.forEach(element => {
        if(element.ParentCategoryId == null)
        {
          // console.log(element)
          if(!this.products.some(x => x.CategoryId === element.Id)){
            this.parentcategory[i]=element;
            i++;
          }
         
        }
      });
    });

    // console.log( this.parentcategory)
    });
  }
  focus() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
    if (invalidElements.length > 0) {
      // console.log(invalidElements[1]);

      invalidElements[1].focus();
    }

  }

filter(item)
{
  this.show = true;
  this.options = [];
}
clear()
{
  this.options = [];
}

SaveCat()
{
  console.log(this.category1);
var postdata = { objData: JSON.stringify(this.category1) };
this.Auth.savecategory(postdata).subscribe(data => {this.router.navigateByUrl("/category") 
var response:any =  data
if(response.status == 0)
{
  this.status = 0;
  this.errorMsg = response.msg;
  console.log(dangertoast(this.errorMsg))
}
else{
  this.getCategory();
  this.show = false;
  this.errorMsg = response.msg;
  const type = "info";
  console.log(toast(this.errorMsg))
}

});
}

}


//   setvarId(id)
//   {
//     this.variants1 = this.varcat.catvar.filter(x => x.VariantGroupId == id);
//     this.groupId = id;

//     // console.log(this.variants1)
//   }  

// setAddonId(id)
// {
//   this.addons1 = this.varcat.catAddon.filter(x => x.AddonGroupId == id);
//   this.AddonGrpId = id;
//   // console.log(this.addons1)
// }  
// onChange(deviceValue) 
// {
//   if(deviceValue == undefined)
//   {
//     // console.log(this.vartGroup)
//     this.Variants=this.varcat.catvar.filter(x => x.VariantGroupId == this.vartGroup[0].Id)
//     this.groupId = this.vartGroup[0].Id;
//   }
//   else{

//   this.Variants=this.varcat.catvar.filter(x => x.VariantGroupId == deviceValue)
//   this.groupId = deviceValue;
//   }
//   // console.log(this.Variants)
// }

// onChange1(deviceValue) 
// {
//   if(deviceValue == undefined)
//   {
//     this.Addons = this.varcat.catAddon.filter(x => x.AddonGroupId == this.Addongrp[0].Id)
//     this.AddonGrpId = this.Addongrp[0].Id;

//   }
//   else
//   {
//     this.Addons = this.varcat.catAddon.filter(x => x.AddonGroupId == deviceValue)
//     this.AddonGrpId = deviceValue;
//   }
//   // console.log(this.Addons)
// }


// push(bool,id)
// {
//   if(bool)
//   {
//     var obj = this.Variants.filter(x => x.Id == id)[0];
//     this.Variants.filter(x => x.Id == id)[0].checked=1;
//     this.tempArray.push(obj);
//   }
//   else
//   {
//     var index = this.tempArray.findIndex(x => x.Id == id);
//     this.Variants.filter(x => x.Id == id)[0].checked=0;
//     this.tempArray.splice(index,1);
//   }
//   // console.log(this.tempArray);
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
// // console.log(this.tempArray2);

// }
// save()
// {
//   this.variantGroup.push(this.vartGroup.filter(x => x.Id == this.groupId)[0]);
//   // console.log(this.variantGroup,this.groupId)
//   this.tempArray.forEach(element => {
//       this.category1.Variants.push(element)
//   });
//   this.tempArray = [];
//   this.setvarId(this.groupId);
//   this.vartGroup = this.vartGroup.filter(y=>y.Id !=this.groupId)
//   this.onChange(undefined);
//   // var index = 
//   this.vartGroup = this.vartGroup.filter(y=>y.Id !=this.groupId)
// }
// SaveAddon()
// {
// this.addonGroup.push(this.varcat.catAdgp.filter(x=>x.Id == this.AddonGrpId)[0]);
// // console.log(this.addonGroup,this.AddonGrpId)
// this.tempArray2.forEach(element =>{
//   this.category1.Addons.push(element)
// });
// this.tempArray2 =[];
// this.setAddonId(this.AddonGrpId);
// this.Addongrp = this.Addongrp.filter(l=>l.Id !=this.AddonGrpId)
// if(this.Addongrp.length>0)
// {
//  this.onChange1(undefined);
// }

//  }

 

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
//   }
// deletevrt()
// {
//   var Index= this.variantGroup.findIndex(x=>x.Id == this.groupId)
//   this.vartGroup.push(this.variantGroup.filter(x=>x.Id == this.groupId)[0]);
//   this.variantGroup.splice(Index,1);
//   this.category1.Variants = this.category1.Variants.filter(x => x.VariantGroupId != this.groupId);
//   // console.log(this.category1.Variants)
//   this.onChange(undefined)
// }
// deleteAddon()
// {
//   var Index= this.addonGroup.findIndex(x=>x.Id == this.AddonGrpId)
//   this.Addongrp.push(this.addonGroup.filter(x=>x.Id == this.AddonGrpId)[0]);
//   // console.log(this.Addongrp)
//   this.addonGroup.splice(Index,1);
//   this.category1.Addons = this.category1.Addons.filter(x => x.AddonGroupId != this.AddonGrpId);
//   // console.log(this.category1.Addons)
//   this.onChange1(undefined);
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
