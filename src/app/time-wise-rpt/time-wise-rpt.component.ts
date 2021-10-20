import * as moment from "moment";
import { AuthService } from '../auth.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AmazingTimePickerService, AmazingTimePickerModule } from 'amazing-time-picker';
import { dangertoast } from 'src/assets/dist/js/toast-data';
declare function setHeightWidth(): any;

export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  // SPACE = 32
}

@Component({
  selector: 'app-time-wise-rpt',
  templateUrl: './time-wise-rpt.component.html',
  styleUrls: ['./time-wise-rpt.component.css']
})
export class TimeWiseRptComponent implements OnInit {
  @ViewChild('productmodal', { static: false }) private productmodal: ElementRef
  @ViewChild('timeintervalmodal', { static: false }) private timeintervalmodal: ElementRef

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.sliderControl && Object.values(KEY_CODE).includes(event.keyCode)) {
      var timeSlider = document.getElementById("timeSlider")
      timeSlider.focus()
    } else if(this.sliderControl && (event.keyCode == 90 && event.ctrlKey) || event.keyCode == 46) {
      this.timeintervals.pop()
    }
  }

  sliderControl: boolean
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
  StartTime: string = '10:00';
  EndTime: string = '23:59';
  mytime: Date = new Date();
  sortfield: any;
  x: number;
  y: number;
  product: any;
  categ: any;
  prd: string = "All"
  key2 = 'Name';
  productId: number = 0;
  categoryId: any = 0;
  term;
  showloading = true;
  show: boolean = true;
  presets = [{
    Id: 1,
    report_type: "time_wise",
    preset_name: "half-day",
    preset: "",
    preset_raw: {
      date: "today",
      startTime: "10:30",
      endTime: "22:30",
      interval: 360
    }
  }, {
    Id: 1,
    report_type: "time_wise",
    preset_name: "30 mins",
    preset: "",
    preset_raw: {
      date: "today",
      startTime: "10:30",
      endTime: "22:30",
      interval: 30
    }
  }]

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
  sliderVal = 0
  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }

  constructor(
    private Auth: AuthService,
    private modalService: NgbModal,
    private atp: AmazingTimePickerService,
    private modalS: NgbModal) {
    this.alwaysShowCalendars = true;
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;

  }

  ngOnInit() {
    this.GetStore();
    this.GetProduct();
    this.getCategory();
    this.getSaleProducts()
    var date = new Date();
    this.startdate = moment()
    this.enddate = moment()
    this.All();
  }
  saleProductId = 0
  saleProducts = []

  getSaleProducts() {
    this.Auth.getSaleProducts(this.CompanyId).subscribe(data => {
      console.log(data)
      var response: any = data

      this.saleProducts = response.products;
    });
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
      var obj = { Id: 0, Name: "All", ParentStoreId: null, ParentStore: null, IsMainStore: false }
      this.stores.unshift(obj);
      this.storeId = this.stores[0].Id
      this.str = this.stores[0].Name
      console.log(this.stores);
    })
  }

  All() {
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    var frmTime = moment(this.startdate).format("LTS");
    var ToTime = moment(this.enddate).format("LTS");
    console.log(this.storeId, frmdate, todate, this.Interval, frmTime, ToTime);
    this.Auth.TimeSalesRpt(this.storeId, frmdate, todate, frmTime, ToTime, this.Interval, this.sourceId, this.productId, this.categoryId, this.saleProductId, this.CompanyId).subscribe(data => {
      this.salesrpt = data;
      console.log(this.salesrpt);
      this.showloading = false
    });

  }
  Intervalhours: number = 7;
  Intervalmins: number = 0
  Submit() {
    // if (this.startdate.hasOwnProperty("month")) {
    //   this.startdate.month = this.startdate.month - 1;
    //   this.enddate.month = this.enddate.month - 1;
    // }
    console.log(this.Intervalhours, this.Intervalmins)
    if (!this.Intervalhours) this.Intervalhours = 0;
    if (!this.Intervalmins) this.Intervalmins = 0;
    if (this.StartTime.includes('AM')) this.StartTime = this.StartTime.replace(' AM', '')
    if (this.StartTime.includes('PM')) {
      this.StartTime = this.StartTime.replace(' PM', '')
      var str_arr = this.StartTime.split(':')
      this.StartTime = ((+str_arr[0]) + 12).toString() + ':' + str_arr[1]
    }
    if (this.EndTime.includes('AM')) this.EndTime = this.EndTime.replace(' AM', '')
    if (this.EndTime.includes('PM')) {
      this.EndTime = this.EndTime.replace(' PM', '')
      var str_arr = this.EndTime.split(':')
      this.EndTime = ((+str_arr[0]) + 12).toString() + ':' + str_arr[1]
    }
    console.log(this.StartTime)
    this.show = true;
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    if (this.Intervalhours == 0 && this.Intervalmins == 0) {
      this.calculateinterval()
    }
    console.log(this.storeId, frmdate, todate, this.Interval, this.StartTime, this.EndTime, this.sourceId, this.categoryId, this.productId);
    const interval = this.Intervalhours * 60 + this.Intervalmins
    this.Auth.TimeSalesRpt(this.storeId, frmdate, todate, this.StartTime, this.EndTime, interval, this.sourceId, this.productId, this.categoryId, this.saleProductId, this.CompanyId).subscribe(data => {
      this.salesrpt = data;
      console.log(this.salesrpt);
    });
  }
  calculateinterval() {
    let endminutes = (+this.EndTime.split(':')[0] * 60) + (+this.EndTime.split(':')[1])
    let startminutes = (+this.StartTime.split(':')[0] * 60) + (+this.StartTime.split(':')[1])
    let intervalmins = endminutes - startminutes
    this.Intervalmins = intervalmins % 60
    this.Intervalhours = (intervalmins - this.Intervalmins) / 60
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
      this.product.unshift(obj);
      console.log(this.product)
    })
  }

  Timeprd(strttime, endtime, storeId) {
    console.log(strttime, endtime)
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");
    this.Auth.gettimeprd(this.CompanyId, frmdate, todate, this.sourceId, storeId, this.StartTime, this.EndTime).subscribe(data => {
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

  openDetailpopup(contentdetail) {
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
  reportProducts = []
  reportProductsTotal = { quantity: 0 }
  viewproducts(reportdata) {
    this.reportProductsTotal = { quantity: 0 }

    console.log(reportdata)
    if (reportdata.StartTime.includes('AM')) reportdata.StartTime = reportdata.StartTime.replace(' AM', '')
    if (reportdata.StartTime.includes('PM')) {
      reportdata.StartTime = reportdata.StartTime.replace(' PM', '')
      var str_arr = reportdata.StartTime.split(':')
      reportdata.StartTime = ((+str_arr[0]) + 12).toString() + ':' + str_arr[1]
    }
    if (reportdata.EndTime.includes('AM')) reportdata.EndTime = reportdata.EndTime.replace(' AM', '')
    if (reportdata.EndTime.includes('PM')) {
      reportdata.EndTime = reportdata.EndTime.replace(' PM', '')
      var str_arr = reportdata.EndTime.split(':')
      reportdata.EndTime = ((+str_arr[0]) + 12).toString() + ':' + str_arr[1]
    }
    var frmdate = moment(this.startdate).format("YYYY-MM-DD");
    var todate = moment(this.enddate).format("YYYY-MM-DD");

    this.Auth.getTimeWiseProducts(this.storeId, frmdate, todate, reportdata.StartTime, reportdata.EndTime, this.sourceId, this.productId, this.saleProductId, this.CompanyId).subscribe(data => {
      console.log(data)
      this.reportProducts = data["products"]
      this.reportProducts.forEach(prod => {
        this.reportProductsTotal.quantity += prod.Quantity * prod.Factor
      })
      this.modalS.open(this.productmodal)
    })
  }

  focusAutocomplete() {
    var xPathResult = document.evaluate('//*[@id="maindiv"]/app-root/app-time-wise-rpt/div/div/div[2]/div/section/div[1]/div[1]/ng-autocomplete/div/div[1]/input', document, null, null, null);
    var element = null
    if (xPathResult) {
      element = xPathResult.iterateNext();
    }
    element.focus();
  }

  focusedAutocomplete() {
    var xPathResult = document.evaluate('//*[@id="maindiv"]/app-root/app-time-wise-rpt/div/div/div[2]/div/section/div[1]/div[9]/ng-autocomplete/div/div[1]/input', document, null, null, null);
    var element = null
    if (xPathResult) {
      element = xPathResult.iterateNext();
    }
    element.focus();
  }

  openDrawer() {
    let doc = document.getElementsByClassName('hk-wrapper')[0]
    doc.classList.toggle("hk-settings-toggle")
  }

  setBubble() {
    let percentage = (this.sliderVal / 1440) * 100
    document.getElementById("bubble").style.left = `calc(${percentage}% - 0px)`
  }
  timeintervals = []
  fromInt: number = null;
  toInt: number = null;
  openTimeIntervalModal() {
    const modalRef = this.modalS.open(this.timeintervalmodal)
    this.sliderControl = true
    modalRef.result.then((data) => {
      // on close
      // console.log(data)
      this.sliderControl = false
    }, (reason) => {
      // on dismiss
      // console.log(reason)
      this.sliderControl = false
    });
  }

  addInterval() {
    if (this.fromInt == null) this.fromInt = this.sliderVal
    else if (this.fromInt > 0 && this.sliderVal <= this.fromInt) this.fromInt = this.sliderVal
    else this.toInt = this.sliderVal

    if (this.fromInt && this.toInt) {
      if (!this.timeintervals.includes({ from: this.fromInt, to: this.toInt }))
        this.timeintervals.push({ from: this.fromInt, to: this.toInt })
      this.fromInt = null
      this.toInt = null
    }
    console.log(this.timeintervals)
    // if (!this.timeintervals.includes(this.sliderVal))
    //   this.timeintervals.push(this.sliderVal)
    // this.timeintervals = this.timeintervals.sort((a, b) => a - b)
  }

  deleteInterval(interval) {
    this.timeintervals = this.timeintervals.filter(x => x != interval)
    this.timeintervals = this.timeintervals.sort((a, b) => a - b)
  }
}
