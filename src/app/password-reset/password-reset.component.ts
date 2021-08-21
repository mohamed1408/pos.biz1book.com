import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

declare function setHeightWidth(): any;

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private Auth: AuthService) { }
  email = '';
  errorMessage;
  successMessage;
  ngOnInit() {
    setHeightWidth()
  }
  sendmail() {
    this.Auth.sendmail(this.email).subscribe(data => {
      console.log(data)
    })
  }

}
