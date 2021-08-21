import { Component, OnInit } from '@angular/core';
// import moment from 'dist/biz1book/assets/vendors/moment/moment';
import { dangertoast } from 'src/assets/dist/js/toast-data';
import { AuthService } from '../auth.service';
declare function dashboard_data(storeId): any;
import * as moment from "moment";



@Component({
  selector: 'app-multi-companies',
  templateUrl: './multi-companies.component.html',
  styleUrls: ['./multi-companies.component.scss']
})
export class MultiCompaniesComponent implements OnInit {
  loginInfo: any;
  usercompanies: any = [];
  payments: any;
  newcustomers: any;
  totalsale: any;
  totalbill = 0;
  noofbills = 0;
  stores: any = [];
  errorMsg: any;
  startdate: any;
  enddate: any;
  show = 1;
  storeid = 0;
  selected: any = [moment(), moment()];
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  constructor(private Auth: AuthService) { }

  ngOnInit() {
    this.startdate = moment().format('YYYY-MM-DD')
    this.enddate = moment().format('YYYY-MM-DD')
    this.loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.getusercompany();
    this.getdashboard();
  }
  getusercompany() {
    this.Auth.getusercompanies(this.loginInfo.Id).subscribe(data => {
      this.usercompanies = data["userCompanies"]
      // console.log(this.usercompanies)
    })
  }
  dashboarddata
  CompanyId: number
  fetchdata(companyid){
    this.CompanyId = companyid
    this.getdashboard()
    this.GetStores()
    this.show = 2;
  }
  getdashboard() {
    this.Auth.getdashboardbycompany(this.startdate, this.enddate, this.CompanyId, this.storeid).subscribe(data => {
      // console.log(data)
      this.dashboarddata = data
      this.totalbill = 0
      this.noofbills = 0
      this.payments = data["Payments"]
      this.newcustomers = data["NewCustomers"]
      this.totalsale = data["TotalSales"]
      this.totalsale.forEach(element => {
        this.totalbill += element.TotalSales
        this.noofbills += element.NoOfBills
      });
    })
  }
  storechange(storeId) {
    this.storeid = storeId
    this.getdashboard()
  }
  GetStores() {
    console.log("getting  store")
    this.Auth.GetStores(this.CompanyId).subscribe(data => {
      this.stores = data;
      this.stores.unshift({ Id: 0, Name: 'All' })
    });
  }
  date(e) {
    this.startdate = e.startDate.format('YYYY-MM-DD')
    this.enddate = e.endDate.format('YYYY-MM-DD')
    this.getdashboard()

    // console.log(this.startdate,this.enddate)
  }
  // back() {
  //   this.selected = { startDate: moment(), endDate: moment() }
  //   this.startdate = moment().format('YYYY-MM-DD')
  //   this.enddate = moment().format('YYYY-MM-DD')
  //   this.storeid = 0
  // }


}
