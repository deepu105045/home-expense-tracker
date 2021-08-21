import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  displayName: string;
  loginform: any;
  constructor(private fb: FormBuilder, private loginService: AuthService,public router: Router) { }

  ngOnInit() {
    this.loginform = this.fb.group({
      email:['deepu@deepu.com',[Validators.required, Validators.email]],
      password:['12345678',[Validators.required, Validators.minLength(1)]]
    });
  }

  get email(){
    return this.loginform.get('email');
  }
  get password(){
    return this.loginform.get('password');
  }

  login(){
    this.loginService.login(this.email.value, this.password.value).then(res =>{
      this.displayName = res.user.displayName ;
      this.router.navigate(['dashboard'],{ queryParams: {displayName: this.displayName}});
    }).catch(error =>{
      console.log('There are some login issues.' + error) ;
    });
  }



}
