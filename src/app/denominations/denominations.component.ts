import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as moment from 'moment'
declare function setHeightWidth(): any;

@Component({
  selector: 'app-denominations',
  templateUrl: './denominations.component.html',
  styleUrls: ['./denominations.component.scss']
})
export class DenominationsComponent implements OnInit {
  @ViewChild('copy_data_modal', { static: true }) copy_data_modal: ElementRef

  model: NgbDateStruct
  companyid: number
  stores: any = []
  loginfo
  storeid: number = 0
  smodel = ''
  entrytypeid: number = null
  date: { year: number; month: number }
  entrytypes = [
    { id: null, type: 'All' },
    { id: 1, type: 'Send to Store' },
    { id: 2, type: 'Closing' }
  ]
  displaydate = moment().format('Do MMM YYYY')
  showcalender = false
  denomentries = []
  copydata = ''
  constructor(private auth: AuthService, private calendar: NgbCalendar, private modalService: NgbModal) {
    this.loginfo = JSON.parse(localStorage.getItem('loginInfo'))
    this.companyid = this.loginfo.CompanyId
  }

  ngOnInit() {
    this.model = this.calendar.getToday()
    setHeightWidth()
    this.getstores()
  }

  onDateSelect(date: NgbDate) {
    console.log(date)
    this.model = date
    this.displaydate = moment(`${date.year}-${date.month}-${date.day}`).format('Do MMM YYYY')
    this.showcalender = false
    // this.fetchEntries(`${date.year}-${date.month}-${date.day}`)
  }

  getstores() {
    this.auth.getStores(this.companyid).subscribe(data => {
      console.log(data)
      this.stores = data
    })
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      map(term =>
        term === ''
          ? []
          : this.stores
            .filter(v => v.Name.toLowerCase().indexOf(term.toLowerCase()) > -1)
            .slice(0, 10),
      ),
    )

  formatter = (x: { Name: string }) => x.Name

  selectedItem(store) {
    console.log(store)
    this.storeid = store.Id
  }
  totalexcess = 0
  totalshortage = 0
  total = 0
  copy_raw_data: Array<{ store: string, user: string, remarks: string, time: string }> = [];
  fetchdenomentries() {
    this.totalexcess = 0
    this.totalshortage = 0
    this.total = 0
    this.copy_raw_data = [{ store: 'Store', user: 'User', remarks: 'Remarks', time: 'time' }]
    var date = `${this.model.year}-${this.model.month}-${this.model.day}`
    this.auth.fetchDenominationEntries(this.storeid, date, this.companyid, this.entrytypeid).subscribe(data => {
      console.log(data)
      this.denomentries = data["data"]
      this.denomentries = this.denomentries.sort((a, b) => { return a.Id - b.Id })
      var olddiff = 0
      this.denomentries.forEach((dentry, index) => {
        dentry.edited = false
        dentry.CashInTransaxns = dentry.CashInJson ? JSON.parse(dentry.CashInJson) : []
        dentry.CashOutTransaxns = dentry.CashOutJson ? JSON.parse(dentry.CashOutJson) : []
        dentry.SalesTransaxns = dentry.TransactionJson ? JSON.parse(dentry.TransactionJson) : []
        dentry.diff = dentry.TotalAmount - dentry.ExpectedBalance
        dentry.Remarks = dentry.diff == 0 ? 'Tallied' : dentry.diff > 0 ? 'Excess' : 'Shortage'
        if (index > 0 && this.storeid > 0)
          dentry.compared_value = dentry.diff - olddiff
        olddiff = dentry.diff
        dentry.storename = this.stores.filter(x => x.Id == dentry.StoreId)[0].Name
        if (this.denomentries.some(x => x.EditedForId == dentry.Id)) {
          dentry.edited = true
          dentry.editid = this.denomentries.filter(x => x.EditedForId == dentry.Id)[0].Id
        } else {
          this.totalexcess += dentry.diff > 0 ? dentry.diff : 0
          this.totalshortage += dentry.diff < 0 ? dentry.diff : 0
        }
        var obj = { store: dentry.storename, user: dentry.UserName, remarks: dentry.diff + ' ' + dentry.Remarks, time: moment(dentry.EntryDateTime).format('HH:MM A') }
        this.copy_raw_data.push(obj)
      })
      this.total = this.totalexcess + this.totalshortage
      this.denomentries = this.denomentries.sort((a, b) => { return b.Id - a.Id })
    })
  }
  opencopymodal() {
    var max_store_len = 0
    var max_user_len = 0
    this.copy_raw_data.forEach(data => {
      if (data.store.length > max_store_len) max_store_len = data.store.length
      if (data.user.length > max_user_len) max_user_len = data.user.length
    })
    max_store_len = max_store_len + 1
    max_user_len = max_user_len + 1
    this.copy_raw_data.forEach(data => {
      if (data.store.length < max_store_len) {
        var diff = max_store_len - data.store.length
        data.store = data.store + '-'.repeat(diff)
      }
      if (data.user.length < max_user_len) {
        var diff = max_user_len - data.user.length
        data.user = data.user + '-'.repeat(diff)
      }
      this.copydata += data.store + data.user + data.remarks + '--' + data.time + '\n\n'
    })
    this.modalService.open(this.copy_data_modal, { centered: true, size: 'lg' })
  }
}