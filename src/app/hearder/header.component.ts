import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart } from "node_modules/@angular/router";
import { AuthService } from "../auth.service";
import { Password } from "./password";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
declare function setHeightWidth(): any;
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  showHead: boolean = false;
  AppName = "Attendance";
  PassWordObject = new Password(localStorage.getItem("userid"), "", "", "");
  closeResult: string;
  userid: any;
  pass_alert: String;
  passAlertVisible = false;
  Show_hk_nav_light = true;
  pageName = "";
  loginInfo: any;
  role: void;
  name: void;
  online$: Observable<boolean>;
  constructor(
    public router: Router,
    private Auth: AuthService,
    private modalService: NgbModal
  ) {
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );

    // on route change to '/login', set the variable showHead to false
    router.events.forEach(event => {
      //console.log(event)
      if (event instanceof NavigationStart) {
        console.log(event["url"]);
        this.pageName = event["url"].replace("/", "");

        if (event["url"] == "/") {
          this.showHead = false;
        } else if (event["url"] == "/signup") {
          this.showHead = false;
          this.AppName = "";
        } else if (event["url"] == "/unlockscreen") {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }

  ngOnInit() {
    setHeightWidth();
    //alert(this.router.url)
    this.loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    // console.log(this.loginInfo)
    this.userid = localStorage.getItem("userid");

  }
  showLeftNav() {
    if (this.pageName == "order") {
      return false;
    } else {
      return true;
    }
  }

  open(content, $event) {
    $event.preventDefault();
    this.PassWordObject = new Password(
      localStorage.getItem("userid"),
      "",
      "",
      ""
    );
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  showAlertmsg(data) {
    this.pass_alert = data.msg;
    this.passAlertVisible = true;
  }
  popup(contentDetail) {
    const modalRef = this.modalService
      .open(contentDetail, {
        ariaLabelledBy: "modal-basic-title",
        centered: true
      })
      .result.then(
        result => {
          //this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    //var userid = this.userid;
  }
  logout() {
    localStorage.removeItem("jwt");
    this.router.navigate([""]);
  }
  lockAcc() {
    console.log("removing loginInfo from header component")
    localStorage.removeItem("loginInfo");
    this.router.navigate(["/unlockscreen"]);
  }
  navbartoggle() {
    console.log(document.getElementById("maindiv"))
    var element = document.getElementById("maindiv").classList.toggle("hk-nav-toggle")
  }
}
