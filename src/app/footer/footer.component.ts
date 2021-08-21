import { Component, OnInit } from "@angular/core";
declare function setHeightWidth(): any;
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    setHeightWidth();
  }

  loadScripts() {
    const dynamicScripts = ["../../assets/dist/js/init.js"];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement("script");
      node.src = dynamicScripts[i];
      node.type = "text/javascript";
      node.async = false;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
  }
}
