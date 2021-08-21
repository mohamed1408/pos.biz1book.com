import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editcustomer',
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.css']
})
export class EditcustomerComponent implements OnInit {
  mobile = '';
  customer = { firstname: "", lastname: "", mobile: "", usertype: "", email: "" };
  constructor(public location:Location, private _avRoute: ActivatedRoute) {
    this.mobile = this._avRoute.snapshot.params["num"];
   }
   error = [
    { name: 'name', msg: '', status: false },
    { name: 'mobile', msg: '', status: false },
    { name: 'email', msg: '', status: false },
    { name: 'usertype', msg: '', status: false },
  ]
  ngOnInit() {
    console.log(this.mobile)
    var customers = JSON.parse(localStorage.getItem("customerlist"));
    var customer = customers.filter(x => x.mobile == this.mobile)[0];
    this.customer.firstname = customer.name.split(' ')[0]
    this.customer.lastname = customer.name.split(' ')[1]
    this.customer.mobile = customer.mobile;
    this.customer.usertype = customer.usertype;
    this.customer.email = customer.email;
    console.log(this.customer)
  }
  validate() {
    this.error = [
      { name: 'name', msg: '', status: false },
      { name: 'mobile', msg: '', status: false },
      { name: 'email', msg: '', status: false },
      { name: 'usertype', msg: '', status: false },
    ]
    var isvalid = true;
    let reg = /^(?=.*[0-9]).{10,10}$/;
    let email_reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (this.customer.firstname == '') {
      this.error[0].status = true;
      this.error[0].msg = "* First name can't be empty";
      isvalid = false;
    }
    if (this.customer.mobile == '') {
      this.error[1].status = true;
      this.error[1].msg = "* Mobile number can't be empty";
      isvalid = false;
    }
    if (!reg.test(this.customer.mobile)) {
      this.error[1].status = true;
      this.error[1].msg = "* mobile number must be 10 digit and should be in numbers can't be empty";
      isvalid = false;
    }
    if (this.customer.email == '') {
      this.error[2].status = true;
      this.error[2].msg = "* Email can't be empty";
      isvalid = false;
    }
    if (!email_reg.test(this.customer.email)) {
      this.error[2].status = true;
      this.error[2].msg = "* Invalid emailid";
      isvalid = false;
    }
    if (this.customer.usertype == '') {
      this.error[3].status = true;
      this.error[3].msg = "* Select one type";
      isvalid = false;
    }
    if (this.mobile_val(this.customer.mobile)) {
      this.error[1].status = true;
      this.error[1].msg = "* mobile number already exists";
      isvalid = false;
    }
    return isvalid;
  }
  mobile_val(num) {
    var iserror = false;
    var customers = JSON.parse(localStorage.getItem("customerlist"));
    customers.forEach(element => {
      if (element.mobile == num) {
        iserror = true;
      }
    });
    return iserror;
  }
  addcustomer() {
    if (!this.validate()) {
      return
    }
    var customers = JSON.parse(localStorage.getItem("customerlist"));
    var obj = { name: this.customer.firstname + ' ' + this.customer.lastname, mobile: this.customer.mobile, usertype: this.customer.usertype, status: 1 }
    customers.push(obj);
    localStorage.setItem("customerlist", JSON.stringify(customers));
  }

}
