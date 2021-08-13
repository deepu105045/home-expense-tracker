import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginform: any;
  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.loginform = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(1)]]
    });
  }

  get email(){
    return this.loginform.get('email');
  }
  get password(){
    return this.loginform.get('password');
  }

  login(){
    this.loginService.login(this.email.value, this.password.value);
  }

}
