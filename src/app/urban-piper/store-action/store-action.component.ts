import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Location } from '@angular/common';
import { UrbanPipeService } from 'src/app/service/urban-pipe.service';
import { dangertoast } from 'src/assets/dist/js/toast-data';
import { Router } from '@angular/router';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-store-action',
  templateUrl: './store-action.component.html',
  styleUrls: ['./store-action.component.css']
})
export class StoreActionComponent implements OnInit {
  stores: any;
  indicator: any = 0;
  brandId: any = 0;
  CompanyId: any;
  StoreId: any;
  LocationName: "";
  json = JSON.parse("{\"stores\":[{\"city\":\"Chennai\",\"name\":\"FBCakes\",\"min_pickup_time\":900,\"min_delivery_time\":1800,\"contact_phone\":\"98234566222\",\"notification_phones\":[\"+919134345345\",\"98234566778\"],\"ref_id\":\"1234567892584\",\"min_order_value\":200,\"hide_from_ui\":false,\"address\":\"60, RGM Complex, OMR Road, Karapakkam\",\"notification_emails\":[\"b1@mail.com\",\"b2@mail.com\"],\"zip_codes\":[\"560033\",\"560022\"],\"geo_longitude\":80.2291568,\"active\":true,\"geo_latitude\":12.9137880,\"ordering_enabled\":true}],\"translations\":[{\"language\":\"fr\", \"name\":\"c\'est un magasin\"}]}");
  obj: { city: any; name: any; address: any; ref_id: any; included_platforms: any[]; ordering_enabled: boolean; active: boolean };
  data: any = { stores: [] };
  errorMsg: string = '';
  f;
  submitted: any;
  loading: boolean = false;
  Brands;
  constructor(private Auth: AuthService, public location: Location, private ups: UrbanPipeService
    , private router: Router) {
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;
  }

  ngOnInit() {
    setHeightWidth();
    this.getStores();
    this.obj = { city: '', name: '', address: '', ref_id: '', included_platforms: [], ordering_enabled: true, active: true };
    this.GetBrands();
  }

  GetUpStore(Id) {
    console.log(Id)
    // this.Auth.GetUpStoresById(Id).subscribe(data => {
    //   console.log(data);
    // });
  }

  getStores() {
    this.Auth.getStores(this.CompanyId).subscribe(x => {
      this.stores = x;
      var response: any = x
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
      }
    });
  }
  GetBrands() {
    this.Auth.GetBrand(this.CompanyId).subscribe(data => {
      console.log(data);
      this.Brands = data;
    });
  }
  setBrand(id) {
    // console.log(id,this.indicator,this.obj)
    if(id > 0) {
      this.obj.ref_id =  id + '-' + JSON.parse(this.indicator).Id
    } else {
      this.obj.ref_id =  JSON.parse(this.indicator).Id.toString()
    }
    console.log(this.obj)
  }
  setStore(str) {
    var store = JSON.parse(str);
    this.LocationName = store.Name;
    this.obj = { city: store.City, name: this.LocationName, address: store.Address, ref_id: store.Id.toString(), included_platforms: [], ordering_enabled: true, active: true };
  }
  includeplatforms(bool, platform) {
    if (bool) {
      this.obj.included_platforms.push(platform);
    } else {
      this.obj.included_platforms = this.obj.included_platforms.filter(x => x != platform);
    }
  }
  AddLocation() {
    if (this.indicator == 0) {
      alert("Select a store.");
      return;
    }
    if (this.obj.included_platforms.length == 0) {
      alert("Select atleast one platform to include.");
      return;
    }
    this.loading = true;
    this.data.stores.push(this.obj);
    console.log(JSON.stringify(this.data));
    // this.Auth.tasktest().subscribe(data => {console.log(data);},error => {console.log(dangertoast(error.statusText));})
    // return;
    this.Auth.AddStore(JSON.stringify(this.data)).subscribe(data => {
      this.loading = false;
      console.log(data);
      this.router.navigate(["/urban"]);
    },
      error => {
        this.loading = false;
        console.log(error);
        console.log(dangertoast(error.statusText));
      });
  }
}
