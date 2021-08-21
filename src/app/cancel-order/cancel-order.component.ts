import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.scss']
})
export class CancelOrderComponent implements OnInit {
  companyId: number
  invoiceno: string
  orders = []
  orderstatus = {
    "-1":{name:"Cancelled"},
    "1":{name:"Accepted"},
    "3":{name:"Food Ready"},
    "4":{name:"Dispatched"},
    "5":{name:"Completed"},
    "0":{name:"Placed"}
  }
  ordertype = {
    "1":{name:"Dine In"},
    "2":{name:"Take Away"},
    "3":{name:"Delivery"},
    "4":{name:"Pick Up"},
    "5":{name:"Quick Order"},
    "6":{name:"Online Order"}
  }
  constructor(private auth: AuthService) {
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.companyId = logInfo.CompanyId
  }

  ngOnInit() { }
  temporder;

  selectorder(order) {
    this.temporder = order
  }

  getorderbyinvoiceno() {
    this.auth.getorderbyinvoice(this.invoiceno, this.companyId).subscribe(data => {
      console.log(data)
      this.orders = data["orders"]
      this.orders.forEach(order => {
        order.Payload = JSON.parse(order.OrderJson)
        order.Payload.OrderId = order.Id
        order.status = this.orderstatus[order.OrderStatusId.toString()].name
        order.type = this.ordertype[order.OrderTypeId.toString()].name
      })
    })
  }

  cancel(order) {
    order.OrderStatusId = -1
    this.auth.cancelorder(order.OrderId, order).subscribe(data => {
      console.log(data)
      this.orders = []
      this.invoiceno = ''
    })
  }
}
