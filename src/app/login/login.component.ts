import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { dangertoast } from 'src/assets/dist/js/toast-data';
import { JwtHelperService } from '@auth0/angular-jwt'
// import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
declare function setHeightWidth(): any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  alertClosed = false;
  alertMessage: string;
  alertType: string;
  email: String;
  showForgot: boolean;
  disabledRP: boolean;
  status: number;
  errorMsg: string = '';
  fieldTextType: boolean;
  constructor(
    private formBuilder: FormBuilder,// private OAuth: AuthService,
    private router: Router, private http: HttpClient, private jwtHelper: JwtHelperService
  ) {
    localStorage.removeItem("loginInfo");
    var token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(["/unlockscreen"]);
    }

    // var userinfo = localStorage.getItem("userinfo");
    // if (userinfo != undefined) {
    //   this.router.navigate(["/unlockscreen"]);
    // }
    // this.loadScripts();
  }
  base_url = "https://biz1pos.azurewebsites.net/api/";
  loginForm: FormGroup;
  submitted = false;
  alert_msg = "";
  ngOnInit() {
    var element = document.getElementById("mainDiv");
    // element.classList.remove("hk-wrapper");
    // element.classList.remove("hk-vertical-nav");
    setHeightWidth();
    this.showForgot = false;
    this.disabledRP = false;
    showHead: false;
    this.loginForm = this.formBuilder.group({
      emailId: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.loginForm.valueChanges.subscribe(term => {
      this.alert_msg = "";
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  ngAfterViewInit() { }
  onSubmitHandler(response) {
    var status = response.status;
    if (status == 200) {
      var token = response.token.Value.token.Value;
      response.company.emailId = response.emailId;
      localStorage.setItem("company", JSON.stringify(response.company));
      this.router.navigate(["/unlockscreen"]);
    } else {
      var msg = response.msg;
      this.alert_msg = msg;
    }
  }
  public socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    // if (socialProvider === 'facebook') {
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // } else if (socialProvider === 'google') {
    //   socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    // }
    // this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
    //   console.log(socialProvider, socialusers);
    //   console.log(socialusers);
    //   this.Savesresponse(socialusers);
    // });
  }
  Savesresponse(socialusers) {
    if (socialusers.email == undefined) {
      this.alert_msg = "Sorry we didn't get your Inputs"
      console.log(dangertoast(this.alert_msg));
    }
    else {
      this.loginForm.setValue({
        emailId: socialusers.email,
        password: socialusers.id
      })
      this.LogIn(this.loginForm.value).subscribe(data => {
        this.onSubmitHandler(data);
        var response: any = data
        if (response.status == 0) {
          this.status = 0;
          this.errorMsg = response.msg;
          console.log(dangertoast(this.errorMsg));
        }
      })
    }
    console.log(socialusers)
  }
  onSubmit() {
    this.submitted = true;
    // if (this.loginForm.invalid) {
    //   return;
    // }
    console.log(this.loginForm.value);
    this.LogIn(this.loginForm.value).subscribe(data => {
      this.onSubmitHandler(data);
      var response: any = data
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        console.log(dangertoast(this.errorMsg));
      }
    });
  }
  LogIn(formdata) {
    let body = this.toFormData(formdata);
    return this.http.post(this.base_url + "LogIn/WebLogIn", body);
  }
  toFormData(formValue) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
  Registration(formdata) {
    let body = this.toFormData(formdata);
    return this.http.post(this.base_url + "Registration/Register", body);
  }

  loadScripts() {
    const dynamicScripts = [
      "../../assets/vendors/jquery/dist/jquery.min.js",
      "../../assets/vendors/popper.js/dist/umd/popper.min.js",
      "../../assets/vendors/bootstrap/dist/js/bootstrap.min.js",
      "../../assets/dist/js/jquery.slimscroll.js",
      "../../assets/dist/js/dropdown-bootstrap-extended.js",
      "../../assets/vendors/owl.carousel/dist/owl.carousel.min.js",
      "../../assets/dist/js/feather.min.js",
      "../../assets/dist/js/init.js",
      "../../assets/dist/js/login-data.js"
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement("script");
      node.src = dynamicScripts[i];
      node.type = "text/javascript";
      node.async = false;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
  }
  togglepasswordvisibility() {
    this.fieldTextType = !this.fieldTextType;
  }
}
