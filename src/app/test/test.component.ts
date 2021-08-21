import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  ResponseResetForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  resetToken: null;
  CurrentState: any;
  IsResetFormValid = true;
  public data: any = [
    {"userId": 2,"id": 21,"title": "suscipit repellat esse quibusdam voluptatem incidunt","completed": false},
  ];
  orders = [];
  statuses = [];
  orderswebhooks = [];
  statuseswebhooks = [];
  payload = '';
  constructor(
    private auth: AuthService,
    private fb: FormBuilder) {

  }
  name = "";
  dtOptions: any = {};
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print', 'pdf'
      ]
    };
  }
  getproducts() {
    this.auth.test().subscribe(data => {
      this.data = data;
    })
  }
  // getwebhooks() {
  //   this.auth.getOrderwebhooks(this.orderwebhookoptions).subscribe(data => {
  //     // console.log('ORDERS',data)
  //     this.orderswebhooks = data["aaData"]
  //     this.orderswebhooks.forEach(order => {
  //       this.auth.getwebhookdata(order.delivery_id).subscribe(data => {
  //         this.orders.push(JSON.parse(data['payload']))
  //       })
  //     })
  //     console.log('ORDERS', this.orders)
  //   })
  //   this.auth.getStatuswebhooks(this.statuswebhookoptions).subscribe(data => {
  //     // console.log('STATUSES',data)
  //     this.statuseswebhooks = data["aaData"]
  //     this.statuseswebhooks.forEach(status => {
  //       this.auth.getwebhookdata(status.delivery_id).subscribe(data => {
  //         this.statuses.push(JSON.parse(data['payload']))
  //       })
  //     })
  //     console.log('STATUSES', this.statuses)
  //   })
  // }
  // getwebhookdata(delivery_id) {
  //   this.auth.getwebhookdata(delivery_id).subscribe(data => {
  //     console.log(data)
  //   })
  // }
}