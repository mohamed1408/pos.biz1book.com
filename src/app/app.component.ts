import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart, Event, NavigationEnd } from "@angular/router";
import { DataService } from './service/data.service';
import { LoaderService } from '../app/service/loader.service'
import { OverlayContainer } from '@angular/cdk/overlay';
declare function setHeightWidth(): any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent implements OnInit {
  title = "Biz1book";
  pageName = "";
  otherTheme: boolean = false;
  //type = "page";
  showHead: boolean = true;
  showloadingindiactor = true;
  constructor(public router: Router, private datService: DataService, private loaderservice: LoaderService,private overlayContainer: OverlayContainer) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        // this.loaderservice.show();
        this.showloadingindiactor = true;
      }

      if (routerEvent instanceof NavigationEnd) {
        // this.loaderservice.hide();
        this.showloadingindiactor = false;
      }
    })
    // router.events.forEach(event => {
    router.events.forEach(event => {
      //console.log(event)
      if (event instanceof NavigationStart) {
        console.log(event["url"]);
        this.pageName = event["url"].replace("/", "");

        if (event["url"] == "/") {
          this.showHead = false;
        } else if (event["url"] == "/signup") {
          this.showHead = false;
          //this.AppName = "";
        } else if (event["url"] == "/unlockscreen") {
          this.showHead = false;
        } else if (event["url"] == "/password-reset") {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
    //});
    // this.worker.execute();
    this.datService.execute();
  }
  changeTheme() {
    this.otherTheme = !this.otherTheme;
  }
  ngOnInit() {
    console.log(this.overlayContainer.getContainerElement().classList)
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    overlayContainerClasses.add('light-theme');
    setHeightWidth();
    var admin_routes = ["/dashboard", "/company", "/customer", "/outlet", "/preference", "/users", "/urban", "/daywiserpt",
      "/orderwiserpt", "/productwiserpt", "/transactionrpt", "/categorywiserpt", "/storewiserpt", "/storerpt", "/timewiserpt", "/monthwiseprodsales",
      "/cancelordreport", "/upprdrpt"]
    var loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    // this.router.events.forEach(event => {
    //   if (event instanceof NavigationStart) {
    //     console.log(loginInfo)
    //     if (admin_routes.some(x => x == event["url"]) && loginInfo.RoleId != 1) {
    //       alert("You are not authorized to this path");
    //       this.router.navigate(['/'])
    //     }
    //   }
    // })
  }

  FixedLeftNav() {
    if (this.pageName == "order") {
      return true;
    } else {
      return false;
    }
  }


}


// if (typeof Worker !== 'undefined') {
//   // Create a new
//   const worker = new Worker('./app..worker', { type: 'module' });
//   worker.onmessage = ({ data }) => {
//     console.log(`page got message: ${data}`);
//   };
//   worker.postMessage('hello');
// } else {
//   // Web Workers are not supported in this environment.
//   // You should add a fallback so that your program still executes correctly.
// }