import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { idbService } from '../service/idb.service';
import { LocsService } from "../service/locs.service";
import { AuthService } from "../auth.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ProductModule, PredefinedQuantityModule } from "../product/product.module";
import { Directive, HostListener, ElementRef } from '@angular/core';
import { element } from 'protractor';
import { Location } from '@angular/common';
import { dangertoast, toast } from 'src/assets/dist/js/toast-data';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare function setHeightWidth(): any;
const uploadAPI = 'http://localhost:4000/api/upload'; // better use a service class
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  shiftpressed: boolean = false
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key == "Shift") this.shiftpressed = true
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (event.key == "Shift") this.shiftpressed = false
  }
  // @ViewChild('optionGroups')
  @ViewChild("optionGroups", { static: false }) private optionGroup: ElementRef;
  model: any = {};
  number: any;
  number1: any;
  submitted = false;
  products: any;
  products1: ProductModule;
  product: any;
  category: any;
  units: any;
  productTypes: any;
  taxGroup: any;
  productVariantGroups: any;
  productVariants: any;
  productVariants1: any[] = [];
  productAddonGroups: any;
  productAddons: any;
  productAddons1: any[] = [];
  variantGroups: any;
  variants: any;
  variants1: any;
  optionGroups: any = [];
  options: any;
  options1: any;
  addonGroups: any;
  addons: any;
  addons1: any;
  cat: any;
  prodId: number;
  groupId: number;
  addGroupId: number;
  CompanyId: number;
  StoreId: number;
  fromDate = 0;
  toDate = 0;
  resData: any;
  selectedItems: any = [];
  public dash: any;
  public settings = {};
  vat: any;
  categoryId: any;
  PrdArray: any = [''];
  OptionGroupId1: number;
  statement: string;
  conditionString: any = "";
  optionArray: any = [];
  OptionGroupId: any;
  optionGroupId: any;
  errorMsg: string = '';
  opgp: any;
  // optionGroupId: number;
  public form: FormGroup;
  public loadContent: boolean = false;
  categoryOptionGroups: any[];
  Prods: Object;
  descript: String;
  catId: number;
  taxId: number;
  unitId: String;
  price: number;
  takeaway: number;
  delivery: number;
  opgps: any;
  producttype: number;
  Kot: any = [];
  KotId: number;
  nullvalue: any = null;
  image: any = null;
  blobimageurl: SafeUrl;
  predefinedquantities: Array<PredefinedQuantityModule> = []
  newpdquantity: PredefinedQuantityModule = null
  public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });
  cakeQuantities = []
  constructor(private route: ActivatedRoute, private el: ElementRef,
    private router: Router, private IDB: idbService, private _avRoute: ActivatedRoute, private LOCS: LocsService,
    private auth: AuthService, private modalService: NgbModal, private fb: FormBuilder, public cdRef: ChangeDetectorRef, public location: Location,
    private http: HttpClient, private sanitizer: DomSanitizer) {
    // const userObj = this.LOCS.getData("userinfo");
    // this.CompanyId = userObj.CompanyId;
    // this.StoreId = userObj.StoreId;
    this.prodId = Number(this._avRoute.snapshot.params["id"]);
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.StoreId;
    // this.form = this.fb.group({
    //   avatar: [null]
    // })
  }
  ngOnInit() {
    this.getData();
    setHeightWidth();
    this.loadScripts();
    this.newpdquantity = new PredefinedQuantityModule({ companyid: this.CompanyId, productid: this.prodId })
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
    console.log(document.getElementById('dropzone'));
    var element = document.getElementById('dropzone') as HTMLElement;
  }
  upload(files) {
    this.image = files[0];
    this.blobimageurl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image).replace('unsafe:', ''));
    this.products1.ImgUrl = null;
  }
  getData() {
    this.auth.getProduct(this.prodId, this.CompanyId).subscribe(data => {
      this.products = data;
      this.predefinedquantities = data["PredefinedQuantities"]
      this.cakeQuantities = data["CakeQuantities"].sort((a, b) => { return a.Quantity - b.Quantity })
      this.calibrate()
      // this.predefinedquantities.forEach(qty => {
      //   this.cakeQuantities.filter(x => x.Id == qty.CakeQuantityId)[0].saved = true
      // })
      console.log(this.products);
      console.log(this.products1)
      this.products1 = new ProductModule(data, this.CompanyId);
      console.log(this.products1);
      console.log(this.products.ProductOptionGroups);
      this.category = this.products.category.filter(x => x.ParentCategoryId != null)
      this.taxGroup = this.products.taxGroup
      this.units = this.products.units
      this.productTypes = this.products.productType
      this.product = this.products.product[0];
      this.Kot = this.products.Kot;
      var response: any = data;
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }
      this.selectedItems = [];
      console.log(this.products);

      this.products.productOptionGroups.forEach(element => {
        console.log(element)
        this.products1.ProductOptionGroups.push(element.OptionGroupId);
        this.selectedItems.push(this.products.optionGroups.filter(x => x.Id == element.OptionGroupId)[0]);
        console.log(this.selectedItems);
        console.log(this.products.optionGroups);
      });
    });
  }
  calibrate() {
    this.cakeQuantities.forEach(cqty => {
      if (this.predefinedquantities.some(x => x.CakeQuantityId == cqty.Id && x.isdeleted == false)) {
        cqty.saved = true
      } else {
        cqty.saved = false
      }
    })
  }
  ////POPUP////
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
  focus() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
    if (invalidElements.length > 0) {
      console.log(invalidElements[1]);

      invalidElements[1].focus();
    }

  }
  saveProduct() {
    this.submitted = true;
    console.log(this.products1)
    var postdata = { objData: JSON.stringify(this.products1) };
    //postdata.data = ;
    console.log(postdata);
    // var image = { image: this.image };
    this.auth.saveProduct(postdata, this.image, this.products1.Id, this.CompanyId).subscribe(data => {
      this.router.navigateByUrl("/product")
      var response: any = data
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
      }
      else {
        this.errorMsg = response.msg;
        console.log(toast(this.errorMsg));
      }
    });
  }
  categopt(e) {
    this.products1.ProductOptionGroups = [];
    this.selectedItems = [];
    console.log(e);
    this.opgp = this.products.categoryOptionGroups.filter(x => x.CategoryId == e);
    console.log(this.opgp);
    this.opgp.forEach(element => {
      this.products1.ProductOptionGroups.push(element.OptionGroupId);
      this.selectedItems.push(this.products.optionGroups.filter(x => x.Id == element.OptionGroupId)[0]);
    });
    console.log(this.selectedItems);
    console.log(this.products1.ProductOptionGroups);
    console.log(this.products.optionGroups);
  }
  clear() {
    this.products1.ProductOptionGroups = [];
    this.selectedItems = [];
    console.log(this.selectedItems);
    console.log(this.products1.ProductOptionGroups);
  }
  loadScripts() {
    const dynamicScripts = [
      "../../assets/vendors/jquery/dist/jquery.min.js",
      "../../assets/vendors/popper.js/dist/umd/popper.min.js",
      "../../assets/vendors/bootstrap/dist/js/bootstrap.min.js",
      "../../assets/dist/js/jquery.slimscroll.js",
      "../../assets/dist/js/dropdown-bootstrap-extended.js",
      "../../assets/dist/js/feather.min.js",
      "../../assets/vendors/jquery-toggles/toggles.min.js",
      "../../assets/dist/js/toggle-data.js",
      "../../assets/vendors/waypoints/lib/jquery.waypoints.min.js",
      "../../assets/vendors/jquery.counterup/jquery.counterup.min.js",
      "../../assets/vendors/raphael/raphael.min.js",
      "../../assets/vendors/morris.js/morris.min.js",
      "../../assets/vendors/echarts/dist/echarts-en.min.js",
      // "../../assets/vendors/jquery.sparkline/dist/jquery.sparkline.min.js",
      "../../assets/vendors/vectormap/jquery-jvectormap-2.0.3.min.js",
      "../../assets/vendors/vectormap/jquery-jvectormap-world-mill-en.js",
      "../../assets/dist/js/vectormap-data.js",
      "../../assets/vendors/owl.carousel/dist/owl.carousel.min.js",
      "../../assets/vendors/jquery-toast-plugin/dist/jquery.toast.min.js",
      "../../assets/vendors/select2/dist/js/select2.full.min.js",
      "../../assets/dist/js/select2-data.js",
      "../../assets/js/jquery.pos.js"
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement("script");
      node.src = dynamicScripts[i];
      node.type = "text/javascript";
      node.async = false;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
  }
  public onFilterChange(item: any) {
    console.log(item);

  }

  public onItemSelect(item: any) {
    console.log(item);
    this.products1.ProductOptionGroups.push(item.Id);
    console.log(this.products1.ProductOptionGroups);

  }
  public onDeSelect(item: any) {
    console.log(item);
    var ind1 = this.products1.ProductOptionGroups.findIndex(x => x == item.Id);
    this.products1.ProductOptionGroups.splice(ind1, 1);
  }

  public onSelectAll(items: any) {
    console.log(items);
    items.forEach(element => {
      this.products1.ProductOptionGroups.push(element.Id);
    });
  }
  public onDeSelectAll(items: any) {
    console.log(items);
    this.products1.ProductOptionGroups = [];
  }
  bulkSelect(i) {
    var checkboxes = document.getElementsByClassName("pdqcb")
    var first_index = this.cakeQuantities.findIndex((x, index) => x.saved === true);
    console.log("First Index", first_index, "i", i)
    var last_index = 0;
    (first_index == -1) ? first_index = 0 : null

    if (first_index > i) {
      last_index = first_index
      first_index = i
    } else {
      last_index = i
    }
    this.cakeQuantities.forEach((qty, index) => {
      if (index >= first_index && index <= last_index) {
        qty.saved = true
        checkboxes[index]["checked"] = true
      } else {
        qty.saved = false
        checkboxes[index]["checked"] = false
      }
    })
  }
  setPredefinedQtys() {
    this.cakeQuantities.forEach(cq => {
      if (cq.saved) {
        if (!this.predefinedquantities.some(x => x.CakeQuantityId == cq.Id)) {
          this.newpdquantity.CakeQuantityId = cq.Id
          this.newpdquantity.QuantityText = cq.QuantityText
          this.newpdquantity.Quantity = cq.Quantity
          this.newpdquantity.FreeQuantity = cq.FreeQuantity
          this.newpdquantity.TotalQuantity = cq.TotalQuantity
          this.predefinedquantities.push(Object.assign({}, this.newpdquantity))
          this.newpdquantity = new PredefinedQuantityModule({ companyid: this.CompanyId, productid: this.prodId })
        }
      } else {
        if (this.predefinedquantities.some(x => x.CakeQuantityId == cq.Id)) {
          if (this.predefinedquantities.filter(x => x.CakeQuantityId == cq.Id)[0].Id > 0)
            this.predefinedquantities.filter(x => x.CakeQuantityId == cq.Id)[0].isdeleted = true
          else
            this.predefinedquantities = this.predefinedquantities.filter(x => x.CakeQuantityId == cq.Id)
        }
      }
    })
  }
  selectAll(select) {
    if(select) {
      this.cakeQuantities.forEach(cq => {cq.saved = true})
    } else {
      this.cakeQuantities.forEach(cq => {cq.saved = false})
    }
  }
  addPredefQty(i, save) {
    console.log(i, save)
    var cakeqid = this.cakeQuantities[i].Id
    if (save) {
      this.newpdquantity.CakeQuantityId = this.cakeQuantities[i].Id
      this.newpdquantity.QuantityText = this.cakeQuantities[i].QuantityText
      this.newpdquantity.Quantity = this.cakeQuantities[i].Quantity
      this.newpdquantity.FreeQuantity = this.cakeQuantities[i].FreeQuantity
      this.newpdquantity.TotalQuantity = this.cakeQuantities[i].TotalQuantity
      if (!this.predefinedquantities.some(x => x.CakeQuantityId == this.newpdquantity.CakeQuantityId))
        this.predefinedquantities.push(Object.assign({}, this.newpdquantity))
    } else {
      if (this.predefinedquantities.filter(x => x.CakeQuantityId == cakeqid)[0].Id > 0) {
        this.predefinedquantities.filter(x => x.CakeQuantityId == cakeqid)[0].isdeleted = true
      } else {
        this.predefinedquantities = this.predefinedquantities.filter(x => x.CakeQuantityId != cakeqid)
      }
    }
    this.newpdquantity = new PredefinedQuantityModule({ companyid: this.CompanyId, productid: this.prodId })
    this.calibrate()
  }
  delPredefQty(i) {
    console.log(i)
    if (this.predefinedquantities[i].Id > 0) {
      this.predefinedquantities[i].isdeleted = true
    } else {
      this.predefinedquantities.splice(i, 1)
    }
  }
  adDeleted(i) {
    this.predefinedquantities[i].isdeleted = false
  }
  savePredefQty() {
    this.setPredefinedQtys()
    this.auth.savepredefinedqtys(this.prodId, this.predefinedquantities).subscribe(data => {
      console.log(data)
      if (data["status"] == 200) {
        this.predefinedquantities = data["predfqtys"]
        this.calibrate()
      }
    })
  }
}