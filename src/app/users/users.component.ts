import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dangertoast, toast } from 'src/assets/dist/js/toast-data';
import { Router } from '@angular/router';
declare function setHeightWidth(): any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  udata: any;
  public settings = {};
  public loadContent: boolean = false;
  public form: FormGroup;
  public UserForm: FormGroup;
  public userData = { Id: 0, Name: "", Pin: 0, RoleId: 0, AccountId: 0, CompanyId: 0, stores: [] }
  getrole: any;
  getuser: any;
  Id: any;
  Name: any;
  show: any = false;
  selectedItems: any[];
  errorMsg: string = '';
  CompanyId: number;
  StoreId: number;
  User: any;
  userinfo: any;
  showloading = true;
  sortfield: any;
x: number;
y: number;
  constructor(private Auth: AuthService, private modalService: NgbModal, public router: Router) {
    var logInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.userData.CompanyId = this.CompanyId;
    // this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
  }

  ngOnInit() {
    setHeightWidth();
    this.data();
    this.getroles();
    this.GetUser();
    this.settings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 200,
      itemsShowLimit: 3,
      searchPlaceholderText: 'Search',
      noDataAvailablePlaceholderText: 'No Stores Found',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    this.setForm();
  }
  public setForm() {
    this.form = new FormGroup({
      name: new FormControl(
        this.udata
      )
    });
    this.loadContent = true;

  }

  public onFilterChange(item: any) {
    console.log(item);
  }
  // public onDropDownClose(item: any) {
  //  console.log(item);
  // }

  public onItemSelect(item: any) {
    console.log(item);
    this.userData.stores.push(item.Id);
  }
  public onDeSelect(item: any) {
    console.log(item);
    var ind = this.userData.stores.findIndex(x => x == item.Id);
    this.userData.stores.splice(ind, 1);
  }

  public onSelectAll(items: any) {
    console.log(items);
    items.forEach(element => {
      this.userData.stores.push(element.Id);
    });

  }
  public onDeSelectAll(items: any) {
    console.log(items);
    this.userData.stores = [];
  }
  data() {
    this.Auth.getStores(this.CompanyId).subscribe(data => {
      this.udata = data;
      console.log(this.udata);
      var response: any = data
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }

    });
  }
  sortsettings(field) {
    if(this.sortfield == field) {
      this.x = this.x*-1;
      this.y = this.y*-1;
    } else {
      this.sortfield = field;
      this.x = -1;
      this.y = 1;
    }
  }
  
  get sortData() {
    return this.getuser.users.sort((a, b) => {
    if (a[this.sortfield] < b[this.sortfield]) return this.x;
    else if (a[this.sortfield] > b[this.sortfield]) return this.y;
    else return 0;
  });
  }

  getroles() {
    this.Auth.GetRole(this.CompanyId).subscribe(role => {
      this.getrole = role;
      console.log(role);
      var response: any = role
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));

      }

    })
  }
  GetUser() {
    this.show = false
    this.Auth.getUser(this.CompanyId).subscribe(user => {
      this.getuser = user;
      console.log(this.getuser);
      this.getuser.users = this.getuser.users.filter(x => x.RoleId != 1);
      this.getuser.users.forEach(element => {
        element.Stores = "";
        this.getuser.userstores.filter(x => x.UserId == element.Id).forEach(element1 => {
          element.Stores = element.Stores + element1.Store.Name + ',';
          console.log(user);
          this.User = this.getuser.users;
        });
      });
      var response: any = user
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
      }
      this.showloading =false
    })
  }
  saveuser() {
    var data = { objData: JSON.stringify(this.userData) }
    console.log(data);
    this.Auth.formuser(data, this.CompanyId).subscribe(data => {
      // this.router.navigate(['users'])
      // this.userinfo.filter(x => x.Id == this.userData.Id)[0] = this.userData;
      console.log(this.userData);
      var response: any = data
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
      }
      else {
        this.errorMsg = response.msg;
        console.log(toast(this.errorMsg));
        this.GetUser()
        this.show = false;
        var obj = { Id: response.user.Id, Name: response.user.Name, Pin: response.user.Pin, RoleId: response.user.RoleId, Role: this.getrole.filter(x => x.Id == response.user.RoleId)[0].Name, CompanyId: response.user.CompanyId }
        // var index = this.userinfo.findIndex(x => x.Id == obj.Id);
        // if (index >= 0) {
        //   // this.userinfo[index] = obj;
        // } else {
        //   // this.userinfo.push(obj);
        // }
        // localStorage.setItem("userinfo", JSON.stringify(this.userinfo))
        this.clear();
      }
      this.GetUser()
    });
  }
  deleteuser(Id) {
    console.log(Id);
    this.Auth.DeleteUser(Id).subscribe(x => {
      this.GetUser();
      var response: any = x
      if (response.status == 0) {
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
      }
      else {
        this.errorMsg = response.msg;
        console.log(toast(this.errorMsg));
        // var index = this.userinfo.findIndex(x => x.Id == Id);
        // this.userinfo.splice(index, 1);
        // console.log(this.userinfo, index)
        // localStorage.setItem("userinfo", JSON.stringify(this.userinfo))
      }
    });
  }

  filter(item) {
    this.show = true;
    this.selectedItems = [];
    this.userData = { Id: item.Id, Name: item.Name, Pin: item.Pin, RoleId: item.RoleId, stores: [], AccountId: 0, CompanyId: this.CompanyId };
    this.getuser.userstores.filter(x => x.UserId == item.Id).forEach(element => {
      this.userData.stores.push(element.Store.Id);
      this.selectedItems.push(element.Store);
      console.log(this.selectedItems);

    });
  }

  clear() {
    this.selectedItems = [];
    this.userData = { Id: 0, Name: "", Pin: 0, RoleId: 0, AccountId: 21, CompanyId: this.CompanyId, stores: [] };
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