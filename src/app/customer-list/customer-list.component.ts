import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers = [];
  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    this.customers = JSON.parse(localStorage.getItem("customerlist"))

  }
  change_status(mobile, status) {
    this.customers.filter(x => x.mobile == mobile)[0].status = status == 1 ? 0 : 1;
    localStorage.setItem("customerlist", JSON.stringify(this.customers))
  }
}
