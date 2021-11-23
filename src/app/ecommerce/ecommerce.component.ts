import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
// import { SignalrService } from '../services/signalr/signalr.service';
import { HttpClient } from '@angular/common/http';
import { Alert } from 'selenium-webdriver';
// import { IBox, IMapOptions, MarkerTypeId } from "angular-maps";

declare function setHeightWidth(): any;

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss']
})
export class EcommerceComponent implements OnInit {
  logInfo
  companyid: number
  key: string = "Name"
  userid: number
  status: number
  StoreId: number
  orderid: number

  stores: any = []

  lat = 0;
  lng = 0;

  // stores:[
  //   {
  //     id: 1,
  //     name: 'Karapakkam'
  //   }
  // ];



  // countries = [
  //   {
  //     id: 1,
  //     name: '0.5Kg'
  //   },

  // ];
  errorMsg: string = '';

  providers = [];
  orders = [];
  sid;
  forder: number = 0;
  sname;
  fcolor;



  constructor(private auth: AuthService,
    // private signalRS: SignalrService, 
    private http: HttpClient) {
    this.logInfo = JSON.parse(localStorage.getItem("loginInfo"))
    this.companyid = this.logInfo.CompanyId
    this.userid = this.logInfo.UserId

    // this.signalRS.connect()
  }

  ngOnInit() {
    setHeightWidth();
    this.getorders();
    this.getStores();
    // this.signalRS.hubconnection.on('NewOrder', (id) => {
    //   console.log("NEW ORDER")
    //   this.getorders();
    // })
  }

  getorders() {
    // this.http.get<any>('https://localhost:44315/api/Ecommerce/getorders?CompanyId=3')
    this.http.get<any>('https://biz1ecom.azurewebsites.net/api/Ecommerce/Completeorderdetail?companyid=3')
      .subscribe(data => {
        this.orders = data.orders
        console.log("order", data)
        console.log("order 2", this.orders)
      })
  }

  filterorder(i) {
    console.log("my alert", i)
    this.forder = i;
    if (this.forder == 0) {
      this.fcolor = "active"
    }
    else {
      this.fcolor = "normal"
    }
  }

  Clocation(address) {
    console.log("location:", address)
    console.log("latitude:", parseFloat(address.split('_')[0]))
    console.log("longitude:", parseFloat(address.split('_')[1]))
    this.lat = parseFloat(address.split('_')[0])
    this.lng = parseFloat(address.split('_')[1])
  }

  // getstorename(sid)
  // {
  //   console.log("storeid:",sid)
  //   this.http.get<any>('https://localhost:44315/api/Ecommerce/getstoresname?storeid='+sid)
  //   .subscribe(data => {
  //     this.sname = data[0].Name
  //     console.log("StoreList", data)
  //     console.log("StoreList", data[0].Name)
  //    // return data[0].Name
  //   })
  // }

  // this.setState({ latlng: { latitude: parseFloat(res[0].City.split('_')[0]), 
  // longitude: parseFloat(res[0].City.split('_')[1]) } })

  // cancelreasons = [
  //   { id: 1, message: 'item_out_of_stock' },
  //   { id: 2, message: 'store_closed' },
  //   { id: 3, message: 'store_busy' },
  //   { id: 4, message: 'rider_not_available' },
  //   { id: 5, message: 'out_of_delivery_radius' },
  //   { id: 6, message: 'connectivity_issue' },
  //   { id: 7, message: 'total_missmatch' },
  //   { id: 8, message: 'invalid_item' },
  //   { id: 9, message: 'option_out_of_stock' },
  //   { id: 10, message: 'invalid_option' },
  //   { id: 11, message: 'unspecified' },
  // ]
  term = ''
  getStores() {
    this.auth.GetStores(this.companyid).subscribe(data => {
      console.log(data)
      this.stores = data
      this.stores = this.stores.filter(x => x.Name)
      var response: any = data
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        // console.log(dangertoast(this.errorMsg));
      }
    })
  }

  selectEvent(e) {
    this.StoreId = e.Id;
    console.log("store id", this.StoreId)
  }
  temporder: any

  myoid(order) {
    console.log("orderid", order)
    this.orderid = order;
    this.temporder = order
  }

  acceptorder() {
    console.log("StoreID:", this.StoreId)
    console.log("OrderID:", this.orderid)
    // this.auth.orderstatusupdate(this.orderid, this.StoreId).subscribe(data => {
    //   console.log(data)
    //   this.getorders();
    // })

  }

  focusAutocomplete() {
    var xPathResult = document.evaluate('/html/body/div[1]/app-root/app-salebypayment-type/div/div/section/div/div/div/div[1]/div[1]/ng-autocomplete/div/div[1]/input', document, null, null, null);
    var element = null
    if (xPathResult) {
      element = xPathResult.iterateNext();
    }
    element.focus();
  }
}
