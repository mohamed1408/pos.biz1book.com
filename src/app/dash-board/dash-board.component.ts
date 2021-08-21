import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { toast } from '../../assets/dist/js/toast-data'
import { DataService } from '../service/data.service';
import { idbService } from "../service/idb.service";
import * as moment from "moment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
// import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { AuthService } from '../auth.service';
import { Address } from 'cluster';
import { LoaderService } from '../service/loader.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
declare function dashboard_data(storeId): any;

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  CompanyId: any;
  stores: any;
  isloading: boolean = false;
  constructor(private datService: DataService, private IDB: idbService, private http: Http,
    private Auth: AuthService, public loaderService: LoaderService, private modalService: NgbModal, public router: Router) {
    var loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = loginInfo.CompanyId;
  }


  ngOnInit() {
    this.loadScripts();
    this.GetStores();
  }

  GetStores() {
    this.Auth.GetStores(this.CompanyId).subscribe(data => {
      this.stores = data;
      this.stores.unshift({ Id: 0, Name: 'All' })
    });
  }

  loadScripts() {
    const dynamicScripts = [
      "../../assets/vendors/moment/min/moment.min.js",
      "../../assets/vendors/daterangepicker/daterangepicker.js",
      "../../assets/dist/js/daterangepicker-data.js"
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

  storechange(storeId) {
    dashboard_data(storeId)
  }

  loader() {
    if (this.isloading) {
      this.loaderService.hide();
      this.isloading = false;
    } else {
      this.loaderService.show();
      this.isloading = true;
    }
  }

}
