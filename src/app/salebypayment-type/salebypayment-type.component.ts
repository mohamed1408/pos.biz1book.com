import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from "moment";
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-salebypayment-type',
  templateUrl: './salebypayment-type.component.html',
  styleUrls: ['./salebypayment-type.component.scss']
})
export class SalebypaymentTypeComponent implements OnInit {
  @ViewChild('auto', { static: true }) auto;
  startdate: any;
  enddate: any;
  StoreId: number;
  CompanyId: number;
  stores: any;
  status: number;
  key: string = "Name";
  storepayment: any = [];
  onlinepayment: any = [];
  transpayment: any = [];
  paymenttype: any = [];
  value = 0;
  changetransaction: any = { paymenttype: "", amount: 0 }
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  selected: any;
  errorMsg: string = '';
  constructor(private Auth: AuthService) {
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.storeId;
  }

  ngOnInit() {
    this.GetStore();
    this.getstorepaymentsbytype();
  }
  GetStore() {
    this.Auth.GetStoreName3(this.CompanyId).subscribe(data => {
      this.stores = data;
      this.stores = this.stores.filter(x => x.Name)
      var response: any = data
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        // console.log(dangertoast(this.errorMsg));

      }

    })
  }
  date(e) {
    this.startdate = e.startDate.format('YYYY-MM-DD')
    this.enddate = e.endDate.format('YYYY-MM-DD')
    // console.log(this.startdate,this.enddate)
  }
  selectEvent(e) {
    this.StoreId = e.Id;
  }
  getstorepaymentsbytype() {
    this.Auth.getstorepaymentsbytype(this.StoreId, this.CompanyId, this.startdate, this.enddate).subscribe(data => {
      console.log(data)
      this.storepayment = data['pos_transactions'];
      this.onlinepayment = data['sw_zm_transactions']
      this.transpayment = [];
    })
  }
  transaction: any = [];
  gettransactionsbytype(sourceid, ptypeid, transaction) {
    this.transaction = transaction
    // console.log(this.transaction)
    this.Auth.gettransactionsbytype(this.StoreId, this.CompanyId, this.startdate, this.enddate, sourceid, ptypeid).subscribe(data => {
      this.transpayment = data['transactions'];
      this.paymenttype = data["paymenttypes"]
      // console.log(this.transpayment)

    })
  }
  updatetransaction() {
    this.Auth.savetransaction(this.transaction).subscribe(data => {
      // console.log(data)
      this.getstorepaymentsbytype();
    })
  }

  clearsale() {
    this.transpayment = [];
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

