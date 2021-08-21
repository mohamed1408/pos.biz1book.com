import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-paymenttype',
  templateUrl: './paymenttype.component.html',
  styleUrls: ['./paymenttype.component.scss']
})
export class PaymenttypeComponent implements OnInit {
  companyid: number;
  loginfo: any;
  paymenttypes:any = [];
  constructor(private auth: AuthService) {
    this.loginfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.companyid = this.loginfo.CompanyId;
  }

  ngOnInit() {
    this.getpaymenttypes();
  }

  getpaymenttypes() {
    this.auth.getpaymenttypes(this.companyid).subscribe(data => {
      this.paymenttypes = data;
    })
  }
}
