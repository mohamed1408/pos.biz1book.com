import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UrbanPipeService } from '../service/urban-pipe.service';
import { dangertoast } from 'src/assets/dist/js/toast-data';
import { UppayloadModule } from './uppayload.module';

@Component({
  selector: 'app-urban-piper',
  templateUrl: './urban-piper.component.html',
  styleUrls: ['./urban-piper.component.css']
})
export class UrbanPiperComponent implements OnInit {
  Urbandata: any = [];
  CompanyId = 0;
  item: any;
  enble: any = [];
  disble: any = [];
  term;
  p;
  isenable: boolean = true;
  store_ids: any = [];
  platforms: any = [];
  loading: boolean = false;
  swiggy: boolean = false;
  zomato: boolean = false;
  dunzo: boolean = false;
  All: boolean = false;
  urbanpiper: boolean;
  errors: Array<any> = [];
  storeDet;
  // uppayload: UppayloadModule
  constructor(private Auth: AuthService, private modalService: NgbModal, private ups: UrbanPipeService) {
    var loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = loginInfo.CompanyId;

  }

  ngOnInit() {
    this.GetIndex();
  }

  GetIndex() {
    this.Auth.urbandata(this.CompanyId).subscribe(data => {
      this.Urbandata = data;
      this.Urbandata.forEach(element => {
        element.checked = false;
      });
    });
  }

  select_all(e) {
    if (e) {
      this.Urbandata.forEach(element => {
        element.checked = true;
      });
    } else {
      this.Urbandata.forEach(element => {
        element.checked = false;
      });
    }
  }

  setplatform(e, platform) {
    if (e) {
      this.platforms.push(platform);
    } else {
      this.platforms = this.platforms.filter(x => x != platform);
    }
  }

  action() {
    var payload = [];
    this.errors = [];
    this.loading = true;
    var element = document.getElementById('modalclose') as HTMLElement
    this.Urbandata.forEach(element => {
      if (element.checked) {
        var obj = { location_ref_id: element.StoreId.toString(), platforms: this.platforms, action: (this.isenable) ? 'enable' : 'disable' };
        payload.push(obj);
      }
    });
    this.Auth.storeAction({ value: JSON.stringify(payload) }).subscribe(data => {
      var response: any = data;
      response.forEach(element => {
        if (element.status == "error") {
          var store = this.Urbandata.filter(x => x.StoreId == +element.storeid)[0].LocationName;
          element.message = element.message.replace(/Location/gi, store + " is");
          console.log(element);
          this.errors.push(element);
        }
        else {
          var store = this.Urbandata.filter(x => x.StoreId == +element.storeid)[0].LocationName;
          element.message = `Action for the store '${store}' is completed successfully!`;
          console.log(element);
          this.errors.push(element);
        }
      });
      console.log(this.errors);
      this.loading = false;
      element.click();
      this.swiggy = false;
      this.zomato = false;
      this.dunzo = false;
      this.urbanpiper = false;
      this.All = false;
      this.platforms = [];
      this.GetIndex();
      if (this.errors.length > 0) {
        var button = document.createElement('button');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#errors');
        button.hidden = true;
        document.body.appendChild(button);
        button.click();
      }
    });
  }
  selectval() {
    if (this.Urbandata.some(x => x.checked == true)) {
      return true;
    } else {
      return false;
    }
  }
  enable(e, platform) {
    console.log(e, platform);
    if (e) {
      this.enble.push(platform)
    }
    else {
      var ind = this.enble.findIndex(x => x == platform);
      this.enble.splice(ind, 1);
    }
    console.log(this.enble)
  }
  disable(e, platform) {
    console.log(e, platform);
    if (e) {
      this.disble.push(platform)
    }
    else {
      var ind = this.disble.findIndex(x => x == platform);
      this.disble.splice(ind, 1);
    }
    console.log(this.disble)
  }
  bulk_sync() {
    if (this.Urbandata.some(x => x.checked == true)) {
      this.Auth.Getitem(0, this.CompanyId, 0).subscribe(data => {
        console.log(data, JSON.stringify(data["Products"]));
        var dat: any = data;
        var bulkpayload = [];
        this.Urbandata.filter(x => x.checked == true).forEach(store => {
          var included_platforms = [];
          if (store.IsZomato) {
            included_platforms.push('zomato')
          }
          if (store.IsSwiggy) {
            included_platforms.push('swiggy')
          }
          if (store.IsUrbanPiper) {
            included_platforms.push('urbanpiper')
          }
          if (store.IsDunzo) {
            included_platforms.push('dunzo')
          }
          var obj = { storeid: store.StoreId, brandid: store.BrandId, payload: JSON.stringify(new UppayloadModule(dat.Categories, dat.Products.filter(x => x.StoreId == store.StoreId && x.BrandId == store.BrandId), dat.OptionGroups, dat.Options.filter(x => x.StoreId == store.StoreId), dat.TaxGroups, included_platforms)) }
          bulkpayload.push(obj)
        });
        console.log(bulkpayload)
        this.Auth.bulksync({ catalogue: JSON.stringify(bulkpayload) }, this.CompanyId).subscribe(data => {
          console.log(data);
        })
        // this.uppayload = new UppayloadModule(dat.Categories, dat.Products.filter(x => x.StoreId == 4 && x.BrandId == null), dat.OptionGroups, dat.Options.filter(x => x.StoreId == 4), dat.TaxGroups, ["swiggy", "zomato"])
        // console.log(this.uppayload)
        // console.log(JSON.stringify(this.uppayload))
      });
    } else {
      alert('Select atleast one store')
      return;
    }
  }
  platformAction(storeId) {
    if (this.enble.length == 0 && this.disble.length == 0) {
      alert("No platforms selected");
      return;
    }
    var obj = { location_ref_id: [], platforms: [], action: "" }
    if (this.enble.length > 0) {
      obj.location_ref_id = storeId.toString();
      obj.platforms = this.enble;
      obj.action = "enable";
      this.Auth.storeAction(JSON.stringify(obj)).subscribe(data => {
        console.log(data);
      });
      this.enble = [];
    }
    if (this.disble.length > 0) {
      obj.location_ref_id = storeId.toString();
      obj.platforms = this.disble;
      obj.action = "disable";
      this.Auth.storeAction(JSON.stringify(obj)).subscribe(data => {
        console.log(data);
      });
      this.disble = [];
    }
  }
  storedetails(store) {
    this.storeDet = Object.assign({}, store);
  }
  savechanges(store) {
    var payload = { "stores": [{ "city": "", "name": "", "address": "", "ref_id": "4", "included_platforms": [], "ordering_enabled": true, "active": true }] };
    payload.stores[0].city = store.Store.City;
    payload.stores[0].name = store.LocationName;
    payload.stores[0].address = store.Store.Address;
    payload.stores[0].ref_id = (store.BrandId) ? store.BrandId + "-" + store.StoreId : store.StoreId.toString();
    if (store.IsSwiggy) {
      payload.stores[0].included_platforms.push("swiggy");
    }
    if (store.IsZomato) {
      payload.stores[0].included_platforms.push("zomato");
    }
    if (store.IsDunzo) {
      payload.stores[0].included_platforms.push("dunzo");
    }
    if (store.IsUrbanPiper) {
      payload.stores[0].included_platforms.push("urbanpiper");
    }
    console.log(payload);
    this.Auth.AddStore(JSON.stringify(payload)).subscribe(data => {
      this.loading = false;
      this.GetIndex();
      document.getElementById("updatestoreclose").click();
    },
      error => {
        this.loading = false;
        console.log(error);
        document.getElementById("updatestoreclose").click();
        console.log(dangertoast(error.statusText));
      });
  }
  // openDetailpopup(contentdetail, item) {
  //   this.item = item;
  //   const modalRef = this.modalService
  //     .open(contentdetail, {
  //       ariaLabelledBy: "modal-basic-title",
  //       centered: true
  //     })
  //     .result.then(
  //       result => {
  //       },
  //       reason => {
  //       }
  //     );
  // }

}
