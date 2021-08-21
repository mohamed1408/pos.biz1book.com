import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';
import { dangertoast, toast } from 'src/assets/dist/js/toast-data';
declare function setHeightWidth(): any;
@Component({
  selector: 'app-transtypes',
  templateUrl: './transtypes.component.html',
  styleUrls: ['./transtypes.component.css']
})
export class TranstypesComponent implements OnInit {
  expense:any;  
  errorMsg:string = '';
  term;
  p;







  ''
  constructor(private Auth: AuthService) { }

  ngOnInit()
   {
     setHeightWidth();
    this.GetExpense();
  }
  GetExpense()
  {
    this.Auth.getExpense().subscribe(data=>{
      this.expense = data;
      console.log(this.expense);
      for(let i=0; i < this.expense.transtype.length; i++)
      {  
        var obj = this.expense.payment.filter(x => x.Id == this.expense.transtype[i].PaymentTypeId);
        console.log(obj)
        this.expense.transtype[i].Payment = obj[0].Description;       
       }
       console.log(this.expense.transtype)
       var response:any = data
      if(response.status == 0)
      {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
        
      }
      
    });
  }
  DeleteExp(Id)
  {
    this.Auth.DeleteExpense(Id).subscribe(data=>{
      window.location.reload();
      var response:any = data
      if(response.status == 0)
      {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
        
      }
      else{
        this.errorMsg = response.msg;
        console.log(toast(this.errorMsg));
        
      }
     })
  }
  
  
  
}
