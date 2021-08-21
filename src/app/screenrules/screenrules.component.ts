import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare function setHeightWidth(): any;

@Component({
  selector: 'app-screenrules',
  templateUrl: './screenrules.component.html',
  styleUrls: ['./screenrules.component.css']
})
export class ScreenrulesComponent implements OnInit {
  
  roles = [
    { id: 1, name: 'Admin', badge: 'badge-danger' },
    { id: 2, name: 'Manager', badge: 'badge-warning' },
    { id: 3, name: 'Cashier', badge: 'badge-info' },
    { id: 4, name: 'KitchenUser', badge: 'badge-succes' },
    { id: 5, name: 'Waiter', badge: 'badge-light' }
  ]
  companyid: number;
  users: Array<any> = [];
  rolesearchstring: string = '';
  usersearchstring: string = '';
  ruledata = { UserId: null, RoleId: null, CompanyId: 0, Rules: '' }
  constructor(private auth: AuthService) {
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.companyid = logInfo.CompanyId;
    this.ruledata.CompanyId = this.companyid;
  }

  ngOnInit() {
    setHeightWidth()
    this.getusers();
  }

  getusers() {
    this.auth.getUser(this.companyid).subscribe(data => {
      this.users = data["users"];
    })
  }

  filteredroles(): any[] {
    const filterValue = this._normalizeValue(this.rolesearchstring);
    return this.roles.filter(role => this._normalizeValue(role.name).includes(filterValue));
  }

  displayuser(user): string {
    return user ? user.Name : '';
  }

  filteredesers(): any[] {
    const filterValue = this._normalizeValue(this.usersearchstring);
    return this.users.filter(user => this._normalizeValue(user.Name).includes(filterValue));
  }

  displayrole(role): string {
    return role ? role.name : '';
  }

  private _normalizeValue(value: string): string {
    return typeof (value) == 'string' ? value.toLowerCase().replace(/\s/g, '') : '';
  }

  console(data) {
    console.log(data)
  }
  focus(){
    const ele = document.getElementById("roleauto");   
    console.log(ele)
    if (ele) {
      ele.focus();
    }
  }
}

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: any) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }