import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.scss']
})
export class PendingOrderComponent implements OnInit {

  CompanyId: number = 3;
  orders: any;
  orderItems: any;
  transactions: any;
  data: any;
  orderid: any;
  total: any;
  constructor(private Auth: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
    this.Getpendingorder()
    // this.getOrderItems()   
    // this.getTransaction()

  }

  Getpendingorder() {
    this.Auth.getpendingorder(this.CompanyId).subscribe(data => {
      this.orders = data["Orders"];
      console.log(this.orders)
    })
  }
  getOrderItems(OrderId, modalRef) {
    console.log(this.orderid)
    this.Auth.getOrderId(OrderId).subscribe(data => {
      this.orderItems = data["Orders"]
      console.log(this.orderItems)
      this.getTransaction(OrderId, modalRef)
    })
  }
  getTransaction(OrderId, modalRef) {
    this.Auth.getTransactionId(OrderId).subscribe(data => {
      this.transactions = data["Transactions"]
      console.log(this.transactions)
      this.openDetailpopup(modalRef)
    })
    
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


}
