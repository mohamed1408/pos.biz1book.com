import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { toast, dangertoast } from 'src/assets/dist/js/toast-data';
import { Location } from '@angular/common';
import { Directive, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-create-diningarea',
  templateUrl: './create-diningarea.component.html',
  styleUrls: ['./create-diningarea.component.css']
})
export class CreateDiningareaComponent implements OnInit {
  CompanyId: number;
  DineinId: any;
  store: any;
  edttable: any;
  errorMsg: string = '';
  status: number;

  DiningArea = { StoreId: 0, Id: 0, Description: "Floor 1", DiningTable: [{ Id: 0, Description: "Table 1", DiningAreaId: 0, CompanyId: this.CompanyId, StoreId: 0 }], CompanyId: this.CompanyId, Del: [{ Id: 0 }] };

  constructor(private Auth: AuthService, public router: Router, private _avRoute: ActivatedRoute, public location: Location,
    private el: ElementRef) {
    this.DineinId = Number(this._avRoute.snapshot.params["Id"]);
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.DiningArea = { StoreId: 0, Id: 0, Description: "Floor 1", DiningTable: [{ Id: 0, Description: "Table 1", DiningAreaId: this.DiningArea.Id, CompanyId: this.CompanyId, StoreId: this.DiningArea.StoreId }], CompanyId: this.CompanyId, Del: [{ Id: 0 }] };
  }

  ngOnInit() {
    this.getStore();
    if (this.DineinId > 0) {
      this.Auth.EditTable(this.DineinId).subscribe(data => {
        this.edttable = data[0];
        this.DiningArea.Description = this.edttable.DiningArea;
        this.DiningArea.Id = this.edttable.Id;
        this.DiningArea.StoreId = this.edttable.StoreId;
        this.DiningArea.DiningTable = [];
        this.DiningArea.Del = [];
        this.edttable.DiningTable.forEach(element => {
          var obj = { Id: element.Id, Description: element.Description, DiningAreaId: this.DiningArea.Id, StoreId: this.DiningArea.StoreId, CompanyId: this.CompanyId };
          this.DiningArea.DiningTable.push(obj);
        });
      })

    }
  }

  compare(a, b) {
    if (a.Description.replace(/\s/g, "").toLowerCase() < b.Description.replace(/\s/g, "").toLowerCase()) {
      return -1;
    }
    if (a.Description.replace(/\s/g, "").toLowerCase() > b.Description.replace(/\s/g, "").toLowerCase()) {
      return 1;
    }
    return 0;
  }

  savearea() {
    var sortedvalue = this.DiningArea.DiningTable.sort(this.compare);
    console.log(sortedvalue)
    for (let i = 0; i < sortedvalue.length - 1; i++) {
      if (sortedvalue[i + 1].Description.replace(/\s/g, "").toLowerCase() == sortedvalue[i].Description.replace(/\s/g, "").toLowerCase()) {
        dangertoast("Table names must be unique")
        return;
      }
    }
    // const status = this.DiningArea.DiningTable.some(user => 
    //   { let counter = 0; for (const iterator of this.DiningArea.DiningTable) 
    //     { if (iterator.Description === user.Description)
    //        {
    //         counter += 1; } }
    //        console.log(counter);
    //         return counter > 1;
    //         console.log(counter);
    //       });

    // if (this.DiningArea.Id == 0 ) {
    var data = { data: JSON.stringify(this.DiningArea) }
    this.Auth.addtable(data).subscribe(data => {
      this.router.navigate(['diningarea'])
      var response: any = data;
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg))
      }
      else {

        this.errorMsg = response.msg;
        const type = "info";
        console.log(toast(this.errorMsg))
      }
    });
    //}
    // else {
    var data = { data: JSON.stringify(this.DiningArea) }
    this.Auth.UpdateTable(data).subscribe(data => {
      this.router.navigate(['diningarea'])
      var response: any = data
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
      }
      else {
        this.errorMsg = response.msg;
        const type = "info";
        console.log(toast(this.errorMsg))
        this.router.navigate(['diningarea'])
      }
    });
  }
  // }
  addTable() {
    this.DiningArea.DiningTable.push({ Id: 0, Description: "", DiningAreaId: this.DiningArea.Id, CompanyId: this.CompanyId, StoreId: this.DiningArea.StoreId });
  }
  focus() {
    // var frequency = this.DiningArea.DiningTable.reduce(function(seen, Description)
    //  { if (Description in seen)
    //    { seen[Description] = seen[Description] + 1; }
    //     else { seen[Description] = 1; } return seen;}, {});
    //     for (var key in frequency) { if (frequency[key] > 1) 
    //       { result.push(key.split(",").map(function(Description) 
    //       { return parseInt(Description); })); }}
    // console.log(result)
    // const status = this.DiningArea.DiningTable.some(user => 
    //   { let counter = 0; for (const iterator of this.DiningArea.DiningTable) 
    //     { if (iterator.Description === user.Description)
    //        {
    //         //this.DiningArea.DiningTable.splice(index, 1);
    //           counter += 1; } }
    //         return counter > 1;});

    const invalidElements = this.el.nativeElement.querySelectorAll('.ng-invalid');
    if (invalidElements.length > 0) {
      invalidElements[1].focus();
    }

  }

  deleteTable(index) {
    var id = this.DiningArea.DiningTable[index].Id;
    this.DiningArea.Del.push({ Id: id })
    this.DiningArea.DiningTable.splice(index, 1);
  }
  getStore() {
    this.Auth.getStores(this.CompanyId).subscribe(data => {
      this.store = data;
      console.log(this.store);
    });
  }
  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || (k >= 48 && k <= 57));
  }
  quickadd(prefix, count) {
    this.DiningArea.DiningTable = this.DiningArea.DiningTable.filter(x => x.Id != 0);
    if (+count) {
      for (let i = 0; i < +count; i++) {
        var obj = { Id: 0, Description: prefix + " " + (i + 1), DiningAreaId: this.DiningArea.Id, CompanyId: this.CompanyId, StoreId: this.DiningArea.StoreId };
        if (this.DiningArea.DiningTable[i] == undefined) {
          this.DiningArea.DiningTable.push(obj);
        } else {
          this.DiningArea.DiningTable[i].Description = prefix + " " + (i + 1);
        }
      }
    } else {
      var code: number = count.charCodeAt(0);
      let I;
      let j = 0;
      if (code > 64 && code < 91) {
        I = 65;
      } else if (code > 96 && code < 123) {
        I = 97;
      }
      for (let i = I; i <= code; i++) {
        var obj = { Id: 0, Description: prefix + " " + String.fromCharCode(i), DiningAreaId: this.DiningArea.Id, CompanyId: this.CompanyId, StoreId: this.DiningArea.StoreId };
        if (this.DiningArea.DiningTable[j] == undefined) {
          this.DiningArea.DiningTable.push(obj);
        } else {
          this.DiningArea.DiningTable[j].Description = prefix + " " + String.fromCharCode(i);
        }
        j++
      }
    }
  }
}







//    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
