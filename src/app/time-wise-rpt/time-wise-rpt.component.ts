import * as moment from "moment";
import { AuthService } from '../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AmazingTimePickerService, AmazingTimePickerModule } from 'amazing-time-picker';
import { dangertoast } from 'src/assets/dist/js/toast-data';
declare function setHeightWidth(): any;

@Component({
  selector: 'app-time-wise-rpt',
  templateUrl: './time-wise-rpt.component.html',
  styleUrls: ['./time-wise-rpt.component.css']
})
export class TimeWiseRptComponent implements OnInit {
  model: any = {};
  value = "na";
  CompanyId: number;
  alwaysShowCalendars: boolean;
  startdate: any;
  enddate: any;
  sourceId = 0;
  stores: any;
  errorMsg: string = '';
  status: number;
  storeId: any = 0;
  key = 'Name';
  salesrpt: any;
  str: string = "All";
  Interval = 0;
  StartTime: any;
  EndTime: any;
  mytime: Date = new Date();
  sortfield: any;
  x: number;
  y: number;
  product: any;
  categ: any;
  prd: string = "All"
  key2 = 'Name';
  productId: any;
  categoryId: any = 0;
  term;
  showloading = true ;
  show: boolean = true;

  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  selected: any = { startDate: moment(), endDate: moment() };
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];
  select;
  key4;
  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }

  constructor(private Auth: AuthService, private modalService: NgbModal, private atp: AmazingTimePickerService) {
    this.alwaysShowCalendars = true;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;

  }

  ngOnInit() {
    this.GetStore();
    this.GetProduct();
    this.getCategory();
    var date = new Date();
    this.startdate = moment().format('YYYY-MM-DD')
    this.enddate = moment().format('YYYY-MM-DD')
this.All();
  }


  date(e) {
    console.log(e)
    if (e.startDate != null && e.endDate != null) {
      this.startdate = e.startDate.format('YYYY-MM-DD')
      this.enddate = e.endDate.format('YYYY-MM-DD')
    }
  }
  selectEvent(e) {
    this.storeId = e.Id;
  }

  GetStore() {
    this.Auth.GetStoreName(this.CompanyId).subscribe(data => {
      this.stores = data;
      var obj = { Id: 0, Name: "All", ParentStoreId: null, ParentStore: null, IsMainStore: false}
      this.stores.push(obj);
      console.log(this.stores);
    })
  }

All()
{
  var frmdate = moment(this.startdate).format("YYYY-MM-DD");
  var todate = moment(this.enddate).format("YYYY-MM-DD");
  var frmTime = moment(this.startdate).format("LTS");
  var ToTime = moment(this.enddate).format("LTS");
  console.log(this.storeId,frmdate,todate,this.Interval,frmTime,ToTime);
  this.Auth.TimeSalesRpt(this.storeId, frmdate, todate,frmTime,ToTime,this.Interval,this.sourceId,this.productId,this.categoryId).subscribe(data => {
    this.salesrpt = data;
    console.log(this.salesrpt);
    this.showloading = false
  });

}
Intervalhours;
Intervalmins
Submit()
{
  // if (this.startdate.hasOwnProperty("month")) {
  //   this.startdate.month = this.startdate.month - 1;
  //   this.enddate.month = this.enddate.month - 1;
  // }
  console.log(this.Intervalhours, this.Intervalmins)
  if(!this.Intervalhours) this.Intervalhours = 0;
  if(!this.Intervalmins) this.Intervalmins = 0;
  if(this.StartTime.includes('AM')) this.StartTime = this.StartTime.replace(' AM', '')
  if(this.StartTime.includes('PM')) {
    this.StartTime = this.StartTime.replace(' PM', '')
    var str_arr = this.StartTime.split(':')
    this.StartTime = ((+str_arr[0]) + 12).toString() + ':' + str_arr[1]
  }
  if(this.EndTime.includes('AM')) this.EndTime = this.EndTime.replace(' AM', '')
  if(this.EndTime.includes('PM')) {
    this.EndTime = this.EndTime.replace(' PM', '')
    var str_arr = this.EndTime.split(':')
    this.EndTime = ((+str_arr[0]) + 12).toString() + ':' + str_arr[1]
  }
  console.log(this.StartTime)
  this.show = true;
  var frmdate = moment(this.startdate).format("YYYY-MM-DD");
  var todate = moment(this.enddate).format("YYYY-MM-DD");
  console.log(this.storeId,frmdate,todate,this.Interval,this.StartTime,this.EndTime,this.sourceId,this.categoryId,this.productId);
  this.Auth.TimeSalesRpt(this.storeId, frmdate, todate,this.StartTime,this.EndTime,this.Intervalhours*60+this.Intervalmins,this.sourceId, this.productId,this.categoryId).subscribe(data => {
    this.salesrpt = data;
    console.log(this.salesrpt);
  });
}

  sortsettings(field) {
    if (this.sortfield == field) {
      this.x = this.x * -1;
      this.y = this.y * -1;
    } else {
      this.sortfield = field;
      this.x = -1;
      this.y = 1;
    }
  }

  getCategory() {
    this.Auth.getcat(this.CompanyId).subscribe(data => {
      this.categ = data;
      console.log(this.categ);
    })
  }
  GetProduct() {
    this.Auth.getcatprd(this.CompanyId).subscribe(data => {
      this.product = data;
      var obj = { Id: 0, Name: "All", ParentCategoryId: null }
      this.product.push(obj);
      console.log(this.product)
    })
  }

Timeprd(strttime,endtime,storeId)
{
  console.log(strttime,endtime)
  var frmdate = moment(this.startdate).format("YYYY-MM-DD");
  var todate = moment(this.enddate).format("YYYY-MM-DD");
  this.Auth.gettimeprd(this.CompanyId,frmdate,todate,this.sourceId,storeId,this.StartTime,this.EndTime).subscribe(data => {
    this.product = data;
    console.log(this.product)
  })
 
}

get sortData() {
  return this.salesrpt.Order.sort((a, b) => {
    if (a[this.sortfield] < b[this.sortfield]) return this.x;
    else if (a[this.sortfield] > b[this.sortfield]) return this.y;
    else return 0;
  });
}



  open(ev: any) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.StartTime = moment(time).format("HH:MM AM");
      console.log(time);
    });
  }
  close(ev: any) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.EndTime = time;
      console.log(this.EndTime);
    });
  }



  selectedEvent(e) {
    this.productId = e.Id;
  }

  openDetailpopup(contentdetail)
  {
   const modalRef = this.modalService
     .open(contentdetail, {
       ariaLabelledBy: "modal-basic-title",
       centered: true
     })
     .result.then(
       result => {
       },
       reason => {
       }
     );

 }
 focusAutocomplete() {
  var xPathResult = document.evaluate('//*[@id="maindiv"]/app-root/app-time-wise-rpt/div/div/div[2]/div/section/div[1]/div[1]/ng-autocomplete/div/div[1]/input', document, null, null, null);
  var element = null
  if (xPathResult) {
    element = xPathResult.iterateNext();
  }
  element.focus();
}
focusedAutocomplete(){
  var xPathResult = document.evaluate('//*[@id="maindiv"]/app-root/app-time-wise-rpt/div/div/div[2]/div/section/div[1]/div[9]/ng-autocomplete/div/div[1]/input', document, null, null, null);
  var element = null
  if (xPathResult) {
    element = xPathResult.iterateNext();
  }
  element.focus();
}



}
