import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: {
    emailId: string,
    password: string
  };
  showError = false;
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }
  getLogin(email, pass) {
    this.login = {
      emailId: email,
      password: pass
    };
    this.accountService.checkLogin(this.login).subscribe(data => {
      console.log('login', data);
      if (data.length !== 0) {
        this.router.navigate(['navside']);
      } else {
        this.showError = true;
      }
    }, error => {
      console.log(error);
    });
  }
}
