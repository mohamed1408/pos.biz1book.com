import { Component, OnInit, ViewChild, ɵConsole } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LocsService } from '../service/locs.service';
import * as moment from "moment";
import { HttpClient } from '@angular/common/http';
import { dangertoast, toast } from '../../assets/dist/js/toast-data';
//import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
// import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
declare function setHeightWidth(): any;
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private LOCS: LocsService,
    private http: HttpClient,
  ) { }

  registerForm: FormGroup;
  submitted = false;
  alert_msg = "";
  base_url = "https://biz1pos.azurewebsites.net/api/";

  ngOnInit() {
    setHeightWidth();
    showHead: false;
    this.loginForm = this.formBuilder.group({
      emailId: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      Name: ["", Validators.required],
      RestaurentName: ["", Validators.required],
      EmailId: [""],
      Password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      PhoneNo: "",
      Provider: "Biz1Book"
    });

    this.registerForm.valueChanges.subscribe(term => {
      this.alert_msg = "";
    });
  }

  get f() {
    return this.registerForm.controls;
  }
  onSubmitHandler(data) {
    console.log(data);
    var status = data.status;
    var msg = data.msg;
    this.http.post("http://localhost:3000/sendmail", { email: this.registerForm.value.EmailId }).subscribe(data => {
      console.log(dangertoast("We have sent a confirmation mail to your email please confirm your Account"));

    });
    if (status == 200) {
      if (this.registerForm.value.Provider == "Biz1Book") {
        this.router.navigate([""]);
      } else {
        this.loginForm.setValue({
          emailId: this.registerForm.value.EmailId,
          password: this.registerForm.value.Password
        })
        this.LogIn(this.loginForm.value).subscribe(data => {
          var response:any = data;
          console.log(response)
          localStorage.setItem("userinfo", JSON.stringify(response.data));
          localStorage.setItem("loginInfo", JSON.stringify(response.data[0]));
          this.router.navigate(["/company"]);
        })
      }
    } else {
      this.alert_msg = msg;
    }
  }
  LogIn(formdata) {
    let body = this.toFormData(formdata);
    return this.http.post(this.base_url + "LogIn/WebLogIn", body);
  }
  // public socialSignIn(socialProvider: string) {
  //   let socialPlatformProvider;
  //   if (socialProvider === 'facebook') {
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //   } else if (socialProvider === 'google') {
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   }
  //   this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
  //     console.log(socialProvider, socialusers);
  //     console.log(socialusers);
  //     this.Savesresponse(socialusers);
  //   });
  // }
  Savesresponse(socialusers) {
        if(socialusers.email == undefined){
      this.alert_msg = "Sorry we didn't get your email"
      console.log(dangertoast(this.alert_msg));
    }else{this.registerForm.setValue({
      Name: socialusers.name,
      RestaurentName: socialusers.name,
      EmailId: socialusers.email,
      Password: socialusers.id,
      confirmPassword: socialusers.id,
      PhoneNo: "",
      Provider: socialusers.provider
    })
      this.Registration(this.registerForm.value).subscribe(data => {
        this.onSubmitHandler(data);
  
      });
  
    }

    console.log(socialusers)
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (
      this.registerForm.value.Password !=
      this.registerForm.value.confirmPassword
    ) {
      this.alert_msg = "Password and confirm Password is not match";
      return;
    }
    console.log(this.registerForm.value);
    this.Registration(this.registerForm.value).subscribe(data => {
      this.onSubmitHandler(data);

    });
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

}
