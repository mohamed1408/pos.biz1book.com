import { Component, OnInit } from '@angular/core';
import { idbService } from "../service/idb.service";
import { AuthService } from "../auth.service";
//import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder , FormControl} from '@angular/forms';
import { RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import * as moment from "moment";
import { ActivatedRoute } from '@angular/router';
import { dangertoast, toast } from 'src/assets/dist/js/toast-data';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  expenses:any;
  Transdata:any;
  TransId:any;
 // public TransForm: FormGroup;
  payment:any;
  TransForm = new FormGroup({
    PaymentId: new FormControl('lamb'),
  });
  CompanyId: number;
  StoreId: number;
  errorMsg:string = '';
  constructor(private IDB: idbService, public http: HttpClient, public router: Router,private Auth: AuthService,private _fb: FormBuilder,private _avRoute: ActivatedRoute) 
   {
    this.TransId = Number(this._avRoute.snapshot.params["Id"]);
    var logInfo = JSON.parse(localStorage.getItem("logInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.StoreId;

    }

  ngOnInit()
   {
    setHeightWidth();
    this.GetPay();
    this.TransForm = this._fb.group({
      Id:0,
      Notes: ['', [Validators.required]],
      Amount:['',[Validators.required]],
      PaymentTypeId:['',[Validators.required]],
      CompanyId:[this.CompanyId,[Validators.required]],
      StoreId:[this.StoreId,[Validators.required]]
    })
    this.Auth.EditType(this.TransId).subscribe(data => {
      this.Transdata = data;
      // console.log(data);
      this.EditData(this.Transdata);
      var response:any = data
      if(response.status == 0)
      {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
        }
        
  
    });
  }

  ExpenseGroup()
  {
    if (this.TransForm.value.Id == 0)
    {
    // console.log(this.TransForm.value)
    var data = {data:JSON.stringify(this.TransForm.value)}
    this.Auth.saveExpense(data).subscribe(data=>{
      this.expenses = data;
      var response:any = data
      if(response.status == 0)
      {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
        }
        else{
          this.errorMsg = response.msg;
          console.log(toast(this.errorMsg))
  
        }
  
    });
    this.router.navigate(['transtype'])

  }
  else
  {
    var data = { data: JSON.stringify(this.TransForm.value) }
    this.Auth.UpdateExpense(data).subscribe(data => {
      this.router.navigate(['transtype'])
      var response:any = data
      if(response.status == 0)
      {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
        }
        else{
          this.errorMsg = response.msg;
          console.log(toast(this.errorMsg))
  
        }

    });

  }
  }
  EditData(data)
  {
    this.TransForm.setValue({
      Id:data.Id,
      Notes: data.Notes,
      Amount: data.Amount,
      PaymentTypeId:data.PaymentTypeId
    });
    // console.log(this.TransForm.value);
  }
  GetPay()
  {
    this.Auth.getpayment().subscribe(data=>{
      this.payment=data;
      // console.log(this.payment);
      var response:any = data
      if(response.status == 0)
      {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
        }
        else{
          this.errorMsg = response.msg;
          console.log(toast(this.errorMsg))
  
        }

    })
  }

}
